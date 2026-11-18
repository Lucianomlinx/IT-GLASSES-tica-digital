export type Product = {
  id: number;
  code: string;
  name: string;
  /** grau | sol | contato */
  category: string;
  priceCents: number;
  color: string;
  material: string;
  shape: string;
  description: string;
  imageUrl: string;
  featured: boolean;
  active: boolean;
};
