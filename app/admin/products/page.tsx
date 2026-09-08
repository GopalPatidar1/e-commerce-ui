import Link from "next/link";
import { getProducts } from "@/lib/api/productsServer";
import ProductCard from "@/components/shop/ProductCard";

export default async function AdminProductsPage() {
    let products: any = [];

    try {
        products = await getProducts();
    } catch (error) {
        console.error("Failed to load products:", error);
    }
    return (
        <main className="admin-page">
            <header className="admin-header">
                <div>
                    <span className="eyebrow">
                        ADMINISTRATION
                    </span>

                    <h1>Products</h1>

                    <p>
                        Manage products available in your store.
                    </p>
                </div>

                <Link
                    href="/admin/products/new"
                    className="admin-primary-button"
                >
                    + Add Product
                </Link>
            </header>

            {products.length === 0 ? (
                <section className="admin-panel">
                    <div className="admin-panel-header">
                        <div>
                            <h2>Product Management</h2>

                            <p>
                                Add and manage products from the
                                administration panel.
                            </p>
                        </div>
                    </div>

                    <div className="admin-placeholder">
                        <h3>Product management</h3>

                        <p>
                            Your product list will appear here.
                        </p>

                        <Link
                            href="/admin/products/new"
                            className="buy-button"
                        >
                            Add Your First Product
                        </Link>
                    </div>
                </section>
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
