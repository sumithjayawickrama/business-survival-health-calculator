import { Card, PageShell } from "@/components/ui";
import { privacyNote } from "@/lib/diagnostics";

export default function PrivacyPage() {
  return (
    <PageShell>
      <h1 className="font-serif text-4xl font-semibold">Privacy</h1>
      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <Card>
          <h2 className="font-serif text-2xl font-semibold">No account required</h2>
          <p className="mt-3 text-muted">Version 1 does not create user accounts and does not ask for email addresses, phone numbers, bank details or identity documents.</p>
        </Card>
        <Card>
          <h2 className="font-serif text-2xl font-semibold">Browser-only storage</h2>
          <p className="mt-3 text-muted">{privacyNote}</p>
        </Card>
      </div>
      <Card className="mt-6">
        <h2 className="font-serif text-2xl font-semibold">How to clear saved data</h2>
        <p className="mt-3 text-muted">
          Use the “Delete My Saved Assessment” button on the results page or clear this site’s local storage in your browser settings.
        </p>
      </Card>
    </PageShell>
  );
}
