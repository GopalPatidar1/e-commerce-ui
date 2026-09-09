import type { OrderItem } from "@/types/cart";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) throw new Error("NEXT_PUBLIC_API_URL is not configured");

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

export async function getMyCarts(): Promise<OrderItem[]> {
    const response = await fetch(
        `${API_URL}/carts`,
        {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        }
    );

    return handleResponse<OrderItem[]>(response);
}
