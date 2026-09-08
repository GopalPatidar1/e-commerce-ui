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
    const [items, setItems] = useState<CartItem[]>([]);

    // Load cart from browser storage
    useEffect(() => {
        const savedCart = localStorage.getItem("cart");

        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch {
                localStorage.removeItem("cart");
            }
        }
    }, []);

    // Save cart whenever it changes
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(items));
    }, [items]);

    function addToCart(product: Product) {
        setItems((currentItems) => {
            const existingItem = currentItems.find(
                (item) => item.id === product.id
            );

            if (existingItem) {
                return currentItems.map((item) =>
                    item.id === product.id
                        ? {
                            ...item,
                            quantity: item.quantity + 1,
                        }
                        : item
                );
            }

            return [
                ...currentItems,
                {
                    ...product,
                    quantity: 1,
                },
            ];
        });
    }

    function removeFromCart(productId: string) {
        setItems((currentItems) =>
            currentItems.filter((item) => item.id !== productId)
        );
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
        setItems((currentItems) =>
            currentItems
                .map((item) =>
                    item.id === productId
                        ? {
                            ...item,
                            quantity: item.quantity - 1,
                        }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    }

    function clearCart() {
        setItems([]);
    }

    const totalItems = useMemo(
        () =>
            items.reduce(
                (total, item) => total + item.quantity,
                0
            ),
        [items]
    );

    const totalPrice = useMemo(
        () =>
            items.reduce(
                (total, item) => total + item.amount * item.quantity,
                0
            ),
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
