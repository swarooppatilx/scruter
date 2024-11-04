"use client";

import '../../globals.css';

const PolicyPage: React.FC = () => {
  return (
      <div className="container mx-auto max-w-2xl bg-white rounded-lg shadow-lg p-8 my-6">
        <WelcomeMessage />
        <PolicySection
          title="Information We Collect"
          content={
            <>
              <p>We collect the following types of information:</p>
              <ul className="list-disc ml-5">
                <li>
                  <strong>Personal Information:</strong> Information you provide us directly, such as your name, email address, and phone number when you contact us or sign up for our services.
                </li>
                <li>
                  <strong>Usage Data:</strong> Information on how you access and use our website, including your IP address, browser type, pages visited, and the time spent on each page.
                </li>
              </ul>
            </>
          }
        />
        <PolicySection
          title="How We Use Your Information"
          content={
            <>
              <p>Your information is used for the following purposes:</p>
              <ul className="list-disc ml-5">
                <li>To provide and maintain our services;</li>
                <li>To notify you about changes to our services;</li>
                <li>To monitor the usage of our website;</li>
                <li>To detect, prevent, and address technical issues;</li>
                <li>To provide customer support;</li>
                <li>To comply with legal obligations.</li>
              </ul>
            </>
          }
        />
        <PolicySection
          title="How We Protect Your Information"
          content={
            <p>We take data protection seriously and use industry-standard security measures to protect your information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>
          }
        />
        <PolicySection
          title="Sharing Your Information"
          content={
            <>
              <p>We do not share your personal information with third parties, except in the following circumstances:</p>
              <ul className="list-disc ml-5">
                <li>With your consent;</li>
                <li>To comply with legal obligations;</li>
                <li>To protect the rights and property of Scruter;</li>
                <li>To provide our services through trusted third-party providers.</li>
              </ul>
            </>
          }
        />
        <PolicySection
          title="Cookies"
          content={
            <p>Our website uses cookies to enhance your experience and collect information about your usage patterns. You can choose to disable cookies through your browser settings, but this may affect your ability to use certain features of the site.</p>
          }
        />
        <PolicySection
          title="Changes to This Policy"
          content={
            <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. It is recommended to review this policy periodically for any updates.</p>
          }
        />
        <PolicySection
          title="Contact Us"
          content={
            <>
              <p>If you have any questions or concerns about this Privacy Policy, please contact us at:</p>
              <ul className="list-disc ml-5">
                <li>Email: scruter@gmail.com</li>
                <li>Phone: 9898989898</li>
                <li>Address: Delhi, India</li>
              </ul>
            </>
          }
        />
        <a
          href="/"
          className="button bg-blue-600 text-white rounded px-4 py-2 inline-block hover:bg-blue-700 transition-colors duration-300"
        >
          Back to Home
        </a>
      </div>
  );
};

const WelcomeMessage: React.FC = () => (
  <div className="welcome-message bg-blue-100 p-4 rounded mb-4">
    <h1 className="text-3xl font-bold text-blue-800">Welcome to Scruter's Privacy Policy</h1>
    <p>This policy outlines how we handle your personal data and protect your privacy when you use our website and services.</p>
  </div>
);

const PolicySection: React.FC<{ title: string; content: React.ReactNode }> = ({ title, content }) => (
  <div className="card bg-white shadow-md rounded-lg p-6 mb-4 transition-transform duration-300 hover:transform hover:translate-y-[-5px] hover:shadow-xl">
    <h2 className="text-2xl font-semibold text-blue-800">{title}</h2>
    {content}
  </div>
);

export default PolicyPage;
