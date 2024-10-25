"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { CardSpotlight } from "@/app/components/ui/card-spotlight";
import { Button } from "@/app/components/ui/moving-border";
import Header from "@/app/components/ui/Header";
import Footer from "@/app/components/ui/Footer";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import {
  ArrowRight,
  DollarSign,
  ShieldCheck,
  Zap,
  ChevronDown,
} from "lucide-react";

export default function HomePage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.2 1"],
  });

  const scaleProgress = useSpring(
    useTransform(scrollYProgress, [0, 1], [0.8, 1]),
    {
      stiffness: 100,
      damping: 30,
      restDelta: 0.001,
    },
  );
  const opacityProgress = useSpring(
    useTransform(scrollYProgress, [0, 1], [0.3, 1]),
    {
      stiffness: 100,
      damping: 30,
      restDelta: 0.001,
    },
  );

  const containerVariants = {
    hidden: { opacity: 1, scale: 1.2 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return (
    <div className="flex min-h-screen flex-col bg-amber-50 font-lora">
      <Header />

      <main className="flex-grow">
        <section className="relative overflow-hidden bg-amber-500 py-32 text-white md:py-48">
          <motion.div
            className="container relative z-10 mx-auto px-4 text-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1
              variants={itemVariants}
              className="mb-6 text-5xl font-bold leading-tight md:text-7xl"
            >
              Transform Your Cash into{" "}
              <span className="text-yellow-200">Instant Gold</span>
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="mx-auto mb-10 max-w-2xl text-xl"
            >
              Experience the fastest, safest, and most valuable way to Buy Gold.
              You're just{" "}
              <span className="inline-block rounded-md bg-amber-600 px-2 py-1">
                two clicks
              </span>{" "}
              away from{" "}
              <span className="mt-2 inline-block rounded-md bg-amber-600 px-2 py-1 sm:mt-0">
                owning Gold.
              </span>
            </motion.p>
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/buy"
                className="inline-flex transform items-center rounded-full bg-amber-700 px-8 py-4 font-cinzel text-lg font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-amber-800 hover:shadow-xl"
              >
                Buy Gold Now
                <ArrowRight className="ml-2" />
              </Link>
            </motion.div>
          </motion.div>
          <motion.div
            className="absolute bottom-0 left-0 right-0 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <ChevronDown className="mx-auto h-12 w-12 animate-bounce text-white" />
          </motion.div>
          <motion.div
            className="absolute inset-0 bg-amber-400 opacity-20"
            initial={{ scale: 1.2, rotate: -5 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </section>

        <section className="bg-white py-20" ref={ref}>
          <div className="container mx-auto px-4">
            <motion.h2
              className="mb-16 text-center text-4xl font-bold text-amber-800 md:text-5xl"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              Why Choose EEVEEGOLD
            </motion.h2>
            <motion.div
              className="flex flex-col items-center justify-center gap-4 lg:flex-row lg:gap-8"
              style={{ scale: scaleProgress, opacity: opacityProgress }}
            >
              {[
                {
                  title: "Unbeatable Prices",
                  icon: DollarSign,
                  description:
                    "We guarantee the highest market rates for your precious metals.",
                },
                {
                  title: "Secure Transactions",
                  icon: ShieldCheck,
                  description:
                    "Your gold and personal information are protected with state-of-the-art security.",
                },
                {
                  title: "Lightning-Fast Payments",
                  icon: Zap,
                  description:
                    "Receive your cash within 24 hours of accepting our offer.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className=""
                >
                  <Button
                    duration={7000}
                    className="rounded-xl bg-amber-100 p-6 shadow-lg transition duration-300 hover:shadow-xl"
                  >
                    <motion.div
                      className="mb-6 inline-block rounded-full bg-amber-300 p-4"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <feature.icon className="h-10 w-10 text-amber-800" />
                    </motion.div>
                    <h3 className="mb-4 text-2xl font-semibold text-amber-800">
                      {feature.title}
                    </h3>
                    <p className="text-amber-700">{feature.description}</p>
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="bg-amber-100 py-20">
          <div className="container mx-auto px-4">
            <motion.h2
              className="mb-16 text-center text-4xl font-bold text-amber-800 md:text-5xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              How It Works
            </motion.h2>
            <motion.div
              className="grid grid-cols-1 gap-8 md:grid-cols-4"
              variants={containerVariants}
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {[
                {
                  step: 1,
                  title: "Create Account",
                  description:
                    "Sign up in minutes with our easy-to-use platform.",
                },
                {
                  step: 2,
                  title: "Choose Amount",
                  description: "Select how much gold you want to purchase.",
                },
                {
                  step: 3,
                  title: "Make Payment",
                  description:
                    "Use our secure payment system to complete your transaction.",
                },
                {
                  step: 4,
                  title: "Receive Gold",
                  description:
                    "Your gold is securely stored or delivered to your doorstep.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="rounded-xl bg-white p-6 shadow-md transition duration-300 hover:shadow-lg"
                >
                  <motion.div
                    className="mb-4 text-3xl font-bold text-amber-600"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  >
                    Step {item.step}
                  </motion.div>
                  <h3 className="mb-2 text-xl font-semibold text-amber-800">
                    {item.title}
                  </h3>
                  <p className="text-amber-700">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="container mx-auto px-4">
            <motion.h2
              className="mb-16 text-center text-4xl font-bold text-amber-800 md:text-5xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              What Our Customers Say
            </motion.h2>
            <motion.div
              className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3"
              variants={containerVariants}
              // initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {[
                {
                  name: "Emily R.",
                  comment:
                    "I was skeptical at first, but EEVEEGOLD offered me 20% more than other buyers. The process was smooth and professional.",
                  rating: 5,
                },
                {
                  name: "Michael T.",
                  comment:
                    "Incredibly fast service! I got my quote within minutes and the money was in my account the next day. Highly recommended!",
                  rating: 5,
                },
                {
                  name: "Sarah L.",
                  comment:
                    "The team at EEVEEGOLD made me feel comfortable throughout the entire process. Their transparency is commendable.",
                  rating: 4,
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="rounded-xl border-t-4 border-t-amber-500 bg-amber-50 p-8 shadow-lg transition duration-300 hover:shadow-xl"
                >
                  <div className="mb-4 flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <motion.svg
                        key={i}
                        className={`h-5 w-5 ${i < testimonial.rating ? "text-amber-400" : "text-gray-300"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </motion.svg>
                    ))}
                  </div>
                  <p className="mb-4 text-amber-700">"{testimonial.comment}"</p>
                  <p className="font-semibold text-amber-800">
                    {testimonial.name}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="bg-amber-500 py-20 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.h2
              className="mb-8 text-4xl font-bold md:text-5xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Ready to Turn Your Cash into Gold?
            </motion.h2>
            <motion.p
              className="mx-auto mb-10 max-w-2xl text-xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Join thousands of satisfied customers who have trusted EEVEEGOLD
              for buying Gold.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button
                borderRadius="1.5rem"
                className="transform rounded-full bg-amber-700 px-8 py-4 font-cinzel text-lg font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-amber-800 hover:shadow-xl"
              >
                <Link href="/buy" className="flex items-center">
                  Start Your Purchase Now
                  <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        <section className="bg-amber-50 py-20">
          <div className="container mx-auto px-4">
            <motion.h2
              className="mb-16 text-center text-4xl font-bold text-amber-800 md:text-5xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.div
              className="grid grid-cols-1 gap-8 md:grid-cols-2"
              variants={containerVariants}
              // initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {[
                {
                  question: "Is buying gold a good investment?",
                  answer:
                    "Gold has historically been considered a safe-haven asset and a hedge against inflation. It can be a good way to diversify your investment portfolio.",
                },
                {
                  question: "How do I know I'm getting a fair price?",
                  answer:
                    "We provide real-time market prices and guarantee competitive rates. Our transparent pricing ensures you always know exactly what you're paying for.",
                },
                {
                  question: "Is my gold purchase secure?",
                  answer:
                    "Absolutely. We use state-of-the-art security measures to protect your transactions and personal information. Your gold is also fully insured.",
                },
                {
                  question: "Can I sell my gold back to EEVEEGOLD?",
                  answer:
                    "Yes, we offer a buyback program for our customers. You can sell your gold back to us at competitive market rates.",
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="rounded-xl bg-white p-6 shadow-md transition duration-300 hover:shadow-lg"
                >
                  <h3 className="mb-2 text-xl font-semibold text-amber-800">
                    {faq.question}
                  </h3>
                  <p className="text-amber-700">{faq.answer}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
