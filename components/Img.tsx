import type { Img as ImgData } from "@/content/projects";

/** Capture en WebP ; les grandes ont une variante de 760 px pour les petits écrans. */
export function Img({ img, alt, sizes, eager }: { img: ImgData; alt: string; sizes: string; eager?: boolean }) {
  const srcSet = img.w > 900 ? `${img.src.replace(/\.webp$/, "-760.webp")} 760w, ${img.src} ${img.w}w` : undefined;
  return (
    <img
      src={img.src}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      alt={alt}
      width={img.w}
      height={img.h}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
    />
  );
}
