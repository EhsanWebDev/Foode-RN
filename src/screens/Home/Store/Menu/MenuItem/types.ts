export type productDetails = {
  created_at: Date | null;
  deleted_at: Date | null;
  id: number;
  name: string;
  price: string;
  product_id: number;
  stock: number | string | null;
  updated_at: Date | null;
};
export type ProductType = {
  id: number;
  product_description: string;
  product_image: string;
  product_name: string;
  product_slug: string;
  product_type: string;
  status: string;
  updated_at: Date;
  details: productDetails[];
};
