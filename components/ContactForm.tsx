"use client";

import { useRef, useState, useId } from "react";
import { motion, useInView } from "framer-motion";
import { Loader2, CheckCircle2, AlertCircle, ShieldCheck, Zap, Star } from "lucide-react";

type FieldError = string | null;

interface FormState {
  firstName: string;
  lastName: string;
  businessName: string;
  email: string;
  phone: string;
  packageInterest: string;
  message: string;
}

interface FieldErrors {
  firstName: FieldError;
  lastName: FieldError;
  businessName: FieldError;
  email: FieldError;
  phone: FieldError;
  packageInterest: FieldError;
  message: FieldError;
}

const initialForm: FormState = {
  firstName: "",
  lastName: "",
  businessName: "",
  email: "",
  phone: "",
  packageInterest: "",
  message: "",
};

const initialErrors: FieldErrors = {
  firstName: null,
  lastName: null,
  businessName: null,
  email: null,
  phone: null,
  packageInterest: null,
  message: null,
};

function validate(form: FormState): FieldErrors {
  const errors: FieldErrors = { ...initialErrors };

  if (!form.firstName.trim()) errors.firstName = "First name is required.";
  if (!form.lastName.trim()) errors.lastName = "Last name is required.";
  if (!form.businessName.trim())
    errors.businessName = "Business name is required.";
  if (!form.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Enter a valid email address (e.g. you@example.com).";
  }
  if (form.phone && !/^[\d\s\+\-\(\)]{7,20}$/.test(form.phone)) {
    errors.phone = "Enter a valid phone number.";
  }
  if (!form.packageInterest)
    errors.packageInterest = "Please select a package.";
  if (!form.message.trim()) errors.message = "Please tell us about your business.";

  return errors;
}

function validateField(
  field: keyof FormState,
  value: string,
  form: FormState
): FieldError {
  const errors = validate({ ...form, [field]: value });
  return errors[field];
}

function hasErrors(errors: FieldErrors): boolean {
  return Object.values(errors).some(Boolean);
}

function FieldWrapper({
  label,
  htmlFor,
  error,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  error: FieldError;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={htmlFor}
        className="text-sm font-medium text-white"
      >
        {label}
        {required && (
          <span className="text-destructive ml-0.5" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p
          id={`${htmlFor}-error`}
          role="alert"
          className="flex items-start gap-1.5 text-destructive text-xs"
        >
          <AlertCircle
            size={13}
            strokeWidth={2}
            className="shrink-0 mt-0.5"
            aria-hidden="true"
          />
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass = (error: FieldError) =>
  `w-full px-4 py-3 rounded-xl border text-sm bg-white/5 text-white placeholder:text-white/30 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
    error
      ? "border-destructive focus:ring-destructive/30"
      : "border-white/15 focus:border-primary"
  }`;

export default function ContactForm() {
  const uid = useId();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FieldErrors>(initialErrors);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    const error = validateField(name as keyof FormState, value, form);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = validate(form);
    setErrors(newErrors);

    if (hasErrors(newErrors)) {
      const firstErrorField = (Object.keys(newErrors) as Array<keyof FieldErrors>).find(
        (k) => newErrors[k]
      );
      if (firstErrorField) {
        const el = document.getElementById(`${uid}-${firstErrorField}`);
        el?.focus();
      }
      return;
    }

    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1800));
    setStatus("success");
  };

  if (status === "success") {
    return (
      <section
        id="contact"
        ref={ref}
        className="py-20 lg:py-28"
        style={{ background: 'hsl(220 28% 6%)' }}
        aria-labelledby="contact-heading"
      >
        <div className="max-w-2xl mx-auto section-padding text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center gap-5"
          >
            <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center">
              <CheckCircle2
                size={40}
                strokeWidth={1.5}
                className="text-success"
                aria-hidden="true"
              />
            </div>
            <h2 className="font-heading font-extrabold text-3xl text-white">
              You&apos;re one step closer to growing online.
            </h2>
            <p className="text-white/60 text-lg leading-relaxed">
              We&apos;ll be in touch soon — usually within 24 hours. Keep an eye on your
              inbox.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="contact"
      ref={ref}
      className="py-20 lg:py-28"
      style={{ background: 'hsl(220 28% 6%)' }}
      aria-labelledby="contact-heading"
    >
      <div className="max-w-5xl mx-auto section-padding">
        {/* Heading: full width */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="text-center mb-10"
        >
          <h2
            id="contact-heading"
            className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight mb-3"
          >
            Let&apos;s build something great.
          </h2>
          <p className="text-white/60 text-lg leading-relaxed">
            Tell us about your business and we&apos;ll get back to you within 24 hours.
          </p>
        </motion.div>

        {/* 2-col layout: form (left, wider) | sidebar (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">
          {/* Form column */}
          <div className="lg:col-span-3">
            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
              className="flex flex-wrap items-center justify-center gap-3 mb-6"
              aria-label="Trust indicators"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 text-white/60 text-xs font-medium">
                <ShieldCheck size={13} strokeWidth={2} className="text-primary" aria-hidden="true" />
                100% confidential
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 text-white/60 text-xs font-medium">
                <Zap size={13} strokeWidth={2} className="text-accent" aria-hidden="true" />
                24hr response
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 text-white/60 text-xs font-medium">
                <CheckCircle2 size={13} strokeWidth={2} className="text-success" aria-hidden="true" />
                No commitment
              </span>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit}
              noValidate
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.15, ease: "easeOut" }}
              className="rounded-2xl p-6 sm:p-8 flex flex-col gap-5"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '1rem', boxShadow: '0 24px 80px rgba(0,0,0,0.4)' }}
              aria-label="Contact form"
            >
              {/* Name row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FieldWrapper
                  label="First name"
                  htmlFor={`${uid}-firstName`}
                  error={errors.firstName}
                  required
                >
                  <input
                    id={`${uid}-firstName`}
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    value={form.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Maria"
                    className={inputClass(errors.firstName)}
                    aria-describedby={errors.firstName ? `${uid}-firstName-error` : undefined}
                    aria-invalid={!!errors.firstName}
                    aria-required="true"
                  />
                </FieldWrapper>

                <FieldWrapper
                  label="Last name"
                  htmlFor={`${uid}-lastName`}
                  error={errors.lastName}
                  required
                >
                  <input
                    id={`${uid}-lastName`}
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    value={form.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Torres"
                    className={inputClass(errors.lastName)}
                    aria-describedby={errors.lastName ? `${uid}-lastName-error` : undefined}
                    aria-invalid={!!errors.lastName}
                    aria-required="true"
                  />
                </FieldWrapper>
              </div>

              {/* Business name */}
              <FieldWrapper
                label="Business name"
                htmlFor={`${uid}-businessName`}
                error={errors.businessName}
                required
              >
                <input
                  id={`${uid}-businessName`}
                  name="businessName"
                  type="text"
                  autoComplete="organization"
                  value={form.businessName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Blush Beauty Studio"
                  className={inputClass(errors.businessName)}
                  aria-describedby={errors.businessName ? `${uid}-businessName-error` : undefined}
                  aria-invalid={!!errors.businessName}
                  aria-required="true"
                />
              </FieldWrapper>

              {/* Email + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FieldWrapper
                  label="Email address"
                  htmlFor={`${uid}-email`}
                  error={errors.email}
                  required
                >
                  <input
                    id={`${uid}-email`}
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="maria@blushstudio.ca"
                    className={inputClass(errors.email)}
                    aria-describedby={errors.email ? `${uid}-email-error` : undefined}
                    aria-invalid={!!errors.email}
                    aria-required="true"
                  />
                </FieldWrapper>

                <FieldWrapper
                  label="Phone number"
                  htmlFor={`${uid}-phone`}
                  error={errors.phone}
                >
                  <input
                    id={`${uid}-phone`}
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="+1 (416) 555-0100"
                    className={inputClass(errors.phone)}
                    aria-describedby={errors.phone ? `${uid}-phone-error` : undefined}
                    aria-invalid={!!errors.phone}
                  />
                </FieldWrapper>
              </div>

              {/* Package interest */}
              <FieldWrapper
                label="Package interest"
                htmlFor={`${uid}-packageInterest`}
                error={errors.packageInterest}
                required
              >
                <select
                  id={`${uid}-packageInterest`}
                  name="packageInterest"
                  value={form.packageInterest}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`${inputClass(errors.packageInterest)} cursor-pointer appearance-none`}
                  aria-describedby={errors.packageInterest ? `${uid}-packageInterest-error` : undefined}
                  aria-invalid={!!errors.packageInterest}
                  aria-required="true"
                >
                  <option value="" disabled>
                    Select a package...
                  </option>
                  <option value="starter">Starter ($300–800)</option>
                  <option value="business">Business ($1,500–3,500)</option>
                  <option value="premium">Premium ($4,000–10,000+)</option>
                  <option value="unsure">Not sure yet</option>
                </select>
              </FieldWrapper>

              {/* Message */}
              <FieldWrapper
                label="Tell us about your business"
                htmlFor={`${uid}-message`}
                error={errors.message}
                required
              >
                <textarea
                  id={`${uid}-message`}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="What does your business do? What are your goals for your website? Any questions for us?"
                  rows={5}
                  className={`${inputClass(errors.message)} resize-y min-h-[120px]`}
                  aria-describedby={errors.message ? `${uid}-message-error` : undefined}
                  aria-invalid={!!errors.message}
                  aria-required="true"
                />
              </FieldWrapper>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-base hover:opacity-90 active:scale-95 transition-all duration-200 shadow-md shadow-primary/20 disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100 mt-1"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={18} className="animate-spin" aria-hidden="true" />
                    Sending your request…
                  </>
                ) : (
                  "Send My Request"
                )}
              </button>

              <p className="text-xs text-center text-white/40">
                We respond within 24 hours. No spam, ever.
              </p>
            </motion.form>
          </div>

          {/* Sidebar column */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* What happens next card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.25, ease: "easeOut" }}
              className="rounded-2xl p-6"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <h3 className="font-heading font-bold text-lg text-white mb-4">
                What happens next?
              </h3>
              <ol className="flex flex-col gap-4" role="list">
                {[
                  { step: "1", text: "We review your request and reach out within 24 hours." },
                  { step: "2", text: "We jump on a quick call to learn about your business." },
                  { step: "3", text: "You receive a custom proposal — no obligation." },
                ].map(({ step, text }) => (
                  <li key={step} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {step}
                    </span>
                    <p className="text-sm text-white/60 leading-relaxed">{text}</p>
                  </li>
                ))}
              </ol>
            </motion.div>

            {/* Testimonial snippet */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.35, ease: "easeOut" }}
              className="rounded-2xl border border-primary/25 bg-primary/10 p-6"
            >
              <div className="flex gap-0.5 mb-3" aria-label="5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill="currentColor"
                    strokeWidth={0}
                    className="text-primary"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="text-sm text-white/80 leading-relaxed mb-4">
                &ldquo;Strive built us a booking site in two weeks. We doubled our appointments the next month.&rdquo;
              </p>
              <p className="text-xs text-white/50 font-medium">
                Maria T. &mdash; Blush Beauty Studio, Toronto
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
