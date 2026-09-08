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
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        }
    );

    return handleResponse<Order[]>(response);
}
