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
        setSuccess("Failed to send message. Try again.");
      }

      setLoading(false);
    },
    [form]
  );
  function ContactCardComponent({ icon, label, value, link }: { icon: React.ReactNode; label: string; value: string; link?: string; }) {
    const content = (
      <div className="glass p-5 rounded-xl flex items-center gap-4 border border-white/10 hover:border-blue-500/40 hover:bg-white/10 transition">
        <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400">{icon}</div>

        <div>
          <p className="text-gray-400 text-sm">{label}</p>
          <p className="font-medium">{value}</p>
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
  return (
    <section id="contact" className="scroll-mt-24 max-w-7xl mx-auto px-6">

      {/* Title */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <h2 className="text-5xl font-bold">
          Get In{" "}
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Touch
          </span>
        </h2>

        <p className="text-gray-400 mt-4">
          Have a project in mind or want to discuss opportunities?
          I'd love to hear from you!
        </p>
      </motion.div>

      {/* Content Grid */}
      <div className="grid md:grid-cols-2 gap-12">

        {/* ===== LEFT SIDE ===== */}
        <motion.div
          variants={fadeLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold text-blue-400 mb-6">
            Let's Connect
          </h3>

          <p className="text-gray-400 mb-8 leading-relaxed">
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
        <motion.div
          variants={fadeRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="glass p-8 rounded-2xl border border-white/10"
        >

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* NAME */}
            <div>
              <label className="text-sm text-gray-400">Your Name*</label>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full mt-2 p-3 rounded-lg bg-transparent border border-white/10 focus:border-blue-500 outline-none"
              />

              {errors.name && (
                <p className="text-red-400 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-sm text-gray-400">Your Email*</label>

              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="youremail@example.com"
                className="w-full mt-2 p-3 rounded-lg bg-transparent border border-white/10 focus:border-blue-500 outline-none"
              />

              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <label className="text-sm text-gray-400">Company Link(If applicable)</label>

              <input
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="Company Details"
                className="w-full mt-2 p-3 rounded-lg bg-transparent border border-white/10 focus:border-blue-500 outline-none"
              />
            </div>

            {/* MESSAGE */}
            <div>
              <label className="text-sm text-gray-400">Your Message</label>

              <textarea
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project or opportunity..."
                className="w-full mt-2 p-3 rounded-lg bg-transparent border border-white/10 focus:border-blue-500 outline-none"
              />

              {errors.message && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.message}
                </p>
              )}
            </div>

            {/* SUCCESS MESSAGE */}
            {success && (
              <p className="text-green-400 text-center">{success}</p>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Message"}
              <Send size={18} />
            </button>

          </form>
        </motion.div>
      </div>
    </section>
  );
}

/* ContactCard is defined above (supports optional link) */