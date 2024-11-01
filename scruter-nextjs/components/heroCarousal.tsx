'use client';

import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';

const illustrations = [
  {
    src: 'shop.svg',
  },
  {
    src: 'search.svg',
  },
  {
    src: 'chatting.svg',
  },
];

export function HeroCarousal() {
  return (
    <Carousel
      className="w-full"
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
      <CarouselContent>
        {illustrations.map((item, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card className="w-f">
                <CardContent className="flex aspect-[4/1] bg-black items-center justify-center p-6">
                  <Image
                    width={1000}
                    height={1000}
                    src={item.src}
                    alt="carousal images"
                    className="h-96 w-96"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
