export type OrderStatus =
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";

export interface OrderItem {
    id: string;
    product_id: string;
    product_name: string;
    image_path: string;
    price: number;
    quantity: number;
}

export interface Order {
    id: string;
    status: OrderStatus;
    product: {
        name: string;
        description: string
        img_path: string
    };
    amount: number;
    quantity: number;
    created_at: string;
    updated_at?: string;
    items: OrderItem[];
}
