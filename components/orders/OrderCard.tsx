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
                {/* {order.map((item) => ( */}
                <div
                    key={order.id}
                    className="order-product"
                >
                    <img
                        src={`${process.env.NEXT_PUBLIC_API_URL}${order.product.img_path}`}
                        alt={order.product.name}
                    />

                    <div className="order-product-info">
                        <h3>{order.product.name}</h3>

                        <p>
                            ₹{order.amount.toFixed(2)} ×{" "}
                            {order.quantity}
                        </p>
                    </div>

                    <strong>
                        ₹
                        {(
                            order.amount * order.quantity
                        ).toFixed(2)}
                    </strong>
                </div>
                {/* ))} */}
            </div>

            <div className="order-card-footer">
                <span>
                    {order.quantity}{" "}
                    {order.quantity === 1
                        ? "product"
                        : "products"}
                </span>

                <strong>
                    Total: ₹{order.amount.toFixed(2)}
                </strong>
            </div>
        </article>
    );
}
