// import Image from "next/image";

// export default function LandingPage() {
//   return (
//     <main className="min-h-screen text-foreground flex flex-col items-center justify-center p-6">
//       <div className="flex justify-center py-4">
//         <Image
//           src="/logo-389-47.png"
//           alt="Next.js Logo"
//           width={400}
//           height={47}
//           priority
//         />
//       </div>
//       <p className="text-xl md:text-xl mb-6 text-center max-w-md">
//         The ultimate tool to manage and track your EA Sports College Football
//         Dynasty.
//       </p>

//       <form
//         action="https://formspree.io/f/YOUR-FORM-ID"
//         method="POST"
//         className="w-full max-w-md flex flex-col items-center gap-3"
//       >
//         <input
//           type="email"
//           name="email"
//           placeholder="Enter your email"
//           className="w-full p-3 rounded border shadow-sm bg-input opacity-70"
//           required
//         />
//         <button
//           type="submit"
//           className="bg-gradient-to-br from-primary to-primary-gradient w-full text-foreground font-semibold px-6 py-3 rounded hover:brightness-90 transition"
//         >
//           Notify Me
//         </button>
//       </form>

//       <p className="text-muted-foreground mt-6 text-sm">
//         Beta Launching Summer 2025. Follow us on Twitter @MyDynastyHub
//       </p>
//     </main>
//   );
// }

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

        <p className="text-foreground text-center text-xl max-w-md">
          The ultimate tool to manage and track your EA Sports College Football
          Dynasty.
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
            {submitting ? "Submitting..." : "Notify Me"}
          </Button>
        ) : (
          <p className="text-primary font-medium text-center">
            🎉 You&apos;re on the list! Thanks for signing up.
          </p>
        )}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      </form>

      <div className="text-muted-foreground mt-6 text-sm flex flex-col items-center gap-4 text-center">
        <p>Building in public. Follow along on Instagram or Twitter.</p>
        <div className="flex items-center gap-8">
          <div>
            <a
              href="https://x.com/reggieevansdev"
              target="_blank"
              className="text-primary"
            >
              <Twitter />
            </a>
          </div>
          <div>
            <a
              href="https://www.instagram.com/reggieevans.dev"
              target="_blank"
              className="text-primary"
            >
              <Instagram />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
