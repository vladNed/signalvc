"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

function VerifyPage() {
  const searchParams = useSearchParams();

  return (
    <div className="max-w-md w-full text-center shadow rounded-lg p-8">
      <h1 className="text-2xl font-semibold mb-4 text-foreground">Check your email</h1>
      <p className="mb-4 text-body">
        We send <strong className="text-foreground">{searchParams.get("email")}</strong> an email
      </p>
      <p className="mb-6 text-body">
        Please click the link in the email to complete your sign-in process.
      </p>
      <div className="flex justify-center">
        <Link href="/auth" className="px-4 py-2 bg-primary rounded">
          Back to login
        </Link>
      </div>
    </div>
  );
}

export { VerifyPage };
