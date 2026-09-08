"use client";

import {
    FormEvent,
    useState,
} from "react";

import { createProduct } from "@/lib/api/products";

export default function NewProductPage() {
    const [name, setName] = useState("");
    const [description, setDescription] =
        useState("");
    const [amount, setAmount] = useState("");
    const [image, setImage] =
        useState<File | null>(null);

    const [loading, setLoading] =
        useState(false);
    const [error, setError] =
        useState("");
    const [success, setSuccess] =
        useState("");

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        setError("");
        setSuccess("");

        if (!image) {
            setError("Please select a product image.");
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();

            formData.append("name", name);
            formData.append(
                "description",
                description
            );
            formData.append("amount", amount);
            formData.append("image", image);

            await createProduct(formData);

            setSuccess(
                "Product created successfully."
            );

            setName("");
            setDescription("");
            setAmount("");
            setImage(null);

            const fileInput =
                document.getElementById(
                    "image"
                ) as HTMLInputElement | null;

            if (fileInput) {
                fileInput.value = "";
            }
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Unable to create product."
            );
        } finally {
            setLoading(false);
        }

    }

    return (<main className="admin-page"> <div className="admin-form-container"> <div className="admin-form-header"> <span className="eyebrow">
        ADMINISTRATION </span>

        <h1>Add Product</h1>

        <p>
            Create a new product for your store.
        </p>
    </div>

        <form
            onSubmit={handleSubmit}
            className="admin-form"
        >
            {error && (
                <div className="form-error">
                    {error}
                </div>
            )}

            {success && (
                <div className="form-success">
                    {success}
                </div>
            )}

            <div className="form-field">
                <label htmlFor="name">
                    Product name
                </label>

                <input
                    id="name"
                    type="text"
                    placeholder="Wireless Headphones"
                    value={name}
                    onChange={(event) =>
                        setName(event.target.value)
                    }
                    required
                />
            </div>

            <div className="form-field">
                <label htmlFor="description">
                    Description
                </label>

                <textarea
                    id="description"
                    placeholder="Describe your product..."
                    value={description}
                    onChange={(event) =>
                        setDescription(
                            event.target.value
                        )
                    }
                    required
                />
            </div>

            <div className="form-field">
                <label htmlFor="amount">
                    Amount
                </label>

                <input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="4999"
                    value={amount}
                    onChange={(event) =>
                        setAmount(event.target.value)
                    }
                    required
                />
            </div>

            <div className="form-field">
                <label htmlFor="image">
                    Product image
                </label>

                <input
                    id="image"
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={(event) =>
                        setImage(
                            event.target.files?.[0] ??
                            null
                        )
                    }
                    required
                />

                <span className="field-hint">
                    PNG, JPG or WebP image.
                </span>
            </div>

            <button
                type="submit"
                className="auth-button"
                disabled={loading}
            >
                {loading
                    ? "Creating product..."
                    : "Create Product"}
            </button>
        </form>
    </div>
    </main>

    );
}
