import { AppLayout } from "@/shared/components";

export default function PortfolioPage() {
  return (
    <AppLayout activeTab="portfolio">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          Portfolio
        </h1>
        {/* Your portfolio content here */}
      </div>
    </AppLayout>
  );
}
