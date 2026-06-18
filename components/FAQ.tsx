"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

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

  return (
    <section
      id="faq"
      ref={ref}
      className="py-20 lg:py-28 bg-white"
      aria-labelledby="faq-heading"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-3xl mx-auto section-padding">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-14"
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "#6B6B6B" }}
          >
            FAQs
          </p>
          <h2
            id="faq-heading"
            className="font-heading font-extrabold tracking-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)", color: "#0A0A0A" }}
          >
            Got questions?
            <br />
            We&rsquo;ve got answers.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.12, ease: [0.23, 1, 0.32, 1] }}
        >
          {faqs.map((faq, i) => (
            <AccordionItem key={faq.question} {...faq} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
