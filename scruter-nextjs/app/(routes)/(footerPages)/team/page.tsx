'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagram,
  faTwitter,
  faLinkedin,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';

const teamMembers = [
  {
    name: 'Swaroop Patil',
    role: 'Full Stack Developer',
    image: '/swaroop.jpg',
    social: {
      instagram: 'https://instagram.com/swaroop.patil.x',
      twitter: 'https://x.com/sastatonystark',
      linkedin: 'https://linkedin.com/in/swaroop-patil-x',
      github: 'https://github.com/swarooppatilx',
    },
  },
  {
    name: 'Ashish Kharde',
    role: 'Frontend Developer',
    image: '/ashish.jpg',
    social: {
      instagram: 'https://instagram.com/ashish_kharde1',
      twitter: 'https://x.com/ashkharde',
      linkedin: 'https://linkedin.com/in/ashish-kharde-b5a114288/',
      github: 'https://github.com/Ashish-kharde1',
    },
  },
  {
    name: 'Chinmay Nakwa',
    role: 'AI & ML',
    image: '/chinmay.jpg',
    social: {
      instagram: 'https://instagram.com/chinmay._.29/',
      twitter: '#',
      linkedin: 'https://linkedin.com/in/chinmay-nakwa-9a0836241',
      github: 'https://github.com/ChinmayNakwa',
    },
  },
  {
    name: 'Omkar Avasare',
    role: 'UI/UX',
    image: '/omkar.jpg',
    social: {
      instagram: 'https://instagram.com/omkar_avasare_',
      twitter: 'https://x.com/omkar_avasare',
      linkedin: 'https://linkedin.com/in/omkar-avasare-302212279',
      github: 'https://github.com/Omkar-Avasare',
    },
  },
  {
    name: 'Hrishikesh Wadhile',
    role: 'QA & Cross Platform',
    image: '/hrikesh.jpg',
    social: {
      instagram: 'https://instagram.com/hrishikesh_wadile',
      twitter: '#',
      linkedin: 'https://linkedin.com/in/hrishikesh-wadile-5b8284292',
      github: 'https://github.com/HrishikeshWadile',
    },
  },
  {
    name: 'Anushka Gaikwad',
    role: 'Content Manager',
    image: '/anushka.jpg',
    social: {
      instagram: 'https://instagram.com/anushkagaikwad924',
      twitter: 'https://x.com/AnushkaGai32263',
      linkedin: 'https://in.linkedin.com/in/anushka-gaikwad-562981310',
      github: '#',
    },
  },
];

export default function TeamPage() {
  useEffect(() => {
    const chinmayPhoto = document.querySelector('#chinmay-photo');
    chinmayPhoto?.addEventListener('click', () => {
      chinmayPhoto.setAttribute('src', '/chinmay2.jpg');
      document.querySelector('#chinmay-role')!.textContent = 'AI Jargon Expert';
    });

    return () => {
      chinmayPhoto?.removeEventListener('click', () => {});
    };
  }, []);

  return (
    <section className="team-section text-center mt-4 mb-5 pb-5">
      <div className="container mx-auto">
        <h2 className="mb-4 text-2xl font-bold">Meet the Team</h2>
        <p className="lead mb-6 text-lg">
          Get to know the amazing team behind Scruter.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {teamMembers.map(member => (
            <div
              className="bg-white shadow-md rounded-lg p-4 mb-4 flex flex-col items-center"
              key={member.name}
            >
              <Image
                src={member.image}
                className="rounded-full mb-3"
                alt={`Team Member: ${member.name}`}
                width={150}
                height={150}
              />
              <h4 className="text-lg font-semibold">{member.name}</h4>
              <p className="text-gray-600">{member.role}</p>
              <div className="social-icons mt-2 flex space-x-4">
                <a
                  href={member.social.instagram}
                  className="transition-transform duration-300 text-black hover:scale-110"
                  aria-label="Instagram"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a
                  href={member.social.twitter}
                  className="transition-transform duration-300 text-black hover:scale-110"
                  aria-label="Twitter"
                >
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a
                  href={member.social.linkedin}
                  className="transition-transform duration-300 text-black hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
                <a
                  href={member.social.github}
                  className="transition-transform duration-300 text-black hover:scale-110"
                  aria-label="GitHub"
                >
                  <FontAwesomeIcon icon={faGithub} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
