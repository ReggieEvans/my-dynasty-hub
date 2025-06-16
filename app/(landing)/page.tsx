import Image from "next/image";

export default function LandingPage() {
  return (
    <main className="min-h-screen text-foreground flex flex-col items-center justify-center p-6">
      <div className="flex justify-center py-4">
        <Image
          src="/logo-400-47.png"
          alt="Next.js Logo"
          width={400}
          height={47}
          priority
        />
      </div>
      <p className="text-xl md:text-xl mb-6 text-center max-w-md">
        The ultimate tool to manage and track your EA Sports College Football
        Dynasty.
      </p>

      <form
        action="https://formspree.io/f/YOUR-FORM-ID"
        method="POST"
        className="w-full max-w-md flex flex-col items-center gap-3"
      >
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className="w-full p-3 rounded border shadow-sm bg-input opacity-70"
          required
        />
        <button
          type="submit"
          className="bg-gradient-to-br from-primary to-primary-gradient w-full text-foreground font-semibold px-6 py-3 rounded hover:brightness-90 transition"
        >
          Notify Me
        </button>
      </form>

      <p className="text-muted-foreground mt-6 text-sm">
        Beta Launching Summer 2025. Follow us on Twitter @MyDynastyHub
      </p>
    </main>
  );
}
