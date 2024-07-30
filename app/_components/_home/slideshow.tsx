import { useEffect, useState } from "react";
import Image from "next/image";

const images = [
  "/images/img_1.png",
  "/images/img_2.png",
  "/images/img_3.png",
  "/images/img_4.png",
];

const Slideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Muda de slide a cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden md:h-full">
      {images.map((src, index) => (
        <div
          key={index}
          className={`absolute left-0 top-0 h-full w-full transition-opacity duration-1000 ease-in-out ${index === currentIndex ? "opacity-100" : "opacity-0"}`}
        >
          <Image
            src={src}
            alt={`Slide ${index + 1}`}
            fill
            className="h-full w-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default Slideshow;
