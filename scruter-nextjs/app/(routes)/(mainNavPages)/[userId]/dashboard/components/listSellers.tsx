'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Utensils } from 'lucide-react';
import { Listing, Seller } from '@prisma/client';
import { Spinner } from '@/components/ui/spinner';

interface Customer {
  id: string;
  name: string;
  email: string;
  sellers: string[];
}

interface SellerWithListing extends Seller {
  Listings: Listing[];
}

const ListSellers = () => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [sellers, setsellers] = useState<SellerWithListing[]>([]);
  const [selectedsellerId, setSelectedsellerId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      const customerData = await fetch('/data/customers.json').then(res =>
        res.json()
      );
      setCustomer(customerData[0]);

      const sellerData = await fetch('/data/seller.json').then(res =>
        res.json()
      );
      setsellers(sellerData);
    };
    fetchData();
  }, []);

  const handlesellerClick = (sellerId: string) => {
    setSelectedsellerId(sellerId);
  };
  // Filter sellers based on search query
  const filteredSellers = sellers.filter(seller =>
    seller.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!sellers.length) {
    return <Spinner />;
  }

  return (
    <div className='bg-gray-200 p-5 rounded-lg'>
      {customer && (
        <>
            <div className='w-full flex items-center justify-center'>
                <div className='text-3xl font-bold py-2 '>Chat With Sellers</div>
            </div>
          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Search sellers by name"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredSellers.length > 0 ? (
              filteredSellers.map(seller => (
                <Card
                  key={seller.id}
                  onClick={() => handlesellerClick(seller.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Utensils className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="text-lg font-semibold">
                          {seller.name}
                        </div>
                        <p className="text-sm text-gray-500">
                          {seller.Listings.length} Listings
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No sellers found
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ListSellers;
