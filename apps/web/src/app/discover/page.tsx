import { DiscoveryPage } from "@/features/discovery";
import { AppLayout } from "@/shared/components";

export default function DiscoverPage() {
  return (
    <AppLayout activeTab="feed" blurPortfolio={true} blurProfile={true}>
      <DiscoveryPage />
    </AppLayout>
  );
}
