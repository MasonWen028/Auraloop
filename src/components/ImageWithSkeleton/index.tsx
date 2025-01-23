import React, { CSSProperties, useState } from "react";
import { Skeleton } from "antd";
import "antd/dist/reset.css";

interface ImageWithSkeletonProps {
  src: string;
  alt: string;
  style?: CSSProperties;
  skeletonStyle?: CSSProperties;
  defaultSrc?: string
}


const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({ src, alt, style, skeletonStyle, defaultSrc}) => {
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
          style={{ width: "100%", height: "100%", ...skeletonStyle }}
        />
      )}
      {/* Image */}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoading(false)}
        onError={defaultSrc ? handleError : undefined}
        style={{
          display: isLoading ? "none" : "block",
          width: "100%",
          height: "100%",
        }}
      />
    </>
  );
};

export default ImageWithSkeleton;
