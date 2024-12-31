export interface ProductCart {
    id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
    description: string;
    packaging: string;
    status?:string;
  }

  export interface ProductTypes {
    id: string;
    name: string;
    description: string;
    image: string;
    stock: number;
    sizes: { gram: number; price: number }[]; 
  }