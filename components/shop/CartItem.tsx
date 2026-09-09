"use client";

import type { CartItem as CartItemType } from "@/types/product";
import { useCart } from "@/context/CartContext";

interface CartItemProps {
    item: CartItemType;
}

export default function CartItem({
    item,
}: CartItemProps) {
    const {
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
    } = useCart();

    return (
        <article className="cart-item">
            <img
                src={`${process.env.NEXT_PUBLIC_API_URL}${item.product.img_path}`}
                alt={item.name}
                className="cart-item-image"
            />

            <div className="cart-item-info">
                <h3>{item.product.name}</h3>

                <p>
                    ₹{item.product.amount.toFixed(2)}
                </p>

                <div className="quantity-control">
                    <button
                        onClick={() => decreaseQuantity(item.product.id)}
                        aria-label="Decrease quantity"
                    >
                        −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                        onClick={() => increaseQuantity(item.product.id)}
                        aria-label="Increase quantity"
                    >
                        +
                    </button>
                </div>
            </div>

            <div className="cart-item-actions">
                <button
                    className="remove-button"
                    onClick={() => removeFromCart(item.id)}
                >
                    Remove
                </button>
            </div>
        </article>
    );
}
