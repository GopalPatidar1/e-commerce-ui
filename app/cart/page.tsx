"use client";

import Link from "next/link";
import CartItem from "@/components/shop/CartItem";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
    const {
        items,
        totalItems,
        totalPrice,
        clearCart,
    } = useCart();

    function handleBuy() {
        // Later this will call your Python API.
        console.log("Buying:", items);

        alert(
            `Order placed for ₹${totalPrice.toFixed(2)}`
        );

        clearCart();
    }

    if (items.length === 0) {
        return (
            <main className="cart-page">
                <div className="cart-header">
                    <div>
                        <span className="eyebrow">SHOPPING CART</span>
                        <h1>Your Cart</h1>
                    </div>

                    <Link href="/products" className="back-link">
                        ← Continue Shopping
                    </Link>
                </div>

                <div className="empty-cart">
                    <div className="empty-cart-icon">🛒</div>

                    <h2>Your cart is empty</h2>

                    <p>
                        Looks like you haven't added anything yet.
                    </p>

                    <Link
                        href="/products"
                        className="auth-button empty-cart-button"
                    >
                        Browse Products
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="cart-page">
            <div className="cart-header">
                <div>
                    <span className="eyebrow">SHOPPING CART</span>

                    <h1>Your Cart</h1>

                    <p>
                        {totalItems}{" "}
                        {totalItems === 1 ? "item" : "items"} in your cart
                    </p>
                </div>

                <Link href="/products" className="back-link">
                    ← Continue Shopping
                </Link>
            </div>

            <div className="cart-layout">
                <section className="cart-items">
                    {items.map((item) => (
                        <CartItem
                            key={item.id}
                            item={item}
                        />
                    ))}
                </section>

                <aside className="cart-summary">
                    <h2>Order Summary</h2>

                    <div className="summary-row">
                        <span>Items</span>
                        <span>{totalItems}</span>
                    </div>

                    <div className="summary-row">
                        <span>Subtotal</span>
                        <span>₹{totalPrice.toFixed(2)}</span>
                    </div>

                    <div className="summary-row">
                        <span>Shipping</span>
                        <span>Free</span>
                    </div>

                    <div className="summary-divider" />

                    <div className="summary-total">
                        <span>Total</span>
                        <strong>
                            ₹{totalPrice.toFixed(2)}
                        </strong>
                    </div>

                    <button
                        className="checkout-button"
                        onClick={handleBuy}
                    >
                        Buy Products
                    </button>

                    <button
                        className="clear-cart-button"
                        onClick={clearCart}
                    >
                        Clear Cart
                    </button>
                </aside>
            </div>
        </main>
    );
}
