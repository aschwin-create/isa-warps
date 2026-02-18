export type GalleryCategory = "action" | "portrait" | "training" | "team";

export interface GalleryImage {
  id: string;
  src: string;
  alt: Record<string, string>;
  category: GalleryCategory;
  width: number;
  height: number;
}
