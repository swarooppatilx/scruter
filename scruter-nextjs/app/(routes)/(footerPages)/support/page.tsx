'use client';

import React from 'react';

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
    <div
      id="progress-bar"
      className="fixed top-0 left-0 h-1 bg-blue-600"
      style={{ width: `${scrollPercent}%` }}
    ></div>
  );
};

const Sidebar = () => (
  <aside className="w-1/4 bg-gradient-to-b from-blue-500 to-purple-600 text-white p-4 sticky top-0 h-screen">
    <ul className="space-y-4">
      <li>
        <a href="#faq" className="flex items-center">
          <i className="fas fa-question-circle"></i> FAQs
        </a>
      </li>
      <li>
        <a href="#contact" className="flex items-center">
          <i className="fas fa-envelope"></i> Contact Support
        </a>
      </li>
      <li>
        <a href="#feedback" className="flex items-center">
          <i className="fas fa-comments"></i> Feedback
        </a>
      </li>
      <li>
        <a href="#resources" className="flex items-center">
          <i className="fas fa-book"></i> Resources
        </a>
      </li>
      <li>
        <a href="#troubleshooting" className="flex items-center">
          <i className="fas fa-wrench"></i> Troubleshooting
        </a>
      </li>
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

const SupportPage = () => (
  <div className="flex">
    <ProgressBar />
    <Sidebar />
    <main className="w-3/4 p-8 bg-white shadow-lg">
      <div className="title-section text-center mb-8">
        <h1 className="text-4xl text-blue-600 font-bold">Support Page</h1>
        <p className="text-gray-600 max-w-2xl mx-auto mt-2">
          We&apos;re here to help! Browse our resources or reach out for
          assistance.
        </p>
      </div>

      <Section
        id="faq"
        icon="fas fa-question-circle"
        title="Frequently Asked Questions (FAQs)"
      >
        <p>Here are some common questions we receive from users:</p>
        <div className="faq-section mt-4">
          <div className="question font-semibold">
            How do I reset my password?
          </div>
          <div className="answer">
            To reset your password, go to the login page and click on
            &quot;Forgot Password.&quot; Follow the instructions to reset your
            password.
          </div>
          <div className="question font-semibold mt-4">
            Where can I find my order history?
          </div>
          <div className="answer">
            You can find your order history in your account dashboard under
            &quot;Order History.&quot;
          </div>
          {/* Add more FAQs as needed */}
        </div>
      </Section>

      <Section id="contact" icon="fas fa-envelope" title="Contact Support">
        <p>If you need further assistance, please contact our support team:</p>
        <div className="contact-info-header mt-2">Support Email:</div>
        <div className="contact-info font-bold">support@example.com</div>
      </Section>

      <Section id="feedback" icon="fas fa-comments" title="Feedback">
        <p>
          Your feedback is important to us! Please let us know how we can
          improve our services.
        </p>
        <a
          href="mailto:feedback@example.com"
          className="text-blue-600 hover:underline"
        >
          Send Feedback
        </a>
      </Section>

      <Section id="resources" icon="fas fa-book" title="Helpful Resources">
        <p>Explore our resources to help you navigate our services:</p>
        <ul className="list-disc pl-5">
          <li>
            <a href="#" className="text-blue-600 hover:underline">
              User Guide
            </a>
          </li>
          <li>
            <a href="#" className="text-blue-600 hover:underline">
              Video Tutorials
            </a>
          </li>
          <li>
            <a href="#" className="text-blue-600 hover:underline">
              Community Forum
            </a>
          </li>
        </ul>
      </Section>

      <Section
        id="troubleshooting"
        icon="fas fa-wrench"
        title="Troubleshooting"
      >
        <p>
          If you&apos;re experiencing issues, check our troubleshooting guide:
        </p>
        <ul className="list-disc pl-5">
          <li>Clear your browser&apos;s cache and cookies.</li>
          <li>Ensure your browser is updated to the latest version.</li>
          <li>
            Disable any browser extensions that may interfere with the website.
          </li>
        </ul>
      </Section>
    </main>
  </div>
);

export default SupportPage;
