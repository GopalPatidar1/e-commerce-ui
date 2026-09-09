"use client";

import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";

import type { CartItem, Product } from "@/types/product";
import { getMyCarts, addToCartApi, removeFromCartApi } from "@/lib/api/cartServer";

interface CartContextType {
    items: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    increaseQuantity: (productId: string) => void;
    decreaseQuantity: (productId: string) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(
    undefined
);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<any[]>([]);

    // Load cart from browser storage

    const loadCart = async () => {
        const savedCart = await getMyCarts();

        try {
            setItems(savedCart);
        } catch {
            localStorage.removeItem("cart");
        }
    }

    useEffect(() => {
        loadCart()
    }, []);

    // Save cart whenever it changes
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(items));
    }, [items]);

    async function addToCart(product: Product) {
        if (!product?.id) return
        await addToCartApi(product.id)
        await loadCart()
    }

    async function removeFromCart(productId: string) {
        await removeFromCartApi(productId)
        await loadCart()
    }

    function increaseQuantity(productId: string) {
        setItems((currentItems) =>
            currentItems.map((item) =>
                item.id === productId
                    ? {
                        ...item,
                        quantity: item.quantity + 1,
                    }
                    : item
            )
        );
    }

    function decreaseQuantity(productId: string) {
    }

    function clearCart() {
    }

    const totalItems = useMemo(
        () =>
            0,
        [items]
    );

    const totalPrice = useMemo(
        () =>
            0,
        [items]
    );

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                increaseQuantity,
                decreaseQuantity,
                clearCart,
                totalItems,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error(
            "useCart must be used inside CartProvider"
        );
    }

    return context;
}
