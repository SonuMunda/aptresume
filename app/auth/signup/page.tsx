"use client";

import {
  Box,
  Divider,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  CircularProgress,
  Alert,
} from "@mui/material";
import Image from "next/image";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { signUpSchema, SignUpSchemaType } from "@/lib/validations/signup";
import { IResponseData } from "@/app/types/responseDataTypes";
import { motion } from "framer-motion";
import GoogleSigninButton from "../components/GoogleSigninButton";
import { indigo } from "@mui/material/colors";

// Define type from Zod schema
type FormData = SignUpSchemaType;

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );
  const [responseData, setResponseData] = useState<
    IResponseData | null | undefined
  >(null);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data?.errors) {
          setErrors((prev) => ({
            ...prev,
            ...data.errors,
          }));
        }
        setResponseData(data);
        setFormData({ name: "", email: "", password: "" });
      }

      setResponseData(data);
    } catch (error: unknown) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <Box
        component={"section"}
        className="signup h-screen bg-indigo-200 flex items-center justify-center"
      >
        <Toaster position="top-center" />

        <Box
          component={"div"}
          className="container h-screen md:h-[85vh] max-w-6xl lg:bg-white lg:shadow lg:shadow-lg flex items-center justify-center overflow-hidden"
        >
          <Box
            component={"div"}
            className="signup h-full md:h-max min-w-full bg-white md:min-w-[80%] lg:min-w-sm p-6 my-auto mx-auto"
          >
            {/* Logo */}
            <Box component={"div"} className="logo mb-6">
              <Link href="/">
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 1,
                    textDecoration: "none",
                  }}
                >
                  <Image src="/logo.png" alt="Logo" width={32} height={32} />
                </Box>
              </Link>
            </Box>
            {/* Heading */}
            <Typography
              variant="h5"
              component="h1"
              sx={{
                fontWeight: 700,
                mb: 0.5,
              }}
            >
              Create your account
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Get started with your new account
            </Typography>
            {/* Error/Success Alert */}
            {responseData && (
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                sx={{ mb: 3 }}
              >
                <Alert
                  severity={responseData.success ? "success" : "error"}
                  variant="outlined"
                >
                  {responseData.message}
                </Alert>
              </Box>
            )}
            {/* Form */}
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
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
                    borderRadius: 2,
                    "& fieldset": {
                      borderColor: "divider",
                    },
                  },
                }}
              />

              <TextField
                name="email"
                type="email"
                label="Email Address"
                variant="outlined"
                fullWidth
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "& fieldset": {
                      borderColor: "divider",
                    },
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
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "& fieldset": {
                      borderColor: "divider",
                    },
                  },
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                size="large"
                sx={{
                  py: 1.5,
                  backgroundColor: indigo[600],
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "1rem",
                  boxShadow: "none",
                  mt: 1,
                  "&:hover": {
                    boxShadow: "none",
                  },
                }}
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: "inherit" }} />
                ) : (
                  "Create Account"
                )}
              </Button>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textAlign: "center", mt: 1 }}
              >
                Already have an account?{" "}
                <Link href="/auth/signin">
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{
                      color: indigo[900],
                      textDecoration: "none",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                      cursor: "pointer",
                    }}
                  >
                    Sign in
                  </Typography>
                </Link>
              </Typography>

              <Divider sx={{ my: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  OR
                </Typography>
              </Divider>

              <Box component={"div"}>
                <GoogleSigninButton setFormResponse={setResponseData} />
              </Box>
            </Box>
          </Box>
          <Box
            component={"div"}
            className="hidden lg:block min-h-screen w-1/2 relative signup-background overflow-hidden"
          ></Box>
        </Box>
      </Box>
    </main>
  );
}
