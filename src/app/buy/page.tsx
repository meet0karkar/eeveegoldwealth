
// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { Input } from "@/app/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   AlertCircle,
//   DollarSign,
//   Weight,
//   ArrowRight,
//   BadgeIndianRupee,
//   X,
//   Check,
//   Upload,
//   Clock
// } from "lucide-react";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import Header from "../components/ui/Header";
// import Footer from "../components/ui/Footer";
// import { motion, AnimatePresence } from "framer-motion";
// import useAxiosFetch, { baseUrl } from "../hooks/useAxiosFetch";
// import { useRouter } from "next/navigation";

// interface GoldPriceData {
//   price: number;
//   currency: string;
//   price_gram_24k: number;
// }

// export default function BuyGoldPage() {
//   const {
//     data: goldData,
//     loading: goldLoading,
//     error: goldError,
//     fetchData: fetchGoldData,
//   } = useAxiosFetch<GoldPriceData>();
//   const { fetchData: uploadImage } = useAxiosFetch<{ data: { image: { location: string } } }>();
//   const { fetchData: submitGoldInventory } = useAxiosFetch();

//   const router = useRouter();
//   const [price, setPrice] = useState<number | string>("0");
//   const [weight, setWeight] = useState<number | string>("0");
//   const taxRate = 0.03; // 3% tax rate
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [showPaymentModal, setShowPaymentModal] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
//   const priceInputRef = useRef<HTMLInputElement>(null);
//   const weightInputRef = useRef<HTMLInputElement>(null);
//   const [paymentImage, setPaymentImage] = useState<File | null>(null);
//   const [paymentImageUrl, setPaymentImageUrl] = useState<string | null>(null);
  
//   const [goldpricePerGram, setGoldpricePerGram] = useState(7830);

//   useEffect(() => {
//     fetchGoldPrice();
//   }, []);

//   const fetchGoldPrice = async () => {
//     // Fetch gold price logic here (currently using a static value)
//     // In a real-world scenario, you would fetch this from an API
//     setGoldpricePerGram(7830);
//   };

//   useEffect(() => {
//     let timer: NodeJS.Timeout;
//     if (showConfirm && timeLeft > 0) {
//       timer = setInterval(() => {
//         setTimeLeft((prevTime) => prevTime - 1);
//       }, 1000);
//     } else if (timeLeft === 0) {
//       handleReset();
//     }
//     return () => clearInterval(timer);
//   }, [showConfirm, timeLeft]);

//   const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     if (parseFloat(value) < 0 || value.includes("-")) return;
//     setPrice(value);
//     if (value === "") {
//       setWeight("");
//     } else {
//       const weightInGrams = (parseFloat(value) * 0.97) / goldpricePerGram;
//       setWeight(weightInGrams.toFixed(4));
//     }
//   };

//   const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     if (parseFloat(value) < 0 || value.includes("-")) return;
//     setWeight(value);
//     if (value === "") {
//       setPrice("");
//     } else {
//       const basePrice = parseFloat(value) * goldpricePerGram;
//       const finalPrice = basePrice + basePrice * 0.03;
//       setPrice(finalPrice.toFixed(2));
//     }
//   };

//   const handleBuy = () => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       router.push('/Login');
//       return;
//     }
//     setShowConfirm(true);
//     setTimeLeft(120);
//     if (priceInputRef.current) {
//       priceInputRef.current.disabled = true;
//     }
//     if (weightInputRef.current) {
//       weightInputRef.current.disabled = true;
//     }
//   };

//   const handleConfirm = () => {
//     setShowConfirm(false);
//     setShowPaymentModal(true);
//   };

//   const handleReset = () => {
//     setShowConfirm(false);
//     setTimeLeft(120);
//     setPrice("");
//     setWeight("");
//     if (priceInputRef.current) {
//       priceInputRef.current.disabled = false;
//     }
//     if (weightInputRef.current) {
//       weightInputRef.current.disabled = false;
//     }
//   };

//   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setPaymentImage(file);
//       const formData = new FormData();
//       formData.append('image', file);

//       try {
//         const response = await uploadImage(`${baseUrl}/auth/image/uploads`, {
//           method: 'POST',
//           data: formData,
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });

//         if (response && response.data && response.data.image && response.data.image.location) {
//           setPaymentImageUrl(response.data.image.location);
//         }
//       } catch (error) {
//         console.error('Error uploading image:', error);
//       }
//     }
//   };

//   const handleSubmitPayment = async () => {
//     if (!paymentImageUrl) {
//       console.error('No payment image uploaded');
//       return;
//     }

//     try {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         router.push('/Login');
//         return;
//       }

//       const response = await submitGoldInventory(`${baseUrl}/user/goldInventory`, {
//         method: 'POST',
//         data: {
//           amount: parseFloat(price as string),
//           weight: parseFloat(weight as string),
//           paymentImage: paymentImageUrl
//         },
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response) {
//         console.log('Gold inventory updated successfully');
//         setShowPaymentModal(false);
//         router.push('/myaccount');
//       } else {
//         console.error('Failed to update gold inventory');
//       }
//     } catch (error) {
//       console.error('Error submitting payment:', error);
//     }
//   };

//   return (
//     <div className="flex min-h-screen flex-col bg-gradient-to-br from-yellow-50 to-white">
//       <Header />
//       <main className="container mx-auto flex-grow px-4 py-16 overflow-y-auto">
//         <motion.h1
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="mb-12 text-center text-4xl font-bold md:text-5xl"
//         >
//           Buy Gold
//         </motion.h1>
//         <Card className="mx-auto max-w-4xl overflow-hidden my-8">
//           <CardContent className="p-0">
//             <div className="flex flex-col md:flex-row">
//               <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 p-8 text-white md:w-1/2">
//                 <h2 className="mb-4 text-3xl font-bold">Current Gold Price</h2>
//                 <p className="mb-4 text-5xl font-bold">₹{goldpricePerGram.toFixed(2)}</p>
//                 <p className="text-xl">per gram (24K)</p>
//                 <div className="mt-8">
//                   <h3 className="mb-2 text-xl font-semibold">Why Buy Gold?</h3>
//                   <ul className="list-inside list-disc">
//                     <li>Hedge against inflation</li>
//                     <li>Portfolio diversification</li>
//                     <li>Long-term value preservation</li>
//                   </ul>
//                 </div>
//               </div>
//               <div className="p-8 md:w-1/2">
//                 <h2 className="mb-6 text-2xl font-bold">Purchase Gold</h2>
//                 <div className="space-y-4">
//                   <div>
//                     <Label htmlFor="price">Price (₹)</Label>
//                     <div className="relative mt-1">
//                       <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
//                         <BadgeIndianRupee className="h-5 w-5 text-gray-400" />
//                       </div>
//                       <Input
//                         id="price"
//                         type="number"
//                         placeholder="Enter price in INR"
//                         value={price}
//                         onChange={handlePriceChange}
//                         className="pl-10"
//                         ref={priceInputRef}
//                       />
//                     </div>
//                   </div>
//                   <div className="flex items-center justify-center">
//                     <ArrowRight className="mx-2 h-6 w-6 text-yellow-500" />
//                   </div>
//                   <div>
//                     <Label htmlFor="weight">Weight (g)</Label>
//                     <div className="relative mt-1">
//                       <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
//                         <Weight className="h-5 w-5 text-gray-400" />
//                       </div>
//                       <Input
//                         id="weight"
//                         type="number"
//                         placeholder="Enter weight in grams"
//                         value={weight}
//                         onChange={handleWeightChange}
//                         className="pl-10"
//                         ref={weightInputRef}
//                       />
//                     </div>
//                   </div>
//                   <div className="text-sm text-yellow-600">
//                     You will receive ₹
//                     {(parseFloat(price as string) - parseFloat(price as string) * taxRate).toFixed(2)}{" "}
//                     INR, and ₹
//                     {(parseFloat(price as string) * taxRate).toFixed(2)} INR will go towards taxes (GST).
//                   </div>
//                   <Button
//                     onClick={handleBuy}
//                     disabled={!price || showConfirm}
//                     className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white hover:from-yellow-500 hover:to-yellow-700"
//                   >
//                     Buy Gold
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </main>
//       <Footer />

//       {/* Confirmation Popup */}
//       <AnimatePresence>
//         {showConfirm && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
//           >
//             <motion.div
//               initial={{ scale: 0.9, y: 20 }}
//               animate={{ scale: 1, y: 0 }}
//               exit={{ scale: 0.9, y: 20 }}
//               className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
//             >
//               <div className="relative bg-gradient-to-r from-yellow-400 to-yellow-600 p-6 text-white">
//                 <h2 className="text-3xl font-bold">Confirm Purchase</h2>
//                 <button
//                   onClick={() => setShowConfirm(false)}
//                   className="absolute right-4 top-4 rounded-full bg-yellow-500 p-1 text-yellow-100 transition-colors hover:bg-yellow-400"
//                 >
//                   <X className="h-6 w-6" />
//                 </button>
//               </div>
//               <div className="p-6">
//                 <div className="mb-4 flex items-center justify-between">
//                   <span className="text-lg font-semibold">Current Gold Price:</span>
//                   <span className="text-xl font-bold text-yellow-600">₹{goldpricePerGram.toFixed(2)}/g</span>
//                 </div>
//                 <div className="mb-4 flex items-center justify-between">
//                   <span className="text-lg font-semibold">Your Purchase:</span>
//                   <span className="text-xl font-bold text-yellow-600">₹{parseFloat(price as string).toFixed(2)}</span>
//                 </div>
//                 <div className="mb-6 flex items-center justify-between">
//                   <span className="text-lg font-semibold">Gold Weight:</span>
//                   <span className="text-xl font-bold text-yellow-600">{parseFloat(weight as string).toFixed(4)}g</span>
//                 </div>
//                 <div className="mb-6 flex items-center justify-center text-2xl font-bold text-red-500">
//                   <Clock className="mr-2 h-6 w-6" />
//                   <span>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}</span>
//                 </div>
//                 <Button
//                   onClick={handleConfirm}
//                   className="w-full bg-green-500 text-white hover:bg-green-600"
//                 >
//                   Check Out
//                 </Button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Payment Modal */}
//       <AnimatePresence>
//         {showPaymentModal && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-50 p-4 overflow-y-auto"
//           >
//             <motion.div
//               initial={{ scale: 0.9, y: 20 }}
//               animate={{ scale: 1, y: 0 }}
//               exit={{ scale: 0.9, y: 20 }}
//               className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl mt-16"
//             >
//               <div className="relative bg-gradient-to-r from-yellow-400 to-yellow-600 p-6 text-white">
//                 <h2 className="text-3xl font-bold">Payment Information</h2>
//                 <p  className="mt-2 text-yellow-100">Complete your gold purchase securely</p>
//                 <button
//                   onClick={() => setShowPaymentModal(false)}
//                   className="absolute right-4 top-4 rounded-full bg-yellow-500 p-1 text-yellow-100 transition-colors hover:bg-yellow-400"
//                 >
//                   <X className="h-6 w-6" />
//                 </button>
//               </div>
//               <div className="p-6">
//                 <div className="mb-6 grid gap-6 md:grid-cols-2">
//                   <Card>
//                     <CardContent className="p-4">
//                       <h3 className="mb-2 font-semibold text-gray-700">Purchase Details</h3>
//                       <p className="text-sm text-gray-600">Price: <span className="font-medium text-gray-800">₹{parseFloat(price as string).toFixed(2)}</span></p>
//                       <p className="text-sm text-gray-600">Weight: <span className="font-medium text-gray-800">{parseFloat(weight as string).toFixed(4)}g</span></p>
//                     </CardContent>
//                   </Card>
//                   <Card>
//                     <CardContent className="p-4">
//                       <h3 className="mb-2 font-semibold text-gray-700">Account Information</h3>
//                       <p className="text-sm text-gray-600">Account Number: <span className="font-medium text-gray-800">437105500722</span></p>
//                       <p className="text-sm text-gray-600">IFSC Code: <span className="font-medium text-gray-800">ICIC0004371</span></p>
//                     </CardContent>
//                   </Card>
//                 </div>
//                 <Card>
//                   <CardContent className="p-4">
//                     <h3 className="mb-2 font-semibold text-gray-700">UPI & QR Code</h3>
//                     <p className="text-sm text-gray-600">UPI ID: <span className="font-medium text-gray-800">eeveelifestylellp.ibz@icici</span></p>
//                     {/* Add QR code image here if available */}
//                   </CardContent>
//                 </Card>
//                 <div className="mb-6 mt-6 rounded-lg bg-yellow-50 p-4 text-sm text-yellow-800">
//                   <p className="mb-1"><strong>Note:</strong> Please share your successful payment screenshot to +91 82386 64001</p>
//                   <p>It will take a minimum of 1 day to receive your invoice after successful payment.</p>
//                 </div>
//                 <div className="mb-6">
//                   <Label htmlFor="paymentProof" className="mb-2 block text-sm font-medium text-gray-700">
//                     Upload Payment Proof
//                   </Label>
//                   <div className="mt-1 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6">
//                     <div className="text-center">
//                       <Upload className="mx-auto h-12 w-12 text-gray-400" />
//                       <div className="mt-2 flex text-sm text-gray-600">
//                         <label
//                           htmlFor="paymentProof"
//                           className="relative cursor-pointer rounded-md bg-white font-medium text-yellow-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-yellow-500 focus-within:ring-offset-2 hover:text-yellow-500"
//                         >
//                           <span>Upload a file</span>
//                           <Input
//                             id="paymentProof"
//                             name="paymentProof"
//                             type="file"
//                             accept="image/*"
//                             onChange={handleImageUpload}
//                             className="sr-only"
//                           />
//                         </label>
//                         <p className="pl-1">or drag and drop</p>
//                       </div>
//                       <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
//                     </div>
//                   </div>
//                 </div>
//                 {paymentImageUrl && (
//                   <div className="mb-6">
//                     <p className="mb-2 text-sm font-medium text-green-600">
//                       <Check className="mr-1 inline-block h-5 w-5" />
//                       Payment proof uploaded successfully!
//                     </p>
//                     <img src={paymentImageUrl} alt="Payment Proof" className="max-h-40 rounded-lg object-cover" />
//                   </div>
//                 )}
//                 <Button
//                   onClick={handleSubmitPayment}
//                   disabled={!paymentImageUrl}
//                   className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white transition-all hover:from-yellow-500 hover:to-yellow-700 disabled:opacity-50"
//                 >
//                   Submit Payment
//                 </Button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { Input } from "@/app/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Weight,
//   ArrowRight,
//   BadgeIndianRupee,
//   X,
//   Clock
// } from "lucide-react";
// import Header from "../components/ui/Header";
// import Footer from "../components/ui/Footer";
// import { motion, AnimatePresence } from "framer-motion";
// import useAxiosFetch, { baseUrl } from "../hooks/useAxiosFetch";
// import { useRouter } from "next/navigation";

// interface PaymentResponse {
//   success: boolean;
//   code: string;
//   message: string;
//   data: {
//     merchantId: string;
//     merchantTransactionId: string;
//     instrumentResponse: {
//       type: string;
//       redirectInfo: {
//         url: string;
//         method: string;
//       }
//     }
//   }
// }

// export default function BuyGoldPage() {
//   const router = useRouter();
//   const { fetchData: initiatePayment } = useAxiosFetch<PaymentResponse>();
//   const [price, setPrice] = useState<number | string>("0");
//   const [weight, setWeight] = useState<number | string>("0");
//   const taxRate = 0.03; // 3% tax rate
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
//   const priceInputRef = useRef<HTMLInputElement>(null);
//   const weightInputRef = useRef<HTMLInputElement>(null);
  
//   const [goldpricePerGram, setGoldpricePerGram] = useState(7830);

//   useEffect(() => {
//     fetchGoldPrice();
//   }, []);

//   const fetchGoldPrice = async () => {
//     // Fetch gold price logic here (currently using a static value)
//     setGoldpricePerGram(7830);
//   };

//   useEffect(() => {
//     let timer: NodeJS.Timeout;
//     if (showConfirm && timeLeft > 0) {
//       timer = setInterval(() => {
//         setTimeLeft((prevTime) => prevTime - 1);
//       }, 1000);
//     } else if (timeLeft === 0) {
//       handleReset();
//     }
//     return () => clearInterval(timer);
//   }, [showConfirm, timeLeft]);

//   const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     if (parseFloat(value) < 0 || value.includes("-")) return;
//     setPrice(value);
//     if (value === "") {
//       setWeight("");
//     } else {
//       const weightInGrams = (parseFloat(value) * 0.97) / goldpricePerGram;
//       setWeight(weightInGrams.toFixed(4));
//     }
//   };

//   const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     if (parseFloat(value) < 0 || value.includes("-")) return;
//     setWeight(value);
//     if (value === "") {
//       setPrice("");
//     } else {
//       const basePrice = parseFloat(value) * goldpricePerGram;
//       const finalPrice = basePrice + basePrice * 0.03;
//       setPrice(finalPrice.toFixed(2));
//     }
//   };

//   const handleBuy = () => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       router.push('/Login');
//       return;
//     }
//     setShowConfirm(true);
//     setTimeLeft(120);
//     if (priceInputRef.current) {
//       priceInputRef.current.disabled = true;
//     }
//     if (weightInputRef.current) {
//       weightInputRef.current.disabled = true;
//     }
//   };

//   const handleConfirm = async () => {
//     const token = localStorage.getItem("token");
//     const user = localStorage.getItem("user");

//     let name, phone;
//     console.log(user)
//     if (user) {
//         const parsedUser = JSON.parse(user); 
//         name = parsedUser.fullName || "hit demo"; 
//         phone = parsedUser.phoneNumber;
//     }
    
//     console.log("Token:", token);
//     console.log("Name:", name);
//     console.log("Phone Number:", phone);
    
//     if (!token ) {
//       router.push('/Login');
//       return;
//     }

//     try {
//       const response = await initiatePayment(`${baseUrl}/user/payment`, {
//         method: 'POST',
//         data: {
//           name,
//           amount: parseFloat(price as string),
//           phone
//         },
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response && response.success) {
//         // Redirect to the payment URL
//         window.location.href = response.data.instrumentResponse.redirectInfo.url;
//       } else {
//         console.error('Failed to initiate payment');
//         // Handle error (e.g., show error message to user)
//       }
//     } catch (error) {
//       console.error('Error initiating payment:', error);
//       // Handle error (e.g., show error message to user)
//     }
//   };

//   const handleReset = () => {
//     setShowConfirm(false);
//     setTimeLeft(120);
//     setPrice("");
//     setWeight("");
//     if (priceInputRef.current) {
//       priceInputRef.current.disabled = false;
//     }
//     if (weightInputRef.current) {
//       weightInputRef.current.disabled = false;
//     }
//   };

//   return (
//     <div className="flex min-h-screen flex-col bg-gradient-to-br from-yellow-50 to-white">
//       <Header />
//       <main className="container mx-auto flex-grow px-4 py-16 overflow-y-auto">
//         <motion.h1
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="mb-12 text-center text-4xl font-bold md:text-5xl"
//         >
//           Buy Gold
//         </motion.h1>
//         <Card className="mx-auto max-w-4xl overflow-hidden my-8">
//           <CardContent className="p-0">
//             <div className="flex flex-col md:flex-row">
//               <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 p-8 text-white md:w-1/2">
//                 <h2 className="mb-4 text-3xl font-bold">Current Gold Price</h2>
//                 <p className="mb-4 text-5xl font-bold">₹{goldpricePerGram.toFixed(2)}</p>
//                 <p className="text-xl">per gram (24K)</p>
//                 <div className="mt-8">
//                   <h3 className="mb-2 text-xl font-semibold">Why Buy Gold?</h3>
//                   <ul className="list-inside list-disc">
//                     <li>Hedge against inflation</li>
//                     <li>Portfolio diversification</li>
//                     <li>Long-term value preservation</li>
//                   </ul>
//                 </div>
//               </div>
//               <div className="p-8 md:w-1/2">
//                 <h2 className="mb-6 text-2xl font-bold">Purchase Gold</h2>
//                 <div className="space-y-4">
//                   <div>
//                     <Label htmlFor="price">Price (₹)</Label>
//                     <div className="relative mt-1">
//                       <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
//                         <BadgeIndianRupee className="h-5 w-5 text-gray-400" />
//                       </div>
//                       <Input
//                         id="price"
//                         type="number"
//                         placeholder="Enter price in INR"
//                         value={price}
//                         onChange={handlePriceChange}
//                         className="pl-10"
//                         ref={priceInputRef}
//                       />
//                     </div>
//                   </div>
//                   <div className="flex items-center justify-center">
//                     <ArrowRight className="mx-2 h-6 w-6 text-yellow-500" />
//                   </div>
//                   <div>
//                     <Label htmlFor="weight">Weight (g)</Label>
//                     <div className="relative mt-1">
//                       <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
//                         <Weight className="h-5 w-5 text-gray-400" />
//                       </div>
//                       <Input
//                         id="weight"
//                         type="number"
//                         placeholder="Enter weight in grams"
//                         value={weight}
//                         onChange={handleWeightChange}
//                         className="pl-10"
//                         ref={weightInputRef}
//                       />
//                     </div>
//                   </div>
//                   <div className="text-sm text-yellow-600">
//                     You will receive ₹
//                     {(parseFloat(price as string) - parseFloat(price as string) * taxRate).toFixed(2)}{" "}
//                     INR, and ₹
//                     {(parseFloat(price as string) * taxRate).toFixed(2)} INR will go towards taxes (GST).
//                   </div>
//                   <Button
//                     onClick={handleBuy}
//                     disabled={!price || showConfirm}
//                     className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white hover:from-yellow-500 hover:to-yellow-700"
//                   >
//                     Buy Gold
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </main>
//       <Footer />

//       {/* Confirmation Popup */}
//       <AnimatePresence>
//         {showConfirm && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
//           >
//             <motion.div
//               initial={{ scale: 0.9, y: 20 }}
//               animate={{ scale: 1, y: 0 }}
//               exit={{ scale: 0.9, y: 20 }}
//               className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
//             >
//               <div className="relative bg-gradient-to-r from-yellow-400 to-yellow-600 p-6 text-white">
//                 <h2 className="text-3xl font-bold">Confirm Purchase</h2>
//                 <button
//                   onClick={() => setShowConfirm(false)}
//                   className="absolute right-4 top-4 rounded-full bg-yellow-500 p-1 text-yellow-100 transition-colors hover:bg-yellow-400"
//                 >
//                   <X className="h-6 w-6" />
//                 </button>
//               </div>
//               <div className="p-6">
//                 <div className="mb-4 flex items-center justify-between">
//                   <span className="text-lg font-semibold">Current Gold Price:</span>
//                   <span className="text-xl font-bold text-yellow-600">₹{goldpricePerGram.toFixed(2)}/g</span>
//                 </div>
//                 <div className="mb-4 flex items-center justify-between">
//                   <span className="text-lg font-semibold">Your Purchase:</span>
//                   <span className="text-xl font-bold text-yellow-600">₹{parseFloat(price as string).toFixed(2)}</span>
//                 </div>
//                 <div className="mb-6 flex items-center justify-between">
//                   <span className="text-lg font-semibold">Gold Weight:</span>
//                   <span className="text-xl font-bold text-yellow-600">{parseFloat(weight as string).toFixed(4)}g</span>
//                 </div>
//                 <div className="mb-6 flex items-center justify-center text-2xl font-bold text-red-500">
//                   <Clock className="mr-2 h-6 w-6" />
//                   <span>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}</span>
//                 </div>
//                 <Button
//                   onClick={handleConfirm}
//                   className="w-full bg-green-500 text-white hover:bg-green-600"
//                 >
//                   Proceed to Payment
//                 </Button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }  
"use client";

import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Weight,
  ArrowRight,
  BadgeIndianRupee,
  X,
  Clock
} from "lucide-react";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import { motion, AnimatePresence } from "framer-motion";
import useAxiosFetch, { baseUrl } from "../hooks/useAxiosFetch";
import { useRouter } from "next/navigation";

interface GoldPriceResponse {
  status: number;
  message: string;
  data: {
    amount: string;
    goldWeight: number;
    goldPriceForGram: number;
  };
  error: {};
}

interface PaymentResponse {
  success: boolean;
  code: string;
  message: string;
  data: {
    merchantId: string;
    merchantTransactionId: string;
    instrumentResponse: {
      type: string;
      redirectInfo: {
        url: string;
        method: string;
      }
    }
  }
}

export default function BuyGoldPage() {
  const router = useRouter();
  const { fetchData: fetchGoldPrice } = useAxiosFetch<GoldPriceResponse>();
  const { fetchData: initiatePayment } = useAxiosFetch<PaymentResponse>();
  const [price, setPrice] = useState<number | string>("0");
  const [weight, setWeight] = useState<number | string>("0");
  const [confirmWeight, setConfirmWeight] = useState<number>(0);
  const taxRate = 0.03; // 3% tax rate
  const [showConfirm, setShowConfirm] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
  const priceInputRef = useRef<HTMLInputElement>(null);
  const weightInputRef = useRef<HTMLInputElement>(null);
  // const gstRate = 0.03;
  const [goldPricePerGram, setGoldPricePerGram] = useState(0);

  useEffect(() => {
    fetchInitialGoldPrice();
  }, []);

  const fetchInitialGoldPrice = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push('/Login');
      return;
    }

    try {
      const response = await fetchGoldPrice(`${baseUrl}/user/goldPrice?amount=20000`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response && response.status === 200) {
        setGoldPricePerGram(response.data.goldPriceForGram);
      } else {
        console.error('Failed to fetch initial gold price');
      }
    } catch (error) {
      console.error('Error fetching initial gold price:', error);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showConfirm && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleReset();
    }
    return () => clearInterval(timer);
  }, [showConfirm, timeLeft]);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (parseFloat(value) < 0 || value.includes("-")) return;
    setPrice(value);
    if (value === "") {
      setWeight("");
    } else {
      const priceWithoutGST = parseFloat(value) / (1 + gstRate);
      const weightInGrams = priceWithoutGST / goldPricePerGram;
      

      // const weightInGrams = parseFloat(value) / goldPricePerGram;
      // setWeight(weightInGrams.toFixed(4));
    }
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (parseFloat(value) < 0 || value.includes("-")) return;
    setWeight(value);
    if (value === "") {
      setPrice("");
    } else {
      const priceWithoutGST = parseFloat(value) * goldPricePerGram;
      const totalPrice = priceWithoutGST * (1 + gstRate);
      setPrice(totalPrice.toFixed(2));  
      // const totalPrice = parseFloat(value) * goldPricePerGram;
      // setPrice(totalPrice.toFixed(2));
    }
  };

  const handleBuy = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push('/Login');
      return;
    }

    try {
      const netAmount = parseFloat(price as string) * (1 - taxRate);
      const response = await fetchGoldPrice(`${baseUrl}/user/goldPrice?amount=${netAmount.toFixed(2)}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response && response.status === 200) {
        setConfirmWeight(response.data.goldWeight);
        setShowConfirm(true);
        setTimeLeft(120);
        if (priceInputRef.current) {
          priceInputRef.current.disabled = true;
        }
        if (weightInputRef.current) {
          weightInputRef.current.disabled = true;
        }
      } else {
        console.error('Failed to fetch updated gold price');
      }
    } catch (error) {
      console.error('Error fetching updated gold price:', error);
    }
  };

  const handleConfirm = async () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    let name, phone;
    if (user) {
      const parsedUser = JSON.parse(user);
      name = parsedUser.fullName || "Default Name";
      phone = parsedUser.phoneNumber || "0000000000";
    }
    
    if (!token) {
      router.push('/Login');
      return;
    }

    try {
      const response = await initiatePayment(`${baseUrl}/user/payment`, {
        method: 'POST',
        data: {
          name,
          amount: parseFloat(price as string),
          phone
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response && response.success) {
        window.location.href = response.data.instrumentResponse.redirectInfo.url;
      } else {
        console.error('Failed to initiate payment');
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
    }
  };

  const handleReset = () => {
    setShowConfirm(false);
    setTimeLeft(120);
    setPrice("");
    setWeight("");
    setConfirmWeight(0);
    if (priceInputRef.current) {
      priceInputRef.current.disabled = false;
    }
    if (weightInputRef.current) {
      weightInputRef.current.disabled = false;
    }
  };

  function handleConfirmCancel() {
    console.log("handleConfirmCancel"    );
    
    window.location.reload();
  }
  // function handleConfirmCancel() {
    
  //   setShowConfirm(false);
  //   setTimeLeft(120);
  //   setPrice("");
  //   setWeight("");
  //   setConfirmWeight(0);
  //   if (priceInputRef.current) {
  //     priceInputRef.current.disabled = false;
  //   }
  //   if (weightInputRef.current) {
  //     weightInputRef.current.disabled = false;
  //   }
  // }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-yellow-50 to-white">
      <Header />
      <main className="container mx-auto flex-grow px-4 py-16 overflow-y-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center text-4xl font-bold md:text-5xl"
        >
          Buy Gold
        </motion.h1>
        <Card className="mx-auto max-w-4xl overflow-hidden my-8">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 p-8 text-white md:w-1/2">
                <h2 className="mb-4 text-3xl font-bold">Current Gold Price</h2>
                <p className="mb-4 text-5xl font-bold">₹{goldPricePerGram.toFixed(2)}</p>
                <p className="text-xl">per gram (24K)</p>
                <div className="mt-8">
                  <h3 className="mb-2 text-xl font-semibold">Why Buy Gold?</h3>
                  <ul className="list-inside list-disc">
                    <li>Hedge against inflation</li>
                    <li>Portfolio diversification</li>
                    <li>Long-term value preservation</li>
                  </ul>
                </div>
              </div>
              <div className="p-8 md:w-1/2">
                <h2 className="mb-6 text-2xl font-bold">Purchase Gold</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="price">Price (₹)</Label>
                    <div className="relative mt-1">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <BadgeIndianRupee className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        id="price"
                        type="number"
                        placeholder="Enter price in INR"
                        value={price}
                        onChange={handlePriceChange}
                        className="pl-10"
                        ref={priceInputRef}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <ArrowRight className="mx-2 h-6 w-6 text-yellow-500" />
                  </div>
                  <div>
                    <Label htmlFor="weight">Weight (g)</Label>
                    <div className="relative mt-1">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Weight className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        id="weight"
                        type="number"
                        placeholder="Enter weight in grams"
                        value={weight}
                        onChange={handleWeightChange}
                        className="pl-10"
                        ref={weightInputRef}
                      />
                    </div>
                  </div>
                  <div className="text-sm text-yellow-600">
                    You will receive ₹
                    {(parseFloat(price as string) - parseFloat(price as string) * taxRate).toFixed(2)}{" "}
                    INR, and ₹
                    {(parseFloat(price as string) * taxRate).toFixed(2)} INR will go towards taxes (GST).
                  </div>
                  <Button
                    onClick={handleBuy}
                    disabled={!(Number(price) > 0) || showConfirm}
                    className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white hover:from-yellow-500 hover:to-yellow-700"
                  >
                    Buy Gold
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />

      {/* Confirmation Popup */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
            >
              <div className="relative bg-gradient-to-r from-yellow-400 to-yellow-600 p-6 text-white">
                <h2 className="text-3xl font-bold">Confirm Purchase</h2>
                <button
                  onClick={ handleConfirmCancel}
                  className="absolute right-4 top-4 rounded-full bg-yellow-500 p-1 text-yellow-100 transition-colors hover:bg-yellow-400"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-lg font-semibold">Current Gold Price:</span>
                  <span className="text-xl font-bold text-yellow-600">₹{goldPricePerGram.toFixed(2)}/g</span>
                </div>
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-lg font-semibold">Your Purchase:</span>
                  <span className="text-xl font-bold text-yellow-600">₹{parseFloat(price as string).toFixed(2)}</span>
                </div>
                <div className="mb-6 flex items-center justify-between">
                  <span className="text-lg font-semibold">Gold Weight:</span>
                  <span className="text-xl font-bold text-yellow-600">{(confirmWeight/1000).toFixed(4)} g</span>
                </div>
                <div className="mb-6 flex items-center justify-center text-2xl font-bold text-red-500">
                  <Clock className="mr-2 h-6 w-6" />
                  <span>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}</span>
                </div>
                <Button
                  onClick={handleConfirm}
                  className="w-full bg-green-500 text-white hover:bg-green-600"
                >
                  Proceed to Payment
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
