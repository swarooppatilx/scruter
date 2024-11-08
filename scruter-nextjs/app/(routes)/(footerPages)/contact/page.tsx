import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import ContactUsForm from './components/contactUsForm';
import { ReactNode } from 'react';

const Contact = () => {
  return (
    <div className="pb-10 bg-gray-50">
      <div className="text-gray-900 text-4xl p-5 text-center lg:px-0 lg:text-center mb-10 lg:text-5xl font-bold">
        Contact Us For Any Query
      </div>
      <div className="flex items-center justify-center">
        <div className="flex flex-col px-6 lg:gap-6 lg:px-32 md:w-11/12 items-center justify-center">
          <div className="border-2 border-gray-300 rounded-3xl shadow-lg flex md:flex-nowrap flex-col md:flex-row justify-center items-center md:w-9/12 overflow-hidden p-5 bg-white">
            <div className="md:w-3/4 w-full">
              <ContactUsForm />
            </div>
            <div className="hidden md:flex lg:flex">
              <Image
                src="/contactUs.svg"
                width={500}
                height={600}
                alt="Contact Us Illustration"
              />
            </div>
          </div>

          <div className="md:w-9/12 py-4 md:px-10 justify-center items-center flex flex-col mt-8">
            <div className="text-md text-center text-gray-700 md:mt-0 mt-5">
              <p>
                We&apos;re here to help! Reach out to us for any inquiries
                regarding your orders, deliveries, or shopping experience with
                Scruter.
              </p>
              <p className="font-semibold">
                We&apos;re happy to assist you with all your needs.
              </p>
            </div>
            <div className="flex items-center gap-5 mt-5 md:flex-nowrap flex-col md:flex-row w-full flex-wrap">
              <ContactCard
                icon={<MapPin className="h-5 w-5 text-white" />}
                title="Address"
                description="Pune, India"
              />

              <ContactCard
                icon={<Mail className="h-5 w-5 text-white" />}
                title="Email"
                description="Scruter@gmail.com"
              />

              <ContactCard
                icon={<Phone className="h-5 w-5 text-white" />}
                title="Phone"
                description="+91 8488484845"
              />
            </div>

            <div className="w-full flex items-center justify-center mt-3 italic text-gray-500">
              <Clock className="h-5 w-5 mr-2 text-gray-500" />
              Our platform is available 24/7. For customer support
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ContactCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const ContactCard: React.FC<ContactCardProps> = ({
  icon,
  title,
  description,
}) => (
  <div className="flex flex-col items-center border-2 border-gray-300 gap-3 shadow-sm px-4 py-6 md:w-[18vw] w-full rounded-xl bg-white hover:shadow-md transition duration-300 cursor-pointer">
    <div className="rounded-full h-10 w-10 bg-pink-500 flex items-center justify-center">
      {icon}
    </div>
    <div className="flex flex-col items-center">
      <div className="text-lg font-semibold">{title}</div>
      <div className="text-sm text-gray-600">{description}</div>
    </div>
  </div>
);

export default Contact;
