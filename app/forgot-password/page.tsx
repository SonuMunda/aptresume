"use client";

import React, { useState } from "react";
import {
  Box,
  FormControl,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import { z } from "zod";
import { grey, indigo } from "@mui/material/colors";
import Link from "next/link";
import { IResponseData } from "@/types/responseDataTypes";
import { textFieldStyle } from "@/ui/styles/textFieldStyle";

interface FormState {
  email: string;
}
const resetPasswordSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});

const ForgotPassword = () => {
  const [form, setForm] = useState<FormState>({ email: "" });
  const [fieldErrors, setFieldErrors] = useState<{ email?: string }>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [apiResponse, setApiResponse] = useState<IResponseData | null>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFieldErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = resetPasswordSchema.safeParse(form);
    if (!result.success) {
      const errors: { email?: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0] === "email") errors.email = err.message;
      });
      setFieldErrors(errors);
    } else {
      setFieldErrors({});

      //fetching api
      try {
        setApiResponse(null);
        setLoading(true);
        const response = await fetch("/api/forgot-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });
        const data = await response.json();

        if (!response.ok) {
          setApiResponse({
            message: data.message,
            success: false,
          });
          return;
        }

        setApiResponse({
          message: data.message,
          success: true,
        });
        setForm({
          email: "",
        });
      } catch (error) {
        if (error instanceof Error) {
          setApiResponse({
            message: error.message,
            success: false,
          });
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Box
      component={"section"}
      className="reset-password flex md:items-center h-screen bg-white"
    >
      <Box component={"div"} className="container max-w-7xl mx-auto p-4">
        <Box
          component={"div"}
          className="form-box space-y-10 w-full md:w-[80%]  lg:w-xl sm:p-10 my-auto  mx-auto"
        >
          <Box component={"div"} className="form-summary flex flex-col gap-4">
            <Typography variant="h2" component={"h2"} fontWeight={"bold"}>
              Forget your Password
            </Typography>
            <Typography
              component={"p"}
              variant="body2"
              sx={{
                color: grey[700],
              }}
            >
              Provide the email address associated with your account to recover
              your password.
            </Typography>
          </Box>

          {apiResponse && (
            <Alert
              severity={!apiResponse.success ? "error" : "success"}
              sx={{ mb: 3 }}
            >
              {apiResponse.message}
            </Alert>
          )}

          <Box
            component={"form"}
            onSubmit={handleSubmit}
            noValidate
            className="forgot-password"
          >
            <FormControl fullWidth>
              <TextField
                type="email"
                name="email"
                id="email"
                label="Email"
                variant="filled"
                fullWidth
                focused
                value={form.email}
                onChange={handleChange}
                error={Boolean(fieldErrors.email)}
                helperText={fieldErrors.email || " "}
                sx={textFieldStyle}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                mt: 2,
                py: 1.5,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
                fontSize: "1rem",
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
                "Send Reset Link"
              )}
            </Button>
          </Box>

          <Box
            component={"div"}
            className="login-option flex items-center justify-end gap-4"
          >
            <Link
              href="/auth/signin"
              className="text-sm text-center text-indigo-600 hover:text-indigo-700 hover:underline"
            >
              <Typography component={"span"} variant={"body2"}>
                SignIn
              </Typography>
            </Link>

            <Link
              href="/auth/signup"
              className="text-sm text-center text-indigo-600 hover:text-indigo-700 hover:underline"
            >
              <Typography component={"span"} variant={"body2"}>
                SignUp
              </Typography>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
