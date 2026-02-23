import { ProfilePage as ProfileFeaturePage } from "@/features/profile";
import { AppLayout } from "@/shared/components";

export default function ProfilePage() {
  return (
    <AppLayout activeTab="profile">
      <ProfileFeaturePage />
    </AppLayout>
  );
}
