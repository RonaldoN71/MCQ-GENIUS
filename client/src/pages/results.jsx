import { useQuery } from '@tanstack/react-query';
import { useAuthSync } from '../lib/auth';
import { Navigation } from '../components/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Link } from 'wouter';
import { Trophy, Clock, FileText } from 'lucide-react';

export default function Results() {
  const { user } = useAuthSync();

  const { data: attempts = [], isLoading } = useQuery({
    queryKey: ['/api/users', user?.id, 'quiz-attempts'],
    enabled: !!user?.id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">Loading results...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Quiz Results</h1>
          <p className="text-muted-foreground">Review your quiz performance and history</p>
        </div>

        {attempts.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No quiz results yet</h3>
              <p className="text-muted-foreground mb-4">
                Take your first quiz to see results here
              </p>
              <Link href="/upload">
                <Button data-testid="create-first-quiz">
                  Create Your First Quiz
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {attempts.map((attempt) => {
              const percentage = Math.round((attempt.score / attempt.totalQuestions) * 100);
              const minutes = Math.floor(attempt.timeTaken / 60);
              const seconds = attempt.timeTaken % 60;
              const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;
              
              return (
                <Card key={attempt.id} data-testid={`result-${attempt.id}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-primary" />
                        <span>Quiz Attempt</span>
                        <Badge variant={
                          percentage >= 80 ? 'default' :
                          percentage >= 60 ? 'secondary' :
                          'destructive'
                        }>
                          {percentage}%
                        </Badge>
                      </CardTitle>
                      <div className="text-sm text-muted-foreground">
                        {attempt.completedAt ? new Date(attempt.completedAt).toLocaleDateString() : ''}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-foreground mb-1">
                          {attempt.score}/{attempt.totalQuestions}
                        </div>
                        <p className="text-sm text-muted-foreground">Score</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary mb-1">
                          {percentage}%
                        </div>
                        <p className="text-sm text-muted-foreground">Accuracy</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-foreground mb-1 flex items-center justify-center">
                          <Clock className="h-5 w-5 mr-2" />
                          {timeString}
                        </div>
                        <p className="text-sm text-muted-foreground">Time</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-foreground mb-1">
                          {attempt.totalQuestions}
                        </div>
                        <p className="text-sm text-muted-foreground">Questions</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
