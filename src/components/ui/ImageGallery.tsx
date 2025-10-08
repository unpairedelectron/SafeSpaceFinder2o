'use client';

import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageGalleryProps {
  images: string[];
  alt?: string;
  className?: string;
  aspectRatio?: 'square' | 'video' | 'portrait';
}

export function ImageGallery({ 
  images, 
  alt = 'Gallery image',
  className,
  aspectRatio = 'video'
}: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setZoom(1);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
    document.body.style.overflow = '';
  };

  const nextImage = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % images.length);
      setZoom(1);
    }
  };

  const prevImage = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
      setZoom(1);
    }
  };

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.5, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.5, 1));

  const aspectRatioClass = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
  }[aspectRatio];

  if (images.length === 0) {
    return (
      <div className={cn('bg-gray-100 rounded-lg flex items-center justify-center', aspectRatioClass, className)}>
        <p className="text-gray-400">No images available</p>
      </div>
    );
  }

  return (
    <>
      {/* Gallery Grid */}
      <div className={cn('grid gap-2', className)}>
        {images.length === 1 && (
          <button
            onClick={() => openLightbox(0)}
            className={cn(
              'relative overflow-hidden rounded-lg group cursor-pointer',
              aspectRatioClass
            )}
          >
            <img
              src={images[0]}
              alt={alt}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          </button>
        )}

        {images.length === 2 && (
          <div className="grid grid-cols-2 gap-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => openLightbox(index)}
                className={cn(
                  'relative overflow-hidden rounded-lg group cursor-pointer',
                  aspectRatioClass
                )}
              >
                <img
                  src={image}
                  alt={`${alt} ${index + 1}`}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </button>
            ))}
          </div>
        )}

        {images.length >= 3 && (
          <div className="grid grid-cols-4 gap-2">
            {/* Main Image */}
            <button
              onClick={() => openLightbox(0)}
              className={cn(
                'col-span-2 row-span-2 relative overflow-hidden rounded-lg group cursor-pointer',
                'aspect-square md:aspect-video'
              )}
            >
              <img
                src={images[0]}
                alt={alt}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </button>

            {/* Side Images */}
            {images.slice(1, 5).map((image, index) => (
              <button
                key={index + 1}
                onClick={() => openLightbox(index + 1)}
                className={cn(
                  'relative overflow-hidden rounded-lg group cursor-pointer aspect-square',
                  index === 3 && images.length > 5 && 'relative'
                )}
              >
                <img
                  src={image}
                  alt={`${alt} ${index + 2}`}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                {index === 3 && images.length > 5 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-white text-xl font-bold">
                      +{images.length - 5}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Controls */}
            <div className="absolute top-4 left-4 flex gap-2 z-10">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleZoomOut();
                }}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                disabled={zoom === 1}
              >
                <ZoomOut className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleZoomIn();
                }}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                disabled={zoom === 3}
              >
                <ZoomIn className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Image Counter */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 rounded-full text-white text-sm z-10">
              {selectedIndex + 1} / {images.length}
            </div>

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-4 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </>
            )}

            {/* Image */}
            <motion.img
              key={selectedIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: zoom, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={images[selectedIndex]}
              alt={`${alt} ${selectedIndex + 1}`}
              className="max-w-[90vw] max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ImageGallery;
