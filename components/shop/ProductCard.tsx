"use client";

import type { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { buyProduct } from "@/lib/api/orders";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <article className="product-card">
      <div className="product-image-wrapper">
        <img
          src={`${process.env.NEXT_PUBLIC_API_URL}${product.img_path}`}
          alt={product.name}
          className="product-image"
        />
      </div>

      <div className="product-content">
        <h3>{product.name}</h3>

        <p className="product-description">
          {product.description}
        </p>

        <div className="product-footer">
          <span className="product-price">
            ₹{product.amount.toFixed(2)}
          </span>


          <div className="flex flex-row gap-4">
            <button
              className="buy-button"
              onClick={() => addToCart(product)}
            >
              Cart
            </button>

            <button
              className="buy-button"
              onClick={() => buyProduct(product.id)}
            >
              Buy
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
