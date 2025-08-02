import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userAPI } from "@/services/API/user";

export const ChangePasswordPage = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await userAPI.changePassword({ oldPassword, newPassword });
      toast({
        title: "Password updated",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
      navigate("/profile");
    } catch (err) {
      console.log(err);
      toast({
        title: "Error",
        description: "Failed to change password",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return (
    <Box maxW="600px" mx="auto" mt="100px" p={6} bg="#1B263B" mb="20px">
      <Text fontSize="24px" fontWeight="bold" mb={8} color="#D4AF37">
        Password Change
      </Text>
      <VStack spacing={5}>
        <FormControl isRequired>
          <FormLabel color="#D4AF37">Current Password</FormLabel>
          <Input
            type="password"
            placeholder="Enter your current password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            color="#D4AF37"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel color="#D4AF37">New Password</FormLabel>
          <Input
            type="password"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            color="#D4AF37"
          />
        </FormControl>

        <Box mt={6} display="flex" gap={4}>
          <Button
            bgColor="#D4AF37"
            color="#1B263B"
            onClick={handleSubmit}
            px={8}
            borderRadius="full"
          >
            Save
          </Button>
          <Button
            variant="outline"
            border="1px solid #D4AF37"
            color="#D4AF37"
            px={8}
            borderRadius="full"
            onClick={() => navigate("/profile")}
          >
            Cancel
          </Button>
        </Box>
      </VStack>
    </Box>
  );
};
