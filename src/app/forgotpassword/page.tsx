// "use client";

// import React, { useState } from "react";
// import { Label } from "@/app/components/ui/label";
// import { Input } from "@/app/components/ui/input";

// import Link from "next/link";
// import useAxiosFetch, { baseUrl } from "../hooks/useAxiosFetch";
// import { useRouter } from "next/navigation";
// import { goldimage, image } from "../assets/photo";
// import Header from "../components/ui/Header";

// interface ApiResponse {
//   status: number;
//   message: string;
//   data: any;
//   error: any;
// }

// const Register = () => {
//   const router = useRouter();
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     countryCode: "+1",
//     phoneNumber: "",
//     isoCode: "US",
//     otp: "",
//     password: "",
//     fullName: "",
//     deviceToken: "your_device_token",
//   });
//   const [error, setError] = useState<string | null>(null);

//   const {
//     loading: smsLoading,
//     error: smsError,
//     fetchData: sendSMS,
//   } = useAxiosFetch<ApiResponse>();
//   const {
//     loading: otpLoading,
//     error: otpError,
//     fetchData: verifyOTP,
//   } = useAxiosFetch<ApiResponse>();
//   const {
//     loading: registerLoading,
//     error: registerError,
//     fetchData: register,
//   } = useAxiosFetch<ApiResponse>();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSendSMS = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);

//     const response = await sendSMS(`${baseUrl}/auth/sendSMS`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       data: {
//         countryCode: formData.countryCode?.toString(),
//         phoneNumber: formData.phoneNumber?.toString(),
//         isoCode: "IN",
//         type: 1,
//       },
//     });
//     if (response && response.status === 200) {
//       setStep(2);
//     } else {
//       setError(response?.message || "Failed to send SMS");
//     }
//   };

//   const handleVerifyOTP = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);
//     const response = await verifyOTP(`${baseUrl}/auth/verifyOTP`, {
//       method: "POST",
//       data: {
//         countryCode: formData.countryCode,
//         phoneNumber: formData.phoneNumber,

//         isoCode: "IN",
//         otp: formData.otp,
//       },
//     });
//     if (response && response.status === 200) {
//       setStep(3);
//     } else {
//       setError(response?.message || "Failed to verify OTP");
//     }
//   };

//   const handleRegister = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);
//     if (formData.password.length <= 8) {
//       setError("Password must be greater than 8 characters");
//       return;
//     }
//     const response = await register(`${baseUrl}/auth/resetPassword`, {
//       method: "POST",

//       data: {
//         countryCode: formData.countryCode,
//         phoneNumber: formData.phoneNumber,
//         isoCode: "IN",
//         newPassword: formData.password,
//       },
//     });
//     if (response) {
//       localStorage.setItem("token", response.data.token);
//       router.push("/");
//     } else {
//       setError(response || "Failed to register");
//     }
//   };

//   return (
//     <div className="flex h-screen flex-col">
//       <Header />

//       <div className="flex w-full flex-grow">
//         <div
//           className="flex flex-1 flex-col items-center justify-center bg-cover bg-center bg-no-repeat px-2 backdrop-blur-2xl lg:px-0"
//           style={{
//             backgroundImage: `url(${goldimage.src})`,
//           }}
//         >
//           <div className="absolute inset-0 backdrop-blur-lg"></div>
//           <div
//             className="z-10 w-full rounded-2xl border-[1px] border-black/20 bg-white px-8 py-6 lg:max-w-[400px]"
//             style={{ boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px" }}
//           >
//             <div className="mb-6 text-center text-4xl font-bold">
//               Forgot Password
//             </div>
//             {error && <div className="mb-4 text-red-500">{error}</div>}
//             {step === 1 && (
//               <form onSubmit={handleSendSMS}>
//                 <LabelInputContainer className="mb-4">
//                   <Label htmlFor="countryCode ">Enter country code</Label>
//                   <Input
//                     id="countryCode"
//                     name="countryCode"
//                     placeholder="91"
//                     type="text"
//                     value={formData.countryCode}
//                     onChange={handleChange}
//                     required
//                   />
//                 </LabelInputContainer>
//                 <LabelInputContainer className="mb-4">
//                   <Label htmlFor="phoneNumber">Phone Number</Label>
//                   <Input
//                     id="phoneNumber"
//                     name="phoneNumber"
//                     placeholder="1234567890"
//                     type="tel"
//                     value={formData.phoneNumber}
//                     onChange={handleChange}
//                     required
//                   />
//                 </LabelInputContainer>
//                 <button
//                   className="flex w-full justify-center rounded-md border border-transparent bg-gradient-to-r from-yellow-400 to-yellow-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:from-yellow-500 hover:to-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
//                   type="submit"
//                   disabled={smsLoading}
//                 >
//                   {smsLoading ? "Sending..." : "Send OTP"}
//                 </button>
//               </form>
//             )}
//             {step === 2 && (
//               <form onSubmit={handleVerifyOTP}>
//                 <LabelInputContainer className="mb-4">
//                   <Label htmlFor="otp">Enter OTP</Label>
//                   <Input
//                     id="otp"
//                     name="otp"
//                     placeholder="Enter OTP"
//                     type="text"
//                     value={formData.otp}
//                     onChange={handleChange}
//                     required
//                   />
//                 </LabelInputContainer>
//                 <button
//                   className="flex w-full justify-center rounded-md border border-transparent bg-gradient-to-r from-yellow-400 to-yellow-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:from-yellow-500 hover:to-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
//                   type="submit"
//                   disabled={otpLoading}
//                 >
//                   {otpLoading ? "Verifying..." : "Verify OTP"}
//                 </button>
//               </form>
//             )}
//             {step === 3 && (
//               <form onSubmit={handleRegister}>
//                 <LabelInputContainer className="mb-4">
//                   <Label htmlFor="password">New Password</Label>
//                   <Input
//                     id="password"
//                     name="password"
//                     placeholder="••••••••"
//                     type="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     required
//                   />
//                 </LabelInputContainer>
//                 <button
//                   className="flex w-full justify-center rounded-md border border-transparent bg-gradient-to-r from-yellow-400 to-yellow-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:from-yellow-500 hover:to-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
//                   type="submit"
//                   disabled={registerLoading}
//                 >
//                   {registerLoading ? "Registering..." : "Register"}
//                 </button>
//               </form>
//             )}
//             <div className="mt-4 text-center">
//               <Link href="/Login" className="text-blue-500 hover:underline">
//                 Already a customer? Login
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;

// const LabelInputContainer = ({
//   children,
//   className,
// }: {
//   children: React.ReactNode;
//   className?: string;
// }) => {
//   return (
//     <div className={`flex w-full flex-col space-y-2 ${className}`}>
//       {children}
//     </div>
//   );
// };
"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import useAxiosFetch, { baseUrl } from "../hooks/useAxiosFetch";
import { useRouter } from "next/navigation";
import { goldimage } from "../assets/photo";
import Header from "../components/ui/Header";

interface ApiResponse {
  status: number;
  message: string;
  data: any;
  error: any;
}

const countryCodes = [
  { code: "+91", country: "India" },
  { code: "+1", country: "USA" },
  { code: "+44", country: "UK" },
  { code: "+61", country: "Australia" },
  { code: "+86", country: "China" },
  { code: "+49", country: "Germany" },
  { code: "+81", country: "Japan" },
  { code: "+33", country: "France" },
  { code: "+7", country: "Russia" },
  { code: "+55", country: "Brazil" },
];

const ForgotPassword = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    countryCode: "+91",
    phoneNumber: "",
    isoCode: "IN",
    otp: "",
    password: "",
    deviceToken: "your_device_token",
  });
  const [error, setError] = useState<string | null>(null);

  const {
    loading: smsLoading,
    error: smsError,
    fetchData: sendSMS,
  } = useAxiosFetch<ApiResponse>();
  const {
    loading: otpLoading,
    error: otpError,
    fetchData: verifyOTP,
  } = useAxiosFetch<ApiResponse>();
  const {
    loading: resetLoading,
    error: resetError,
    fetchData: resetPassword,
  } = useAxiosFetch<ApiResponse>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCountryCodeChange = (value: string) => {
    setFormData({ ...formData, countryCode: value });
  };

  const handleSendSMS = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const response = await sendSMS(`${baseUrl}/auth/sendSMS`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        countryCode: formData.countryCode,
        phoneNumber: formData.phoneNumber,
        isoCode: formData.isoCode,
        type: 1,
      },
    });
    if (response && response.status === 200) {
      setStep(2);
    } else {
      setError(response?.message || "Failed to send SMS");
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const response = await verifyOTP(`${baseUrl}/auth/verifyOTP`, {
      method: "POST",
      data: {
        countryCode: formData.countryCode,
        phoneNumber: formData.phoneNumber,
        isoCode: formData.isoCode,
        otp: formData.otp,
      },
    });
    if (response && response.status === 200) {
      setStep(3);
    } else {
      setError(response?.message || "Failed to verify OTP");
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (formData.password.length <= 8) {
      setError("Password must be greater than 8 characters");
      return;
    }
    const response = await resetPassword(`${baseUrl}/auth/resetPassword`, {
      method: "POST",
      data: {
        countryCode: formData.countryCode,
        phoneNumber: formData.phoneNumber,
        isoCode: formData.isoCode,
        newPassword: formData.password,
      },
    });
    if (response && response.status === 200) {
      router.push("/Login");
    } else {
      setError(response?.message || "Failed to reset password");
    }
  };

  return (
    <div className="flex h-screen flex-col">
      <Header />

      <div className="flex w-full flex-grow">
        <div
          className="flex flex-1 flex-col items-center justify-center bg-cover bg-center bg-no-repeat px-2 backdrop-blur-2xl lg:px-0"
          style={{
            backgroundImage: `url(${goldimage.src})`,
          }}
        >
          <div className="absolute inset-0 backdrop-blur-lg"></div>
          <div
            className="z-10 w-full rounded-2xl border-[1px] border-black/20 bg-white px-8 py-6 lg:max-w-[400px]"
            style={{ boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px" }}
          >
            <div className="mb-6 text-center text-4xl font-bold">
              Forgot Password
            </div>
            {error && <div className="mb-4 text-red-500">{error}</div>}
            {step === 1 && (
              <form onSubmit={handleSendSMS}>
                <LabelInputContainer className="mb-4">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <div className="flex">
                    <Select onValueChange={handleCountryCodeChange} defaultValue="+91">
                      <SelectTrigger className="w-[110px] rounded-r-none">
                        <SelectValue placeholder="Code" />
                      </SelectTrigger>
                      <SelectContent>
                        {countryCodes.map((country) => (
                          <SelectItem key={country.code} value={country.code}>
                            {country.code} ({country.country})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      placeholder="1234567890"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                      className="flex-1 rounded-l-none"
                    />
                  </div>
                </LabelInputContainer>
                <button
                  className="flex w-full justify-center rounded-md border border-transparent bg-gradient-to-r from-yellow-400 to-yellow-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:from-yellow-500 hover:to-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                  type="submit"
                  disabled={smsLoading}
                >
                  {smsLoading ? "Sending..." : "Send OTP"}
                </button>
              </form>
            )}
            {step === 2 && (
              <form onSubmit={handleVerifyOTP}>
                <LabelInputContainer className="mb-4">
                  <Label htmlFor="otp">Enter OTP</Label>
                  <Input
                    id="otp"
                    name="otp"
                    placeholder="Enter OTP"
                    type="text"
                    value={formData.otp}
                    onChange={handleChange}
                    required
                  />
                </LabelInputContainer>
                <button
                  className="flex w-full justify-center rounded-md border border-transparent bg-gradient-to-r from-yellow-400 to-yellow-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:from-yellow-500 hover:to-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                  type="submit"
                  disabled={otpLoading}
                >
                  {otpLoading ? "Verifying..." : "Verify OTP"}
                </button>
              </form>
            )}
            {step === 3 && (
              <form onSubmit={handleResetPassword}>
                <LabelInputContainer  className="mb-4">
                  <Label htmlFor="password">New Password</Label>
                  <Input
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </LabelInputContainer>
                <button
                  className="flex w-full justify-center rounded-md border border-transparent bg-gradient-to-r from-yellow-400 to-yellow-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:from-yellow-500 hover:to-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                  type="submit"
                  disabled={resetLoading}
                >
                  {resetLoading ? "Resetting..." : "Reset Password"}
                </button>
              </form>
            )}
            <div className="mt-4 text-center">
              <Link href="/Login" className="text-blue-500 hover:underline">
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`flex w-full flex-col space-y-2 ${className}`}>
      {children}
    </div>
  );
};