"use client";

import React from 'react';
import axios from 'axios';
import '../../globals.css';

// Define the props interface for the Section component
interface SectionProps {
    id: string;
    icon: string;
    title: string;
    children: React.ReactNode;
}

const ProgressBar = () => {
  const [scrollPercent, setScrollPercent] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const percent = (scrollTop / docHeight) * 100;
      setScrollPercent(percent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div id="progress-bar" className="fixed top-0 left-0 h-1 bg-blue-600" style={{ width: `${scrollPercent}%` }}></div>
  );
};

const Sidebar = () => (
  <aside className="w-1/4 bg-gradient-to-b from-blue-500 to-purple-600 text-white p-4 sticky top-0 h-screen">
    <ul className="space-y-4">
      <li><a href="#contact-info" className="flex items-center"><i className="fas fa-info-circle"></i> Contact Information</a></li>
      <li><a href="#support" className="flex items-center"><i className="fas fa-phone"></i> Customer Support</a></li>
      <li><a href="#social-media" className="flex items-center"><i className="fas fa-hashtag"></i> Social Media</a></li>
      <li><a href="#location" className="flex items-center"><i className="fas fa-map-marker-alt"></i> Our Location</a></li>
      <li><a href="#contact-form" className="flex items-center"><i className="fas fa-envelope"></i> Send a Message</a></li>
    </ul>
  </aside>
);

const Section: React.FC<SectionProps> = ({ id, icon, title, children }) => (
    <section id={id} className="mt-8">
      <h2 className="text-2xl font-semibold text-gray-800 flex items-center border-l-4 border-blue-600 pl-2 mb-4">
        <i className={`${icon} mr-2 text-purple-600`}></i> {title}
      </h2>
      <div className="text-gray-700">{children}</div>
    </section>
);

const ContactForm = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    axios.post('/api/contact', data)
      .then(response => {
        alert('Message sent successfully!');
        event.currentTarget.reset();
      })
      .catch(error => {
        console.error('Error sending message:', error);
      });
  };

  return (
    <section id="contact-form" className="mt-8">
      <h2 className="text-2xl font-semibold text-gray-800 flex items-center border-l-4 border-blue-600 pl-2 mb-4">
        <i className="fas fa-envelope mr-2 text-purple-600"></i> Send a Message
      </h2>
      <form className="contact-form max-w-md mx-auto" onSubmit={handleSubmit}>
        <label htmlFor="name" className="block mb-1">Name</label>
        <input type="text" id="name" name="name" required className="border rounded p-2 mb-4 w-full" />

        <label htmlFor="email" className="block mb-1">Email</label>
        <input type="email" id="email" name="email" required className="border rounded p-2 mb-4 w-full" />

        <label htmlFor="message" className="block mb-1">Message</label>
        <textarea id="message" name="message" rows={5} required className="border rounded p-2 mb-4 w-full"></textarea>

        <button type="submit" className="bg-blue-600 text-white p-2 rounded">Send Message</button>
      </form>
    </section>
  );
};

const ContactPage = () => (
  <div className="flex">
    <ProgressBar />
    <Sidebar />
    <main className="w-3/4 p-8 bg-white shadow-lg">
      <div className="text-center mb-8">
        <h1 className="text-4xl text-blue-600 font-bold">Contact Us</h1>
        <p className="text-gray-600 max-w-2xl mx-auto mt-2">We’d love to hear from you! Reach out with any questions, feedback, or just to say hello.</p>
      </div>

      <Section id="contact-info" icon="fas fa-info-circle" title="Contact Information">
        <p>If you have any inquiries, please contact us at:</p>
        <p>Email: support@scruter.com</p>
        <p>Phone: (123) 456-7890</p>
        <p>Address: 123 Main St, Springfield, USA</p>
      </Section>

      <Section id="support" icon="fas fa-phone" title="Customer Support">
        <p>Our customer support team is available Monday through Friday, 9:00 AM - 5:00 PM. For urgent inquiries, please contact us by phone.</p>
      </Section>

      <Section id="social-media" icon="fas fa-hashtag" title="Social Media">
        <p>Follow us on social media to stay updated with the latest news:</p>
        <ul className="list-disc pl-5">
          <li><a href="https://facebook.com/scruter" target="_blank" rel="noopener noreferrer">Facebook</a></li>
          <li><a href="https://twitter.com/scruter" target="_blank" rel="noopener noreferrer">Twitter</a></li>
          <li><a href="https://instagram.com/scruter" target="_blank" rel="noopener noreferrer">Instagram</a></li>
        </ul>
      </Section>

      <Section id="location" icon="fas fa-map-marker-alt" title="Our Location">
        <p>Scruter Headquarters</p>
        <p>123 Main Street, Suite 100</p>
        <p>City, State, ZIP Code</p>
      </Section>

      <ContactForm />
    </main>
  </div>
);

export default ContactPage;
