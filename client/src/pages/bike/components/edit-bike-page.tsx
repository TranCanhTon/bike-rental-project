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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { bikeAPI } from "@/services/API/bike";

export const EditBikePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [formData, setFormData] = useState({
    name: "",
    type: "mountain",
    hourlyRate: "",
    description: "",
    location: "",
    image: null as File | null,
  });

  useEffect(() => {
    const fetchBike = async () => {
      if (!id) return;
      const bike = await bikeAPI.getSingleBike(id);
      setFormData({
        name: bike.name,
        type: bike.type,
        hourlyRate: String(bike.hourlyRate),
        description: bike.description,
        location: bike.location,
        image: null,
      });
    };
    fetchBike();
  }, [id]);

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

      await bikeAPI.editBike(id as string, {
        name: formData.name,
        type: formData.type,
        hourlyRate: Number(formData.hourlyRate),
        description: formData.description,
        location: formData.location,
        ...(imageUrl && { image: imageUrl }),
      });

      toast({
        title: "Bike updated!",
        description: "Your listing has been updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });

      navigate(`/bikes/${id}`);
    } catch (error) {
      const err = error as Error;
      toast({
        title: "Update failed",
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
      <Heading mb={8} fontSize="2xl" color="#1B263B">
        Edit Bike Listing
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={6} align="stretch">
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input name="name" value={formData.name} onChange={handleChange} />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Type</FormLabel>
            <Select name="type" value={formData.type} onChange={handleChange}>
              <option value="mountain">Mountain</option>
              <option value="road">Road</option>
              <option value="electric">Electric</option>
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Hourly Rate</FormLabel>
            <Input
              name="hourlyRate"
              type="number"
              value={formData.hourlyRate}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Description</FormLabel>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Location</FormLabel>
            <Input
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Update Image</FormLabel>
            <Input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
            />
          </FormControl>

          <Button type="submit" colorScheme="blue" width="full">
            Save Changes
          </Button>
        </VStack>
      </form>
    </Box>
  );
};
