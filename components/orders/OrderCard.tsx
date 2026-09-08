import type { Order } from "@/types/order";

interface OrderCardProps {
    order: Order;
}

const statusLabels: Record<string, string> = {
    pending: "Pending",
    confirmed: "Confirmed",
    processing: "Processing",
    shipped: "Shipped",
    delivered: "Delivered",
    cancelled: "Cancelled",
};

export default function OrderCard({
    order,
}: OrderCardProps) {
    const statusLabel =
        statusLabels[order.status] ?? order.status;

    const orderDate = new Date(
        order.created_at
    ).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

    return (
        <article className="order-card">
            <div className="order-card-header">
                <div>
                    <span className="order-label">
                        ORDER
                    </span>

                    <h2>#{order.id}</h2>

                    <p>{orderDate}</p>
                </div>

                <span
                    className={`order-status status-${order.status}`}
                >
                    {statusLabel}
                </span>
            </div>

            <div className="order-products">
                {order.items.map((item) => (
                    <div
                        key={item.id}
                        className="order-product"
                    >
                        <img
                            src={item.image_path}
                            alt={item.product_name}
                        />

                        <div className="order-product-info">
                            <h3>{item.product_name}</h3>

                            <p>
                                ₹{item.price.toFixed(2)} ×{" "}
                                {item.quantity}
                            </p>
                        </div>

                        <strong>
                            ₹
                            {(
                                item.price * item.quantity
                            ).toFixed(2)}
                        </strong>
                    </div>
                ))}
            </div>

            <div className="order-card-footer">
                <span>
                    {order.items.length}{" "}
                    {order.items.length === 1
                        ? "product"
                        : "products"}
                </span>

                <strong>
                    Total: ₹{order.total_amount.toFixed(2)}
                </strong>
            </div>
        </article>
    );
}
