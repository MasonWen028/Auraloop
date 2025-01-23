import React, { CSSProperties, useState } from "react";
import { Skeleton } from "antd";
import "antd/dist/reset.css";

interface ImageWithSkeletonProps {
  src?: string;
  alt: string;
  style?: CSSProperties;
  skeletonStyle?: CSSProperties;
  defaultSrc?: string;
  className?: string
}


const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({ src, alt, style, skeletonStyle, defaultSrc, className}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSrc, setCurrentSrc] = useState(src);

  const handleError = () => {
    if (defaultSrc) {
      setCurrentSrc(defaultSrc);
    }
  };

  return (
    <>
      {/* Skeleton Loader */}
      {isLoading && (
        <Skeleton.Image
          active
          className={className}
          style={{...skeletonStyle }}
        />
      )}
      {/* Image */}
      <img
        className={className}
        src={src}
        alt={alt}
        onLoad={() => setIsLoading(false)}
        onError={defaultSrc ? handleError : undefined}
        style={{
          display: isLoading ? "none" : "block"
        }}
      />
    </>
  );
};

export default ImageWithSkeleton;
