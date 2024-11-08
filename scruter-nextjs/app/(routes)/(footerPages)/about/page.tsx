import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn more about our mission and values.',
};

export default function AboutPage() {
  return (
    <>
      <div className="md:hidden">
        <Image
          src="/aboutPattern.svg"
          width={1280}
          height={843}
          alt="About Us"
          className="block dark:hidden"
        />
        <Image
          src="/aboutPattern.svg"
          width={1280}
          height={843}
          alt="About Us"
          className="hidden dark:block"
        />
      </div>
      <div className="bg-gray-100 min-h-screen">
        <section className="about-us bg-white py-12">
          <div className="container mx-auto max-w-4xl px-4">
            <h1 className="text-4xl font-bold text-center text-blue-800 mb-6">
              About Us
            </h1>

            {/* Mission Card */}
            <div className="bg-white shadow-md rounded-lg p-6 my-6">
              <h2 className="text-2xl font-semibold text-blue-800">
                Our Mission
              </h2>
              <p className="text-gray-700 text-lg">
                At our company, we believe in fostering strong local connections
                and promoting sustainable, community-driven commerce. Our
                platform is built to make buying and selling easier, safer, and
                more accessible for everyone.
              </p>
            </div>

            {/* What We Offer Cards */}
            <h2 className="text-2xl font-semibold text-center mt-10 text-blue-800">
              What We Offer
            </h2>
            <ul className="flex flex-wrap justify-center list-none p-0">
              <li className="bg-gray-200 m-2 p-4 rounded-lg shadow hover:bg-blue-400 transition duration-300 text-center flex-1 max-w-xs">
                Buy &amp; Sell Locally: Find great deals on items you need or
                sell your own goods easily.
              </li>
              <li className="bg-gray-200 m-2 p-4 rounded-lg shadow hover:bg-blue-400 transition duration-300 text-center flex-1 max-w-xs">
                Trusted Listings: All our listings are community-driven,
                allowing for safe exchanges.
              </li>
              <li className="bg-gray-200 m-2 p-4 rounded-lg shadow hover:bg-blue-400 transition duration-300 text-center flex-1 max-w-xs">
                Community Focused: We&apos;re here to support local businesses
                and promote neighborhood connections.
              </li>
            </ul>

            {/* How It Works Card */}
            <div className="bg-white shadow-md rounded-lg p-6 my-6">
              <h2 className="text-2xl font-semibold text-blue-800">
                How It Works
              </h2>
              <p className="text-gray-700 text-lg">
                Simply create a free account, post your ads, browse listings,
                and connect with others in your community. From finding food to
                housing, our platform brings your local market online.
              </p>
            </div>

            {/* Our Values Cards */}
            <h2 className="text-2xl font-semibold text-center mt-10 text-blue-800">
              Our Values
            </h2>
            <ul className="flex flex-wrap justify-center list-none p-0">
              <li className="bg-gray-200 m-2 p-4 rounded-lg shadow hover:bg-blue-400 transition duration-300 text-center flex-1 max-w-xs">
                Trust
              </li>
              <li className="bg-gray-200 m-2 p-4 rounded-lg shadow hover:bg-blue-400 transition duration-300 text-center flex-1 max-w-xs">
                Community
              </li>
              <li className="bg-gray-200 m-2 p-4 rounded-lg shadow hover:bg-blue-400 transition duration-300 text-center flex-1 max-w-xs">
                Convenience
              </li>
            </ul>

            <p className="text-center mt-6 text-gray-700">
              Thank you for choosing our company&mdash;where local communities
              come together!
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
