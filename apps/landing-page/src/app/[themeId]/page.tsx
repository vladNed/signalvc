import { notFound } from "next/navigation";
import Home from "../page";
import { Design1 } from "@/components/designs/design-1";
import { Design2 } from "@/components/designs/design-2";
import { Design3 } from "@/components/designs/design-3";
import { Design4 } from "@/components/designs/design-4";
import { Design5 } from "@/components/designs/design-5";

// Generate static params if we want to limit it or pre-render
export function generateStaticParams() {
  return [{ themeId: "1" }, { themeId: "2" }, { themeId: "3" }, { themeId: "4" }, { themeId: "5" }];
}

export default async function ThemePage({ params }: { params: Promise<{ themeId: string }> }) {
  const { themeId } = await params;

  switch (themeId) {
    case "1":
      return <Design1 />;
    case "2":
      return <Design2 />;
    case "3":
      return <Design3 />;
    case "4":
      return <Design4 />;
    case "5":
      return <Design5 />;
    default:
      return notFound();
  }
}
