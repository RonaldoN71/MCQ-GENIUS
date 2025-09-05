import { Button } from './ui/button';
import { Trophy, Eye, RotateCcw, Plus } from 'lucide-react';

export function QuizResults({ 
  score, 
  totalQuestions, 
  timeTaken, // in seconds
  onViewAnswers, 
  onRetakeQuiz, 
  onNewQuiz 
}) {
  const percentage = Math.round((score / totalQuestions) * 100);
  const minutes = Math.floor(timeTaken / 60);
  const seconds = timeTaken % 60;
  const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div className="bg-card rounded-lg border border-border p-8 shadow-sm text-center" data-testid="quiz-results">
      <div className="mb-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Trophy className="h-10 w-10 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Quiz Completed!</h2>
        <p className="text-muted-foreground">Great job on completing the quiz</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-accent rounded-lg p-6">
          <div className="text-3xl font-bold text-foreground mb-2" data-testid="final-score">
            {score}/{totalQuestions}
          </div>
          <p className="text-muted-foreground">Final Score</p>
        </div>
        <div className="bg-accent rounded-lg p-6">
          <div className="text-3xl font-bold text-green-600 mb-2" data-testid="accuracy">
            {percentage}%
          </div>
          <p className="text-muted-foreground">Accuracy</p>
        </div>
        <div className="bg-accent rounded-lg p-6">
          <div className="text-3xl font-bold text-foreground mb-2" data-testid="time-taken">
            {timeString}
          </div>
          <p className="text-muted-foreground">Time Taken</p>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
        <Button
          variant="outline"
          onClick={onViewAnswers}
          data-testid="view-answers-button"
        >
          <Eye className="h-4 w-4 mr-2" />
          Review Answers
        </Button>
        <Button
          onClick={onRetakeQuiz}
          data-testid="retake-quiz-button"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Retake Quiz
        </Button>
        <Button
          variant="secondary"
          onClick={onNewQuiz}
          data-testid="new-quiz-button"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create New Quiz
        </Button>
      </div>
    </div>
  );
}
