import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthCard from "../../components/ui/AuthCard";
import Alert from "../../components/ui/Alert";
import Input from "../../components/ui/Input";
import PasswordInput from "../../components/ui/PasswordInput";
import Button from "../../components/ui/Button";
import { registerSchema } from "../../schemas/authSchemas";
import * as authService from "../../services/authService";
import { getErrorMessage } from "../../utils/getErrorMessage";

export default function Register() {
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(registerSchema) });

  // Runs only when the form passes all schema rules
const onSubmit = async ({ firstName, lastName, email, password }) => {
  setServerError("");
  try {
    // The backend has one "name" field, so we join the two form fields
    await authService.register({
      name: `${firstName} ${lastName}`.trim(),
      email,
      password,
    });
    navigate("/login");
  } catch (error) {
    setServerError(getErrorMessage(error));
  }
};

  return (
    <AuthCard title="Register" subtitle="Create a new account">
      <Alert>{serverError}</Alert>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <Input
          label="First Name"
          placeholder="Enter your first name"
          type="text"
          autoComplete="given-name"
          error={errors.firstName?.message}
          {...register("firstName")}
        />
        <Input
          label="Last Name"
          placeholder="Enter your last name"
          type="text"
          autoComplete="family-name"
          error={errors.lastName?.message}
          {...register("lastName")}
        />
        <Input
          label="Email"
          placeholder="Enter your email"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          autoComplete="new-password"
          error={errors.password?.message}
          {...register("password")}
        />
        <PasswordInput
          label="Confirm Password"
          placeholder="Confirm your password"
          autoComplete="new-password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />
        <Button type="submit" fullWidth loading={isSubmitting}>
          Register
        </Button>
      </form>
      <hr className="my-6 border-border" />
      <p className="text-center text-sm text-muted">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-primary hover:text-primary-hover">
          Log in
        </Link>
      </p>
    </AuthCard>
  );
}