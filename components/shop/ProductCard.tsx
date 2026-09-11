"use client";

import type { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { buyProduct } from "@/lib/api/orders";
import { useCallback, useState, useRef } from "react";

interface ProductCardProps {
  product: Product;
}
const idempotency_key = crypto.randomUUID();

export default function ProductCard({ product }: ProductCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { addToCart } = useCart();

  // Prevent multiple simultaneous requests 
  const requestInProgress = useRef(false); // One key belongs to one purchase attempt 
  const idempotencyKey = useRef<string | null>(null);

  const buyProductFun = useCallback(async (id: string) => {
    if (requestInProgress.current) { return; }
    requestInProgress.current = true;
    setIsLoading(true);
    try {
      if (!idempotencyKey.current) { idempotencyKey.current = crypto.randomUUID(); }
      const key = idempotencyKey.current;

      const result = await buyProduct(id, key);
      if (result?.payment_url) window.location.href = result.payment_url;
      idempotencyKey.current = null;
    } catch (ee) { }

    finally {
      requestInProgress.current = false;
      setIsLoading(false)
    }
  }, [isLoading])

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
              disabled={isLoading}
              onClick={async () => {
                if (!product.id) return
                buyProductFun(product.id)
              }}
            >
              Buy
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
