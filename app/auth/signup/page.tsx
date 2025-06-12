"use client";

import {
  Box,
  Divider,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import {
  FacebookIcon,
  GoogleIcon,
  LinkedInIcon,
} from "../components/customIcons";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

import { z } from "zod";
import { signIn } from "next-auth/react";

// Validation schema for sign-up form using Zod
const signUpSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain an uppercase letter")
    .regex(/[a-z]/, "Must contain a lowercase letter")
    .regex(/\d/, "Must contain a number")
    .regex(/[\W_]/, "Must contain a special character"),
});

// Type for form data based on the validation schema
type FormData = z.infer<typeof signUpSchema>;

// SignUp component
export default function SignUp() {
  // State Management
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );

  // Handlers
  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };
  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      const result = await signIn("google", { redirect: false });
      if (result?.error) {
        throw new Error(result.error);
      }
      toast.success("Google sign-in successful!");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        toast.error(
          error.message || "An error occurred during Google sign-in."
        );
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    const result = signUpSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormData, string>> = {};
      result.error.errors.forEach((error) => {
        if (error.path[0]) {
          const fieldName = error.path[0] as keyof FormData;
          fieldErrors[fieldName] = error.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        if (data.error.email) {
          setErrors((prev) => ({
            ...prev,
            email: data.error.email,
          }));
        }
        throw new Error(data.message || "Signup failed. Please try again.");
      }

      const data = await response.json();
      toast.success(data.message || "Signup successful!");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        toast.error(error.message || "An error occurred during signup.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-white flex sm:items-center justify-center p-4">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="container max-w-6xl mx-auto">
        <div className="rounded-xl shadow-3xl max-w-md mx-auto p-4 md:p-12 flex flex-col gap-6">
          <div className="logo gap-2 w-fit">
            <Link
              href="/"
              className="logo-link flex items-center jusify-center gap-2 text-2xl text-black font-bold"
            >
              <Image src="/logo.png" alt="Logo" width={32} height={32} />
              AptResume
            </Link>
          </div>

          <Typography
            variant="h4"
            component="h4"
            sx={{ fontWeight: "bold", color: "#1e293b" }}
          >
            Signup
          </Typography>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <TextField
              name="name"
              label="Full Name"
              variant="outlined"
              fullWidth
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#94a3b8",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#2563eb",
                },
              }}
            />

            <TextField
              name="email"
              type="email"
              label="Email"
              variant="outlined"
              fullWidth
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#94a3b8",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#2563eb",
                },
              }}
            />

            <TextField
              name="password"
              type={showPassword ? "text" : "password"}
              label="Password"
              variant="outlined"
              fullWidth
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#94a3b8",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#2563eb",
                },
              }}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePassword}
                        edge="end"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Button
              type="submit"
              fullWidth
              sx={{
                padding: "12px",
                borderRadius: "8px",
                background: "linear-gradient(135deg, #334155, #0f172a)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(0,0,0,0.2)",
                color: "white",
                fontWeight: 600,
                textTransform: "none",
                "&:hover": {
                  background: "linear-gradient(135deg, #1e293b, #0f172a)",
                },
                "&:disabled": {
                  backgroundColor: "#94a3b8",
                  color: "#f8fafc",
                },
              }}
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </Button>
          </form>

          <Typography
            variant="body2"
            className="text-center text-sm text-slate-600"
          >
            Already have an account?
            <a
              href="/auth/signin"
              className="text-blue-600 font-semibold hover:underline ml-1"
            >
              Sign in
            </a>
          </Typography>

          <Box className="flex items-center gap-2">
            <Divider sx={{ flex: 1, bgcolor: "grey.400" }} />
            <Typography sx={{ fontSize: "0.875rem", color: "grey.600" }}>
              OR
            </Typography>
            <Divider sx={{ flex: 1, bgcolor: "grey.400" }} />
          </Box>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon />}
            sx={{
              padding: "12px",
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: 600,
              color: "black",
              border: "2px solid black",
            }}
            onClick={() => {
              signIn("google");
            }}
            disabled={googleLoading}
          >
            {googleLoading
              ? "Signing in with Google..."
              : "Sign in with Google"}
          </Button>
        </div>
      </div>
    </section>
  );
}
