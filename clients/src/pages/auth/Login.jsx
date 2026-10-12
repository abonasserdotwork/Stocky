import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthCard from "../../components/ui/AuthCard";
import Alert from "../../components/ui/Alert";
import Input from "../../components/ui/Input";
import PasswordInput from "../../components/ui/PasswordInput";
import Button from "../../components/ui/Button";
import { loginSchema } from "../../schemas/authSchemas";

export default function Login() {
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) });

  // Runs only when the form passes all schema rules
  const onSubmit = (data) => {
    console.log("Login data:", data);
    setServerError("Login is not connected to the server yet.");
  };

  return (
    <AuthCard title="Log in" subtitle="Welcome back to Stockly!">
      <Alert>{serverError}</Alert>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          autoComplete="current-password"
          error={errors.password?.message}
          {...register("password")}
        />
        <Button type="submit" fullWidth loading={isSubmitting}>
          Log in
        </Button>
      </form>

      <hr className="my-6 border-border" />

      <p className="text-center text-sm text-muted">
        New to Stockly?{" "}
        <Link
          to="/register"
          className="font-semibold text-primary hover:text-primary-hover"
        >
          Create an account
        </Link>
      </p>
    </AuthCard>
  );
}