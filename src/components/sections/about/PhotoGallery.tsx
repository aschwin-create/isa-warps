"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import { X, ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import type { GalleryCategory } from "@/types";
import {
  fetchFlickrPhotos,
  getFlickrLargeImage,
  categorizePhoto,
  type FlickrPhoto,
} from "@/lib/flickr";

type FilterCategory = "all" | GalleryCategory;

const categories: FilterCategory[] = [
  "all",
  "action",
  "portrait",
  "training",
  "team",
];

const categoryLabels: Record<FilterCategory, Record<string, string>> = {
  all: { nl: "Alle", en: "All", id: "Semua", de: "Alle", fr: "Tous" },
  action: { nl: "Actie", en: "Action", id: "Aksi", de: "Action", fr: "Action" },
  portrait: { nl: "Portret", en: "Portrait", id: "Potret", de: "Porträt", fr: "Portrait" },
  training: { nl: "Training", en: "Training", id: "Latihan", de: "Training", fr: "Entraînement" },
  team: { nl: "Team", en: "Team", id: "Tim", de: "Team", fr: "Équipe" },
};

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory;
  link: string;
}

export function PhotoGallery() {
  const t = useTranslations("About.gallery");
  const locale = useLocale();
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [flickrPhotos, setFlickrPhotos] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch Flickr photos on mount
  useEffect(() => {
    async function loadFlickrPhotos() {
      try {
        console.log("Fetching Flickr photos...");
        const photos = await fetchFlickrPhotos();
        console.log("Flickr photos received:", photos.length);

        const mappedPhotos: GalleryImage[] = photos.map((photo) => ({
          id: photo.id,
          src: getFlickrLargeImage(photo.media.m),
          alt: photo.title || "Isa Warps",
          category: categorizePhoto(photo),
          link: photo.link,
        }));

        console.log("Mapped photos:", mappedPhotos.length);
        setFlickrPhotos(mappedPhotos);
      } catch (error) {
        console.error("Failed to load Flickr photos:", error);
      } finally {
        setLoading(false);
      }
    }
    loadFlickrPhotos();
  }, []);

  const filteredImages =
    activeCategory === "all"
      ? flickrPhotos
      : flickrPhotos.filter((img) => img.category === activeCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  }, []);

  const goToPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex(
      lightboxIndex === 0 ? filteredImages.length - 1 : lightboxIndex - 1
    );
  }, [lightboxIndex, filteredImages.length]);

  const goToNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex(
      lightboxIndex === filteredImages.length - 1 ? 0 : lightboxIndex + 1
    );
  }, [lightboxIndex, filteredImages.length]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, closeLightbox, goToPrev, goToNext]);

  return (
    <section className="bg-surface-alt">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12 py-24 md:py-32">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-[10px] font-heading font-bold uppercase tracking-[0.3em] text-text-muted mb-4">
            Gallery
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-black text-primary uppercase tracking-tight">
            {t("title")}
          </h2>
          <p className="text-sm text-text-muted mt-2">
            Live stream van{" "}
            <a
              href="https://www.flickr.com/photos/203669814@N08/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-red hover:underline"
            >
              Flickr
            </a>
          </p>
        </motion.div>

        {/* Filter Buttons - sharp, Nike-style */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2.5 text-[11px] font-heading font-bold uppercase tracking-[0.15em] transition-all duration-300",
                activeCategory === category
                  ? "bg-primary text-text-inverse"
                  : "bg-transparent text-text-muted border border-border hover:border-primary hover:text-primary"
              )}
            >
              {categoryLabels[category][locale] ||
                categoryLabels[category]["en"]}
            </button>
          ))}
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-accent-red animate-spin" />
          </div>
        )}

        {/* Empty state */}
        {!loading && filteredImages.length === 0 && (
          <div className="text-center py-20">
            <p className="text-text-muted">Geen foto's gevonden</p>
          </div>
        )}

        {/* Image Grid - clean, sharp edges */}
        {!loading && filteredImages.length > 0 && (
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[1px] bg-border"
          >
            {filteredImages.map((image, index) => {
              const isLarge = index === 0 || index === 5;

              return (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.03 }}
                  className={cn(
                    "group relative overflow-hidden cursor-pointer bg-surface",
                    isLarge ? "md:col-span-2 md:row-span-2" : ""
                  )}
                  onClick={() => openLightbox(index)}
                >
                  <div className="relative w-full overflow-hidden aspect-square">
                    <Image
                      src={image.src}
                      alt={image.alt || ""}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Hover overlay - editorial style */}
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/60 transition-all duration-500 flex items-end">
                      <div className="p-4 md:p-6 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                        <p className="text-[10px] font-heading font-bold uppercase tracking-[0.25em] text-accent-red mb-1">
                          {categoryLabels[image.category][locale] ||
                            categoryLabels[image.category]["en"]}
                        </p>
                        <p className="text-text-inverse text-sm font-heading font-semibold line-clamp-2">
                          {image.alt}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Lightbox - minimal, Nike dark */}
        <AnimatePresence>
          {lightboxIndex !== null && filteredImages[lightboxIndex] && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-primary/95 p-4 md:p-8"
              onClick={closeLightbox}
            >
              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute top-6 right-6 z-50 p-3 text-text-inverse/60 hover:text-text-inverse transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Prev button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrev();
                }}
                className="absolute left-6 z-50 p-3 text-text-inverse/40 hover:text-text-inverse transition-colors"
                aria-label="Previous"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>

              {/* Next button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                className="absolute right-6 z-50 p-3 text-text-inverse/40 hover:text-text-inverse transition-colors"
                aria-label="Next"
              >
                <ArrowRight className="w-6 h-6" />
              </button>

              {/* Image */}
              <motion.div
                key={lightboxIndex}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative w-full max-w-5xl max-h-[80vh] aspect-video"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={filteredImages[lightboxIndex].src}
                  alt={filteredImages[lightboxIndex].alt || ""}
                  fill
                  sizes="(max-width: 1024px) 100vw, 80vw"
                  className="object-contain"
                  priority
                />
              </motion.div>

              {/* Caption - minimal */}
              <div className="absolute bottom-8 left-0 right-0 text-center px-4">
                <p className="text-text-inverse/60 text-sm font-heading max-w-2xl mx-auto">
                  {filteredImages[lightboxIndex].alt}
                </p>
                <p className="text-text-inverse/30 text-xs font-heading mt-2 tracking-[0.2em] uppercase">
                  {lightboxIndex + 1} / {filteredImages.length}
                </p>
                <a
                  href={filteredImages[lightboxIndex].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 text-xs text-accent-red hover:text-accent-red/80 transition-colors uppercase tracking-wider"
                  onClick={(e) => e.stopPropagation()}
                >
                  Bekijk op Flickr
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
