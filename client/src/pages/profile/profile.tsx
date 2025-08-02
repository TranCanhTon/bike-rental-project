import {
  Box,
  Text,
  Heading,
  VStack,
  Link,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { userAPI } from "@/services/API/user";
import { authAPI } from "@/services/API/auth";
import { useNavigate } from "react-router-dom";

import type { User } from "@/types/User";

export const ProfilePage = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = await userAPI.getCurrentUser();
        setCurrentUser(user);
      } catch (err) {
        console.error("Failed to fetch profile", err);
        toast({
          title: "Error loading profile",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      toast({
        title: "Successfully logged out",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
      localStorage.removeItem("token");
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast({
        title: "Failed to log out",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return (
    <Box
      maxW="600px"
      mx="auto"
      mt={10}
      p={6}
      bg="#1B263B"
      borderRadius="lg"
      boxShadow="lg"
    >
      <Heading textAlign="center" color="#D4AF37" mb={6}>
        User Profile
      </Heading>

      {currentUser ? (
        <VStack spacing={4} align="start">
          <Text color="gray.200">
            <strong>Name:</strong> {currentUser.name}
          </Text>
          <Text color="gray.200">
            <strong>Role:</strong> {currentUser.role}
          </Text>

          <VStack mt={6} spacing={3} w="100%">
            <Link href="/profile/change-password" width="100%">
              <Button
                bg="#1B263B"
                color="#D4AF37"
                width="100%"
                my="12px"
                _hover={{ bg: "#27374D", color: "#FFD700" }}
              >
                Change Password
              </Button>
            </Link>
            <Button colorScheme="red" width="100%" onClick={handleLogout}>
              Sign Out
            </Button>
          </VStack>
        </VStack>
      ) : (
        <Text color="gray.400" textAlign="center">
          Loading user profile...
        </Text>
      )}
    </Box>
  );
};
