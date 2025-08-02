import { useEffect, useState } from "react";
import { Box, Text, Spinner } from "@chakra-ui/react";
import { authAPI } from "@/services/API/auth";

export const VerifyEmail = () => {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get("token");
    const email = query.get("email");

    if (token && email) {
      authAPI
        .verifyEmail(token, email)
        .then(() => setStatus("success"))
        .catch(() => setStatus("error"));
    }
  }, []);
  if (status === "loading") {
    return (
      <Box textAlign="center" mt={10}>
        <Spinner size="xl" />
        <Text mt={4}>Verifying your email...</Text>
      </Box>
    );
  }

  if (status === "success") {
    setTimeout(() => {
      window.location.href = "/login";
    }, 2000);
  }

  if (status === "error") {
    return (
      <Box textAlign="center" mt={10} color="red.500">
        <Text fontSize="2xl">Verification failed</Text>
        <Text mt={2}>Invalid or expired link.</Text>
      </Box>
    );
  }

  return null;
};
