import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "@/services/API/auth";

import {
  Box,
  Button,
  Text,
  Flex,
  Image,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Center,
  InputGroup,
  InputLeftElement,
  Link,
  VStack,
} from "@chakra-ui/react";

import bike from "@/assets/54724.jpg";

import sms from "@/assets/sms.png";
import lock from "@/assets/lock.png";

export const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showCheckEmail, setShowCheckEmail] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const user = await authAPI.register({ name, email, password });
      setShowCheckEmail(true);
      console.log("Logged in user:", user);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return showCheckEmail ? (
    <Box textAlign="center" mt={10}>
      <Heading mb={4}>Verify Your Email</Heading>
      <Text fontSize="lg" my={6}>
        We've sent a verification link to {email}. Please check your inbox and
        click the link to activate your account.
      </Text>
      <Button
        bgColor="#1B263B"
        color="#D4AF37"
        onClick={() => navigate("/login")}
      >
        Go to Login
      </Button>
    </Box>
  ) : (
    <Flex w="100%" maxW="1920px" h="100vh">
      <Box display={{ base: "none", lg: "block" }} w={{ lg: "50%" }} h="100%">
        <Box
          h="100%"
          backgroundImage={`url(${bike})`}
          bgSize="cover"
          bgPosition="center"
        />
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
          <Flex
            justifyContent="space-between"
            p="12"
            textAlign="center"
            flexDirection="column"
            gap="3"
          >
            <Heading>Register</Heading>
            <Text my="2px" fontWeight="500">
              Create an account
            </Text>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleRegister();
              }}
            >
              <VStack spacing={4}>
                <FormControl id="name">
                  <FormLabel ml="8px">Name</FormLabel>
                  <InputGroup>
                    <InputLeftElement pl="24px">
                      <Image src={sms} alt="Name" mt="8px" mr="10px" />
                    </InputLeftElement>
                    <Input
                      placeholder="Enter name"
                      borderRadius="150px"
                      backgroundColor="#E9ECEF"
                      fontWeight="500"
                      color="#8385A4"
                      pl="48px"
                      h="56px"
                      border="1px solid #F8F9FA"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      _focus={{ borderColor: "#1B263B" }}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl id="email">
                  <FormLabel ml="8px">E-mail</FormLabel>
                  <InputGroup>
                    <InputLeftElement pl="24px">
                      <Image src={sms} alt="Email" mt="8px" mr="10px" />
                    </InputLeftElement>
                    <Input
                      placeholder="Enter e-mail"
                      borderRadius="150px"
                      backgroundColor="#E9ECEF"
                      fontWeight="500"
                      color="#8385A4"
                      pl="48px"
                      h="56px"
                      border="1px solid #F8F9FA"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      _focus={{ borderColor: "#1B263B" }}
                    />
                  </InputGroup>
                </FormControl>

                <FormControl id="password">
                  <FormLabel ml="8px">Password</FormLabel>
                  <InputGroup>
                    <InputLeftElement pl="24px">
                      <Image src={lock} alt="Password" mt="8px" mr="10px" />
                    </InputLeftElement>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      borderRadius="150px"
                      backgroundColor="#E9ECEF"
                      fontWeight="500"
                      color="#8385A4"
                      pl="48px"
                      h="56px"
                      border="1px solid #F8F9FA"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      _focus={{ borderColor: "#1B263B" }}
                    />
                  </InputGroup>
                </FormControl>
              </VStack>

              <VStack spacing={4} mt={6}>
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
                  Register
                </Button>
                <Text mt="1" fontSize="16px" color="#8385A4">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    color="#1B263B"
                    fontWeight="500"
                    _hover={{ color: "#27374D" }}
                  >
                    Login
                  </Link>
                </Text>
              </VStack>
            </form>
          </Flex>
        </Box>
      </Center>
    </Flex>
  );
};
