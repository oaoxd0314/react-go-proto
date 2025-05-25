import { useState } from 'react'
import { useUserQuery } from './query/user';
import './index.css'
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function App() {
  const [userId, setUserId] = useState('');
  const [inputId, setInputId] = useState('');

  const { data: user, error, isLoading } = useUserQuery(userId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUserId(inputId);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>User Lookup</CardTitle>
          <CardDescription>Enter a user ID to fetch their details.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={inputId}
              onChange={(e) => setInputId(e.target.value)}
              placeholder="Enter user ID"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <Button type="submit" className="w-full">
              {isLoading ? "Loading..." : "Look up User"}
            </Button>
          </form>
          
          {error && (
            <div className="mt-4 p-4 rounded-lg bg-destructive/15 text-destructive text-sm">
              {error instanceof Error ? error.message : 'An error occurred'}
            </div>
          )}

          {user && (
            <div className="mt-6 space-y-3">
              <div>
                <h3 className="font-medium">User Details</h3>
                <p className="text-sm text-muted-foreground">
                  Found user information for ID: {user.user?.id}
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Name</span>
                  <span className="text-sm text-muted-foreground">{user.user?.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Email</span>
                  <span className="text-sm text-muted-foreground">{user.user?.email}</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default App
