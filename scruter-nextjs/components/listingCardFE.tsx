'use client';
import React from 'react';
import { Image as ImageInterface } from '@prisma/client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';
import { Button } from '@/components/ui/button'; // Importing the Button component from Shadcn
import Link from 'next/link';

interface ListingCardProps {
  name: string;
  price: number;
  description: string;
  images: ImageInterface[]; 
}

const ListingCardFE: React.FC<ListingCardProps> = ({
  name,
  price,
  description,
  images,
}) => {
  return (
    <div className="bg-white overflow-hidden shadow-lg rounded-lg">
      <Carousel
        className="h-48"
        opts={{
          align: 'start',
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        <CarouselContent className="flex gap-4">
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <Image
                src={image.url} // Use the image URL from the database
                alt={name}
                width={1000}
                height={1000} // Fill the parent container
                objectFit="cover" // Cover the area while maintaining aspect ratio
                className="rounded-t-lg h-48" // Optional: Add styling for rounded corners
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-gray-600 mb-2">{description}</p>
        <p className="text-lg font-bold mb-2">Price: ₹{price}</p>
        <div className="flex justify-between">
          <Button variant="outline" className="text-blue-600">
            Add
          </Button>
          <Button variant="outline" className="text-red-600">
            Bookmark
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ListingCardFE;
