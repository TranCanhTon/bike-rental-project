import { useState, useEffect } from "react";
import { bikeAPI } from "../../services/API/bike";
import { Box, Text, Image } from "@chakra-ui/react";
import type { Bike } from "../../types/Bikes";

import { Link } from "react-router-dom";

import { ImagePage } from "./components/image-page";

export const BikePage = () => {
  const [bikes, setBikes] = useState<Bike[]>([]);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const bike = await bikeAPI.getAllBikes();
        console.log("data from backend:", bike);
        setBikes(bike);
      } catch (error) {
        console.error("Failed to fetch", error);
      }
    };
    fetchTest();
  }, []);

  const BACKEND_URL = "http://localhost:5000";

  return (
    <Box>
      <ImagePage />
      <Box
        display="grid"
        gridTemplateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={6}
        p={4}
        mt="10px"
      >
        {bikes.map((data, index) => (
          <Link to={`/bikes/${data._id}`}>
            <Box
              key={index}
              borderWidth="1px"
              borderRadius="md"
              overflow="hidden"
              boxShadow="sm"
              bgColor="#1B263B"
              mb="20px"
              _hover={{ boxShadow: "md", cursor: "pointer" }}
            >
              <Image
                src={`${BACKEND_URL}${data.image}`}
                alt={data.name}
                objectFit="cover"
                width="100%"
                height="250px"
              />
              <Box p={3}>
                <Text
                  fontWeight="500"
                  color="white"
                  fontSize="md"
                  noOfLines={1}
                >
                  {data.name}
                </Text>

                <Text fontSize="14px" color="#808080">
                  {data.location} &bull; ${data.hourlyRate}/hr
                </Text>
                <Text fontSize="14px" color="#808080">
                  Type: {data.type}
                </Text>
                <Text fontSize="14px" color="#808080">
                  {data.isAvailable ? "Available" : "Unavailable"}
                </Text>
              </Box>
            </Box>
          </Link>
        ))}
      </Box>
    </Box>
  );
};
