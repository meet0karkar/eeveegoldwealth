// "use client";

// import React, { useState } from "react";
// import { goldimage } from "../assets/photo";
// import Link from "next/link";
// import { Label } from "@/app/components/ui/label";
// import { Input } from "@/app/components/ui/input";
// import { cn } from "@/app/lib/utils";
// import useAxiosFetch, { baseUrl } from "../hooks/useAxiosFetch";
// import { useRouter } from "next/navigation";
// import Header from "../components/ui/Header";

// interface ApiResponse {
//   status: number;
//   message: string;
//   data: any;
//   error: any;
// }

// const Login = () => {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     countryCode: "",
//     phoneNumber: "",
//     isoCode: "IN",
//     password: "",
//     deviceToken: "your_device_token",
//   });
//   const [error, setError] = useState<string | null>(null);

//   const { loading, fetchData: login } = useAxiosFetch<ApiResponse>();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError(null);

//     const response = await login(`${baseUrl}/auth/login`, {
//       method: "POST",
//       data: formData,
//     });
//     if (response && response.status === 200) {
//       localStorage.setItem("token", response.data.token);
//       localStorage.setItem("user", JSON.stringify(response.data.user));
//       router.push("/"); // Redirect to home page after successful login
//     } else {
//       setError(response?.message || "Login failed");
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
//             className="b z-10 w-full rounded-2xl border-[1px] border-black/20 bg-white px-8 py-6 lg:max-w-[400px]"
//             style={{ boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px" }}
//           >
//             <div className="text-center text-4xl font-bold">Login</div>
//             {error && (
//               <div className="mt-2 text-center text-red-500">{error}</div>
//             )}
//             <form className="my-8" onSubmit={handleSubmit}>
//               <LabelInputContainer className="mb-4">
//                 <Label htmlFor="countryCode">Country Code</Label>
//                 <Input
//                   id="countryCode"
//                   name="countryCode"
//                   placeholder="1234567890"
//                   type="text"
//                   value={formData.countryCode}
//                   onChange={handleChange}
//                   required
//                 />
//               </LabelInputContainer>
//               <LabelInputContainer className="mb-4">
//                 <Label htmlFor="phoneNumber">Phone Number</Label>
//                 <Input
//                   id="phoneNumber"
//                   name="phoneNumber"
//                   placeholder="1234567890"
//                   type="tel"
//                   value={formData.phoneNumber}
//                   onChange={handleChange}
//                   required
//                 />
//               </LabelInputContainer>
//               <LabelInputContainer className="mb-4">
//                 <Label htmlFor="password">Password</Label>
//                 <Input
//                   id="password"
//                   name="password"
//                   placeholder="••••••••"
//                   type="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                 />
//               </LabelInputContainer>
//               <div className="mb-8 flex justify-between font-semibold text-blue-400 underline">
//                 <Link href="/forgotpassword">Forgot password</Link>
//                 <Link href="/signup">Sign up</Link>
//               </div>
//               <button
//                 className="flex w-full justify-center rounded-md border border-transparent bg-gradient-to-r from-yellow-400 to-yellow-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:from-yellow-500 hover:to-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
//                 type="submit"
//                 disabled={loading}
//               >
//                 {loading ? "Signing in..." : "Sign in"}
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

// const LabelInputContainer = ({
//   children,
//   className,
// }: {
//   children: React.ReactNode;
//   className?: string;
// }) => {
//   return (
//     <div className={cn("flex w-full flex-col space-y-2", className)}>
//       {children}
//     </div>
//   );
// };
"use client";

import React, { useState } from "react";
import { goldimage } from "../assets/photo";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useAxiosFetch, { baseUrl } from "../hooks/useAxiosFetch";
import { useRouter } from "next/navigation";
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

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    countryCode: "+91",
    phoneNumber: "",
    isoCode: "IN",
    password: "",
    deviceToken: "your_device_token",
  });
  const [error, setError] = useState<string | null>(null);

  const { loading, fetchData: login } = useAxiosFetch<ApiResponse>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCountryCodeChange = (value: string) => {
    setFormData({ ...formData, countryCode: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const response = await login(`${baseUrl}/auth/login`, {
      method: "POST",
      data: formData,
    });
    if (response && response.status === 200) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      router.push("/"); // Redirect to home page after successful login
    } else {
      setError(response?.message || "Login failed");
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
            <div className="text-center text-4xl font-bold">Login</div>
            {error && (
              <div className="mt-2 text-center text-red-500">{error}</div>
            )}
            <form className="my-8" onSubmit={handleSubmit}>
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
              <LabelInputContainer className="mb-4">
                <Label htmlFor="password">Password</Label>
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
              <div className="mb-8 flex justify-between font-semibold text-blue-400 underline">
                <Link href="/forgotpassword">Forgot password</Link>
                <Link href="/signup">Sign up</Link>
              </div>
              <button
                className="flex w-full justify-center rounded-md border border-transparent bg-gradient-to-r from-yellow-400 to-yellow-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:from-yellow-500 hover:to-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                type="submit"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

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