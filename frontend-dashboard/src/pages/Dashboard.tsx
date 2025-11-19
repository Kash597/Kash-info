import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useHealth } from '@/hooks/useHealth'

export function Dashboard() {
  const { data: health, isLoading, error } = useHealth()

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Welcome to KASH_INFO</CardTitle>
            <CardDescription>Your elite membership dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Access your AI-powered tools, resources, and member network.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API Status</CardTitle>
            <CardDescription>Backend connection</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <p className="text-sm text-muted-foreground">Checking...</p>
            )}
            {error && (
              <div className="space-y-1">
                <p className="text-sm font-medium text-destructive">Disconnected</p>
                <p className="text-xs text-muted-foreground">
                  Unable to connect to backend API
                </p>
              </div>
            )}
            {health && (
              <div className="space-y-1">
                <p className="text-sm font-medium text-green-600">Connected</p>
                <p className="text-xs text-muted-foreground">
                  Status: {health.status}
                </p>
                {health.version && (
                  <p className="text-xs text-muted-foreground">
                    Version: {health.version}
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>OmniBot</CardTitle>
            <CardDescription>AI Assistant</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Chat with your AI assistant that knows all members and resources.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resources</CardTitle>
            <CardDescription>Curated Library</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Access courses, tools, and templates from industry experts.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Member Network</CardTitle>
            <CardDescription>Connect & Collaborate</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Discover and connect with elite professionals in your industry.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>What's next?</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Start exploring your dashboard and unlock powerful AI tools.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
