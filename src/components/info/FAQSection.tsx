'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';
import { faqItems, FAQItem } from '@/data/faq-data';

const categories = [
  { id: 'all', label: 'Todas' },
  { id: 'general', label: 'General' },
  { id: 'productos', label: 'Productos' },
  { id: 'asesorias', label: 'Asesorías' },
  { id: 'pagos', label: 'Pagos' },
];

function FAQAccordionItem({ item, isOpen, onToggle, index }: { item: FAQItem; isOpen: boolean; onToggle: () => void; index: number }) {
  const contentId = `faq-content-${index}`;
  const triggerId = `faq-trigger-${index}`;

  return (
    <div className="border-b border-gray-light last:border-b-0">
      <button
        id={triggerId}
        onClick={onToggle}
        className="flex w-full items-center justify-between py-5 text-left transition-colors hover:text-coral"
        aria-expanded={isOpen}
        aria-controls={contentId}
      >
        <span className="pr-4 font-[var(--font-headline)] font-semibold text-gray-dark">
          {item.question}
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
            <p className="pb-5 pr-8 text-gray-carbon leading-relaxed">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredFAQs =
    activeCategory === 'all'
      ? faqItems
      : faqItems.filter((item) => item.category === activeCategory);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24" style={{ background: 'var(--cream)' }}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-coral shadow-sm">
            <HelpCircle className="h-4 w-4" />
            FAQ
          </span>
          <h2 className="text-section-title mb-4 font-[var(--font-headline)] font-bold text-gray-dark">
            Preguntas Frecuentes
          </h2>
          <p className="text-lg text-gray-carbon">
            Respuestas a las dudas más comunes sobre el trabajo remoto y mis servicios.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10 flex flex-wrap justify-center gap-2"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setActiveCategory(category.id);
                setOpenIndex(null);
              }}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-coral to-pink text-white shadow-md'
                  : 'bg-white text-gray-carbon hover:bg-gray-50'
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* FAQ List */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] md:p-8"
        >
          {filteredFAQs.map((item, index) => (
            <FAQAccordionItem
              key={`${item.category}-${index}`}
              item={item}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </motion.div>

        {/* Still have questions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mt-12 max-w-2xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 shadow-sm">
            <Sparkles className="h-4 w-4 text-coral" />
            <span className="text-gray-carbon">
              ¿No encontraste lo que buscabas?{' '}
              <a href="#contacto" className="font-medium text-coral hover:underline">
                Escríbeme directamente
              </a>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
