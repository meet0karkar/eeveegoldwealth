"use client";

import React from "react";
import Link from "next/link";
import { Phone } from "lucide-react";
import Footer from "../components/ui/Footer";
import Header from "../components/ui/Header";
import { Button } from "@/components/ui/button";

const RefundPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white dark:from-gray-900 dark:to-gray-800 flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="mb-8 text-center text-4xl font-bold text-yellow-600 dark:text-yellow-400">
          Refund Policy
        </h1>

        {/* <div className="mb-8 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Welcome to EeveeGoldWealth.com, managed by LALIMA JEWELS LLP. We are committed to providing a seamless and secure platform for purchasing and managing digital gold. Our refund policy is designed to ensure transparency and fairness.
          </p>
        </div>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-yellow-600 dark:text-yellow-400">
            Registration and Purchasing Gold
          </h2>
          <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              Registering with EeveeGoldWealth.com is a straightforward process, designed to be as user-friendly as possible. Simply:
            </p>
            <ol className="list-inside list-decimal space-y-2 text-gray-600 dark:text-gray-300">
              <li>Enter your mobile number.</li>
              <li>Verify your number with the OTP you receive.</li>
              <li>Once verified, you are free to explore our platform and purchase digital gold.</li>
            </ol>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              You can begin purchasing gold with a minimal amount, making it accessible to all users. This ensures that everyone can invest in gold, regardless of their financial situation.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-yellow-600 dark:text-yellow-400">
            Managing Your Gold Investments
          </h2>
          <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              Our platform provides you with the tools to manage your digital gold efficiently. You can track the value of your gold investments, view transaction history, and keep an eye on market trends. Our goal is to make gold investment as transparent and easy as possible.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-yellow-600 dark:text-yellow-400">
            Withdrawing Your Gold
          </h2>
          <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              Withdrawing your gold is a simple process. Whenever you wish to sell your gold, contact our customer service team. We are available 24/7 to assist you. Our customer care number is +91 8238664001. The amount you receive will be based on the prevailing market price of gold at the time of your withdrawal request.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-yellow-600 dark:text-yellow-400">
            Important Conditions and Policies
          </h2>
          <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            <ul className="list-inside list-disc space-y-4 text-gray-600 dark:text-gray-300">
              <li>
                <strong>Minimum Withdrawal Amount:</strong> To ensure smooth transactions, it is mandatory to have a minimum of 1 gram of gold in your account for withdrawal. If your gold holdings are less than 1 gram, you will not be able to sell it. This policy ensures that we maintain market integrity and provide a seamless experience for all users.
              </li>
              <li>
                <strong>Security and Authentication:</strong> We prioritize the security of your investments. Each withdrawal request undergoes a stringent verification process to ensure authenticity and protect against fraud.
              </li>
              <li>
                <strong>Market Fluctuations:</strong> Please note that the value of gold is subject to market fluctuations. The price at the time of your purchase may differ from the price at the time of withdrawal. We recommend staying informed about market trends to make the most out of your investments.
              </li>
              <li>
                <strong>Customer Support:</strong> Our dedicated customer support team is always here to help. Whether you have questions about your investment, need assistance with withdrawals, or require any other support, we are available around the clock.
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-yellow-600 dark:text-yellow-400">
            Contact Us
          </h2>
          <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              For any inquiries or assistance, please reach out to our customer support team at +91 8238664001. We are committed to providing you with the best service and ensuring your experience with EeveeGoldWealth.com is exceptional.
            </p>
            <Button
              onClick={() => window.location.href = 'tel:+918238664001'}
              className="bg-yellow-500 hover:bg-yellow-600 text-white"
            >
              <Phone className="mr-2 h-4 w-4" />
              Call +91 8238664001
            </Button>
          </div>
        </section> */}

        <div className="mb-8 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
          <p className="mb-4 text-gray-600 dark:text-gray-300">
          No Refunds: All sales are final. We do not offer refunds for any products purchased
          </p>
        </div>
        {/* <div className="mb-8 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Thank you for choosing EeveeGoldWealth.com for your digital gold investments. We value your trust and strive to provide you with a secure and user-friendly platform.
          </p>
        </div> */}

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

export default RefundPolicyPage;