'use client';

import React from 'react';
// Define the props interface for the Section component
interface SectionProps {
  id: string;
  icon: string;
  title: string;
  children: React.ReactNode; // Use ReactNode to allow any valid React child
}

// Section component for each FAQ
const Section: React.FC<SectionProps> = ({ id, icon, title, children }) => (
  <section id={id} className="mt-8">
    <h2 className="text-2xl font-semibold text-gray-800 flex items-center border-l-4 border-blue-600 pl-2 mb-4 cursor-pointer">
      <i className={`${icon} mr-2 text-purple-600`}></i> {title}
    </h2>
    <p className="faq-answer text-gray-700 hidden">{children}</p>
  </section>
);

// Sidebar component
const Sidebar = () => (
  <aside className="w-1/4 bg-gradient-to-b from-blue-500 to-purple-600 text-white p-4 sticky top-0 h-screen overflow-y-auto">
    <ul className="list-none p-0">
      <li className="mb-3">
        <a
          href="#faq1"
          className="flex items-center text-white hover:text-gray-200"
        >
          <i className="fas fa-question-circle mr-2"></i> What is Scruter?
        </a>
      </li>
      <li className="mb-3">
        <a
          href="#faq2"
          className="flex items-center text-white hover:text-gray-200"
        >
          <i className="fas fa-question-circle mr-2"></i> How do I create an
          account?
        </a>
      </li>
      <li className="mb-3">
        <a
          href="#faq3"
          className="flex items-center text-white hover:text-gray-200"
        >
          <i className="fas fa-question-circle mr-2"></i> How do I post an ad?
        </a>
      </li>
      <li className="mb-3">
        <a
          href="#faq4"
          className="flex items-center text-white hover:text-gray-200"
        >
          <i className="fas fa-question-circle mr-2"></i> What payment methods
          are accepted?
        </a>
      </li>
      <li className="mb-3">
        <a
          href="#faq5"
          className="flex items-center text-white hover:text-gray-200"
        >
          <i className="fas fa-question-circle mr-2"></i> How can I contact
          support?
        </a>
      </li>
      <li className="mb-3">
        <a
          href="#faq6"
          className="flex items-center text-white hover:text-gray-200"
        >
          <i className="fas fa-question-circle mr-2"></i> How do I reset my
          password?
        </a>
      </li>
      <li className="mb-3">
        <a
          href="#faq7"
          className="flex items-center text-white hover:text-gray-200"
        >
          <i className="fas fa-question-circle mr-2"></i> How can I delete my
          account?
        </a>
      </li>
      <li className="mb-3">
        <a
          href="#faq8"
          className="flex items-center text-white hover:text-gray-200"
        >
          <i className="fas fa-question-circle mr-2"></i> What should I do if I
          encounter a problem?
        </a>
      </li>
      <li className="mb-3">
        <a
          href="#faq9"
          className="flex items-center text-white hover:text-gray-200"
        >
          <i className="fas fa-question-circle mr-2"></i> Can I edit my ad after
          posting it?
        </a>
      </li>
      <li className="mb-3">
        <a
          href="#faq10"
          className="flex items-center text-white hover:text-gray-200"
        >
          <i className="fas fa-question-circle mr-2"></i> How do I report a user
          or an ad?
        </a>
      </li>
    </ul>
  </aside>
);

// Main FAQ Component
const FAQPage = () => {
  // Scroll progress bar functionality
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
      // Check if progressBar is not null
      progressBar.style.width = scrollPercent + '%';
    }
  };

  // Toggle FAQ answers visibility
  const handleQuestionClick = (event: any) => {
    const answer = event.currentTarget.nextElementSibling;
    answer.classList.toggle('hidden');
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    const questions = document.querySelectorAll('section h2');
    questions.forEach(question => {
      question.addEventListener('click', handleQuestionClick);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      questions.forEach(question => {
        question.removeEventListener('click', handleQuestionClick);
      });
    };
  }, []);

  return (
    <div className="flex">
      <div
        id="progress-bar"
        className="fixed top-0 left-0 h-1 bg-blue-600"
      ></div>
      <Sidebar />
      <main className="main-content w-3/4 p-4 bg-white shadow-lg">
        <div className="text-center mb-2">
          <h1 className="text-4xl text-blue-600 font-bold">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto mt-2">
            Find answers to the most common questions about using Scruter.
          </p>
        </div>

        <Section
          id="faq1"
          icon="fas fa-question-circle"
          title="What is Scruter?"
        >
          Scruter is a local classifieds platform where users can buy, sell, and
          exchange services within their community.
        </Section>

        <Section
          id="faq2"
          icon="fas fa-question-circle"
          title="How do I create an account?"
        >
          To create an account, click on the &quot;Sign Up&quot; button and fill
          out the registration form with your details.
        </Section>

        <Section
          id="faq3"
          icon="fas fa-question-circle"
          title="How do I post an ad?"
        >
          Once you are logged in, navigate to the &quot;Post Ad&quot; section,
          fill in the necessary information, and submit your ad.
        </Section>

        <Section
          id="faq4"
          icon="fas fa-question-circle"
          title="What payment methods are accepted?"
        >
          Scruter accepts various payment methods, including credit/debit cards
          and online payment services.
        </Section>

        <Section
          id="faq5"
          icon="fas fa-question-circle"
          title="How can I contact support?"
        >
          You can reach out to our support team via the &quot;Contact Us&quot;
          section on our website or email us at support@scruter.com.
        </Section>

        <Section
          id="faq6"
          icon="fas fa-question-circle"
          title="How do I reset my password?"
        >
          If you forget your password, click on the &quot;Forgot Password?&quot;
          link on the login page and follow the instructions to reset it.
        </Section>

        <Section
          id="faq7"
          icon="fas fa-question-circle"
          title="How can I delete my account?"
        >
          To delete your account, please contact our support team, and they will
          assist you with the process.
        </Section>

        <Section
          id="faq8"
          icon="fas fa-question-circle"
          title="What should I do if I encounter a problem?"
        >
          If you encounter any issues, please refer to the &quot;Help
          Center&quot; or contact support for assistance.
        </Section>

        <Section
          id="faq9"
          icon="fas fa-question-circle"
          title="Can I edit my ad after posting it?"
        >
          Yes, you can edit your ad by going to your account settings and
          selecting the ad you wish to modify.
        </Section>

        <Section
          id="faq10"
          icon="fas fa-question-circle"
          title="How do I report a user or an ad?"
        >
          You can report a user or ad by clicking the &quot;Report&quot; button
          located next to the ad or user profile.
        </Section>
      </main>
    </div>
  );
};

export default FAQPage;