import { useState } from 'react'
import { useUserQuery } from './query/user';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import './index.css'

function App() {
  const [userId, setUserId] = useState('');
  const [inputId, setInputId] = useState('');

  const { data: user, error, isLoading } = useUserQuery(userId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUserId(inputId);
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 p-4 flex items-center justify-center antialiased">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">User Lookup</CardTitle>
          <CardDescription>Enter a user ID to fetch their details.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                value={inputId}
                onChange={(e) => setInputId(e.target.value)}
                placeholder="Enter user ID"
                className="h-10"
              />
            </div>
            <Button type="submit" className="w-full">
              {isLoading ? "Loading..." : "Look up User"}
            </Button>
          </form>

          {error && (
            <div className="mt-4 p-4 rounded-lg bg-red-50 text-red-500 text-sm">
              {error instanceof Error ? error.message : 'An error occurred'}
            </div>
          )}

          {user && (
            <div className="mt-6 space-y-1">
              <h3 className="font-medium leading-none">User Details</h3>
              <div className="text-sm text-muted-foreground">
                Found user information for ID: {user.user?.id}
              </div>
              <div className="mt-4 space-y-3">
                <div className="flex items-center">
                  <div className="w-16 text-sm font-medium">Name</div>
                  <div className="text-sm text-muted-foreground">{user.user?.name}</div>
                </div>
                <div className="flex items-center">
                  <div className="w-16 text-sm font-medium">Email</div>
                  <div className="text-sm text-muted-foreground">{user.user?.email}</div>
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
