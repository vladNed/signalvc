import { PortfolioPage as PortfolioFeaturePage } from "@/features/portfolio";
import { AppLayout } from "@/shared/components";

export default function PortfolioPage() {
  return (
    <AppLayout activeTab="portfolio">
      <PortfolioFeaturePage />
    </AppLayout>
  );
}
