import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { CheckCircle, XCircle, ArrowLeft, Eye } from "lucide-react";

export function AnswerReview({ 
  questions, 
  userAnswers, 
  onBack 
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = questions[currentQuestionIndex];
  const userAnswer = userAnswers[currentQuestion.id];
  const isCorrect = userAnswer === currentQuestion.correctAnswer;

  const getOptionLetter = (index) => String.fromCharCode(65 + index); // A, B, C, D

  const getCorrectAnswerLetter = (correctAnswer) => {
    const index = currentQuestion.options.findIndex(option => 
      option === questions[currentQuestionIndex].options[getOptionLetter(0) === correctAnswer ? 0 : 
      getOptionLetter(1) === correctAnswer ? 1 : 
      getOptionLetter(2) === correctAnswer ? 2 : 3]
    );
    return getOptionLetter(index);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-8 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            onClick={onBack}
            data-testid="back-to-results-button"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Results
          </Button>
          <div className="flex items-center space-x-2">
            <Eye className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Answer Review</h2>
          </div>
        </div>
        <div className="text-right">
          <div className="bg-accent rounded-lg px-4 py-2">
            <p className="text-sm text-muted-foreground">Question</p>
            <p className="text-lg font-bold text-foreground">
              {currentQuestionIndex + 1} / {questions.length}
            </p>
          </div>
        </div>
      </div>

      {/* Question Navigation */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {questions.map((_, index) => (
            <Button
              key={index}
              variant={index === currentQuestionIndex ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentQuestionIndex(index)}
              className="relative"
            >
              {index + 1}
              {userAnswers[questions[index].id] === questions[index].correctAnswer ? (
                <CheckCircle className="h-3 w-3 ml-1 text-green-600" />
              ) : (
                <XCircle className="h-3 w-3 ml-1 text-red-600" />
              )}
            </Button>
          ))}
        </div>
      </div>

      {/* Current Question */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                Question {currentQuestionIndex + 1}
              </span>
              <Badge 
                variant={isCorrect ? "default" : "destructive"}
                className="ml-2"
              >
                {isCorrect ? "Correct" : "Incorrect"}
              </Badge>
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-foreground leading-relaxed mb-6">
              {currentQuestion.text}
            </h3>

            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const optionLetter = getOptionLetter(index);
                const isUserAnswer = userAnswer === optionLetter;
                const isCorrectAnswer = currentQuestion.correctAnswer === optionLetter;
                const isSelected = isUserAnswer || isCorrectAnswer;

                let optionStyle = "border-border hover:bg-accent";
                let textStyle = "text-foreground";
                let icon = null;

                if (isCorrectAnswer) {
                  optionStyle = "border-green-500 bg-green-50";
                  textStyle = "text-green-900 font-semibold";
                  icon = <CheckCircle className="h-4 w-4 text-green-600" />;
                } else if (isUserAnswer && !isCorrectAnswer) {
                  optionStyle = "border-red-500 bg-red-50";
                  textStyle = "text-red-900 font-semibold";
                  icon = <XCircle className="h-4 w-4 text-red-600" />;
                }

                return (
                  <div
                    key={index}
                    className={`
                      flex items-center p-4 border rounded-lg transition-all
                      ${optionStyle}
                    `}
                  >
                    <div className="flex items-center w-full">
                      <span
                        className={`
                          w-8 h-8 border-2 rounded-full flex items-center justify-center text-sm font-medium mr-4
                          ${
                            isCorrectAnswer
                              ? "border-green-500 bg-green-500 text-white"
                              : isUserAnswer && !isCorrectAnswer
                              ? "border-red-500 bg-red-500 text-white"
                              : "border-border"
                          }
                        `}
                      >
                        {optionLetter}
                      </span>
                      <span className={`flex-1 ${textStyle}`}>
                        {option}
                      </span>
                      {icon && (
                        <div className="ml-2">
                          {icon}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Explanation */}
          {currentQuestion.explanation && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Explanation:</h4>
              <p className="text-blue-800">{currentQuestion.explanation}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-6 border-t border-border">
        <Button
          variant="outline"
          onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </Button>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Your Answer: <span className="font-semibold">{userAnswer || "Not answered"}</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Correct Answer: <span className="font-semibold text-green-600">{currentQuestion.correctAnswer}</span>
          </p>
        </div>

        <Button
          onClick={() => setCurrentQuestionIndex(Math.min(questions.length - 1, currentQuestionIndex + 1))}
          disabled={currentQuestionIndex === questions.length - 1}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
