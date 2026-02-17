import { Suspense } from "react";
import { VerifyPage } from "@/features/auth";

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyPage />
    </Suspense>
  );
}
