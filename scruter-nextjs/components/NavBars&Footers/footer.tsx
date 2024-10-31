'use client';

import {
  ChevronRight,
  Copyright,
  Facebook,
  Heart,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const Links = [
  {
    name: 'About us',
    id: 1,
    href: '/about',
  },
  {
    name: 'Our Teams',
    id: 2,
    href: '/team',
  },
  {
    name: 'Terms of service',
    id: 3,
    href: '/Terms',
  },
  {
    name: 'Our Contributors',
    id: 4,
    href: '/contributors',
  },
  {
    name: 'Privacy and Policy',
    id: 5,
    href: '/Policy',
  },
];
const Helpdesk = [
  {
    name: 'HelpCenter',
    id: 1,
    href: '/HelpCenter',
  },
  {
    name: 'FAQ',
    id: 2,
    href: '/FAQ',
  },
  {
    name: 'ContactUs',
    id: 3,
    href: '/ContactUs',
  },
  {
    name: 'Support',
    id: 4,
    href: '/Support',
  },
];

const Footer = () => {
  const [id, setId] = useState(0);

  return (
    <div className="flex items-center flex-col p-5 bg-customBlue dark:bg-DarkGray">
      <div className="border-y border-customTeal dark:border-Green flex items-start justify-start flex-col lg:grid lg:grid-cols-4 py-2 gap-4">
        {/* section1 */}
        <div className="flex gap-4 items-start justify-between lg:px-4 pb-4 flex-col">
          <div className="flex justify-center items-center">
            <Link href="/" className="ml-4 lg:ml:0 gap-x-2">
              <p className="font-bold text-5xl  dark:text-Green font-nunito">
                About Scruter
              </p>
            </Link>
          </div>
          <div className=" ">
            Scruter is your local platform for buying, selling, and discovering
            everything you need. Whether it's products, services, or community
            activities, we connect people for a better local experience.
          </div>
        </div>
        {/* section 2 */}
        <div className="flex flex-col w-full items-start py-4  lg:ml-10 lg:p-4 gap-5">
          <p className="font-bold text-3xl text-customTeal dark:text-Green font-handlee">
            Quick Links
          </p>
          <div className=" flex flex-col gap-2">
            {Links.map(link => (
              <Link
                key={link.id}
                href={link.href}
                onMouseOver={() => {
                  setId(link.id);
                }}
                onMouseLeave={() => {
                  setId(0);
                }}
                className="flex items-center  gap-2"
              >
                <ChevronRight className="h-4 w-4" />
                <div className={id === link.id ? 'underline' : ''}>
                  {link.name}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* section 3 */}
        <div className="flex flex-col w-full items-start py-4  lg:ml-10 lg:p-4 gap-5">
          <p className="font-bold text-3xl text-customTeal dark:text-Green font-handlee">
            Helpdesk
          </p>
          <div className=" flex flex-col gap-2">
            {Helpdesk.map(link => (
              <Link
                key={link.id}
                href={link.href}
                onMouseOver={() => {
                  setId(link.id);
                }}
                onMouseLeave={() => {
                  setId(0);
                }}
                className="flex items-center  gap-2"
              >
                <ChevronRight className="h-4 w-4" />
                <div className={id === link.id ? 'underline' : ''}>
                  {link.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
        {/* section 4 */}
        <div className="flex flex-col w-full lg:w-10/12 items-start py-4  lg:ml-10 lg:p-4 gap-5">
          <p className="font-bold text-3xl text-customTeal dark:text-Green font-handlee">
            Follow Us
          </p>
          <div className="flex gap-2 items-center justify-center">
            <div className="rounded-full bg-gray-200 flex items-center justify-center h-10 w-10">
              <Facebook />
            </div>
            <div className="rounded-full bg-gray-200 flex items-center justify-center h-10 w-10">
              <Twitter />
            </div>
            <div className="rounded-full bg-gray-200 flex items-center justify-center h-10 w-10">
              <Instagram />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row pt-5 items-center justify-center">
        <div className="flex items-center  justify-center">
          Made with <Heart fill="red" className="mx-2" /> by Team Scruter
        </div>
      </div>
    </div>
  );
};

export default Footer;
