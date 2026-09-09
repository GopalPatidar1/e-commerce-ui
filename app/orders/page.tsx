"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import OrderCard from "@/components/orders/OrderCard";
import { getMyOrders } from "@/lib/api/orders";
import type { Order } from "@/types/order";

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadOrders() {
            try {
                const data = await getMyOrders();
                setOrders(data.result);
            } catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
                        : "Unable to load orders."
                );
            } finally {
                setLoading(false);
            }
        }

        loadOrders();
    }, []);

    const ongoingOrders = orders.filter(
        (order) =>
            !["delivered", "cancelled"].includes(
                order.status
            )
    );

    const pastOrders = orders.filter((order) =>
        ["delivered", "cancelled"].includes(
            order.status
        )
    );

    return (
        <main className="orders-page">
            <header className="orders-header">
                <div>
                    <span className="eyebrow">
                        MY ACCOUNT
                    </span>

                    <h1>My Orders</h1>

                    <p>
                        Track your current orders and view your
                        order history.
                    </p>
                </div>

                <Link
                    href="/products"
                    className="back-link"
                >
                    ← Continue Shopping
                </Link>
            </header>

            {loading && (
                <div className="orders-state">
                    Loading your orders...
                </div>
            )}

            {error && (
                <div className="form-error orders-error">
                    {error}
                </div>
            )}

            {!loading && !error && (
                <>
                    <section className="orders-section">
                        <div className="section-heading">
                            <div>
                                <h2>Ongoing Orders</h2>
                                <p>
                                    Orders that are currently being
                                    processed or delivered.
                                </p>
                            </div>

                            <span className="order-count">
                                {ongoingOrders.length}
                            </span>
                        </div>

                        {ongoingOrders.length === 0 ? (
                            <div className="orders-empty">
                                <h3>No ongoing orders</h3>

                                <p>
                                    You don't have any active orders
                                    right now.
                                </p>

                                <Link
                                    href="/products"
                                    className="buy-button browse-button"
                                >
                                    Shop Products
                                </Link>
                            </div>
                        ) : (
                            <div className="orders-list">
                                {ongoingOrders.map((order) => (
                                    <OrderCard
                                        key={order.id}
                                        order={order}
                                    />
                                ))}
                            </div>
                        )}
                    </section>

                    <section className="orders-section">
                        <div className="section-heading">
                            <div>
                                <h2>Past Orders</h2>
                                <p>
                                    Your completed and cancelled orders.
                                </p>
                            </div>

                            <span className="order-count">
                                {pastOrders.length}
                            </span>
                        </div>

                        {pastOrders.length === 0 ? (
                            <div className="orders-empty">
                                <h3>No past orders</h3>

                                <p>
                                    Your order history will appear here.
                                </p>
                            </div>
                        ) : (
                            <div className="orders-list">
                                {pastOrders.map((order) => (
                                    <OrderCard
                                        key={order.id}
                                        order={order}
                                    />
                                ))}
                            </div>
                        )}
                    </section>
                </>
            )}
        </main>
    );
}
