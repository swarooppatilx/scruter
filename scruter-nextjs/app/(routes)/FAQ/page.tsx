'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FAQs } from './faqs';

const FAQForum = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const roseGoldColor = 'bg-gray-200'; // Adjust this to the desired shade of rose gold

  return (
    <motion.div
      className="min-h-screen p-8 bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-5xl mx-auto">
        {/* FAQs Section */}
        <motion.section
          className="mb-16 mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-4xl font-extrabold mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {FAQs.map((faq, index) => (
              <motion.div
                key={index}
                className={`transition duration-300 ease-in-out rounded-lg shadow-md ${roseGoldColor}`}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <button
                  className="w-full text-left p-5 rounded-lg focus:outline-none"
                  onClick={() => toggleFAQ(index)}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">
                      {faq.question}
                    </span>
                    <span
                      className={`text-3xl transition-transform duration-300 transform ${
                        activeIndex === index ? 'rotate-180' : ''
                      }`}
                    >
                      +
                    </span>
                  </div>
                </button>
                <motion.div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    activeIndex === index ? 'max-h-96' : 'max-h-0'
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="p-5 bg-white rounded-lg mt-2 shadow-inner text-gray-600 border-l-4 border-rose-500">
                    {faq.answer}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default FAQForum;
