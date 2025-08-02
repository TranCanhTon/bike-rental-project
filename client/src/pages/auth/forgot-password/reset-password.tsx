import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { authAPI } from "@/services/API/auth";
import {
  Box,
  Flex,
  Image,
  Heading,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Center,
  VStack,
  useToast,
} from "@chakra-ui/react";

import bgImage from "@/assets/bgImage.svg";
import lock from "@/assets/lock.png";

export const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState("");
  const toast = useToast();

  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await authAPI.resetPassword({ token, email, password });
      toast({
        title: "Password reset successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } catch (err) {
      console.log(err);
      toast({
        title: "Error",
        description: "Failed to reset password. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return (
    <Flex w="100%" h="100vh">
      <Box display={{ base: "none", md: "block" }} w="50%" h="100%">
        <Image src={bgImage} alt="Visual" objectFit="cover" w="100%" h="100%" />
      </Box>

      <Center w={{ base: "100%", lg: "50%" }} h="100%">
        <Box
          w="520px"
          py="40px"
          px="24px"
          border="1px solid #E9ECEF"
          borderRadius="xl"
          boxShadow="md"
        >
          <Heading mb="20px">Reset Password</Heading>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>New Password</FormLabel>
                <InputGroup>
                  <InputLeftElement pl="24px">
                    <Image src={lock} alt="Password" mt="8px" mr="10px" />
                  </InputLeftElement>
                  <Input
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    bg="gray.100"
                    borderRadius="full"
                  />
                </InputGroup>
              </FormControl>

              <Button
                type="submit"
                w="100%"
                h="56px"
                fontSize="16px"
                fontWeight="600"
                color="#D4AF37"
                bg="#1B263B"
                borderRadius="40px"
                _hover={{ bg: "#27374D", color: "#FFD700" }}
              >
                Reset Password
              </Button>
            </VStack>
          </form>
        </Box>
      </Center>
    </Flex>
  );
};
