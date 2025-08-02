import { Box, Heading } from "@chakra-ui/react";
import bike from "@/assets/bikealot.jpg";

export const ImagePage = () => {
  return (
    <Box
      position="relative"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      height="90vh"
      width="100%"
      minWidth="320px"
      p={8}
      bgSize="cover"
      bgPosition="right"
      overflow="hidden"
      backgroundPosition="center"
      backgroundImage={bike}
    >
      <Heading
        textAlign="center"
        color="#D4AF37"
        textShadow="2px 2px #1B263B"
        fontSize="100px"
        mb="500"
      >
        RIDE YOUR WAY
      </Heading>
    </Box>
  );
};
