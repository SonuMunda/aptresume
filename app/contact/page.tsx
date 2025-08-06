"use client";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { grey, indigo } from "@mui/material/colors";
import { textFieldStyle } from "@/ui/styles/textFieldStyle";
import { Mail, Send } from "@mui/icons-material";
import Image from "next/image";
import { motion } from "framer-motion";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  contactSchema,
  ContactSchemaType,
} from "@/lib/validations/contactSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { IResponseData } from "@/types/responseDataTypes";

type FormData = ContactSchemaType;

const Contact = () => {
  const [responseData, setResponseData] = useState<IResponseData | null>();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(contactSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await fetch("/api/contact-us", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const resData = await response.json();

      if (!response.ok) {
        setResponseData({ message: resData.message, success: false });
        return;
      }

      setResponseData({ message: resData.message, success: true });
      reset();
    } catch (error) {
      if (error instanceof Error) {
        setResponseData({ message: error.message, success: false });
      }
    }
  };

  return (
    <Box component="main">
      <Box
        component={"section"}
        className="contact-us bg-gradient-to-br from-blue-50 to-sky-50"
      >
        <Box
          component={"div"}
          className="container max-w-7xl mx-auto px-4 py-24 grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <Box
            component={motion.div}
            className="left h-full bg-white rounded-xl p-10 border-2 border-indigo-100 shadow shadow-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            <Box component={"div"} className="left-content space-y-10">
              <Box
                component={"div"}
                className="section-summary flex flex-col gap-3"
              >
                <Typography
                  variant="h6"
                  component={"h6"}
                  sx={{
                    color: indigo[400],
                    fontWeight: 600,
                  }}
                >
                  Get in Touch
                </Typography>
                <Typography
                  variant="h1"
                  component={"h1"}
                  sx={{
                    fontWeight: 600,
                  }}
                >
                  Connect with Our Team
                </Typography>
                <Typography
                  variant="body2"
                  component={"p"}
                  sx={{
                    color: grey[600],
                  }}
                >
                  Have questions or feedback? We&apos;re here to help. Send us a
                  message, and we will respond within 24 hours.
                </Typography>
              </Box>

              {/* Error/Success Alert */}
              {responseData && (
                <Alert severity={responseData.success ? "success" : "error"}>
                  {responseData.message}
                </Alert>
              )}

              <Box
                component={"form"}
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                <FormControl>
                  <TextField
                    {...register("name")}
                    type="text"
                    id="name"
                    label="Full Name"
                    variant="standard"
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
                    type="text"
                    id="email"
                    label="Email"
                    variant="standard"
                    fullWidth
                    focused
                    error={!!errors.email}
                    helperText={errors.email?.message || " "}
                    sx={textFieldStyle}
                  />
                </FormControl>
                <FormControl>
                  <TextField
                    {...register("subject")}
                    type="text"
                    id="subject"
                    label="Subject"
                    variant="standard"
                    fullWidth
                    focused
                    error={!!errors.subject}
                    helperText={errors?.subject?.message || " "}
                    sx={textFieldStyle}
                  />
                </FormControl>
                <FormControl>
                  <TextField
                    {...register("message")}
                    type="message"
                    id="message"
                    label="Message"
                    variant="standard"
                    fullWidth
                    focused
                    multiline
                    rows={6}
                    error={!!errors.message}
                    helperText={errors.message?.message || " "}
                    sx={textFieldStyle}
                  />
                </FormControl>

                <Button
                  type="submit"
                  startIcon={
                    isSubmitting ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      <Send />
                    )
                  }
                  variant="contained"
                  color="primary"
                  disabled={!isValid}
                  sx={{
                    display: "flex",
                    mt: 4,
                    p: 1,
                    backgroundColor: indigo[500],
                    "&:hover": {
                      backgroundColor: indigo[700],
                    },
                  }}
                >
                  {isSubmitting ? (
                    <Typography component={"span"}>Sending</Typography>
                  ) : (
                    <Typography component={"span"}>Send</Typography>
                  )}
                </Button>
              </Box>
            </Box>
          </Box>
          <Box
            component={motion.div}
            className="right bg-white rounded-xl overflow-hidden border-2 border-indigo-100 shadow shadow-lg"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <Box component={"div"} className="image">
              <Image
                src={"/images/contact-page.png"}
                alt="contact-us"
                width={800}
                height={800}
                className="mx-auto rounded-lg"
              />
            </Box>
            <Box component={"div"} className="contact-info p-10">
              <Box
                component={"div"}
                className="contact-info-item flex items-center gap-6"
              >
                <Box
                  component={"div"}
                  className="contact-info-icon p-4 rounded-full bg-indigo-50 text-indigo-600"
                >
                  <Mail />
                </Box>
                <Box component={"div"} className="contact-info-text">
                  <Typography component={"h3"}>Email</Typography>
                  <Typography
                    component={"p"}
                    variant="body2"
                    color="text.secondary"
                  >
                    aptresume.web@gmail.com
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Contact;
