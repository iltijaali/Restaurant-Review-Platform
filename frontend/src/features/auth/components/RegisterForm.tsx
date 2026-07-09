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
  registerSchema,
  type RegisterSchema,
} from "../schemas/register.schema";
import { useRegister } from "../hooks/useRegister";

export default function RegisterForm() {
  const navigate = useNavigate();
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "reviewer",
    },
  });

  async function onSubmit(values: RegisterSchema) {
    try {
      await registerMutation.mutateAsync(values);
      toast.success("Account created successfully");
      navigate("/login");
    } catch {
      toast.error("Could not create account");
    }
  }

  return (
    <Card className="border-slate-200 bg-white shadow-xl shadow-slate-200/60">
      <CardHeader className="border-b border-slate-100 bg-slate-50 px-6 py-5">
        <CardTitle className="text-2xl font-bold text-slate-950">
          Register
        </CardTitle>
        <p className="text-sm text-slate-500">
          Create your account and choose how you will use
          the platform.
        </p>
      </CardHeader>

      <CardContent className="px-6 py-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <div>
            <Label
              htmlFor="name"
              className="text-sm font-medium text-slate-700"
            >
              Name
            </Label>
            <Input
              id="name"
              placeholder="Enter your name"
              className="mt-1 h-11 border-slate-200 bg-white focus-visible:border-amber-500"
              {...register("name")}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <Label
              htmlFor="email"
              className="text-sm font-medium text-slate-700"
            >
              Email
            </Label>
            <Input
              id="email"
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
            <Label
              htmlFor="password"
              className="text-sm font-medium text-slate-700"
            >
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              className="mt-1 h-11 border-slate-200 bg-white focus-visible:border-amber-500"
              {...register("password")}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <Label
              htmlFor="role"
              className="text-sm font-medium text-slate-700"
            >
              Role
            </Label>
            <select
              id="role"
              className="mt-1 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:border-amber-500"
              {...register("role")}
            >
              <option value="reviewer">Reviewer</option>
              <option value="owner">Restaurant Owner</option>
            </select>
            {errors.role && (
              <p className="mt-1 text-sm text-red-500">
                {errors.role.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="h-11 w-full bg-slate-950 text-white hover:bg-slate-800"
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending
              ? "Creating account..."
              : "Create Account"}
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-amber-700 underline-offset-4 hover:underline"
          >
            Login
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
