'use client';

import Link from 'next/link';
import { FiMail } from 'react-icons/fi';
import { FaWhatsapp, FaInstagram as Instagram } from 'react-icons/fa';
import { FaLinkedin as Linkedin } from 'react-icons/fa';
import { FaGithub as Github } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { HeartIcon } from 'lucide-react';

// Types for Links and Helpdesk
interface LinkItem {
  name: string;
  id: number;
  href: string;
}

const Links: LinkItem[] = [
  { name: 'About us', id: 1, href: '/about' },
  { name: 'Our Teams', id: 2, href: '/team' },
  { name: 'Terms of service', id: 3, href: '/terms' },
  { name: 'Our Contributors', id: 4, href: '/contributors' },
  { name: 'Privacy and Policy', id: 5, href: '/policy' },
];

const Helpdesk: LinkItem[] = [
  { name: 'HelpCenter', id: 1, href: '/help' },
  { name: 'FAQ', id: 2, href: '/faq' },
  { name: 'ContactUs', id: 3, href: '/contact' },
  { name: 'Support', id: 4, href: '/support' },
];

// Types for social links
interface SocialLink {
  icon: JSX.Element;
  color: string;
  href: string;
}

const socialLinks: SocialLink[] = [
  {
    icon: <Instagram size={20} />,
    color: 'bg-gradient-to-br from-purple-600 to-pink-500',
    href: 'https://instagram.com/',
  },
  {
    icon: <FaXTwitter size={20} />,
    color: 'bg-black',
    href: 'https://x.com/',
  },
  {
    icon: <Linkedin size={20} />,
    color: 'bg-blue-600',
    href: 'https://www.linkedin.com/',
  },
  {
    icon: <Github size={20} />,
    color: 'bg-gray-800',
    href: 'https://github.com/',
  },
  {
    icon: <FaWhatsapp size={20} />,
    color: 'bg-green-500',
    href: 'https://web.whatsapp.com/',
  },
  {
    icon: <FiMail size={20} />,
    color: 'bg-red-500',
    href: 'mailto:contact@scruter.com',
  },
];

// Footer component
const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="relative mx-auto w-full max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 space-y-6 text-center md:text-left">
            <Link href="/" className="inline-block">
              <div className="flex justify-center md:justify-start items-center gap-3 mb-6">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-green-500 bg-clip-text text-transparent">
                    Scruter
                  </span>
                </div>
              </div>
            </Link>
            <p className="text-gray-600 max-w-md mx-auto md:mx-0">
              Scruter is your local platform for buying, selling, and discovering everything you need. Whether it&apos;s products, services, or community activities, we connect people for a better local experience.
            </p>
          </div>

          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
            <FooterSection title="Links" links={Links} />
            <FooterSection title="Helpdesk" links={Helpdesk} />
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold mb-6 text-gray-800 text-center md:text-left">
                Connect With Us
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {socialLinks.map((link, index) => (
                  <SocialButton
                    key={index}
                    icon={link.icon}
                    color={link.color}
                    href={link.href}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 text-center md:text-left">
              © {new Date().getFullYear()} Team Scruter
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Made with</span>
              <HeartIcon color="red" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// FooterSection component prop types
interface FooterSectionProps {
  title: string;
  links: LinkItem[];
}

const FooterSection = ({ title, links }: FooterSectionProps) => (
  <div className="flex flex-col items-start">
    <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link.id}>
          <Link
            href={link.href}
            className="text-gray-600 hover:text-blue-500 transition-colors duration-300 flex items-center gap-2 group"
          >
            <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-blue-500 transition-colors duration-300"></span>
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

// SocialButton component prop types
interface SocialButtonProps {
  href: string;
  icon: JSX.Element;
  color: string;
}

const SocialButton = ({ href, icon, color }: SocialButtonProps) => (
  <Link
    href={href}
    className={`${color} p-2 sm:p-3 rounded-lg text-white transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg flex items-center justify-center`}
  >
    <span className="text-lg sm:text-xl lg:text-2xl">{icon}</span>
  </Link>
);

export default Footer;
