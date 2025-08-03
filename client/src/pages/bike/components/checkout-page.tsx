import {
  Box,
  Flex,
  Heading,
  VStack,
  HStack,
  Text,
  Input,
  Select,
  Checkbox,
  Divider,
  Button,
  Image,
} from "@chakra-ui/react";
import { useCart } from "@/context/useCart";
import { useNavigate } from "react-router-dom";
import bgImage from "@/assets/background.svg";

export const CheckOutPage = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.hourlyRate * item.rentalDuration,
    0
  );
  const TAX_RATE = 0.0245;
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + tax;

  return (
    <Flex
      w="100%"
      minH="100vh"
      bgImage={`url(${bgImage})`}
      justify="center"
      align="flex-start"
      p={8}
      gap={8}
      flexWrap="wrap"
    >
      <Box
        w={{ base: "100%", lg: "60%" }}
        bg="#1B263B"
        color="#D4AF37"
        p={8}
        borderRadius="40px"
      >
        <Heading fontSize="40px" mb={6} textAlign="center">
          Checkout
        </Heading>

        <Box mb={8}>
          <Heading fontSize="25px" mb={4}>
            Contact
          </Heading>
          <Input placeholder="Email" mb={2} />
          <Checkbox>
            Tick here to receive emails about our products, offers, and news
          </Checkbox>
        </Box>

        <Box mb={8}>
          <Heading fontSize="25px" mb={4}>
            Delivery
          </Heading>
          <Select placeholder="Country/Region" mb={4} borderColor="gray.400">
            <option value="fi">Finland</option>
            <option value="se">Sweden</option>
          </Select>
          <HStack mb={4}>
            <Input placeholder="First name" borderColor="gray.400" />
            <Input placeholder="Last name" borderColor="gray.400" />
          </HStack>
          <Input placeholder="Address Line 1" mb={4} borderColor="gray.400" />
          <HStack mb={4}>
            <Input placeholder="Postal code" borderColor="gray.400" />
            <Input placeholder="City" borderColor="gray.400" />
          </HStack>
          <Input placeholder="Phone" borderColor="gray.400" />
        </Box>

        <Box mb={8}>
          <Heading fontSize="25px" mb={4}>
            Payment
          </Heading>
          <VStack align="stretch" spacing={4}>
            <Box border="1px solid #aeaeaeff" p={4} borderRadius="12px">
              <Text fontWeight="bold">Credit/Debit Card</Text>
              <Input
                placeholder="Card number"
                mt={2}
                borderColor="gray.400"
                disabled
              />
              <HStack mt={2}>
                <Input
                  placeholder="Expiration date (MM / YY)"
                  borderColor="gray.400"
                  disabled
                />
                <Input
                  placeholder="Security code"
                  borderColor="gray.400"
                  disabled
                />
              </HStack>
              <Input placeholder="Name on card" mt={2} disabled />
            </Box>
          </VStack>
        </Box>

        <Button
          w="100%"
          onClick={() => navigate("/order-success")}
          color="#D4AF37"
          bg="#000000ff"
          _hover={{ bg: "#27374D", color: "#FFD700" }}
        >
          PAY NOW
        </Button>
      </Box>

      <Box
        w={{ base: "100%", lg: "35%" }}
        bg="#1B263B"
        color="#D4AF37"
        p={8}
        borderRadius="md"
        boxShadow="sm"
        h="fit-content"
      >
        <VStack spacing={4} align="stretch">
          {cartItems.map((item) => (
            <HStack spacing={4} key={item.id} align="flex-start">
              <Image
                src={`https://bike-rental-backend-caja.onrender.com${item.image}`}
                alt={item.name}
                boxSize="60px"
                objectFit="cover"
                borderRadius="10px"
              />
              <Box flex="1">
                <Text fontWeight="700">{item.name}</Text>
                <Text fontSize="12px" color="#9e8636ff">
                  {item.rentalDuration} day{item.rentalDuration > 1 ? "s" : ""}
                </Text>
              </Box>
              <Text fontWeight="700">
                €{item.hourlyRate * item.rentalDuration}
              </Text>
            </HStack>
          ))}

          <Divider />

          <HStack justify="space-between">
            <Text>Subtotal</Text>
            <Text>€{subtotal}</Text>
          </HStack>
          <HStack justify="space-between">
            <Text>Tax</Text>
            <Text>€{tax}</Text>
          </HStack>

          <Divider />

          <HStack justify="space-between" fontWeight="700">
            <Text>Total</Text>
            <Text>€{total}</Text>
          </HStack>
        </VStack>
      </Box>
    </Flex>
  );
};
