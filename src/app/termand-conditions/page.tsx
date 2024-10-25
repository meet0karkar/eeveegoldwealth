"use client";

import React from "react";
import Link from "next/link";
import Footer from "../components/ui/Footer";
import Header from "../components/ui/Header";

const TermsAndConditionsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-center text-4xl font-bold text-yellow-600 dark:text-yellow-400">
          Terms and Conditions
        </h1>

        <div className="mb-8 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
          <p className="mb-4 text-gray-600 dark:text-gray-300">
             https://www.eeveegoldwealth.com/ is managed by LALIMA JEWELS LLP 
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Welcome to eeveegoldwealth.com! By accessing this website, you agree to comply with and be bound by the following terms and conditions of use. Please read these terms carefully before using our website.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The Platform is owned by LALIMA JEWELS LLP  , a company incorporated under the Companies Act, 1956 with its registered office at Ground Floor, 8,9, Pramukh Park, Mota Varachha Main Road, Mota Varachha, Surat, India (hereinafter referred to as Platform Owner, we, us, our).
          </p>
        </div>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-yellow-600 dark:text-yellow-400">
            1. Publication of Terms
          </h2>
          <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              This document is published in accordance with the provisions of Rule 3 (1) of the Information Technology (Intermediaries guidelines) Rules, 2011 that require publishing the rules and regulations, privacy policy, and Terms of Use for access or usage of domain name eeveegoldwealth.com (Website), including the related mobile site and mobile application (hereinafter referred to as Platform).
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-yellow-600 dark:text-yellow-400">
            2. Applicability of Terms
          </h2>
          <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              Your use of the Platform and services and tools are governed by the following terms and conditions ("Terms of Use") as applicable to the Platform, including the applicable policies which are incorporated herein by way of reference.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-yellow-600 dark:text-yellow-400">
            3. Jurisdiction
          </h2>
          <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              All disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts in Surat and Gujarat.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-yellow-600 dark:text-yellow-400">
            4. Communication
          </h2>
          <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              All concerns or communications relating to these Terms must be communicated to us using the contact information provided on this website.
            </p>
          </div>
        </section>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-block rounded bg-yellow-500 px-4 py-2 font-bold text-white transition duration-300 hover:bg-yellow-600"
          >
            Return to Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsAndConditionsPage;