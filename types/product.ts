export interface Product {
    id?: string;
    name: string;
    description: string;
    amount: number;
    img_path: string;
}

export interface CartItem extends Product {
    quantity: number;
}
