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
        `${API_URL}/carts/`,
        {
            method: "GET",
            credentials: "include",
            cache: "no-store",
        }
    );

    return handleResponse<OrderItem[]>(response);
}


export async function addToCartApi(
    product_id: string
): Promise<any> {
    const response = await fetch(
        `${API_URL}/carts/`,
        {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify({ product_id: product_id }),
        }
    );

    const data = await response
        .json()
        .catch(() => null);

    if (!response.ok) {
        throw new Error(
            data?.detail ||
            data?.message ||
            "Failed to create product."
        );
    }

    return data;
}


export async function removeFromCartApi(
    product_id: string
): Promise<any> {
    const response = await fetch(
        `${API_URL}/carts/${product_id}`,
        {
            method: "DELETE",
            credentials: "include",
        }
    );

    const data = await response
        .json()
        .catch(() => null);

    if (!response.ok) {
        throw new Error(
            data?.detail ||
            data?.message ||
            "Failed to Delete Cart."
        );
    }

    return data;
}

