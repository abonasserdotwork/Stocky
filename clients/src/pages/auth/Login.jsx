import { useState } from "react";
import Alert from "../../components/Alert";
import AuthCard from "../../components/AuthCard";
import Button from "../../components/Button";
import Input from "../../components/Input";
import PasswordInput from "../../components/PasswordInput";

export default function Login() {
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  function handleSubmit(event) {
    event.preventDefault();
    const emailValue = user.email.trim();
    const passwordValue = user.password.trim();
    const nextErrors = {};

    if (!emailValue) {
      nextErrors.email = "Email is required!";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      nextErrors.email = "Invalid email address! Please enter a valid email.";
    }

    if (!passwordValue) {
      nextErrors.password = "Password is required!";
    } else if (passwordValue.length < 6) {
      nextErrors.password = "Password must be at least 6 characters long.";
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(passwordValue)) {
      nextErrors.password = "Password must contain at least one uppercase letter, one lowercase letter, and one digit.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    
    // Check the email and password against the database, then log the user in.
  }

  return (
    <AuthCard>
      <h1 className="text-2xl font-bold text-center mb-4">Log in</h1>
      <p className="text-muted text-center">
        Welcome back. Enter your details to continue.
      </p>
      <form method="POST" className="mt-6" onSubmit={handleSubmit} noValidate>
        <Input
          name="Email"
          placeholder="Enter your email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value } )}
          type="text"
        />
        {errors.email && <Alert message={errors.email} />}
        <PasswordInput
          name="Password"
          placeholder="Enter your password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value } )}
        />
        {errors.password && <Alert message={errors.password} />}
        <Button
          name="Log in"
          type="submit"
          variant="primary"
          fullWidth
        />
      </form>
      <p className="mt-4 pt-5 border-t border-border-color text-center text-gray-600">
        New to Stockly?{" "}
        <a
          href="/register"
          className="text-primary font-semibold hover:underline"
        >
          Create an account
        </a>
      </p>
    </AuthCard>
  );
}
