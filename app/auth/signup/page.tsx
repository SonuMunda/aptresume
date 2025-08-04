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
  FormControl,
} from "@mui/material";
import Image from "next/image";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import Link from "next/link";
import { signUpSchema, SignUpSchemaType } from "@/lib/validations/signupSchema";
import { IResponseData } from "@/types/responseDataTypes";
import GoogleSigninButton from "../components/GoogleSigninButton";
import { indigo } from "@mui/material/colors";
import { textFieldStyle } from "@/ui/styles/textFieldStyle";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type FormData = SignUpSchemaType;

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState<IResponseData | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    setResponseData(null);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await res.json();

      if (!res.ok) {
        setResponseData({
          message: resData.message,
          success: false,
        });
        return;
      }

      reset();
      setResponseData({
        message: resData.message,
        success: true,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        setResponseData({
          message: error.message,
          success: false,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <Box component={"section"} className="signup">
        <Box
          component={"div"}
          className="container min-h-screen min-w-full bg-white mx-auto grid lg:grid-cols-2"
        >
          <Box
            component={"div"}
            className="signup-form space-y-6 h-fit w-full p-4 md:p-10 md:m-auto md:max-w-xl"
          >
            {/* Logo */}
            <Box component={"div"} className="logo mb-2">
              <Link href="/">
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
            {/* Heading */}
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontWeight: 700,
              }}
            >
              Create your account
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Get started with your new account
            </Typography>

            {/* Error/Success Alert */}
            {responseData && (
              <Alert severity={responseData.success ? "success" : "error"}>
                {responseData.message}
              </Alert>
            )}
            {/* Form */}
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <FormControl>
                <TextField
                  {...register("name")}
                  name="name"
                  id="name"
                  variant="filled"
                  label="Full Name"
                  fullWidth
                  focused
                  error={!!errors.name}
                  helperText={errors.name?.message || " "}
                  sx={textFieldStyle}
                />
              </FormControl>

              <FormControl>
                <TextField
                  {...register("email")}
                  name="email"
                  id="email"
                  type="text"
                  variant="filled"
                  label="Email"
                  fullWidth
                  focused
                  error={!!errors.email}
                  helperText={errors.email?.message || " "}
                  sx={textFieldStyle}
                />
              </FormControl>

              <FormControl>
                <TextField
                  {...register("password")}
                  name="password"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  variant="filled"
                  label="Password"
                  fullWidth
                  focused
                  error={!!errors.password}
                  helperText={errors.password?.message || " "}
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
                  <Typography component={"span"} variant="body1">
                    Sign Up
                  </Typography>
                )}
              </Button>

              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ textAlign: "center", mt: 1 }}
              >
                Already have an account?
                <Link href="/auth/signin">
                  <Typography
                    component="span"
                    variant="body1"
                    sx={{
                      ml: 1,
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
            className="hidden lg:block h-full w-full relative signup-background"
          ></Box>
        </Box>
      </Box>
    </main>
  );
}
