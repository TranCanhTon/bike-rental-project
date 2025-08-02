import { Box, Flex, Text, Stack, IconButton, Link } from "@chakra-ui/react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

export const Footer = () => {
  return (
    <Box bg="#1B263B" color="white" px={{ base: 4, md: 10 }}>
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align={{ base: "center", md: "flex-start" }}
      >
        <Stack spacing={2} align={{ base: "center", md: "flex-start" }}>
          <Text fontWeight="700" fontSize="30px" my="15px">
            Navigation
          </Text>
          <Link href="/bikes" _hover={{ color: "#D4AF37" }}>
            Home
          </Link>
          <Link href="/bikes" _hover={{ color: "#D4AF37" }}>
            Bikes
          </Link>

          <Link href="/bikes" _hover={{ color: "#D4AF37" }}>
            Contact
          </Link>
        </Stack>

        <Stack spacing={2} align={{ base: "center", md: "flex-start" }}>
          <Text fontWeight="700" fontSize="30px" my="15px">
            Contact
          </Text>
          <Text fontSize="sm">📧 support@biky.com</Text>
          <Text fontSize="sm">📍 New York, USA</Text>
        </Stack>

        <Stack direction="row" spacing="15px" my="15px">
          <IconButton
            as="a"
            aria-label="Instagram"
            icon={<FaInstagram />}
            variant="ghost"
            color="white"
            _hover={{ color: "#D4AF37" }}
          />
          <IconButton
            as="a"
            aria-label="Facebook"
            icon={<FaFacebook />}
            variant="ghost"
            color="white"
            _hover={{ color: "#D4AF37" }}
          />
          <IconButton
            as="a"
            aria-label="Twitter"
            icon={<FaTwitter />}
            variant="ghost"
            color="white"
            _hover={{ color: "#D4AF37" }}
          />
          <IconButton
            as="a"
            aria-label="LinkedIn"
            icon={<FaLinkedin />}
            variant="ghost"
            color="white"
            _hover={{ color: "#D4AF37" }}
          />
        </Stack>
      </Flex>
      <Text textAlign="center" fontSize="15px" color="gray" mt="15px">
        © {new Date().getFullYear()} Biky. All rights reserved.
      </Text>
    </Box>
  );
};
