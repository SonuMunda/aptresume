"use client";
import { resetPasswordSchema } from "@/lib/validations/resetPasswordSchema";
import { IResponseData } from "@/types/responseDataTypes";
import { textFieldStyle } from "@/ui/styles/textFieldStyle";
import { KeyboardReturn, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { grey, indigo } from "@mui/material/colors";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

interface ResetPasswordForm {
  password: string;
  confirm: string;
}

interface FieldErrors {
  password?: string;
  confirm?: string;
}

const ResetPassword = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<ResetPasswordForm>({
    password: "",
    confirm: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [apiResponse, setApiResponse] = useState<IResponseData | null>();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setFormData((prev) => ({
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

    const validate = resetPasswordSchema.safeParse(formData);

    if (!validate.success) {
      const fieldErrors: Record<string, string> = {};
      for (const err of validate.error.errors) {
        if (err.path.length > 0) {
          fieldErrors[err.path[0]] = err.message;
        }
      }
      setFieldErrors(fieldErrors);
      return;
    } else {
      setFieldErrors({});
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/auth/reset-password?token=${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: formData.password }),
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

      setFormData({
        password: "",
        confirm: "",
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
  };

  return (
    <Box component={"section"} className="reset-password">
      <Box
        component={"div"}
        className="container min-h-[75vh] max-w-7xl flex mx-auto p-4"
      >
        <Box component={"div"} className="form-container space-y-8 m-auto w-md">
          <Typography component={"h2"} variant="h2" fontWeight={800}>
            Reset Password
          </Typography>
          <Typography
            component={"p"}
            variant="body2"
            mb={4}
            sx={{
              color: grey[700],
            }}
          >
            Set a new password for your account. Make sure both fields match.
          </Typography>

          {apiResponse && (
            <Alert
              severity={apiResponse.success ? "success" : "error"}
              sx={{ mb: 3 }}
            >
              {apiResponse.message}
            </Alert>
          )}
          <Box
            component={"form"}
            onSubmit={handleSubmit}
            className="form flex flex-col gap-8"
          >
            <FormControl>
              <TextField
                type={showPassword ? "text" : "password"}
                id="password"
                label="Password"
                variant="filled"
                focused
                fullWidth
                value={formData.password}
                onChange={handleChangeInput}
                error={Boolean(fieldErrors.password)}
                helperText={fieldErrors.password || " "}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
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
            <FormControl>
              <TextField
                type={showConfirmPassword ? "text" : "password"}
                id="confirm"
                label="Confirm Password"
                variant="filled"
                focused
                fullWidth
                value={formData.confirm}
                onChange={handleChangeInput}
                error={Boolean(fieldErrors.confirm)}
                helperText={fieldErrors.confirm || " "}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          edge="end"
                          aria-label={
                            showConfirmPassword
                              ? "Hide password"
                              : "Show password"
                          }
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
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
                <Typography component={"span"}>Update Password</Typography>
              )}
            </Button>
          </Box>
          <Box component={"div"}>
            <Link href={"/auth/signin"}>
              <Button variant="text" startIcon={<KeyboardReturn />} sx={{
                color: indigo[600],
              }}>
                Back to Signin
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ResetPassword;
