import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HelpCircle, Mail, Book, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { routes } from "@/lib/routes";

export default function HelpPage({ params }: { params: { userSlug: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" asChild>
          <Link href={routes.userDashboard(params.userSlug)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Help & Support</h1>
          <p className="text-muted-foreground">Get help with TaskFlow</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Book className="w-5 h-5 text-primary" />
              <CardTitle>Documentation</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Learn how to use TaskFlow effectively with our comprehensive
              guides.
            </p>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Quick Start Guides:</h4>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Creating your first project</li>
                <li>Managing tasks and workflows</li>
                <li>Organizing with status tags</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary" />
              <CardTitle>Contact Support</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Need help? We&apos;re here to assist you.
            </p>
            <div className="space-y-2">
              <p className="text-sm">
                <strong>Email:</strong> support@taskflow.example
              </p>
              <p className="text-sm text-muted-foreground">
                We typically respond within 24 hours.
              </p>
            </div>
            <Button className="w-full">
              <Mail className="w-4 h-4 mr-2" />
              Send us a message
            </Button>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-primary" />
              <CardTitle>Frequently Asked Questions</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-sm mb-1">
                  How do I create a project?
                </h4>
                <p className="text-sm text-muted-foreground">
                  Click the &quot;New Project&quot; button on your dashboard,
                  enter a name and optional description, then click Create.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-1">
                  How do I change a task&apos;s status?
                </h4>
                <p className="text-sm text-muted-foreground">
                  Click on a task to view its details, then use the status
                  dropdown to change between Open, In Progress, and Done.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-1">
                  Can I delete a project?
                </h4>
                <p className="text-sm text-muted-foreground">
                  Yes, open the project and click the Delete button. Note: This
                  will also delete all tasks within the project.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-1">
                  How do I edit a project or task?
                </h4>
                <p className="text-sm text-muted-foreground">
                  Navigate to the project or task detail page and click the
                  &quot;Edit&quot; button. Make your changes and click
                  &quot;Save Changes&quot;.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-1">Is my data secure?</h4>
                <p className="text-sm text-muted-foreground">
                  Yes! All data is stored securely in our database with
                  encryption. Your password is hashed and never stored in plain
                  text.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
