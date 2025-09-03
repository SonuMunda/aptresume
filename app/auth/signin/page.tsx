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
  FormControl,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import signInSchema from "@/lib/validations/signinSchema";
import GoogleSigninButton from "../components/GoogleSigninButton";
import { indigo } from "@mui/material/colors";
import { textFieldStyle } from "@/ui/styles/textFieldStyle";
import { motion } from "framer-motion";

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

  const [formResponse, setFormResponse] = useState<FormResponse | null>(null);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));

    setFieldErrors((prev) => ({
      ...prev,
      [id]: undefined,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFieldErrors({});

    const result = signInSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const err of result.error.errors) {
        if (err.path.length > 0) {
          fieldErrors[err.path[0]] = err.message;
        }
      }
      setFieldErrors(fieldErrors);
      return;
    }

    setLoading(true);
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
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Error signing in with Google";
      setFormResponse({
        message,
        success: false,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component={motion.section}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="signin"
    >
      <Box
        component={"div"}
        className="container min-h-screen max-w-7xl flex items-center bg-white mx-auto"
      >
        <Box
          component={"div"}
          className="signup-form h-fit max-w-lg flex-1 px-4 pt-4 pb-10 mx-auto"
        >
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
                <Image src="/logo.png" alt="Logo" width={48} height={48} />
              </Box>
            </Link>
          </Box>

          <Typography
            variant="h2"
            component="h2"
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

          <Box component={"div"}>
            <GoogleSigninButton setFormResponse={setFormResponse} />
          </Box>

          <Divider sx={{ my: 2 }}>
            <Typography variant="body2" color="text.secondary">
              OR
            </Typography>
          </Divider>

          <Box
            component="form"
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <FormControl>
              <TextField
                type="email"
                id="email"
                label="Email"
                variant="filled"
                fullWidth
                focused
                size="small"
                value={form.email}
                onChange={handleChange}
                error={Boolean(fieldErrors.email)}
                helperText={fieldErrors.email || " "}
                sx={textFieldStyle}
              />
            </FormControl>

            <FormControl>
              <TextField
                type={showPassword ? "text" : "password"}
                id="password"
                variant="filled"
                label="Password"
                fullWidth
                focused
                size="small"
                value={form.password}
                onChange={handleChange}
                error={Boolean(fieldErrors.password)}
                helperText={fieldErrors.password || " "}
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
                sx={textFieldStyle}
              />
            </FormControl>

            <Box component={"div"}>
              <Link
                href="/forgot-password"
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
              sx={{
                py: 1.5,
                borderRadius: 2,
                textTransform: "none",
                boxShadow: "none",
                backgroundColor: indigo[600],
                "&:hover": {
                  boxShadow: "none",
                },
              }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "inherit" }} />
              ) : (
                <Typography component={"span"} variant="body1">
                  Sign in
                </Typography>
              )}
            </Button>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: "center", mt: 2 }}
            >
              Don&apos;t have an account?
              <Link href="/auth/signup" passHref>
                <Typography
                  component="span"
                  variant="body1"
                  sx={{
                    color: indigo[900],
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                    cursor: "pointer",
                    ml: 1,
                  }}
                >
                  Sign up
                </Typography>
              </Link>
            </Typography>
          </Box>
        </Box>
        {/* <Box
          component={motion.div}
          className="hidden lg:block h-full w-full relative signin-background"
        ></Box> */}
      </Box>
    </Box>
  );
}
