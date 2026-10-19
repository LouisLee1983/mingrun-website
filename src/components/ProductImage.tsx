import Image from "next/image";
import { imageExists } from "@/lib/images";

type Props = { src?: string; alt: string; label: string; className?: string; priority?: boolean; fit?: "cover" | "contain" };

export default function ProductImage({ src, alt, label, className = "", priority, fit = "cover" }: Props) {
  if (src && imageExists(src)) {
    return (
      <div className={`relative overflow-hidden bg-paper ${className}`}>
        <Image src={src} alt={alt} fill priority={priority} sizes="(max-width: 768px) 100vw, 50vw" className={fit === "cover" ? "object-cover" : "object-contain"} />
      </div>
    );
  }
  return (
    <div className={`relative grid place-items-center overflow-hidden bg-gradient-to-br from-steel to-steel-2 text-white/70 ${className}`}>
      <div className="grid-bg absolute inset-0" />
      <div className="relative flex flex-col items-center gap-2 p-4 text-center">
        <svg width="56" height="56" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <rect x="10" y="30" width="44" height="22" rx="2" />
          <path d="M18 30V16h14l6 14M42 30V20h8v10M14 52v4M50 52v4" />
          <circle cx="24" cy="41" r="5" />
          <circle cx="40" cy="41" r="5" />
        </svg>
        <span className="text-sm font-medium text-white/90">{alt}</span>
        <span className="text-xs">{label}</span>
      </div>
    </div>
  );
}
