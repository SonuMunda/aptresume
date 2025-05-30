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
import { GoogleIcon } from "../components/customIcons";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <section className="min-h-screen bg-white flex sm:items-center justify-center p-4">
      <div className="container max-w-6xl mx-auto">
        {/* Sign-up Form */}
        <div className="rounded-xl shadow-3xl max-w-md mx-auto p-4 md:p-12 flex flex-col gap-6">
          {/* Logo */}
          <div className="logo gap-2 w-fit">
            <Link
              href="/"
              className={`logo-link flex items-center jusify-center gap-2 text-2xl text-black font-bold`}
            >
              <Image src="/logo.png" alt="Logo" width={32} height={32} />
              AptResume
            </Link>
          </div>

          {/* Heading */}
          <Typography
            variant="h4"
            component="h4"
            sx={{
              fontWeight: "bold",
              color: "#1e293b",
            }}
          >
            Signup
          </Typography>

          {/* Form */}
          <form className="flex flex-col gap-4">
            <TextField
              type="text"
              id="name"
              label="Full Name"
              variant="outlined"
              fullWidth
              required
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
              type="email"
              id="email"
              label="Email"
              variant="outlined"
              fullWidth
              required
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
              type={showPassword ? "text" : "password"}
              id="password"
              label="Password"
              variant="outlined"
              fullWidth
              required
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
              }}
            >
              Sign up
            </Button>
          </form>

          {/* Login Link */}
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

          {/* OR Divider */}
          <Box className="flex items-center gap-2 my-2">
            <Divider sx={{ flex: 1, bgcolor: "grey.400" }} />
            <Typography sx={{ fontSize: "0.875rem", color: "grey.600" }}>
              OR
            </Typography>
            <Divider sx={{ flex: 1, bgcolor: "grey.400" }} />
          </Box>

          {/* Google Sign Up */}
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
              borderColor: "#334155",
              "&:hover": {
                backgroundColor: "#f1f5f9",
                borderColor: "#1e293b",
              },
            }}
          >
            Sign up with Google
          </Button>
        </div>
      </div>
    </section>
  );
}
