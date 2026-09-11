import type { Order } from "@/types/order";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
}

async function handleResponse<T>(
    response: Response
): Promise<T> {
    const data = await response.json().catch(() => null);

    if (!response.ok) {
        throw new Error(
            data?.detail ||
            data?.message ||
            "Something went wrong."
        );
    }

    return data;
}

export async function getMyOrders(): Promise<Order[]> {
    const response = await fetch(
        `${API_URL}/orders`,
        {
            method: "GET",
            credentials: "include",
            cache: "no-store",
        }
    );

    return handleResponse<Order[]>(response);
}


export async function buyProduct(product_id: string, idempotency_key: string): Promise<Order> {
    const response = await fetch(
        `${API_URL}/orders`,
        {
            method: "POST",
            credentials: "include",
            cache: "no-store",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify({ product_id: product_id, idempotency_key: idempotency_key }),
        }
    );

    return handleResponse<Order>(response);
}
