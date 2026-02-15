"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function VerifyPage(){   
  const searchParams = useSearchParams();

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center shadow rounded-lg p-8">
        <h1 className="text-2xl font-semibold mb-4">Check your email</h1>
        <p className="mb-4">We send <strong>{searchParams.get("email")}</strong> an email</p>
        <p className="mb-6">Please click the link in the email to complete your sign-in process.</p>
        <div className="flex justify-center">
          <Link href="/auth" className="px-4 py-2 bg-primary rounded">
            Back to login
          </Link>
        </div>
      </div>
    </main>
  );
}
