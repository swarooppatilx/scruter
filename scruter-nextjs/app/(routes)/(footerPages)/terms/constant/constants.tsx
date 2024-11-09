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

export const MENU_ITEMS = [
  { id: 'acceptance', icon: faUserCheck, text: 'Acceptance of Terms' },
  {
    id: 'use-services',
    icon: faShieldAlt,
    text: 'Use of Platform and Services',
  },
  { id: 'intellectual-property', icon: faGavel, text: 'Intellectual Property' },
  { id: 'postings', icon: faListAlt, text: 'Posting Guidelines' },
  { id: 'security', icon: faLock, text: 'Account Security' },
  { id: 'external-links', icon: faExternalLinkAlt, text: 'External Links' },
  {
    id: 'liability',
    icon: faExclamationTriangle,
    text: 'Limitation of Liability',
  },
  { id: 'privacy', icon: faShieldAlt, text: 'Privacy Policy' },
  { id: 'changes', icon: faLink, text: 'Changes to Terms' },
  { id: 'termination', icon: faLock, text: 'Termination of Access' },
  { id: 'contact', icon: faEnvelope, text: 'Contact Information' },
];

export const TERMS_CONTENT = [
  {
    id: 'acceptance',
    icon: faUserCheck,
    title: 'Acceptance of Terms',
    content:
      'By accessing or using the Scruter platform, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions. If you do not agree to these terms, you are advised to discontinue the use of our platform and any related services immediately. Your use of our platform constitutes acceptance of all policies, rules, and guidelines associated with Scruter.',
  },
  {
    id: 'use-services',
    icon: faShieldAlt,
    title: 'Use of Platform and Services',
    content:
      'Scruter is designed to connect users within local communities, providing a marketplace for buying, selling, and exchanging goods and services. As a user, you agree to conduct all interactions and transactions in a manner that is lawful, ethical, and respectful. Unauthorized or harmful activity, including any form of fraud, will not be tolerated and may result in account suspension or termination.',
  },
  {
    id: 'intellectual-property',
    icon: faGavel,
    title: 'Intellectual Property',
    content:
      'All materials on the Scruter platform, including logos, branding, text, images, and design elements, are the property of Scruter and are protected by copyright and intellectual property laws. Users are prohibited from using or reproducing any Scruter-owned content without explicit permission, as unauthorized use constitutes a violation of these terms.',
  },
  {
    id: 'postings',
    icon: faListAlt,
    title: 'Posting Guidelines',
    content:
      'Users are solely responsible for the content they post on the Scruter platform. All posts must adhere to our guidelines, which prohibit spam, offensive language, inappropriate material, and any form of illegal content. Scruter reserves the right to remove content that does not comply with these guidelines and to take appropriate action against violators.',
  },
  {
    id: 'security',
    icon: faLock,
    title: 'Account Security',
    content:
      'Account security is a shared responsibility. Users must take care to keep their login credentials secure and confidential. Scruter cannot be held responsible for unauthorized access to accounts caused by negligence or mishandling of personal information. Users should report any suspicious activity or security breaches promptly to our support team.',
  },
  {
    id: 'external-links',
    icon: faExternalLinkAlt,
    title: 'External Links',
    content:
      'For your convenience, Scruter may provide links to third-party websites. However, we do not endorse or assume responsibility for the content, privacy practices, or other policies of these external sites. Users accessing third-party links do so at their own risk and should review the terms and policies of those sites independently.',
  },
  {
    id: 'liability',
    icon: faExclamationTriangle,
    title: 'Limitation of Liability',
    content:
      'Scruter is not liable for any direct, indirect, incidental, or consequential damages arising from transactions conducted between users on the platform. Users are advised to proceed with caution and to verify information before engaging in any exchange. All transactions are conducted at the user’s own discretion and risk.',
  },
  {
    id: 'privacy',
    icon: faShieldAlt,
    title: 'Privacy Policy',
    content:
      'Your privacy is important to us. Scruter’s Privacy Policy explains in detail how we collect, use, share, and protect your personal information. We encourage you to review our Privacy Policy to understand our practices and your rights regarding your personal data.',
  },
  {
    id: 'changes',
    icon: faLink,
    title: 'Changes to Terms',
    content:
      'Scruter reserves the right to modify these Terms & Conditions at any time. Major changes will be communicated to users through notifications. However, continued use of the platform following any updates to these terms indicates your acceptance of those changes. We recommend reviewing these terms periodically to stay informed of any adjustments.',
  },
  {
    id: 'termination',
    icon: faLock,
    title: 'Termination of Access',
    content:
      'Scruter reserves the right to suspend or terminate any user account that violates these Terms & Conditions. This includes, but is not limited to, the posting of prohibited content, engagement in fraudulent activities, or any behavior deemed detrimental to the platform’s community. Termination may occur without prior notice, depending on the severity of the violation.',
  },
  {
    id: 'contact',
    icon: faEnvelope,
    title: 'Contact Information',
    content:
      'If you have questions or need further clarification on these Terms & Conditions, please feel free to reach out to our support team at support@scruter.com. We are here to assist with any inquiries related to our platform, policies, and services.',
  },
];
