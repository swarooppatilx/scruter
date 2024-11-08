'use client';


const PolicyPage: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <MainContent />
    </div>
  );
};

const Sidebar: React.FC = () => (
  <aside className="sidebar w-1/4 bg-gradient-to-b from-blue-500 to-purple-600 text-white p-5 sticky top-0 h-screen">
    <ul>
      <li>
        <a
          href="#introduction"
          className="flex items-center py-2 hover:text-gray-200"
        >
          <i className="fas fa-book-open"></i> Introduction
        </a>
      </li>
      <li>
        <a
          href="#information-collected"
          className="flex items-center py-2 hover:text-gray-200"
        >
          <i className="fas fa-info-circle"></i> Information Collected
        </a>
      </li>
      <li>
        <a
          href="#how-we-use"
          className="flex items-center py-2 hover:text-gray-200"
        >
          <i className="fas fa-cogs"></i> How We Use Your Information
        </a>
      </li>
      <li>
        <a
          href="#data-protection"
          className="flex items-center py-2 hover:text-gray-200"
        >
          <i className="fas fa-shield-alt"></i> Data Protection
        </a>
      </li>
      <li>
        <a
          href="#user-rights"
          className="flex items-center py-2 hover:text-gray-200"
        >
          <i className="fas fa-user-shield"></i> User Rights
        </a>
      </li>
      <li>
        <a
          href="#cookies"
          className="flex items-center py-2 hover:text-gray-200"
        >
          <i className="fas fa-cookie"></i> Cookies
        </a>
      </li>
      <li>
        <a
          href="#third-party"
          className="flex items-center py-2 hover:text-gray-200"
        >
          <i className="fas fa-external-link-alt"></i> Third-Party Services
        </a>
      </li>
      <li>
        <a
          href="#changes"
          className="flex items-center py-2 hover:text-gray-200"
        >
          <i className="fas fa-pencil-alt"></i> Changes to This Policy
        </a>
      </li>
    </ul>
  </aside>
);

const MainContent: React.FC = () => (
  <main className="main-content flex-1 p-10 bg-white shadow-md dark:bg-gray-800 dark:text-white">
    <TitleSection />
    <Section id="introduction" icon="fas fa-book-open" title="Introduction">
      <p>
        Welcome to our Privacy Policy page. We are committed to protecting your
        personal data and your right to privacy. This policy outlines how we
        handle your information when you visit our website, engage with our
        services, and make use of our products.
      </p>
    </Section>
    <Section
      id="information-collected"
      icon="fas fa-info-circle"
      title="Information Collected"
    >
      <p>
        We may collect personal information such as your name, email address,
        phone number, and payment information when you use our services.
        Additionally, we gather data on your usage of our website, including
        your IP address, browser type, and access times, to help us improve our
        services.
      </p>
      <p>
        We also collect data through cookies and similar technologies to enhance
        your user experience.
      </p>
    </Section>
    <Section
      id="how-we-use"
      icon="fas fa-cogs"
      title="How We Use Your Information"
    >
      <p>Your information helps us to provide better services, including:</p>
      <ul>
        <li>Enhancing user experience through personalized content.</li>
        <li>
          Improving our website&#39;s functionality and services based on user
          feedback.
        </li>
        <li>
          Communicating with you about updates, promotions, and news related to
          our services.
        </li>
        <li>
          Processing transactions and sending you related information, including
          purchase confirmations and invoices.
        </li>
      </ul>
    </Section>
    <Section
      id="data-protection"
      icon="fas fa-shield-alt"
      title="Data Protection"
    >
      <p>
        We take appropriate security measures to protect your personal
        information from unauthorized access, alteration, disclosure, or
        destruction. We regularly review our practices to ensure data security
        and compliance with applicable laws and regulations.
      </p>
      <p>
        We limit access to your personal information to those employees, agents,
        contractors, and other third parties who have a business need to know.
        They will only process your personal data on our instructions and are
        subject to a duty of confidentiality.
      </p>
    </Section>
    <Section id="user-rights" icon="fas fa-user-shield" title="User Rights">
      <p>
        You have the right to request access to the personal information we hold
        about you. You may also request correction or deletion of your personal
        data in certain circumstances. Additionally, you have the right to
        object to or restrict the processing of your data.
      </p>
      <p>
        If you wish to exercise any of these rights, please contact us using the
        details provided below.
      </p>
    </Section>
    <Section id="cookies" icon="fas fa-cookie" title="Cookies">
      <p>
        Our website uses cookies to enhance your browsing experience. Cookies
        are small files placed on your device to help us recognize your browser
        and capture certain information. You can choose to accept or decline
        cookies through your browser settings.
      </p>
      <p>
        By using our website, you consent to our use of cookies in accordance
        with this policy.
      </p>
    </Section>
    <Section
      id="third-party"
      icon="fas fa-external-link-alt"
      title="Third-Party Services"
    >
      <p>
        We may employ third-party companies and services to facilitate our
        services or to provide our services on our behalf. These third parties
        may have access to your personal data only to perform these tasks on our
        behalf and are obligated not to disclose or use it for any other
        purpose.
      </p>
    </Section>
    <Section
      id="changes"
      icon="fas fa-pencil-alt"
      title="Changes to This Policy"
    >
      <p>
        We may update our privacy policy from time to time. We will notify you
        of any changes by posting the new policy on this page. You are advised
        to review this privacy policy periodically for any changes.
      </p>
      <p>
        Changes to this privacy policy are effective when they are posted on
        this page.
      </p>
    </Section>
  </main>
);

const TitleSection: React.FC = () => (
  <div className="title-section mb-8">
    <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
    <p className="text-lg">
      Your privacy is important to us. This privacy policy explains how we
      collect, use, and protect your information.
    </p>
  </div>
);

const Section: React.FC<{
  id: string;
  icon: string;
  title: string;
  children: React.ReactNode;
}> = ({ id, icon, title, children }) => (
  <section id={id} className="mb-6">
    <h2 className="text-2xl font-semibold mb-2">
      <i className={icon}></i> {title}
    </h2>
    {children}
  </section>
);

export default PolicyPage;
