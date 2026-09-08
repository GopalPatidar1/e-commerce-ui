import type { Product } from "@/types/product";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
}

export async function getProducts(): Promise<Product[]> {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("access_token")?.value;

    const response = await fetch(`${API_URL}/products`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Cookie: `access_token=${accessToken}`,
        },
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }

    return response.json();
}
