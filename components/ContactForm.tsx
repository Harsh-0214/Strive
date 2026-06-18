"use client";

import { useRef, useState, useId } from "react";
import { motion, useInView } from "framer-motion";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

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
        className="text-sm font-medium text-foreground"
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
  `w-full px-4 py-3 rounded-xl border text-sm bg-background text-foreground placeholder:text-muted-foreground transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
    error
      ? "border-destructive focus:ring-destructive/30"
      : "border-border focus:border-primary"
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
        className="py-20 lg:py-28 bg-background"
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
            <h2 className="font-heading font-extrabold text-3xl text-foreground">
              You&apos;re one step closer to growing online.
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
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
      className="py-20 lg:py-28 bg-background"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-2xl mx-auto section-padding">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="text-center mb-10"
        >
          <h2
            id="contact-heading"
            className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-foreground tracking-tight mb-3"
          >
            Let&apos;s build something great.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Tell us about your business and we&apos;ll get back to you within 24 hours.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          noValidate
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.15, ease: "easeOut" }}
          className="bg-card border border-border rounded-2xl shadow-sm p-6 sm:p-8 flex flex-col gap-5"
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

          <p className="text-xs text-center text-muted-foreground">
            We respond within 24 hours. No spam, ever.
          </p>
        </motion.form>
      </div>
    </section>
  );
}
