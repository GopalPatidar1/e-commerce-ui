import Link from "next/link";

import ProductCard from "@/components/shop/ProductCard";
import { getProducts } from "@/lib/api/productsServer";

export default async function ProductsPage() {
    let products: any = [];
    products = await getProducts();

    return (
        <main className="shop-page">
            <header className="shop-header">
                <div>
                    <span className="eyebrow">OUR STORE</span>

                    <h1>Products</h1>

                    <p>
                        Discover products you'll love.
                    </p>
                </div>
                <div className="flex flex-row gap-4">
                    <Link href="/orders" className="cart-link">
                        View Order
                    </Link>

                    <Link href="/cart" className="cart-link">
                        View Cart
                    </Link>
                </div>
            </header>

            {products.length === 0 ? (
                <div className="empty-products">
                    <h2>No products found</h2>
                    <p>
                        There are currently no products available.
                    </p>
                </div>
            ) : (
                <section className="product-grid">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}
                </section>
            )}
        </main>
    );
}
