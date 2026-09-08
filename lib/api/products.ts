import type { Product } from "@/types/product";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
}

export async function createProduct(
    formData: FormData
): Promise<Product> {
    const response = await fetch(
        `${API_URL}/products`,
        {
            method: "POST",
            credentials: "include",
            body: formData,
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
