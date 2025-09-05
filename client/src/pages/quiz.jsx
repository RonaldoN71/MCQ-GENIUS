import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAuthSync } from "../lib/auth.js";
import { Navigation } from "../components/navigation";
import { ProgressBreadcrumb } from "../components/progress-breadcrumb";
import { QuizInterface } from "../components/quiz-interface";
import { QuizResults } from "../components/quiz-results";
import { AnswerReview } from "../components/answer-review";
import { useLocation } from "wouter";
import { toast } from "../hooks/use-toast";
import { useQuizStore } from "../store/quizStore"; // ✅ Zustand

export default function QuizPage() {
  const { user } = useAuthSync();
  const [, setLocation] = useLocation();
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizResults, setQuizResults] = useState(null);
  const [showAnswerReview, setShowAnswerReview] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});

  const quiz = useQuizStore((state) => state.quiz);

  if (!quiz) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          No quiz found. Please upload a file first.
        </div>
      </div>
    );
  }

  // 🔹 Normalize backend question format -> frontend format
  const questions = quiz.questions.map((q, index) => ({
    id: index,
    text: q.question,
    options: [q.option_a, q.option_b, q.option_c, q.option_d],
    correctAnswer: q.correct_answer,
    explanation: q.explanation,
  }));

  const submitAnswersMutation = useMutation({
    mutationFn: async ({ answers, timeTaken }) => {
      if (!questions.length || !user) throw new Error("Quiz or user not found");

      let score = 0;
      questions.forEach((question) => {
        if (answers[question.id] === question.correctAnswer) {
          score++;
        }
      });

      // Send attempt to backend
      // const response = await fetch("http://localhost:3001/api/quiz-attempts", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     quizId: quiz.noteSet.id,
      //     userId: user.id,
      //     answers,
      //     score,
      //     totalQuestions: questions.length,
      //     timeTaken,
      //   }),
      // });

      // if (!response.ok) {
      //   throw new Error("Failed to submit quiz");
      // }

      return { score, totalQuestions: questions.length, timeTaken };
    },
    onSuccess: (results) => {
      setQuizResults(results);
      setQuizCompleted(true);
      toast({
        title: "Quiz Completed!",
        description: `You scored ${results.score}/${results.totalQuestions}`,
      });
    },
    onError: (error) => {
      toast({
        title: "Submission Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const steps = [
    { id: "upload", name: "Upload File", status: "complete" },
    { id: "generate", name: "Generate MCQ", status: "complete" },
    {
      id: "quiz",
      name: "Take Quiz",
      status: quizCompleted ? "complete" : "current",
    },
  ];

  const handleQuizComplete = (answers, timeTaken) => {
    setUserAnswers(answers); // Store user answers for review
    submitAnswersMutation.mutate({ answers, timeTaken });
  };

  const handleViewAnswers = () => {
    setShowAnswerReview(true);
  };

  const handleBackToResults = () => {
    setShowAnswerReview(false);
  };

  const handleRetakeQuiz = () => {
    setQuizCompleted(false);
    setQuizResults(null);
    setShowAnswerReview(false);
    setUserAnswers({});
  };

  const handleNewQuiz = () => {
    setLocation("/upload");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProgressBreadcrumb steps={steps} />

        {!quizCompleted ? (
          <QuizInterface questions={questions} onComplete={handleQuizComplete} />
        ) : showAnswerReview ? (
          <AnswerReview 
            questions={questions}
            userAnswers={userAnswers}
            onBack={handleBackToResults}
          />
        ) : quizResults ? (
          <QuizResults
            score={quizResults.score}
            totalQuestions={quizResults.totalQuestions}
            timeTaken={quizResults.timeTaken}
            onViewAnswers={handleViewAnswers}
            onRetakeQuiz={handleRetakeQuiz}
            onNewQuiz={handleNewQuiz}
          />
        ) : null}
      </div>
    </div>
  );
}
