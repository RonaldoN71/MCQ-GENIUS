export function UserStats({ totalQuizzes, averageScore, totalQuestions }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" data-testid="user-stats">
      <div className="bg-card rounded-lg border border-border p-6 text-center">
        <div className="text-2xl font-bold text-foreground mb-2" data-testid="total-quizzes">
          {totalQuizzes}
        </div>
        <p className="text-muted-foreground">Quizzes Completed</p>
      </div>
      <div className="bg-card rounded-lg border border-border p-6 text-center">
        <div className="text-2xl font-bold text-green-600 mb-2" data-testid="average-score">
          {averageScore}%
        </div>
        <p className="text-muted-foreground">Average Score</p>
      </div>
      <div className="bg-card rounded-lg border border-border p-6 text-center">
        <div className="text-2xl font-bold text-foreground mb-2" data-testid="total-questions">
          {totalQuestions}
        </div>
        <p className="text-muted-foreground">Questions Answered</p>
      </div>
    </div>
  );
}
