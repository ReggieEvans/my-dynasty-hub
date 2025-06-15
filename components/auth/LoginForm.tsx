"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { setAuth } from "@/store/slices/authSlice";
import { createClient } from "@/utils/supabase/client";

const loginSchema = z.object({
  email: z.string().email({ message: "Enter a valid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginValues) => {
    setLoading(true);
    const { email, password } = data;
    const supabase = createClient();

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      toast({
        title: "Login failed",
        description: signInError.message,
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    const { data: userData, error: userError } = await supabase.auth.getUser();
    const user = userData?.user;

    if (!user || userError) {
      toast({
        title: "User fetch error",
        description: userError?.message || "Could not load user",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    dispatch(
      setAuth({
        id: user.id,
        email: user.email ?? null,
        displayName: user.user_metadata?.displayName ?? null,
      }),
    );

    toast({
      title: "Welcome",
      description: `Logged in as ${user.user_metadata?.displayName ?? user.email}`,
    });

    router.push("/dashboard");
    setLoading(false);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Welcome Back</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input placeholder="Email" {...register("email")} />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}

          <Input
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}

          <Button
            type="submit"
            className="bg-gradient-to-br from-[#3ecf8e] to-[#006239] w-full text-white font-semibold px-6 py-3 rounded hover:brightness-90 transition"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          Don’t have an account?{" "}
          <Link href="/register" className="hover:underline text-[#3ecf8e]">
            Register
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
