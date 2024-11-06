'use client';
import React from 'react';
import Main from './main';
import Sidebar from './sidebar';
import Image from 'next/image';

const SetUpListing = ({ sellerId }: { sellerId: string }) => {
  return (
    <>
      <main className="bg-secondary-mongolia relative h-screen md:overflow-hidden overflow-y-auto px-10 md:flex items-center justify-center font-ubuntu">
        <div className="flex flex-col items-center justify-start gap-20 ">
          <div className="hidden lg:block text-center text-4xl font-bold">
            Hey! Let&apos;s upload you first listing on SCRUTER
          </div>
          <Image
            src="/listingGuide.svg"
            width={1000}
            height={1000}
            alt="storeSetuppage"
            className="hidden md:block h-2/4 w-2/4"
          />
        </div>

        <div className="md:gray-200  bg-gray-200 dark:bg-gray-700 rounded-xl shadow-md absolute md:relative p-4 flex md:flex-row flex-col md:max-h-[550px] md:max-w-[900px] h-full w-full">
          <Sidebar />
          <Main sellerId={sellerId} />
        </div>
      </main>
    </>
  );
};

export default SetUpListing;
