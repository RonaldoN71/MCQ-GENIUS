import { useQuery } from '@tanstack/react-query';
import { useAuthSync } from '../lib/auth';
import { Navigation } from '../components/navigation';
import { UserStats } from '../components/user-stats';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Link } from 'wouter';
import { Plus, FileText, Clock } from 'lucide-react';

export default function Dashboard() {
  const { user, isSignedIn } = useAuthSync();

  const { data: userStats } = useQuery({
    queryKey: ['/api/users', user?.id, 'stats'],
    enabled: !!user?.id,
  });

  const { data: recentQuizzes = [] } = useQuery({
    queryKey: ['/api/users', user?.id, 'quizzes'],
    enabled: !!user?.id,
  });

  if (!isSignedIn || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {user.firstName || 'User'}!
          </h1>
          <p className="text-muted-foreground">
            Create and take quizzes to test your knowledge
          </p>
        </div>

        {userStats && (
          <UserStats
            totalQuizzes={userStats.totalQuizzes}
            averageScore={userStats.averageScore}
            totalQuestions={userStats.totalQuestions}
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Recent Quizzes
                  <Link href="/upload">
                    <Button data-testid="create-quiz-button">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Quiz
                    </Button>
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recentQuizzes.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No quizzes yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Get started by creating your first quiz
                    </p>
                    <Link href="/upload">
                      <Button data-testid="get-started-button">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentQuizzes.slice(0, 5).map((quiz) => (
                      <div
                        key={quiz.id}
                        className="flex items-center justify-between p-4 bg-accent rounded-lg"
                        data-testid={`quiz-${quiz.id}`}
                      >
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium text-foreground">{quiz.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {quiz.questionCount} questions • {quiz.difficulty}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {new Date(quiz.createdAt).toLocaleDateString()}
                          </span>
                          <Link href={`/quiz/${quiz.id}`}>
                            <Button variant="outline" size="sm" data-testid={`take-quiz-${quiz.id}`}>
                              Take Quiz
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link href="/upload" className="block">
                  <Button className="w-full justify-start" variant="outline" data-testid="upload-file-button">
                    <Plus className="h-4 w-4 mr-2" />
                    Upload New File
                  </Button>
                </Link>
                
                <div className="pt-4 border-t border-border">
                  <h4 className="font-medium text-foreground mb-2">Tips</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Upload clear, well-structured documents</li>
                    <li>• Try different difficulty levels</li>
                    <li>• Review explanations after quizzes</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
