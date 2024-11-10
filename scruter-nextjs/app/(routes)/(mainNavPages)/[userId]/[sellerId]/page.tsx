'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Utensils } from 'lucide-react';
import { Listing, Seller } from '@prisma/client';
import { Spinner } from '@/components/ui/spinner';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Container from '@/components/ui/container';

interface Customer {
  id: string;
  name: string;
  email: string;
  seller: string[];
}

interface SellerWithListing extends Seller {
  Listings: Listing[];
}

const ListingsBySeller = () => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [seller, setseller] = useState<SellerWithListing>();
  const [selectedsellerId, setSelectedsellerId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isMounted, setIsMounted] = useState(false);

  const params = useParams<{ userId: string; sellerId: string }>();

  const { userId, sellerId } = params;

  useEffect(() => {
    const fetchData = async () => {
      if (!sellerId) return; // Ensure sellerId is available

      const customerData = await fetch('/data/customers.json').then(res =>
        res.json()
      );
      setCustomer(customerData[0]);
      try {
        const response = await fetch('/data/seller.json');
        const sellerData: SellerWithListing[] = await response.json();

        // Filter the seller data based on the sellerId
        const filteredSeller = sellerData.findLast(
          seller => seller.id === sellerId
        );
        setseller(filteredSeller ? filteredSeller : undefined); // Set filtered seller or empty array if not found
      } catch (error) {
        console.error('Error fetching seller data:', error);
      } finally {
        setIsMounted(true);
      }
    };

    fetchData();
  }, [sellerId]); // Trigger fetch when sellerId changes

  if (!seller || !isMounted) {
    return <Spinner />;
  }
  console.log(seller);
  const filteredListings = seller?.Listings.filter(listing =>
    listing.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  console.log(filteredListings);
  return (
    <div className="min-h-screen bg-[url('/ListingsBySeller.avif')]">
      <Container>
        <div className="p-8 h-screen  bg-black bg-opacity-50 flex flex-col">
          <div className="bg-black text-gray-200 w-fit my-4 bg-opacity-80 rounded-xl p-5">
            <h1 className="text-6xl font-bold mb-2">Scruter Chat</h1>
            <p className="text-pink-500">
              Discuss your queries, directly with the owners!
            </p>
          </div>
          <div className="bg-gray-200 h-full p-5 rounded-lg">
            {customer && (
              <>
                <div className="w-full flex items-center justify-center">
                  <div className="text-3xl font-bold py-2 ">
                    Select one Listing by{' '}
                    <span className="text-pink-500">{seller.name}</span> to chat
                    about{' '}
                  </div>
                </div>
                {/* Search Bar */}
                <div className="mb-6">
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="Search listing by name"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {filteredListings.length ? (
                    filteredListings.map(Listing => (
                      <Link
                        key={Listing.id}
                        href={`/${userId}/${sellerId}/${Listing.id}`}
                      >
                        <Card>
                          <CardContent className="p-6">
                            <div className="flex items-center space-x-4">
                              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                                <Utensils className="h-6 w-6 text-primary" />
                              </div>
                              <div>
                                <div className="text-lg font-semibold">
                                  {Listing.name}
                                </div>
                                {/* <p className="text-sm text-gray-500">
                          {Listing.Listings.length} Listings
                        </p> */}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))
                  ) : (
                    <p className="col-span-full text-center text-gray-500">
                      No listing found
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ListingsBySeller;
