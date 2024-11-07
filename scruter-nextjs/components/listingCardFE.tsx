'use client';

import React, { useEffect, useState } from 'react';
import { Image as ImageInterface } from '@prisma/client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';
import { Button } from '@/components/ui/button';
import { useBookmark } from '@/context/UserBookmarkProvider';
import { useSession } from 'next-auth/react';

interface ListingCardProps {
  id: string;
  name: string;
  price: number;
  description: string;
  images: ImageInterface[];
}

const ListingCardFE: React.FC<ListingCardProps> = ({
  id,
  name,
  price,
  description,
  images,
}) => {
  const { addToBookmarks, isBookmarked } = useBookmark();
  const session = useSession();
  const userId = session.data?.user.id;

  // State to track if the listing is bookmarked
  const [isAlreadyBookmarked, setIsAlreadyBookmarked] = useState<boolean>(false);

  // Check if the listing is bookmarked when the component mounts
  useEffect(() => {
    const checkBookmarkStatus = async () => {
      if (userId) {
        const bookmarked = await isBookmarked(userId, id);
        setIsAlreadyBookmarked(bookmarked);
      }
    };

    if (userId && id) {
      checkBookmarkStatus();
    }
  }, []); // Only rerun when userId or id changes

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
          {userId && session.data?.user.role === 'user' && !isAlreadyBookmarked && (
            <Button
              onClick={() => {
                addToBookmarks(userId, id);
                setIsAlreadyBookmarked(true); // Update the state to reflect the bookmark status
              }}
              variant="outline"
              className="text-red-600"
            >
              Bookmark
            </Button>
          )}
          {userId && session.data?.user.role === 'user' && isAlreadyBookmarked && (
            <Button variant="outline" className="text-green-600">
              Bookmarked
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingCardFE;
