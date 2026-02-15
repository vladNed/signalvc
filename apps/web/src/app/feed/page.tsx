import { AppLayout } from "@/shared/components";

export default function FeedPage() {
  return (
    <AppLayout activeTab="feed">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          Feed
        </h1>
        {/* Your feed content here */}
      </div>
    </AppLayout>
  );
}
