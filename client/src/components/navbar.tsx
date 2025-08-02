import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Heading,
  Image,
  Button,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";
import { SearchIcon } from "@chakra-ui/icons";
import { useCart } from "@/context/useCart";

import cart from "@/assets/cart.svg";
import account from "@/assets/account.svg";
import logo from "@/assets/logo.jpg";

export const Navbar = () => {
  const { setIsCartOpen } = useCart();

  return (
    <Box px={6} py={3} bg="#f7f6f3ff" borderBottom="1px solid #E2E8F0">
      <Flex align="center" justify="space-between">
        <Heading size="md">
          <Link to="/bikes">
            <Image src={logo} h="80px" w="80px" />
          </Link>
        </Heading>

        <Flex gap={4} align="center">
          <InputGroup bgColor="#F5F5F5" borderRadius="40px">
            <Input
              placeholder="What are you looking for?"
              border="none"
              _focus={{ boxShadow: "none" }}
            />
            <InputRightElement>
              <IconButton
                aria-label="Search"
                icon={<SearchIcon />}
                variant="ghost"
                size="sm"
              />
            </InputRightElement>
          </InputGroup>
          <Flex display="inline-flex" gap={2} align="center" mr="15px">
            <Link to="/profile">
              <Image src={account} height="85px" width="85px" />
            </Link>

            <Image
              src={cart}
              cursor="pointer"
              height="30px"
              width="30px"
              onClick={() => setIsCartOpen(true)}
            />
          </Flex>
          <Link to="/bikes/new">
            <Button
              type="submit"
              fontSize="16px"
              fontWeight="600"
              color="#D4AF37"
              bg="#1B263B"
              borderRadius="40px"
              _hover={{ bg: "#27374D", color: "#FFD700" }}
            >
              List your bike!
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};
