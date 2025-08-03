import {
  Box,
  Text,
  Image,
  Flex,
  IconButton,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Divider,
  Button,
  VStack,
  HStack,
  useToast,
} from "@chakra-ui/react";

import type { Bike } from "@/types/Bikes";
import type { User } from "@/types/User";
import { userAPI } from "@/services/API/user";
import { reviewAPI } from "@/services/API/review";
import { bikeAPI } from "@/services/API/bike";

import { useDisclosure } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import wishlist from "@/assets/wishlist.svg";
import location from "@/assets/location.svg";
import star from "@/assets/stars.svg";
import deleteIcon from "@/assets/delete.svg";
import edit from "@/assets/edit.svg";

import { ConfirmModal } from "@/components/confirm-modal";
import { useCart } from "@/context/useCart";

export const BikeDetailPage = () => {
  const { id } = useParams();
  const [bike, setBike] = useState<Bike>();
  const [currentUser, setCurrentUser] = useState<User>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalAction, setModalAction] = useState<"Delete" | "Edit" | null>(
    null
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [targetType, setTargetType] = useState<"bike" | "review" | null>(null);
  const toast = useToast();
  const navigate = useNavigate();
  const { addToCart, moveToWishlist, wishlistItems, removeFromWishlist } =
    useCart();

  const BACKEND_URL = "https://bike-rental-backend-caja.onrender.com";

  useEffect(() => {
    const fetchBike = async () => {
      try {
        if (!id) return;
        const bike = await bikeAPI.getSingleBike(id);
        console.log("Here is bike log", bike);
        setBike(bike);
      } catch (error) {
        console.error("Error loading bike:", error);
      }
    };
    const fetchUser = async () => {
      try {
        const user = await userAPI.getCurrentUser();
        console.log("Here is user log", user);
        setCurrentUser(user);
      } catch (err) {
        console.error("Failed to fetch", err);
      }
    };
    fetchBike();
    fetchUser();
  }, [id]);

  const handleDeleteReview = async (reviewId: string) => {
    try {
      await reviewAPI.deleteReview(reviewId);
      const updatedBike = await bikeAPI.getSingleBike(id as string);
      setBike(updatedBike);
      toast({
        title: "Review deleted",
        description: "Your review has been deleted successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } catch (err) {
      console.error("Login error:", err);
      toast({
        title: "Failed to delete review",
        description: "No authorization",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const handleDeleteProduct = async (bikeId: string) => {
    try {
      await bikeAPI.deleteBike(bikeId);
      toast({
        title: "Listing deleted",
        description: "Your listing has been deleted successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      navigate("/bikes");
    } catch (error) {
      const err = error as Error;
      toast({
        title: "Failed to delete listing",
        description: err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };
  const handleEditProduct = (bikeId: string) => {
    navigate(`/bikes/${bikeId}/edit`);
  };

  const handleConfirmAction = async () => {
    if (!selectedId || !modalAction || !targetType) return;

    if (modalAction === "Delete") {
      if (targetType === "review") {
        await handleDeleteReview(selectedId);
      } else if (targetType === "bike") {
        await handleDeleteProduct(selectedId);
      }
    }

    if (modalAction === "Edit") {
      if (targetType === "bike") {
        handleEditProduct(selectedId);
      } else if (targetType === "review") {
        toast({
          title: "Edit Review",
          description: `Editing review ${selectedId}`,
          status: "info",
          duration: 3000,
          isClosable: true,
        });
      }
    }

    onClose();
  };

  return (
    <Box>
      <Flex direction={{ base: "column", md: "row" }} p={8} gap={8}>
        <Box flex="1">
          <Image
            src={`${BACKEND_URL}${bike?.image}`}
            alt={bike?.name}
            objectFit="cover"
            width="100%"
            height="100%"
            borderRadius="md"
          />
        </Box>

        <Box flex="1">
          <Flex direction="column" align="center">
            <Flex mt="70px" align="center">
              <Image src={location} h="20px" mr="10px" fill="#D4AF37" />
              <Text color="#D4AF37" fontWeight="600">
                {bike?.location}
              </Text>
            </Flex>
            <Text fontSize="30px" fontWeight="500" mt="10px" color="#D4AF37">
              {bike?.name}
            </Text>
            <Text mt="10px" fontSize="15px" textColor="#808080" color="#D4AF37">
              {bike?.type} bike
            </Text>
            <Text mt="10px" fontSize="15px" fontWeight="500" color="#D4AF37">
              ${bike?.hourlyRate} / day
            </Text>
            <Flex gap="20px" my="30px">
              <Flex
                align="center"
                justify="center"
                bg="gray.100"
                width="80px"
                px="10px"
                py="5px"
                borderRadius="full"
              >
                <Image src={star} w="10px" h="10px" mr="2px" />
                <Text fontWeight="600" fontSize="14px">
                  {bike?.averageRating}
                  <Text as="span" fontSize="14px" ml="8px" color="#434343ff">
                    ({bike?.numOfReviews})
                  </Text>
                </Text>
              </Flex>

              <IconButton
                aria-label="Add to wishlist"
                icon={<Image src={wishlist} w="14px" h="14px" />}
                bg={
                  wishlistItems.some((item) => item.id === bike?._id)
                    ? "gray.500"
                    : "gray.100"
                }
                borderRadius="full"
                w="35px"
                h="35px"
                onClick={() => {
                  if (!bike) return;
                  const alreadyInWishlist = wishlistItems.some(
                    (item) => item.id === bike._id
                  );

                  if (alreadyInWishlist) {
                    removeFromWishlist(bike._id);
                    toast({
                      title: "Removed from wishlist",
                      description: `${bike.name} has been removed from your wishlist.`,
                      status: "success",
                      duration: 2000,
                      isClosable: true,
                      position: "top-right",
                    });
                  } else {
                    moveToWishlist({
                      id: bike._id,
                      name: bike.name,
                      image: bike.image,
                      hourlyRate: bike.hourlyRate,
                      rentalDuration: 1,
                      product: bike._id,
                    });
                    toast({
                      title: "Added to wishlist",
                      description: `${bike.name} has been added to your wishlist.`,
                      status: "success",
                      duration: 2000,
                      isClosable: true,
                      position: "top-right",
                    });
                  }
                }}
              />
            </Flex>
            <Button
              type="submit"
              width="500px"
              h="56px"
              fontSize="16px"
              fontWeight="800"
              color="#D4AF37"
              bg="#1B263B"
              borderRadius="40px"
              _hover={{ bg: "#27374D", color: "#FFD700" }}
              onClick={() => {
                if (!bike) return;

                addToCart({
                  id: bike._id,
                  name: bike.name,
                  image: bike.image,
                  hourlyRate: bike.hourlyRate,
                  rentalDuration: 1,
                  product: bike._id,
                });

                toast({
                  title: "Added to cart",
                  description: `${bike.name} has been added to your cart.`,
                  status: "success",
                  duration: 3000,
                  isClosable: true,
                  position: "top-right",
                });
              }}
            >
              ADD TO CART
            </Button>
            <Box width="500px" mt="50px">
              <Divider width="470px" ml="15px" />
              <Accordion allowMultiple allowToggle mt="10px" width="100%">
                <AccordionItem border="none" mb="20px">
                  <h2>
                    <AccordionButton _hover={{ bg: "transparent" }}>
                      <Text
                        flex="1"
                        textAlign="left"
                        fontSize="16px"
                        fontWeight="700"
                        color="#D4AF37"
                        _hover={{ color: "#5b5b5b8d", cursor: "pointer" }}
                      >
                        Description
                      </Text>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel
                    pb={4}
                    fontSize="13px"
                    fontWeight="400"
                    color="#D4AF37"
                  >
                    <Box p={4} borderRadius="10px" bg="#1B263B">
                      {bike?.description}
                    </Box>
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem border="none">
                  <h2>
                    <AccordionButton _hover={{ bg: "transparent" }}>
                      <Box
                        flex="1"
                        textAlign="left"
                        fontSize="16px"
                        fontWeight="700"
                        color="#D4AF37"
                        _hover={{ color: "#5b5b5b8d", cursor: "pointer" }}
                      >
                        Reviews
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    {bike?.reviews && bike.reviews.length > 0 ? (
                      <VStack spacing={6} align="stretch">
                        {bike.reviews.map((review) => (
                          <Box
                            key={review._id}
                            p={4}
                            borderRadius="10px"
                            border="1px solid #181d27ff"
                            bg="#1B263B"
                          >
                            <HStack justifyContent="space-between" mb={2}>
                              <HStack>
                                <Flex
                                  align="center"
                                  justify="center"
                                  boxSize="30px"
                                  borderRadius="full"
                                  bg="purple.100"
                                  color="purple.800"
                                  fontWeight="bold"
                                  fontSize="xs"
                                >
                                  {review.user.name.charAt(0).toUpperCase()}
                                </Flex>
                                <VStack align="flex-start" spacing={0}>
                                  <Text
                                    fontWeight="semibold"
                                    fontSize="sm"
                                    color="#D4AF37"
                                  >
                                    {review.user.name}
                                  </Text>
                                  <Flex my="5px">
                                    {Array.from({ length: 5 }).map(
                                      (_, index) => (
                                        <Image
                                          key={index}
                                          src={star}
                                          w="10px"
                                          h="10px"
                                          opacity={
                                            index < review.rating ? 1 : 0.2
                                          }
                                          mr="1px"
                                        />
                                      )
                                    )}
                                  </Flex>
                                  <Text fontSize="xs" color="#D4AF37">
                                    Reviewed on{" "}
                                    {new Date(
                                      review.updatedAt
                                    ).toLocaleDateString("en-US", {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    })}
                                  </Text>
                                </VStack>
                              </HStack>

                              {currentUser?.userId === review.user._id && (
                                <HStack spacing={2} ml="auto" mb="40px">
                                  <Image
                                    src={deleteIcon}
                                    boxSize="20px"
                                    cursor="pointer"
                                    onClick={() => {
                                      setSelectedId(review._id);
                                      setModalAction("Delete");
                                      setTargetType("review");
                                      onOpen();
                                    }}
                                  />
                                  <Image
                                    src={edit}
                                    boxSize="20px"
                                    cursor="pointer"
                                    onClick={() => {
                                      setSelectedId(review._id);
                                      setModalAction("Edit");
                                      setTargetType("review");
                                      onOpen();
                                    }}
                                  />
                                </HStack>
                              )}
                            </HStack>

                            <Text
                              fontWeight="bold"
                              fontSize="md"
                              mb={1}
                              color="#D4AF37"
                            >
                              {review.title}
                            </Text>
                            <Text fontSize="sm" color="#D4AF37">
                              {review.comment}
                            </Text>
                          </Box>
                        ))}
                      </VStack>
                    ) : (
                      <Text fontSize="13px" fontWeight="400" color="#D4AF37">
                        No reviews yet.
                      </Text>
                    )}
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Box>
          </Flex>
        </Box>
        <Box>
          {bike && currentUser?.userId === bike.user._id && (
            <HStack spacing={2} ml="auto" mt={4}>
              <Image
                src={deleteIcon}
                boxSize="30px"
                cursor="pointer"
                onClick={() => {
                  setSelectedId(bike._id);
                  setModalAction("Delete");
                  setTargetType("bike");
                  onOpen();
                }}
              />
              <Image
                src={edit}
                boxSize="30px"
                cursor="pointer"
                onClick={() => handleEditProduct(bike._id)}
              />
            </HStack>
          )}
        </Box>
      </Flex>
      <ConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleConfirmAction}
        action={modalAction ?? ""}
        type={targetType ?? "review"}
      />
    </Box>
  );
};
