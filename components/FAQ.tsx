"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "Do I own my website after it's built?",
    answer:
      "Yes, 100%. Your site, your domain, your content, always. We hand over everything and never hold anything hostage.",
  },
  {
    question: "How long does it take to build my site?",
    answer:
      "Launch sites take 1–2 weeks. Growth sites (restaurants, booking businesses) 3–4 weeks. Commerce sites 5–7 weeks depending on catalog size.",
  },
  {
    question: "What if I need changes after my site launches?",
    answer:
      "Small tweaks after launch are on us for the first 30 days. Bigger updates after that are quoted separately, always transparently. No hidden fees, ever.",
  },
  {
    question: "Do you work with businesses outside your city?",
    answer:
      "Absolutely. Strive works with small businesses across Canada and beyond. Everything is handled remotely and seamlessly.",
  },
  {
    question: "Which package is right for my business?",
    answer:
      "If you just need a portfolio or one-pager, Launch ($500) is it. Restaurants, salons, and anything with bookings or high traffic fit Growth ($1,500). Selling physical products online means Commerce ($2,000+). Not sure? Tell us about your business in the form and we'll recommend one.",
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
    <div
      style={{ borderBottom: "1px solid rgba(10,10,10,0.08)" }}
      className="last:border-0"
    >
      <h3>
        <button
          id={`${id}-trigger`}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={() => setOpen(!open)}
          className="flex items-center justify-between w-full py-5 text-left gap-4 group"
          style={{ outline: "none" }}
        >
          <span
            className="font-heading font-semibold text-base sm:text-lg"
            style={{
              color: open ? "#00B4D8" : "#0A0A0A",
              transition: "color 150ms ease",
            }}
          >
            {question}
          </span>
          {/* +/- indicator */}
          <span
            className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full border text-base font-bold"
            style={{
              borderColor: open ? "#00B4D8" : "rgba(10,10,10,0.15)",
              color: open ? "#00B4D8" : "#6B6B6B",
              transition: "border-color 150ms ease, color 150ms ease",
              lineHeight: 1,
            }}
            aria-hidden="true"
          >
            {open ? "−" : "+"}
          </span>
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
            transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden"
          >
            <p
              className="pb-5 leading-relaxed text-[0.9375rem]"
              style={{ color: "#6B6B6B" }}
            >
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

  const mid = Math.ceil(faqs.length / 2);
  const colA = faqs.slice(0, mid);
  const colB = faqs.slice(mid);

  return (
    <section
      id="faq"
      ref={ref}
      className="py-14 lg:py-16 bg-white"
      aria-labelledby="faq-heading"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="w-full section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="mb-8"
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: "#6B6B6B" }}
          >
            FAQs
          </p>
          <h2
            id="faq-heading"
            className="font-heading font-extrabold tracking-tight"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", color: "#0A0A0A" }}
          >
            Got questions? We&rsquo;ve got answers.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 md:gap-x-12"
        >
          <div>
            {colA.map((faq, i) => (
              <AccordionItem key={faq.question} {...faq} index={i} />
            ))}
          </div>
          <div>
            {colB.map((faq, i) => (
              <AccordionItem key={faq.question} {...faq} index={mid + i} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
