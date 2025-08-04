"use client";

import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import React from "react";
import { grey, indigo } from "@mui/material/colors";
import { textFieldStyle } from "@/ui/styles/textFieldStyle";
import { Mail, Send } from "@mui/icons-material";
import Image from "next/image";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <Box component="main">
      <Box
        component={"section"}
        className="contact-us bg-gradient-to-br from-blue-50 to-sky-50"
      >
        <Box
          component={"div"}
          className="container max-w-7xl mx-auto px-4 py-24 grid grid-cols-2 gap-8"
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
              <Box
                component={"form"}
                action={process.env.FORMSPREE_URL}
                method="POST"
                className="flex flex-col gap-4"
              >
                <FormControl>
                  <TextField
                    type="text"
                    id="name"
                    label="Full Name"
                    variant="standard"
                    fullWidth
                    focused
                    // value={form.email}
                    // onChange={handleChange}
                    // error={Boolean(fieldErrors.email)}
                    // helperText={fieldErrors.email}
                    sx={textFieldStyle}
                  />
                </FormControl>
                <FormControl>
                  <TextField
                    type="email"
                    id="email"
                    label="Email"
                    variant="standard"
                    fullWidth
                    focused
                    // value={form.email}
                    // onChange={handleChange}
                    // error={Boolean(fieldErrors.email)}
                    // helperText={fieldErrors.email}
                    sx={textFieldStyle}
                  />
                </FormControl>
                <FormControl>
                  <TextField
                    type="text"
                    id="phone"
                    label="Phone Number"
                    variant="standard"
                    fullWidth
                    focused
                    // value={form.email}
                    // onChange={handleChange}
                    // error={Boolean(fieldErrors.email)}
                    // helperText={fieldErrors.email}
                    sx={textFieldStyle}
                  />
                </FormControl>
                <FormControl>
                  <TextField
                    type="message"
                    id="message"
                    label="Message"
                    variant="standard"
                    placeholder="Leave a message here"
                    fullWidth
                    focused
                    multiline
                    rows={6}
                    // value={form.email}
                    // onChange={handleChange}
                    // error={Boolean(fieldErrors.email)}
                    // helperText={fieldErrors.email}
                    sx={textFieldStyle}
                  />
                </FormControl>

                <Button
                  type="submit"
                  startIcon={<Send />}
                  variant="contained"
                  color="primary"
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
                  <Typography component={"span"}>Send</Typography>
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
            <Box component={"div"} className="image p-1">
              <Image
                src={"/images/contact-page.png"}
                alt="contact-us"
                width={600}
                height={700}
                className="mx-auto rounded-xl"
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
