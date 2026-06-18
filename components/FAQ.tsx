"use client";

import { useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Do I own my website after it's built?",
    answer:
      "Yes, 100%. Your site, your domain, your content — always. We hand over everything and never hold anything hostage.",
  },
  {
    question: "How long does it take to build my site?",
    answer:
      "Starter sites take 1–2 weeks. Business sites 3–4 weeks. Premium e-commerce sites 6–8 weeks depending on complexity.",
  },
  {
    question: "What if I need changes after my site launches?",
    answer:
      "Small changes are covered under Strive Care. Bigger updates are quoted separately — always transparently. No hidden fees, ever.",
  },
  {
    question: "Do you work with businesses outside your city?",
    answer:
      "Absolutely. Strive works with small businesses across Canada and beyond. Everything is handled remotely and seamlessly.",
  },
  {
    question: "What's included in Strive Care?",
    answer:
      "Unlimited small content updates, monthly analytics reports, security maintenance, uptime monitoring, and a monthly check-in call. Everything to keep your site healthy and current.",
  },
  {
    question: "Can I upgrade my package later?",
    answer:
      "Yes. Start where it makes sense and upgrade anytime. We grow with you — your website can scale as your business does.",
  },
];

function AccordionItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const id = `faq-${index}`;

  return (
    <div className="border-b border-border last:border-0">
      <h3>
        <button
          id={`${id}-trigger`}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={() => setOpen(!open)}
          className="flex items-center justify-between w-full py-5 text-left gap-4 group focus-visible:outline-2 focus-visible:outline-primary rounded-sm"
        >
          <span className={`font-heading font-semibold text-base sm:text-lg transition-colors duration-150 ${open ? "text-primary" : "text-foreground group-hover:text-primary"}`}>
            {question}
          </span>
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="shrink-0 text-muted-foreground"
            aria-hidden="true"
          >
            <ChevronDown size={20} />
          </motion.div>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${id}-panel`}
            role="region"
            aria-labelledby={`${id}-trigger`}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-muted-foreground leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};

export default function FAQ() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="faq"
      ref={ref}
      className="py-20 lg:py-28 bg-muted"
      aria-labelledby="faq-heading"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto section-padding">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <h2
            id="faq-heading"
            className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-foreground tracking-tight"
          >
            Got questions? We&apos;ve got answers.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.15, ease: "easeOut" }}
          className="bg-card rounded-2xl border border-border shadow-sm px-6 sm:px-8"
        >
          {faqs.map((faq, i) => (
            <AccordionItem key={faq.question} {...faq} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
