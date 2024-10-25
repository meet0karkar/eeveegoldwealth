"use client";

import React from "react";
import Link from "next/link";
import Footer from "../components/ui/Footer";
import Header from "../components/ui/Header";

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-center text-4xl font-bold text-yellow-600 dark:text-yellow-400">
          Privacy Policy
        </h1>

        <div className="mb-8 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            https://www.eeveegoldwealth.com/ is managed by EEVEE LIFESTYLE LLP
          </p>
        </div>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-yellow-600 dark:text-yellow-400">
            Cookies
          </h2>
          <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              If you visit our login page, we will set a temporary cookie to determine if your browser accepts cookies. This cookie contains no personal data and is discarded when you close your browser.
            </p>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              When you log in, we will also set up several cookies to save your login information and your screen display choices. Login cookies last for two days, and screen options cookies last for a year. If you select "Remember Me", your login will persist for two weeks. If you log out of your account, the login cookies will be removed.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-yellow-600 dark:text-yellow-400">
            Your Rights Over Your Data
          </h2>
          <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              If you have an account on this site, or have left comments, you can request to receive an exported file of the personal data we hold about you, including any data you have provided to us. You can also request that we erase any personal data we hold about you. This does not include any data we are obliged to keep for administrative, legal, or security purposes.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-yellow-600 dark:text-yellow-400">
            Data Sharing and Security
          </h2>
          <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
              <li>We cannot share your data with anyone</li>
              <li>Your data is 100% secure with us</li>
              <li>We use your data to improve our website and customer experience</li>
            </ul>
            <p className="mb-4 mt-4 text-gray-600 dark:text-gray-300">
            This Privacy Policy applies to all the Users whose Personal Information has been processed by Us in the course of our business, website, forums, blogs, and other online or offline offerings.
            </p>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
            We respect your privacy and hence handle your personal data with the utmost care and confidentiality.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-yellow-600 dark:text-yellow-400">
            Use of Your Information
          </h2>
          <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              We use the Personal Information and other non-Personal Information for the following purposes:
            </p>
            <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
              <li>To provide and improve the Services on the Platform that You request</li>
              <li>To resolve disputes and troubleshoot problems</li>
              <li>To help promote a safe service on the Platform and protect the security and integrity of the Platform, the Services and the users</li>
              <li>Collect money from You in relation to the Services</li>
              <li>Inform You about online and offline offers, products, services, and updates</li>
              <li>Customize Your experience on the Platform or share marketing material with You</li>
              <li>To detect, prevent and protect Us from any errors, fraud and other criminal or prohibited activity on the Platform</li>
              <li>Enforce and inform about our terms and conditions</li>
              <li>To process and fulfil Your request for Services or respond to Your comments, and queries on the Platform</li>
              <li>To contact You</li>
              <li>To allow Our business partners and/or associates to present customized messages to You</li>
              <li>To communicate important notices or changes in the Services provided by the Company, use of the Platform and the terms/policies which govern the relationship between You and the Company and with Our affiliates</li>
              <li>For any other purpose after obtaining Your consent at the time of collection</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-yellow-600 dark:text-yellow-400">
            Security Precautions and Measures
          </h2>
          <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            <p className="mb-4 text-gray-600 dark:text-gray-300">
            Our Platform has reasonable security measures and safeguards in place to protect Your privacy and Personal Information from loss, misuse, unauthorized access, disclosure, destruction, and alteration of the information in compliance with applicable laws. Further, whenever You change or access Your account on the Platform or any information relating to it, We offer the use of a secure server. We cannot however ensure or warrant the security of any information You transmit to the Company or guarantee that Your Personal Information and/or other Non-Personal Information provided for availing the Services or Platform may not be accessed, disclosed, altered or destroyed by a breach of any of Our security measures and safeguards.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-yellow-600 dark:text-yellow-400">
            Data Storage and Retention Policy
          </h2>
          <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            <p className="mb-4 text-gray-600 dark:text-gray-300">
            We collect and store your data and Personal Information in AWS cloud as you use services and will retain the data for as long as necessary to fulfill the purposes for which it was obtained. Processed and non-identifiable data, however, will be perpetually stored.
            </p>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
            To determine the appropriate retention period for personal data, we consider the amount, nature, and sensitivity of the personal data, the potential risk of harm from unauthorized use or disclosure of your personal data, the purposes for which we process your personal data and whether we can achieve those purposes through other means, and the applicable legal requirements.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-yellow-600 dark:text-yellow-400">
            Changes to Privacy Policy
          </h2>
          <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            <p className="mb-4 text-gray-600 dark:text-gray-300">
            We reserve the unconditional right to change, modify, add, or remove portions of this Privacy Policy at any time, without specifically notifying You of such changes. Any changes or updates will be effective immediately. You should review this Privacy Policy regularly for changes. Your acceptance of the amended Privacy Policy shall signify Your consent to such changes and agreement to be legally bound by the same.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-yellow-600 dark:text-yellow-400">
            Grievance Officer
          </h2>
          <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              If You have any privacy concerns, please feel free to reach out to the grievance officer, the name and contact details of this Officer have been provided below:
            </p>
            <p className="mb-2 text-gray-600 dark:text-gray-300">Name: Mr. Gordhanbjai kanjibhai Radadiya</p>
            <p className="mb-4 text-gray-600 dark:text-gray-300">Email: support@eeveegold.com</p>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              He shall try to acknowledge the complaint within twenty-four hours and dispose of such complaint within a period of fifteen days from the date of receipt of complaint.
            </p>
          </div>
        </section>

        <div className="mb-8 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Effective as on 1st September 2024
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Registered Office address: 8-9, Bhakti Arcade, Pramukh Park Soc, Satellite Rd, Near Mahadev Chowk, Mota Varachha, Surat, Gujarat, 394101
          </p>
        </div>

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

export default PrivacyPolicyPage;