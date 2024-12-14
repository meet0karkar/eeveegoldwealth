"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Footer from "../components/ui/Footer";
import Header from "../components/ui/Header";
import { Upload, X, Check } from "lucide-react";
import useAxiosFetch, { baseUrl } from "../hooks/useAxiosFetch";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Inquiry about services",
    message: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const { fetchData: uploadImage } = useAxiosFetch<{ data: { image: { location: string } } }>();
  const { fetchData: submitContact } = useAxiosFetch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await uploadImage(`${baseUrl}/auth/image/uploads`, {
          method: 'POST',
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response && response.data && response.data.image && response.data.image.location) {
          setImageUrl(response.data.image.location);
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        setSubmitMessage("Error uploading image. Please try again.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitMessage("");

    if (!imageUrl) {
      setSubmitMessage("Please upload an image before submitting.");
      setSubmitting(false);
      return;
    }

    try {
      const response = await submitContact(`${baseUrl}/user/contact`, {
        method: 'POST',
        data: {
          ...formData,
          image: imageUrl,
        },
      });

      if (response ) {
        setSubmitMessage("Your message has been sent successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "Inquiry about services",
          message: "",
        });
        setImage(null);
        setImageUrl(null);
      } else {
        setSubmitMessage("There was an error sending your message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitMessage("There was an error sending your message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-yellow-50 to-white">
      <Header />

      <main className="container mx-auto flex-grow px-4 py-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center text-4xl font-bold md:text-5xl"
        >
          Get in Touch
        </motion.h1>

        <div className="grid gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-xl border-2 border-yellow-500 bg-white p-8 shadow-2xl"
          >
            <h2 className="mb-6 text-2xl font-semibold text-yellow-600">
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-[rgba(0,_0,_0,_0.2)_0px_15px_40px_-12px] transition duration-300 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-[rgba(0,_0,_0,_0.2)_0px_15px_40px_-12px] transition duration-300 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-[rgba(0,_0,_0,_0.2)_0px_15px_40px_-12px] transition duration-300 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-[rgba(0,_0,_0,_0.2)_0px_15px_40px_-12px] transition duration-300 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="image"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Upload Image
                </label>
                <div className="mt-1 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6">
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-2 flex text-sm text-gray-600">
                      <label
                        htmlFor="image"
                        className="relative cursor-pointer rounded-md bg-white font-medium text-yellow-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-yellow-500 focus-within:ring-offset-2 hover:text-yellow-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="image"
                          name="image"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>
              {imageUrl && (
                <div className="mb-6">
                  <p className="mb-2 text-sm font-medium text-green-600">
                    <Check className="mr-1 inline-block h-5 w-5" />
                    Image uploaded successfully!
                  </p>
                  <img src={imageUrl} alt="Uploaded Image" className="max-h-40 rounded-lg object-cover" />
                </div>
              )}
              <button
                type="submit"
                disabled={submitting || !imageUrl}
                className="w-full transform rounded-md bg-gradient-to-r from-yellow-400 to-yellow-600 px-4 py-2 text-white transition duration-300 hover:scale-105 hover:from-yellow-500 hover:to-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {submitting ? "Sending..." : "Send Message"}
              </button>
              {submitMessage && (
                <p className={`text-center ${submitMessage.includes("error") ? "text-red-500" : "text-green-500"}`}>
                  {submitMessage}
                </p>
              )}
            </form>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-lg border-2 border-yellow-500 bg-white p-8 shadow-lg"
          >
            <h2 className="mb-6 text-3xl font-semibold text-yellow-600">
              Contact Information
            </h2>
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="flex items-start"
              >
                <svg
                  className="mr-3 mt-1 h-6 w-6 text-yellow-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <div>
                  <h3 className="font-semibold text-gray-800">Address</h3>
                  <p className="text-gray-600">
                    <a
                      href="https://www.google.com/maps/place/EEVEE+Silver+Jewellery/@21.2366348,72.8840606,20.06z/data=!4m6!3m5!1s0x3be04fd63dfb02dd:0xc38deb29d16df1fa!8m2!3d21.2364435!4d72.8838409!16s%2Fg%2F11v3qq68pv?entry=tts&g_ep=EgoyMDI0MDYxMi4wKgBIAVAD"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors duration-300 hover:text-yellow-600"
                    >
                      8-9, Bhakti Arcade Pramukh Park Soc, Satellite Rd, near
                      Mahadev Chowk, Mota Varachha, Surat, Gujarat 394101
                    </a>
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.4 }}
                className="flex items-start"
              >
                <svg
                  className="mr-3 mt-1 h-6 w-6 text-yellow-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <div>
                  <h3 className="font-semibold text-gray-800">Phone</h3>
                  <p className="text-gray-600">
                    <a
                      href="tel:+918238664001"
                      className="transition-colors duration-300  hover:text-yellow-600"
                    >
                      8238664001
                    </a>
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.4 }}
                className="flex items-start"
              >
                <svg
                  className="mr-3 mt-1 h-6 w-6 text-yellow-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <div>
                  <h3 className="font-semibold text-gray-800">Email</h3>
                  <p>
                    <a
                      href="mailto:support@eeveegold.com"
                      className="text-gray-600 transition-colors duration-300 hover:text-yellow-600"
                    >
                      support@eeveegold.com
                    </a>
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}