import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "@/services/API/auth";

import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Tab,
  TabList,
  Tabs,
  Text,
  VStack,
  useToast,
  Heading,
} from "@chakra-ui/react";

import bike from "@/assets/54724.jpg";
import sms from "@/assets/sms.png";
import lock from "@/assets/lock.png";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogin = async () => {
    try {
      const user = await authAPI.login({ email, password });
      localStorage.setItem("token", user.token);
      // localStorage.setItem("user", JSON.stringify(user.user));
      navigate("/bikes");
      console.log("Logged in user:", user);
      toast({
        title: "Successfully logged in",
        description: "Welcome to Biky",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    } catch (err) {
      console.error("Login error:", err);
      toast({
        title: "Login failed",
        description: "Email or password is incorrect.",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return (
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
          <Heading alignContent="center" justifyContent="center">
            Welcome back
          </Heading>
          <Text>Please enter your details!</Text>
          <VStack spacing={8} align="stretch">
            <Tabs isFitted variant="line">
              <TabList>
                <Tab fontWeight="600">Biky</Tab>
              </TabList>
            </Tabs>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
              <VStack spacing={4}>
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
                  <HStack justify="flex-end">
                    <Link
                      fontSize="16px"
                      fontWeight="600"
                      color="#1B263B"
                      href="/forgot-password"
                      mt="7px"
                    >
                      Forgot Password?
                    </Link>
                  </HStack>
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
                  Login
                </Button>
                <Text fontSize="16px" color="#8385A4">
                  Don't have an account?{" "}
                  <Link href="/register" color="#1B263B" fontWeight="500">
                    Register
                  </Link>
                </Text>
              </VStack>
            </form>
          </VStack>
        </Box>
      </Center>
    </Flex>
  );
};
