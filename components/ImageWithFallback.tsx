"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

interface ImageWithFallbackProps extends ImageProps {
  fallbackSrc?: string;
}

/**
 * Enhanced Image component with error handling and fallback support
 * Prevents "invalid image" errors by logging and displaying fallback UI
 */
export default function ImageWithFallback({
  src,
  alt,
  fallbackSrc = "/images/placeholder.png",
  onError,
  ...props
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = (error: any) => {
    console.error(`Image failed to load: ${src}`, error);

    // Try fallback if not already attempted
    if (imgSrc !== fallbackSrc && fallbackSrc) {
      setImgSrc(fallbackSrc);
    } else {
      setHasError(true);
    }

    // Call original onError if provided
    if (onError) {
      onError(error);
    }
  };

  // If image failed completely, show placeholder UI
  if (hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-800 rounded-lg">
        <div className="text-center">
          <p className="text-gray-400 text-sm">Image unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={handleError}
    />
  );
}
