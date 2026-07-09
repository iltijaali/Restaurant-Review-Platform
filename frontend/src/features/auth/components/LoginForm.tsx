import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  loginSchema,
  type LoginSchema,
} from "../schemas/login.schema";
import { useLogin } from "../hooks/useLogin";
import { getProfile } from "../api/auth.api";

import { useAuth } from "@/hooks/useAuth";

export default function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginSchema) {
    try {
      const response = await loginMutation.mutateAsync(data);

      localStorage.setItem(
        "access_token",
        response.access_token
      );

      const user = await getProfile();

      login(response.access_token, user);

      toast.success("Login successful");

      navigate("/");
    } catch {
      toast.error("Invalid email or password");
    }
  }

  return (
    <Card className="border-slate-200 bg-white shadow-xl shadow-slate-200/60">
      <CardHeader className="border-b border-slate-100 bg-slate-50 px-6 py-5">
        <CardTitle className="text-2xl font-bold text-slate-950">
          Login
        </CardTitle>
        <p className="text-sm text-slate-500">
          Welcome back. Enter your details to continue.
        </p>
      </CardHeader>

      <CardContent className="px-6 py-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <div>
            <Label className="text-sm font-medium text-slate-700">
              Email
            </Label>

            <Input
              type="email"
              placeholder="Enter your email"
              className="mt-1 h-11 border-slate-200 bg-white focus-visible:border-amber-500"
              {...register("email")}
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Label className="text-sm font-medium text-slate-700">
              Password
            </Label>

            <Input
              type="password"
              placeholder="Enter your password"
              className="mt-1 h-11 border-slate-200 bg-white focus-visible:border-amber-500"
              {...register("password")}
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="h-11 w-full bg-slate-950 text-white hover:bg-slate-800"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending
              ? "Logging in..."
              : "Login"}
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-600">
          Need an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-amber-700 underline-offset-4 hover:underline"
          >
            Register
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
