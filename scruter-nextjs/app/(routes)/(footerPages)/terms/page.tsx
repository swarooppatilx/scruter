'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserCheck,
  faShieldAlt,
  faGavel,
  faListAlt,
  faLock,
  faExternalLinkAlt,
  faExclamationTriangle,
  faEnvelope,
  faLink,
} from '@fortawesome/free-solid-svg-icons';

const TermsPage = () => {
  return (
    <div className="flex flex-col">
      <div
        id="progress-bar"
        className="fixed top-0 left-0 h-1 bg-blue-600 z-50"
      ></div>
      <div className="flex">
        <aside className="sidebar w-1/4 bg-gradient-to-b from-blue-600 to-purple-600 text-white p-5 sticky top-0 h-screen">
          <ul>
            {[
              {
                id: 'acceptance',
                icon: faUserCheck,
                text: 'Acceptance of Terms',
              },
              {
                id: 'use-services',
                icon: faShieldAlt,
                text: 'Use of Platform and Services',
              },
              {
                id: 'intellectual-property',
                icon: faGavel,
                text: 'Intellectual Property',
              },
              { id: 'postings', icon: faListAlt, text: 'Posting Guidelines' },
              { id: 'security', icon: faLock, text: 'Account Security' },
              {
                id: 'external-links',
                icon: faExternalLinkAlt,
                text: 'External Links',
              },
              {
                id: 'liability',
                icon: faExclamationTriangle,
                text: 'Limitation of Liability',
              },
              { id: 'privacy', icon: faShieldAlt, text: 'Privacy Policy' },
              { id: 'changes', icon: faLink, text: 'Changes to Terms' },
              {
                id: 'termination',
                icon: faLock,
                text: 'Termination of Access',
              },
              {
                id: 'contact',
                icon: faEnvelope,
                text: 'Contact Information',
              },
            ].map(({ id, icon, text }) => (
              <li key={id} className="mb-4">
                <a
                  href={`#${id}`}
                  className="flex items-center text-white text-lg hover:text-gray-200 transition-colors duration-200"
                >
                  <FontAwesomeIcon icon={icon} className="mr-2" />
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        <main className="main-content w-3/4 p-10 bg-white shadow-lg">
          <div className="title-section text-center mb-8">
            <h1 className="text-3xl text-blue-600 font-bold">
              Terms and Conditions for Scruter
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Welcome to Scruter, a platform for local classifieds where you can
              buy, sell, and exchange services within your community. By
              accessing and using Scruter, you agree to these Terms &
              Conditions.
            </p>
          </div>

          {[
            {
              id: 'acceptance',
              icon: faUserCheck,
              title: 'Acceptance of Terms',
              content:
                'By using Scruter, you agree to these Terms & Conditions. If you do not accept any of these terms, please refrain from using our platform.',
            },
            {
              id: 'use-services',
              icon: faShieldAlt,
              title: 'Use of Platform and Services',
              content:
                'Scruter provides a marketplace for users to connect locally for buying, selling, and exchanging services. Users agree to conduct all transactions legally and ethically.',
            },
            {
              id: 'intellectual-property',
              icon: faGavel,
              title: 'Intellectual Property',
              content:
                'All content on Scruter, including logos and trademarks, is owned by Scruter and protected under copyright laws. Unauthorized use is prohibited.',
            },
            {
              id: 'postings',
              icon: faListAlt,
              title: 'Posting Guidelines',
              content:
                'Users are responsible for the content they post and must ensure it complies with our guidelines, which prohibit spam, inappropriate content, and illegal activities.',
            },
            {
              id: 'security',
              icon: faLock,
              title: 'Account Security',
              content:
                'Users must secure their accounts by keeping their login credentials private. Scruter is not responsible for any loss due to compromised accounts.',
            },
            {
              id: 'external-links',
              icon: faExternalLinkAlt,
              title: 'External Links',
              content:
                'Scruter may include links to external websites. We are not responsible for content on these third-party sites.',
            },
            {
              id: 'liability',
              icon: faExclamationTriangle,
              title: 'Limitation of Liability',
              content:
                'Scruter is not liable for any damages resulting from transactions between users. All transactions are at the users’ discretion.',
            },
            {
              id: 'privacy',
              icon: faShieldAlt,
              title: 'Privacy Policy',
              content:
                'We respect your privacy. Please read our Privacy Policy to understand how we collect, use, and protect your information.',
            },
            {
              id: 'changes',
              icon: faLink,
              title: 'Changes to Terms',
              content:
                'Scruter reserves the right to update these Terms & Conditions at any time. Users will be notified of significant changes, but continued use of the platform constitutes acceptance of any modifications.',
            },
            {
              id: 'termination',
              icon: faLock,
              title: 'Termination of Access',
              content:
                'We reserve the right to suspend or terminate accounts for violations of our Terms & Conditions, including but not limited to posting prohibited content or engaging in fraudulent activities.',
            },
            {
              id: 'contact',
              icon: faEnvelope,
              title: 'Contact Information',
              content:
                'If you have any questions about these Terms & Conditions, please contact us at support@scruter.com.',
            },
          ].map(({ id, icon, title, content }) => (
            <section key={id} id={id} className="mt-8">
              <h2 className="text-2xl text-gray-800 flex items-center border-l-4 border-blue-600 pl-2 mb-2">
                <FontAwesomeIcon icon={icon} className="mr-2 text-purple-600" />
                {title}
              </h2>
              <p className="text-gray-600 text-justify">{content}</p>
            </section>
          ))}
        </main>
      </div>
    </div>
  );
};

export default TermsPage;
