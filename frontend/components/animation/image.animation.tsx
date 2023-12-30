'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface ImageTransitionProps {
  src: string;
  alt: string;
}

const ImageTransition: React.FC<ImageTransitionProps> = ({ src, alt }) => {
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [src]);
  return (
    <motion.img
      key={key}
      id="imageElement"
      src={src}
      alt={alt}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
    />
  );
};

export default ImageTransition;
