export interface ProductModelServer {
    id: Number;
    name: String;
    category: String;
    description: String;
    image: String;
    price: Number;
    quantity: Number;
    images: String;
  }
  
  
  export interface ServerResponse  {
    count: number;
    products: ProductModelServer[]
  };
  
  export interface DatabaseProductModel  {
    id: Number;
    title: string;
    image: string;
    images: string;
    description: string;
    price: Number;
    quantity: Number;
    short_desc: string;
    cat_id: Number;
    
    
  };