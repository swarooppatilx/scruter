'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TERMS_CONTENT } from './constant/constants';
import '../../../globals.css';
import { useRef, useEffect } from 'react';

const TermsPage = () => {
  const mainContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mainContent = mainContentRef.current;

    // custom scroll behavior for large screens
    if (mainContent && window.innerWidth >= 1024) {
      const handleScroll = (event: WheelEvent) => {
        event.preventDefault();
        const newScrollTop = Math.max(0, mainContent.scrollTop + event.deltaY);
        mainContent.scrollTo({ top: newScrollTop, behavior: 'auto' });
      };

      mainContent.addEventListener('wheel', handleScroll, { passive: false });
      return () => mainContent.removeEventListener('wheel', handleScroll);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 flex flex-col w-full overflow-hidden selection:bg-cyan-300 selection:text-cyan-900">
      {/* Header Section */}
      <header className="bg-custom-gradient dark:bg-dark-custom-gradient pt-20 pb-10 px-4 lg:pt-28 lg:pb-28 lg:px-10 text-start w-full">
        <h1 className="text-3xl md:text-4xl lg:text-7xl font-bold mb-2 bg-clip-text text-transparent bg-text-gradient">
          Terms of Service
        </h1>
        <p className="text-gray-200 text-sm md:text-lg">Published and effective on: April 30, {new Date().getFullYear()}</p>
      </header>

      <div className="flex flex-col lg:flex-row w-full h-full">
        {/* Main Content */}
        <main
          ref={mainContentRef}
          className="w-full lg:w-4/5 p-4 lg:p-8 bg-white dark:bg-black shadow-lg h-auto lg:h-[calc(100vh-160px)] overflow-y-auto lg:overflow-y-scroll scroll-smooth custom-scrollbar"
        >
          {TERMS_CONTENT.map(({ id, icon, title, content }) => (
            <section id={id} key={id} className="mb-8">
              <h3 className="text-xl md:text-2xl text-black dark:text-white flex items-center mb-2">
                <FontAwesomeIcon icon={icon} className="mr-2 text-[#ff476b]" />
                {title}
              </h3>
              <p className="text-gray-500 text-justify text-sm md:text-base">{content}</p>
            </section>
          ))}
        </main>

        {/* Right Sidebar */}
        <aside className="hidden lg:block w-1/5 p-6 bg-white dark:bg-black text-gray-400 sticky top-0 h-[calc(100vh-160px)]">
          <h2 className="text-gray-600 text-xs uppercase font-semibold mb-4">On This Page</h2>
          <ul>
            {TERMS_CONTENT.map(({ id, title }) => (
              <li key={id} className="mb-2">
                <button
                  onClick={() => {
                    if (mainContentRef.current) {
                      const section = document.getElementById(id);
                      if (section) {
                        section.scrollIntoView({ behavior: 'smooth' });
                      }
                    }
                  }}
                  className="text-sm hover:text-black dark:hover:text-white transition-colors duration-200"
                >
                  {title}
                </button>
              </li>
            ))}
          </ul>

          {/* Contribute Section */}
          <div className="mt-8">
            <h2 className="text-gray-600 text-xs uppercase font-semibold mb-2">Contribute</h2>
            <ul>
              <li>
                <a href="https://github.com/swarooppatilx/scruter/issues/new?assignees=&labels=bug&projects=&template=bug.yml&title=%5BBUG%5D+" target='_blank' className="text-sm hover:text-black dark:hover:text-white transition-colors duration-200">
                  Report an issue
                </a>
              </li>
              <li>
                <a href="https://github.com/swarooppatilx/scruter/issues/new?assignees=&labels=enhancement&projects=&template=feature.yml&title=%5BFeat%5D" target='_blank' className="text-sm hover:text-black dark:hover:text-white transition-colors duration-200">
                  Request a feature
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default TermsPage;