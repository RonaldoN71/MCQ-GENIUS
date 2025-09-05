import { useState } from "react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function QuizInterface({ questions, onComplete }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [startTime] = useState(Date.now());

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswerSelect = (questionId, selectedValue) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: selectedValue,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      const timeTaken = Math.floor((Date.now() - startTime) / 1000);
      onComplete(answers, timeTaken);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSkip = () => {
    handleNext();
  };

  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const selectedAnswer = answers[currentQuestion.id];

  return (
    <div
      className="bg-card rounded-lg border border-border p-8 shadow-sm"
      data-testid="quiz-interface"
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-foreground">MCQ Quiz</h2>
          <p className="text-muted-foreground">
            Answer all questions to complete the quiz
          </p>
        </div>
        <div className="text-right">
          <div className="bg-accent rounded-lg px-4 py-2">
            <p className="text-sm text-muted-foreground">Progress</p>
            <p
              className="text-lg font-bold text-foreground"
              data-testid="question-progress"
            >
              {currentQuestionIndex + 1} / {questions.length}
            </p>
          </div>
        </div>
      </div>

      <Progress value={progress} className="mb-8" data-testid="quiz-progress" />

      <div className="mb-8">
        <div className="mb-6">
          <span className="inline-block bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium mb-4">
            Question {currentQuestionIndex + 1}
          </span>
          <h3
            className="text-xl font-semibold text-foreground leading-relaxed"
            data-testid="question-text"
          >
            {currentQuestion.text} {/* ✅ changed from .question to .text */}
          </h3>
        </div>

        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => {
            const optionLetter = String.fromCharCode(65 + index); // A, B, C, D
            const isSelected = selectedAnswer === optionLetter;

            return (
              <label
                key={index}
                className={`
                  quiz-option flex items-center p-4 border rounded-lg cursor-pointer transition-all
                  ${
                    isSelected
                      ? "selected bg-primary text-primary-foreground border-primary shadow-md"
                      : "border-border hover:bg-accent hover:border-primary"
                  }`}
                data-testid={`option-${index}`}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestion.id}`}
                  value={optionLetter}
                  checked={isSelected}
                  onChange={() =>
                    handleAnswerSelect(currentQuestion.id, optionLetter)
                  }
                  className="sr-only"
                />
                <div className="flex items-center w-full">
                  <span
                    className={`
                    w-8 h-8 border-2 rounded-full flex items-center justify-center text-sm font-medium mr-4
                    ${
                      isSelected
                        ? "border-primary-foreground bg-primary-foreground text-primary"
                        : "border-border"
                    }`}
                  >
                    {optionLetter}
                  </span>
                  <span
                    className={
                      isSelected ? "text-primary-foreground font-medium" : "text-foreground"
                    }
                  >
                    {option}
                  </span>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between items-center pt-6 border-t border-border">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          data-testid="previous-button"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>

        <div className="flex space-x-3">
          <Button variant="secondary" onClick={handleSkip} data-testid="skip-button">
            Skip
          </Button>
          <Button onClick={handleNext} data-testid="next-button">
            {isLastQuestion ? "Complete Quiz" : "Next"}
            {!isLastQuestion && <ChevronRight className="h-4 w-4 ml-2" />}
          </Button>
        </div>
      </div>
    </div>
  );
}
