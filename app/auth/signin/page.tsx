"use client";

import {
  Box,
  Divider,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  CircularProgress,
  Alert,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import signInSchema from "@/lib/validations/signin";
import GoogleSigninButton from "../components/GoogleSigninButton";

interface SignInForm {
  email: string;
  password: string;
}

interface FieldErrors {
  email?: string;
  password?: string;
}

export default function SignIn() {
  const router = useRouter();

  const [form, setForm] = useState<SignInForm>({
    email: "",
    password: "",
  });

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  type FormResponse = {
    message: string;
    success: boolean;
  };

  const [formResponse, setFormResponse] = useState<
    FormResponse | null | undefined
  >(null);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, type, value } = e.target;

    if (type !== "checkbox") {
      setForm((prev) => ({
        ...prev,
        [id]: value,
      }));
    }

    setFieldErrors((prev) => ({
      ...prev,
      [id]: undefined,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFieldErrors({});
    setLoading(true);

    const result = signInSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const err of result.error.errors) {
        if (err.path.length > 0) {
          fieldErrors[err.path[0]] = err.message;
        }
      }
      setFieldErrors(fieldErrors);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setFormResponse(null);

      const res = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
      });

      if (res?.ok && !res.error) {
        setFormResponse({
          success: true,
          message: "Signed in successfully",
        });
        router.push("/");
      } else {
        setFormResponse({
          success: false,
          message: "Incorrect email or password",
        });
      }
    } catch (error: any) {
      setFormResponse({
        success: false,
        message: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component={"section"} className="signin min-h-screen">
      <Box
        component={"div"}
        className="signin-container w-full flex items-center justify-between"
      >
        <Box component={"div"} className="block min-w-full lg:min-w-sm p-4 mx-auto">
          {/* Logo */}
          <Box component={"div"} className="logo mb-3">
            <Link href="/" passHref>
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  textDecoration: "none",
                }}
              >
                <Image src="/logo.png" alt="Logo" width={32} height={32} />

                <Typography variant="h3" component="h3" fontWeight={900}>
                  <span className="text-gray-500">Apt</span>
                  <span className="text-blue-500">Resume</span>
                </Typography>
              </Box>
            </Link>
          </Box>

          <Typography
            variant="h5"
            component="h1"
            sx={{
              fontWeight: 700,
              mb: 0.5,
              color: "text.primary",
            }}
          >
            Welcome back
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Sign in to your account to continue
          </Typography>

          {formResponse && (
            <Alert
              severity={formResponse.success ? "success" : "error"}
              sx={{ mb: 3 }}
            >
              {formResponse.message}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <TextField
              type="email"
              id="email"
              label="Email"
              placeholder="placeholder@email.com"
              variant="outlined"
              fullWidth
              value={form.email}
              onChange={handleChange}
              error={Boolean(fieldErrors.email)}
              helperText={fieldErrors.email}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 1,
                  "& fieldset": {
                    borderColor: "gray",
                  },
                  "&:hover fieldset": {
                    borderColor: "primary.main",
                  },
                },
              }}
            />

            <TextField
              type={showPassword ? "text" : "password"}
              id="password"
              label="Password"
              placeholder="Password"
              variant="outlined"
              fullWidth
              value={form.password}
              onChange={handleChange}
              error={Boolean(fieldErrors.password)}
              helperText={fieldErrors.password}
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
                  borderRadius: 1,
                  "& fieldset": {
                    borderColor: "gray",
                  },
                  "&:hover fieldset": {
                    borderColor: "primary.main",
                  },
                },
              }}
            />

            <Box component={"div"}>
              <Link
                href="/auth/forgot-password"
                className="text-sm text-gray-600 hover:text-blue-600 hover:underline"
              >
                Forgot password?
              </Link>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              size="large"
              sx={{
                py: 1.5,
                borderRadius: 1,
                textTransform: "none",
                fontWeight: 600,
                fontSize: "1rem",
                boxShadow: "none",
                "&:hover": {
                  boxShadow: "none",
                },
              }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "inherit" }} />
              ) : (
                "Sign in"
              )}
            </Button>

            <Divider sx={{ my: 2 }}>
              <Typography variant="body2" color="text.secondary">
                OR
              </Typography>
            </Divider>

            <Box component={"div"}>
              <GoogleSigninButton setFormResponse={setFormResponse} />
            </Box>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "center", mt: 2 }}
            >
              Don&apos;t have an account?
              <Link href="/auth/signup" passHref>
                <Typography
                  component="span"
                  variant="body2"
                  sx={{
                    color: "primary.main",
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                    cursor: "pointer",
                    ml: 0.5,
                  }}
                >
                  Sign up
                </Typography>
              </Link>
            </Typography>
          </Box>
        </Box>
        <Box
          component={"div"}
          className="hidden lg:block h-screen w-2/1 relative bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900"
        ></Box>
      </Box>
    </Box>
  );
}
