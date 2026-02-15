import { FeedPage } from "@/features/feed";
import { AppLayout } from "@/shared/components";

export default function DashboardPage() {
  return (
    <AppLayout activeTab="feed">
      <FeedPage />
    </AppLayout>
  );
}
