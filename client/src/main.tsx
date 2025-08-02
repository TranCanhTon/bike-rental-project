import { ChakraProvider } from "@chakra-ui/react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { CartProvider } from "./context/cart-provider";

createRoot(document.getElementById("root")!).render(
  <ChakraProvider>
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </ChakraProvider>
);
