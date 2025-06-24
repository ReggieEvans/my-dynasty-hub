"use client";

import { Instagram, Twitter } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const formData = new FormData();
    formData.append("email", email);

    try {
      const res = await fetch("https://formspree.io/f/xovwkkwe", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (res.ok) {
        setSubmitted(true);
        setEmail("");
      } else {
        const data = await res.json();
        setError(data?.error || "Something went wrong.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen text-foreground flex flex-col items-center justify-center p-6">
      <div className="flex flex-col items-center justify-center mb-6">
        <div className="flex justify-center py-4">
          <Image
            src="/logo-400-47.png"
            alt="MyDynastyHub logo"
            width={400}
            height={329}
            priority
          />
        </div>

        <p className="text-foreground text-lg max-w-xl text-center mb-4">
          MyDynastyHub is the ultimate companion tool for managing your EA
          Sports College Football Dynasty with powerful tools and immersive
          features — no more spreadsheets.
        </p>
        <p className="text-primary text-lg max-w-xl text-center">
          Join the waitlist to be the first to know when it&apos;s ready.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md flex flex-col items-center gap-3"
      >
        <Input
          type="email"
          name="email"
          required
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={submitting || submitted}
          className="py-6 bg-input"
        />
        {!submitted ? (
          <Button
            type="submit"
            disabled={submitting || !email}
            className="btn-primary text-lg"
          >
            {submitting ? "Submitting..." : "Join the waitlist"}
          </Button>
        ) : (
          <p className="text-primary font-medium text-center">
            🎉 You&apos;re on the list! Thanks for signing up.
          </p>
        )}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      </form>

      <div className="text-muted-foreground mt-6 text-sm flex flex-col items-center gap-4 text-center">
        <p>Building in public. Follow along on Instagram or X.</p>
        <div className="flex flex-col items-center gap-8">
          <div className="btn-primary rounded-full py-2 px-6">
            <a
              href="https://x.com/dynastyhubapp"
              target="_blank"
              className="text-foreground flex items-center gap-2"
            >
              <Twitter /> @dynastyhubapp
            </a>
          </div>
          <div className="btn-primary rounded-full py-2 px-6">
            <a
              href="https://x.com/reggieevansdev"
              target="_blank"
              className="text-foreground flex items-center gap-2"
            >
              <Twitter /> @reggieevansdev
            </a>
          </div>
          <div className="btn-primary rounded-full py-2 px-6">
            <a
              href="https://www.instagram.com/reggieevans.dev"
              target="_blank"
              className="text-foreground flex items-center gap-2"
            >
              <Instagram /> @reggieevans.dev
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
