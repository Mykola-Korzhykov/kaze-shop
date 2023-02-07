export interface ProductCreationAttrs {
  title: string;
  decription: string;
  ownerId?: number;
  adminId?: number;
  images: string[];
  price: number;
  sizeChartImage: string;
  sizes: string[];
  colours: string[];
}

export interface CategoryCreationAtrb {
  title: string;
  description: string;
}
