import React, { useState } from 'react';
import ListingCard from './listingCard';
import { GetAllListing, ListingWithImages } from '@/actions/seller/listing';
import toast from 'react-hot-toast';
import { Image } from '@prisma/client';
import { Button } from '@/components/ui/button'; // Import the Shadcn Button component
import Link from 'next/link';

const ListingsPage = async ({
  sellerId,
  listings,
}: {
  sellerId: string
  listings: ListingWithImages[];
}) => {
  //   const [searchTerm, setSearchTerm] = useState('');

  // Filter listings based on search term

  return (
    <div className="min-h-screen p-8 flex flex-col gap-10 bg-gray-50">
      <div className="flex flex-col gap-5 lg:gap-0 md:flex-row justify-between mb-4 p-5 bg-gray-200 items-center rounded-xl">
        <h1 className="text-4xl font-bold text-center">Your Listings</h1>

        <Link href={`/seller/${sellerId}/createListing`} ><Button className="md:ml-auto">Add New Listing</Button></Link>
      </div>

      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search listings..."
          //   value={searchTerm}
          //   onChange={(e) => setSearchTerm(e.target.value)}
          className="p-3 border rounded-full border-gray-300 w-full md:w-1/2" // Adjusted width to make it centered
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing, index) => (
          <ListingCard
            key={index}
            sellerId={sellerId}
            listingId={listing.id}
            name={listing.name}
            price={listing.price}
            description={listing.description}
            category={listing.category}
            images={listing.images} // Adjusting if needed to match image URL
          />
        ))}
      </div>
    </div>
  );
};

export default ListingsPage;
