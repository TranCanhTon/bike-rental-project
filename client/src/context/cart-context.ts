import { createContext } from "react";
import type { CartContextType } from "@/types/Order";

export const CartContext = createContext<CartContextType | null>(null);
