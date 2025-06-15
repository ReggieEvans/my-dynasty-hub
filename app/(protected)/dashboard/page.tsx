import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function DashboardPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <Card className="max-w-xl w-full text-center bg-card border border-border">
        <CardHeader>
          <CardTitle className="text-2xl text-foreground font-black uppercase">
            Welcome to MyDynastyHub!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-foreground">
            You&apos;re now logged in. This is your home page.
          </p>
          <p className="text-sm text-muted">
            You can start customizing your dashboard, connect APIs, or build new
            features.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
