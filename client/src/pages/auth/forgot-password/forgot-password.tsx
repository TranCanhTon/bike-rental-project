import {
  Box,
  Flex,
  Text,
  Link,
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
import { useState } from "react";
import { authAPI } from "@/services/API/auth";
import bgImage from "@/assets/bike.jpg";
import sms from "@/assets/sms.png";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authAPI.forgotPassword(email);
      toast({
        title: "Email sent",
        description: "Please check your inbox for reset link.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } catch (err) {
      console.log(err);
      toast({
        title: "Error",
        description: "Unable to send reset link.",
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
          <Heading mb="20px">Forgot Password</Heading>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <InputGroup>
                  <InputLeftElement pl="24px">
                    <Image src={sms} alt="Email" mt="8px" mr="10px" />
                  </InputLeftElement>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                Send Reset Link
              </Button>
            </VStack>
          </form>
          <Text mt="10px" fontSize="16px" color="#8385A4" textAlign="center">
            Back to{" "}
            <Link
              href="/login"
              color="#1B263B"
              fontWeight="500"
              _hover={{ color: "#27374D" }}
            >
              Login
            </Link>
          </Text>
        </Box>
      </Center>
    </Flex>
  );
};
