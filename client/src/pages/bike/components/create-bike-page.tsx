import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Heading,
  useToast,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { bikeAPI } from "@/services/API/bike";
import { useNavigate } from "react-router-dom";

export const CreateBikePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    type: "mountain",
    hourlyRate: "",
    description: "",
    location: "",
    image: null as File | null,
  });

  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (name === "image" && files) {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let imageUrl = "";

      if (formData.image) {
        imageUrl = await bikeAPI.uploadImage(formData.image);
      }

      console.log("imageUrl:", imageUrl);
      console.log("Form data:", {
        name: formData.name,
        type: formData.type,
        hourlyRate: Number(formData.hourlyRate),
        description: formData.description,
        location: formData.location,
        image: imageUrl,
      });

      await bikeAPI.createBike({
        name: formData.name,
        type: formData.type,
        hourlyRate: Number(formData.hourlyRate),
        description: formData.description,
        location: formData.location,
        image: imageUrl,
      });

      toast({
        title: "Bike listed!",
        description: "Your bike is now available.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      navigate("/bikes");
    } catch (error) {
      const err = error as Error;
      toast({
        title: "Failed to create bike",
        description: err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return (
    <Box
      maxW="600px"
      mx="auto"
      mt={16}
      p={8}
      bg="white"
      borderRadius="xl"
      boxShadow="xl"
    >
      <Heading mb={8} fontSize="2xl">
        List your own bike!
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={6} align="stretch">
          <FormControl isRequired>
            <FormLabel fontWeight="600">Name</FormLabel>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Bike name"
              borderRadius="full"
              bg="#f8f8f8"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel fontWeight="600">Type</FormLabel>
            <Select
              name="type"
              value={formData.type}
              onChange={handleChange}
              borderRadius="full"
              bg="#f8f8f8"
            >
              <option value="mountain">Mountain</option>
              <option value="road">Road</option>
              <option value="electric">Electric</option>
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel fontWeight="600">Hourly Rate</FormLabel>
            <Input
              name="hourlyRate"
              type="number"
              value={formData.hourlyRate}
              onChange={handleChange}
              placeholder="$ / hour"
              borderRadius="full"
              bg="#f8f8f8"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel fontWeight="600">Description</FormLabel>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write a description..."
              resize="none"
              borderRadius="xl"
              bg="#f8f8f8"
              minH="100px"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel fontWeight="600">Location</FormLabel>
            <Input
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="City, area"
              borderRadius="full"
              bg="#f8f8f8"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontWeight="600">Bike Image</FormLabel>
            <Input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              borderRadius="full"
              bg="#f8f8f8"
              p={2}
            />
          </FormControl>
          <HStack justify="center" pt={4} spacing={4}>
            <Button
              type="submit"
              w="200px"
              h="56px"
              fontSize="16px"
              fontWeight="600"
              color="#D4AF37"
              bg="#1B263B"
              borderRadius="40px"
              _hover={{ bg: "#27374D", color: "#FFD700" }}
            >
              Submit
            </Button>
            <Button
              type="button"
              variant="outline"
              w="200px"
              h="56px"
              border="1px solid #816a1eff"
              textColor="#816a1eff"
              borderRadius="full"
              px={8}
              onClick={() => navigate("/bikes")}
            >
              Cancel
            </Button>
          </HStack>
        </VStack>
      </form>
    </Box>
  );
};
