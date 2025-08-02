import { Outlet, Navigate } from "react-router-dom";
import { Navbar } from "@/components/navbar";
import { Box, Flex } from "@chakra-ui/react";
import { Footer } from "@/components/footer";
import bgImage from "@/assets/background.svg";
import { CartDrawer } from "./components/cart-drawer";

export const Layout = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Flex
      direction="column"
      minH="100vh"
      bgImage={`url(${bgImage})`}
      bgSize="cover"
      bgPosition="center"
    >
      <Navbar />
      <Box flex="1">
        <Outlet />
      </Box>
      <Footer />
      <CartDrawer />
    </Flex>
  );
};
