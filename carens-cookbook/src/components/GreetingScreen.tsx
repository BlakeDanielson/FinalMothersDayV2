/* eslint-disable @typescript-eslint/no-explicit-any */ // Disabling for persistent any errors
"use client";

import { cn } from "@/lib/utils";
import { useMotionValue, animate, motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useId, useCallback } from "react";
import useMeasure from "react-use-measure";
import { Eye, EyeOff, LockIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

// Import the actual images
import img3124 from "@/assets/IMG_3124.jpeg";
import img3708 from "@/assets/IMG_3708.jpeg";
import img3799 from "@/assets/IMG_3799.jpeg";
import img4676 from "@/assets/IMG_4676.jpeg";

// Props for GreetingScreen
interface GreetingScreenProps {
  onUnlockSuccess: () => void;
  welcomeMessage?: string;
  passwordToMatch: string; // The actual password to check against
  // Image props are no longer needed here as they are imported directly
}

type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  duration?: number;
  durationOnHover?: number;
  direction?: 'horizontal' | 'vertical';
  reverse?: boolean;
  className?: string;
};

function InfiniteSlider({
  children,
  gap = 0,
  duration = 25,
  durationOnHover,
  direction = 'horizontal',
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const [currentDuration, setCurrentDuration] = useState(duration);
  const [ref, { width, height }] = useMeasure();
  const translation = useMotionValue(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    let controls;
    const size = direction === 'horizontal' ? width : height;
    // Ensure contentSize is positive to prevent division by zero or negative values
    const contentSize = Math.max(1, size + gap); 
    const from = reverse ? -contentSize / 2 : 0;
    const to = reverse ? 0 : -contentSize / 2;

    if (isTransitioning) {
      controls = animate(translation, [translation.get(), to], {
        ease: 'linear',
        duration:
          currentDuration * Math.abs((translation.get() - to) / contentSize),
        onComplete: () => {
          setIsTransitioning(false);
          setKey((prevKey) => prevKey + 1);
        },
      });
    } else {
      controls = animate(translation, [from, to], {
        ease: 'linear',
        duration: currentDuration,
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: 0,
        onRepeat: () => {
          translation.set(from);
        },
      });
    }

    return controls?.stop;
  }, [
    key,
    translation,
    currentDuration,
    width,
    height,
    gap,
    isTransitioning,
    direction,
    reverse,
  ]);

  const hoverProps = durationOnHover
    ? {
        onHoverStart: () => {
          setIsTransitioning(true);
          setCurrentDuration(durationOnHover);
        },
        onHoverEnd: () => {
          setIsTransitioning(true);
          setCurrentDuration(duration);
        },
      }
    : {};

  return (
    <div className={cn('overflow-hidden', className)}>
      <motion.div
        className='flex w-max'
        style={{
          ...(direction === 'horizontal'
            ? { x: translation }
            : { y: translation }),
          gap: `${gap}px`,
          flexDirection: direction === 'horizontal' ? 'row' : 'column',
        }}
        ref={ref}
        {...hoverProps}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}

interface ImagesSliderProps {
  images: (string | { src: string; [key: string]: any })[]; // Allow StaticImageData
  children?: React.ReactNode;
  overlay?: React.ReactNode | boolean; 
  overlayClassName?: string;
  className?: string;
  autoplay?: boolean;
  direction?: "up" | "down";
}

function ImagesSlider({
  images,
  children,
  overlay = true,
  overlayClassName,
  className,
  autoplay = true,
  direction = "up",
}: ImagesSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadedImages, setLoadedImages] = useState<(string | { src: string })[]>([]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === images.length ? 0 : prevIndex + 1
    );
  }, [images.length]);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images.length]);

  useEffect(() => {
    const loadAllImages = async () => {
      setLoading(true);
      const imagePromises = images.map(img => {
        return new Promise((resolve, reject) => {
          const image = new Image();
          image.src = typeof img === 'string' ? img : img.src;
          image.onload = () => resolve(img); 
          image.onerror = reject;
        });
      });
      try {
        const loaded = await Promise.all(imagePromises);
        setLoadedImages(loaded as (string | { src: string })[]);
      } catch (error: unknown) {
        console.error("Failed to load images", error instanceof Error ? error.message : String(error));
      }
      setLoading(false);
    };
    loadAllImages();
  }, [images]);
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        handleNext();
      } else if (event.key === "ArrowLeft") {
        handlePrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    let interval: number | undefined;
    if (autoplay && images.length > 1) {
      interval = setInterval(() => {
        handleNext();
      }, 5000) as unknown as number;
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (interval !== undefined) clearInterval(interval);
    };
  }, [images.length, autoplay, handleNext, handlePrevious]);

  const slideVariants = {
    initial: { scale: 0, opacity: 0, rotateX: 45, },
    visible: { scale: 1, rotateX: 0, opacity: 1, transition: { duration: 0.5, ease: [0.645, 0.045, 0.355, 1.0], }, },
    upExit: { opacity: 1, y: "-150%", transition: { duration: 1, }, },
    downExit: { opacity: 1, y: "150%", transition: { duration: 1, }, },
  };

  const areImagesLoaded = loadedImages.length > 0;
  const currentImageSrc = areImagesLoaded && loadedImages[currentIndex] ? 
                          (typeof loadedImages[currentIndex] === 'string' ? loadedImages[currentIndex] as string : (loadedImages[currentIndex] as { src: string }).src) 
                          : undefined;

  return (
    <div
      className={cn(
        "overflow-hidden h-full w-full relative flex items-center justify-center",
        className
      )}
      style={{ perspective: "1000px" }}
    >
      {areImagesLoaded && children}
      {areImagesLoaded && overlay && typeof overlay === 'boolean' && (
        <div className={cn("absolute inset-0 bg-black/60 z-40", overlayClassName)} />
      )}
      {areImagesLoaded && overlay && typeof overlay !== 'boolean' && overlay}

      {currentImageSrc ? (
        <AnimatePresence>
          <motion.img
            key={currentIndex} // Use currentIndex for key to trigger animation on change
            src={currentImageSrc}
            initial="initial"
            animate="visible"
            exit={direction === "up" ? "upExit" : "downExit"}
            variants={slideVariants}
            className="image h-full w-full absolute inset-0 object-cover object-center"
            alt={`Slide ${currentIndex + 1}`}
          />
        </AnimatePresence>
      ) : (
         !loading && images.length > 0 && <div className="text-white text-2xl z-50">Loading Images...</div>
      )}
      {images.length === 0 && !loading && <div className="text-white text-2xl z-50">No images to display.</div>}
    </div>
  );
}

function PasswordInputDisplay({ 
  onUnlockSuccess,
  passwordToMatch,
  welcomeMessage,
}: Pick<GreetingScreenProps, 'onUnlockSuccess' | 'passwordToMatch' | 'welcomeMessage'>) {
  const id = useId();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === passwordToMatch) {
      setError(null);
      onUnlockSuccess();
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  return (
    <div className="relative z-50 w-full max-w-md p-4">
      <div className="bg-background/80 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-white/20">
        {welcomeMessage && (
          <h2 className="text-3xl font-bold text-center text-white mb-6">
            {welcomeMessage}
          </h2>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor={id} className="text-lg font-medium text-gray-200 mb-2 block text-center">
              Enter Password to Unlock
            </Label>
            <div className="relative">
              <Input
                id={id}
                className="pe-12 text-xl p-4 bg-white/10 text-white placeholder-gray-400 border-gray-500 focus:border-blue-400 focus:ring-blue-400 rounded-lg"
                placeholder="Password"
                type={isVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-label="Password"
              />
              <button
                className="absolute inset-y-0 end-0 flex h-full w-12 items-center justify-center rounded-e-lg text-gray-300 hover:text-white focus:outline-none"
                type="button"
                onClick={toggleVisibility}
                aria-label={isVisible ? "Hide password" : "Show password"}
                aria-pressed={isVisible}
              >
                {isVisible ? (
                  <EyeOff size={24} strokeWidth={2} aria-hidden />
                ) : (
                  <Eye size={24} strokeWidth={2} aria-hidden />
                )}
              </button>
            </div>
            {error && <p className="text-red-400 text-sm mt-2 text-center">{error}</p>}
          </div>
          <Button 
            type="submit" 
            className="w-full text-xl p-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105"
          >
            <LockIcon className="mr-2 h-6 w-6" />
            Unlock Cookbook
          </Button>
        </form>
      </div>
    </div>
  );
}

export default function GreetingScreen({ 
  onUnlockSuccess, 
  welcomeMessage = "Welcome to Your Personal Cookbook, Mom!",
  passwordToMatch,
}: GreetingScreenProps) {

  // Define image arrays using imported images
  const actualTopImages = [img4676, img3799]; // Example assignment
  const actualBottomRow1 = [img3124, img3708]; // Example assignment (son?)
  const actualBottomRow2 = [img3799, img3799]; // Example assignment (dog?)

  return (
    <div className="flex flex-col h-screen bg-black text-white selection:bg-blue-500 selection:text-white">
      <div className="flex-1 flex flex-col">
        <div className="h-1/2 relative">
          <ImagesSlider 
            images={actualTopImages} 
            overlay={true} 
            overlayClassName="bg-black/50" 
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center z-50 p-4">
              <PasswordInputDisplay 
                onUnlockSuccess={onUnlockSuccess} 
                passwordToMatch={passwordToMatch}
                welcomeMessage={welcomeMessage}
              />
            </div>
          </ImagesSlider>
        </div>
        
        <div className="h-1/2 flex">
          <div className="w-1/2 overflow-hidden">
            <InfiniteSlider duration={30} direction="horizontal">
              {actualBottomRow1.map((img, index) => (
                <motion.img // Use motion.img for consistency if animating later
                  key={`bottom1-${index}`}
                  src={typeof img === 'string' ? img : img.src} // Handle StaticImageData
                  alt={`Personal image ${index + 1} row 1`}
                  className="aspect-square h-full object-cover"
                />
              ))}
            </InfiniteSlider>
          </div>
          <div className="w-1/2 overflow-hidden">
            <InfiniteSlider duration={35} direction="horizontal" reverse>
              {actualBottomRow2.map((img, index) => (
                <motion.img
                  key={`bottom2-${index}`}
                  src={typeof img === 'string' ? img : img.src} // Handle StaticImageData
                  alt={`Personal image ${index + 1} row 2`}
                  className="aspect-square h-full object-cover"
                />
              ))}
            </InfiniteSlider>
          </div>
        </div>
      </div>
    </div>
  );
} 