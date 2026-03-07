'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import type { ProductFAQ } from '@/types/tienda';

interface SeccionFAQsProps {
  faqs: ProductFAQ[];
}

export default function SeccionFAQs({ faqs }: SeccionFAQsProps) {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  if (faqs.length === 0) return null;

  return (
    <section className="bg-white py-20">
      <div className="container-custom mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-8 text-center font-[var(--font-headline)] text-2xl font-bold text-gray-dark md:text-3xl">
            Preguntas Frecuentes
          </h2>
          <div className="rounded-2xl bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] md:p-8">
            {faqs.map((faq, index) => {
              const isOpen = openFAQ === index;
              const contentId = `product-faq-content-${index}`;
              const triggerId = `product-faq-trigger-${index}`;

              return (
                <div key={faq.id} className="border-b border-gray-light last:border-b-0">
                  <button
                    id={triggerId}
                    onClick={() => setOpenFAQ(isOpen ? null : index)}
                    className="flex w-full items-center justify-between py-5 text-left transition-colors hover:text-coral"
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                  >
                    <span className="pr-4 font-[var(--font-headline)] font-semibold text-gray-dark">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown className="h-5 w-5 text-coral" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        id={contentId}
                        role="region"
                        aria-labelledby={triggerId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pb-5 pr-8 leading-relaxed text-gray-carbon">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
