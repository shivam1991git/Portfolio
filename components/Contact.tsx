"use client";

import { motion } from "framer-motion";
import { fadeUp, fadeLeft, fadeRight } from "../lib/motion";
import { Mail, Phone, Linkedin, Github, Send, Instagram } from "lucide-react";
import { useState, useCallback, memo } from "react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  /* ========= VALIDATION ========= */

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!form.name.trim()) newErrors.name = "Name is required";

    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email))
      newErrors.email = "Invalid email address";

    if (!form.message.trim()) newErrors.message = "Message cannot be empty";

    return newErrors;
  };

  /* ========= HANDLE CHANGE ========= */

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    },
    []
  );

  /* ========= HANDLE SUBMIT ========= */

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const validationErrors = validate();
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length > 0) return;

      setLoading(true);
      setSuccess("");

      try {
        await emailjs.send(
          "service_y3zy2vv",
          "template_oqoltzk",
          {
            name: form.name,
            email: form.email,
            message: form.message,
            title: "Portfolio Contact",
          },
          "nozrB2Z4MYh7-S0-m"
        );

        setSuccess("Message sent successfully!");
        setForm({ name: "", email: "", company: "", message: "" });
      } catch (err) {
        console.error("Email sending error:", err);
        const errorMessage = err instanceof Error ? err.message : "Failed to send message. Try again.";
        setSuccess(`Error: ${errorMessage}`);
      } finally {
        setLoading(false);
      }
    },
    [form]
  );
  return (
    // <section id="contact" className="mx-auto max-w-7xl scroll-mt-24 px-4 pr-14 sm:px-6 sm:pr-16 md:pr-20 lg:pr-6">
    <section
      id="contact"
      className="mx-auto max-w-7xl scroll-mt-24 px-4 sm:px-6 lg:px-8"
    >

      {/* Title */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-10 text-center sm:mb-16 lg:mb-20"
      >
        <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
          Get In{" "}
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Touch
          </span>
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-400 sm:text-base">
          Have a project in mind or want to discuss opportunities?
          I'd love to hear from you!
        </p>
      </motion.div>

      {/* Content Grid */}
      {/* <div className="grid gap-8 md:grid-cols-2 lg:gap-12"> */}
      <div className="flex justify-center">

        {/* ===== LEFT SIDE ===== */}
        <motion.div
          variants={fadeLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3 className="mb-4 text-xl font-semibold text-blue-400 sm:mb-6 sm:text-2xl">
            Let's Connect
          </h3>

          <p className="mb-6 text-sm leading-7 text-gray-400 sm:mb-8 sm:text-base">
            I'm always open to discussing new projects, creative ideas,
            or opportunities to be part of your vision. Whether you're
            looking for a dedicated full stack developer or just want
            to say hi, feel free to reach out!
          </p>

          <div className="space-y-4">

            <ContactCard
              icon={<Mail />}
              label="Email"
              value="shivamsingh.s1991@gmail.com"
              link="mailto:shivamsingh.s1991@gmail.com"
            />

            <ContactCard
              icon={<Phone />}
              label="Phone"
              value="+91-9653081173"
              link="tel:+919653081173"
            />

            <ContactCard
              icon={<Linkedin />}
              label="LinkedIn"
              value="Connect on LinkedIn"
              link="https://www.linkedin.com/in/shivam-singh-010a61250"
            />

            <ContactCard
              icon={<Github />}
              label="GitHub"
              value="View my repositories"
              link="http://github.com/shivam1991git"
            />
            <ContactCard
              icon={<Instagram />}
              label="Instagram"
              value="Connect me on my Instagram"
              link="https://www.instagram.com/onenonly_shiv?igsh=MXJpMmMwZm1vNGFpeQ%3D%3D&utm_source=qr"
            />

          </div>
        </motion.div>

        {/* ===== RIGHT SIDE — FORM ===== */}
        {/* <motion.div
          variants={fadeRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="glass rounded-2xl border border-white/10 p-5 sm:p-8"
        >

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="text-sm text-gray-400">Your Name*</label>

              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="mt-2 w-full rounded-lg border border-white/10 bg-transparent p-3 outline-none transition focus:border-blue-500"
              />

              {errors.name && (
                <p className="text-red-400 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="text-sm text-gray-400">Your Email*</label>

              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="youremail@example.com"
                className="mt-2 w-full rounded-lg border border-white/10 bg-transparent p-3 outline-none transition focus:border-blue-500"
              />

              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <label htmlFor="company" className="text-sm text-gray-400">Company Link(If applicable)</label>

              <input
                id="company"
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="Company Details"
                className="mt-2 w-full rounded-lg border border-white/10 bg-transparent p-3 outline-none transition focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="message" className="text-sm text-gray-400">Your Message</label>

              <textarea
                id="message"
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project or opportunity..."
                className="mt-2 w-full resize-y rounded-lg border border-white/10 bg-transparent p-3 outline-none transition focus:border-blue-500"
              />

              {errors.message && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.message}
                </p>
              )}
            </div>
            {success && (
              <p className="text-green-400 text-center">{success}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 transition hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Message"}
              <Send size={18} />
            </button>

          </form>
        </motion.div> */}
      </div>
    </section>
  );
}

function ContactCardComponent({ icon, label, value, link }: { icon: React.ReactNode; label: string; value: string; link?: string; }) {
  const content = (
    <div className="glass flex items-center gap-3 rounded-xl border border-white/10 p-4 transition hover:border-blue-500/40 hover:bg-white/10 sm:gap-4 sm:p-5">
      <div className="shrink-0 rounded-lg bg-blue-500/10 p-3 text-blue-400">{icon}</div>

      <div className="min-w-0">
        <p className="text-sm text-gray-400">{label}</p>
        <p className="break-words text-sm font-medium sm:text-base">{value}</p>
      </div>
    </div>
  );

  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className="block">
        {content}
      </a>
    );
  }

  return content;
}

const ContactCard = memo(ContactCardComponent);
