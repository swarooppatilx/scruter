'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import toast, { Toaster } from 'react-hot-toast';
import { GetAllListing } from '@/actions/seller/listing';
import ListingCardFE from '@/components/listingCardFE';

const HousePage: React.FC = () => {
  const [houses, setHouses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [type, setType] = useState('house'); // Default search type is 'house'
  const [sort, setSort] = useState<'asc' | 'desc' | ''>('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Example API call to fetch housing data
        const forSaleResp = await GetAllListing('Housing', query, sort);

        if (!forSaleResp || !forSaleResp.data) {
          toast.error('No data fetched from BE');
          return;
        }
        setHouses(forSaleResp.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('An error occurred while fetching the data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, type, sort]);

  return (
    <div className="bg-gray-50 text-gray-800">
      <Toaster />
      {/* Hero Section with Banner Image */}
      <section
        className="relative h-[60vh] bg-cover bg-center text-white"
        style={{ backgroundImage: 'url(/house.jpg)' }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
          <h1 className="text-4xl font-bold mb-4">Find Your Perfect House</h1>
          <p className="text-lg mb-6">
            Explore a variety of homes that match your style and budget.
          </p>
          <a
            href="#search-bar"
            className="inline-block bg-white text-blue-600 font-bold py-3 px-6 rounded-full transition hover:bg-blue-200"
          >
            Start Your Search
          </a>
        </div>
      </section>

      {/* Custom Search Bar */}
      <div
        id="search-bar"
        className="flex justify-center items-center my-6 px-4"
      >
        <form
          id="search-form"
          className="flex flex-wrap justify-center items-center gap-4 max-w-3xl w-full"
        >
          {/* Search Input with Font Awesome Search Icon */}
          <div className="w-full md:w-auto mb-2 flex-grow relative">
            <input
              type="text"
              className="form-control w-full p-3 pl-12 border border-gray-300 rounded-md"
              id="search-input"
              name="query"
              placeholder="Search"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>

          {/* Sort by Price Dropdown */}
          <div className="mb-2">
            <select
              className="form-select p-3 border border-gray-300 rounded-md"
              id="sort-by-price"
              name="sort"
              value={sort}
              onChange={e => setSort(e.target.value as 'asc' | 'desc' | '')}
            >
              <option value="">Sort by Price</option>
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </div>

          {/* Search Button */}
          <div className="mb-2">
            <button
              className="btn btn-dark text-light p-3 rounded-md w-full md:w-auto transition-colors duration-300 hover:bg-gray-400 border border-gray-300 hover:border-gray-600 focus:ring-2 focus:ring-gray-500 focus:outline-none"
              id="search-button"
              type="submit"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Houses Section */}
      <section className="py-16 bg-white">
        <h2 className="text-2xl font-bold text-center mb-12">Available Houses</h2>

        <div
          id="houses"
          className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {loading ? (
            <div className="loading flex justify-center items-center h-48">
              <div className="spinner border-4 border-t-4 border-blue-600 rounded-full w-10 h-10 animate-spin"></div>
            </div>
          ) : (
            houses.map(house => (
              <ListingCardFE
                id={house.id}
                key={house.id}
                name={house.name}
                price={house.price}
                description={house.description}
                images={house.images}
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default HousePage;
