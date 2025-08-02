import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
  Box,
  Text,
  Image,
  VStack,
  HStack,
  Divider,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  //   Select,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useCart } from "@/context/useCart";
import { orderAPI } from "@/services/API/order";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

import remove from "@/assets/delete.svg";
import wishlist from "@/assets/download (2).svg";
import shoppingbag from "@/assets/shopping-bag.svg";

export const CartDrawer = () => {
  const {
    cartItems,
    wishlistItems,
    isCartOpen,
    setIsCartOpen,
    setCartItems,
    moveToCartFromWishlist,
    removeFromCart,
  } = useCart();

  const navigate = useNavigate();

  const handleRentalDuration = (id: string, change: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              rentalDuration: Math.max(1, item.rentalDuration + change),
            }
          : item
      )
    );
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;

    try {
      const items = cartItems.map((item) => ({
        product: item.product,
        rentalDuration: item.rentalDuration,
      }));

      const deliveryMethod = "pickup";
      const response = await orderAPI.checkoutOrder({
        items,
        tax,
        deliveryMethod,
      });

      console.log(response);

      setIsCartOpen(false);
      navigate("/checkout");
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.hourlyRate * item.rentalDuration,
    0
  );

  const TAX_RATE = 0.0245;

  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + tax;

  return (
    <Drawer
      isOpen={isCartOpen}
      placement="right"
      onClose={() => setIsCartOpen(false)}
    >
      <DrawerOverlay />
      <DrawerContent bg="#1B263B" color="#D4AF37">
        <DrawerCloseButton />
        <DrawerHeader>Your Cart</DrawerHeader>

        <DrawerBody>
          <Tabs variant="unstyled">
            <TabList mb={4}>
              <Tab
                _selected={{
                  color: "#D4AF37",
                  borderBottom: "2px solid #D4AF37",
                }}
              >
                🛒 Cart
              </Tab>
              <Tab
                _selected={{
                  color: "#D4AF37",
                  borderBottom: "2px solid #D4AF37",
                }}
              >
                <Image src={wishlist} mr="10px" /> Wishlist
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <VStack spacing={4} align="stretch">
                  {cartItems.map((item) => (
                    <Box
                      key={item.id}
                      p={4}
                      w="330px"
                      border="1px solid #D4AF37"
                      display="flex"
                      gap="12px"
                      alignItems="center"
                    >
                      <Image
                        src={`http://localhost:5000${item.image}`}
                        alt={item.name}
                        boxSize="80px"
                        objectFit="cover"
                      />
                      <Box flex="1">
                        <Text fontWeight="bold">{item.name}</Text>
                        <Text fontSize="sm" mt="10px">
                          € {item.hourlyRate} / day
                        </Text>

                        <HStack spacing={2} mt={2}>
                          <Menu>
                            <MenuButton
                              as={Button}
                              maxW="60px"
                              h="30px"
                              bg="white"
                              border="1px solid #D4AF37"
                              rightIcon={<ChevronDownIcon />}
                            >
                              {item.rentalDuration}
                            </MenuButton>
                            <MenuList bg="#1B263B" borderColor="#D4AF37">
                              {[...Array(10)].map((_, i) => (
                                <MenuItem
                                  key={i + 1}
                                  onClick={() =>
                                    handleRentalDuration(
                                      item.id,
                                      i + 1 - item.rentalDuration
                                    )
                                  }
                                  _hover={{ bg: "#D4AF37", color: "#1B263B" }}
                                  bg="#1B263B"
                                  color="white"
                                >
                                  {i + 1} day{i === 0 ? "" : "s"}
                                </MenuItem>
                              ))}
                            </MenuList>
                          </Menu>

                          <Button
                            onClick={() => removeFromCart(item.id)}
                            bg="transparent"
                            _hover={{ bg: "transparent" }}
                            p={0}
                            ml="30px"
                          >
                            <Image src={remove} w="20px" />
                          </Button>
                        </HStack>
                      </Box>
                    </Box>
                  ))}
                </VStack>

                <Divider my={6} borderColor="#D4AF37" w="330px" />
                <Box>
                  <VStack spacing={3} w="100%" mb={3}>
                    <HStack justify="space-between" w="100%">
                      <Text>Sub Total</Text>
                      <Text>€{subtotal}</Text>
                    </HStack>
                    <HStack justify="space-between" w="100%">
                      <Text>Tax</Text>
                      <Text>€{tax}</Text>
                    </HStack>
                    <HStack justify="space-between" w="100%">
                      <Text fontWeight="bold">Total</Text>
                      <Text fontWeight="bold">€{total}</Text>
                    </HStack>
                  </VStack>
                  <Box>
                    <Button
                      width="100%"
                      bg="#D4AF37"
                      mt="20px"
                      color="#1B263B"
                      fontWeight="bold"
                      borderRadius="full"
                      _hover={{ bg: "#FFD700" }}
                      onClick={handleCheckout}
                    >
                      CHECKOUT - € {total}
                    </Button>
                  </Box>
                </Box>
              </TabPanel>

              <TabPanel>
                {wishlistItems.length === 0 ? (
                  <Text fontStyle="italic">Wishlist is empty for now.</Text>
                ) : (
                  <VStack spacing={4} align="stretch">
                    {wishlistItems.map((item) => (
                      <Box
                        key={item.id}
                        p={4}
                        border="1px solid #D4AF37"
                        borderRadius="md"
                        display="flex"
                        gap="12px"
                        alignItems="center"
                      >
                        <Image
                          src={`http://localhost:5000${item.image}`}
                          alt={item.name}
                          boxSize="80px"
                          objectFit="cover"
                        />
                        <Box flex="1">
                          <Text fontWeight="bold">{item.name}</Text>
                          <Text fontSize="sm" mt="10px">
                            € {item.hourlyRate}/hr
                          </Text>
                        </Box>
                        <Button
                          mt={2}
                          onClick={() => moveToCartFromWishlist(item.id)}
                          bg="#D4AF37"
                          color="#1B263B"
                          _hover={{ bg: "#FFD700" }}
                        >
                          <Image src={shoppingbag} w="24px" />
                        </Button>
                      </Box>
                    ))}
                  </VStack>
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
