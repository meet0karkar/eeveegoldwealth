// @ts-nocheck
"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  Lock,
  Edit2,
  DollarSign,
  Package, X, Check, BadgeIndianRupee, Download
} from "lucide-react";
import Header from "../components/ui/Header";
import useAxiosFetch, { baseUrl } from "../hooks/useAxiosFetch";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Footer from "../components/ui/Footer";
interface UserData {
  totalGoldInventories: number;
  totalInvestAmount: number;
  walletGold: number;
  totalGoldWeight: number;
  totalWithdrawalWeight: number;
  user: {
    _id: string;
    fullName: string | null;
    email: string | null;
    image: string | null;
    countryCode: string;
    isoCode: string;
    phoneNumber: number;
    loginType: number;
    userType: number;
    isEmailVerified: boolean;
    isMobileVerified: boolean;
    isAccountVerified: boolean;
    isActive: boolean;
    isBlock: boolean;
    IFSCCode: string;
    accountNumber: number;
    createdAt: string;
    updatedAt: string;
  };
}

interface GoldInventory {
  _id: string;
  userId: string;
  amount: number;
  goldWeight: number;
  date: string;
  transactionDate: string;
  paymentMethod?: string;
  paymentImage?: string;
  isVerified?: boolean;
  transactionId: string;
  createdAt: string;
  updatedAt: string;
}

interface GoldInventoryResponse {
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  recordsPerPage: number;
  goldInventories: GoldInventory[];
}

interface ApiResponse {
  status: number;
  message: string;
  data: UserData;
  error: any;
}

interface GoldInventoryApiResponse {
  status: number;
  message: string;
  data: GoldInventoryResponse;
  error: any;
}
interface InvoiceResponse {
  status: number;
  message: string;
  data: string; // base64 encoded PDF
  error: any;
}
export default function UserProfilePage() {
  const [table, setTable] = useState(0);
  const {
    loading: fetchloding,
    fetchData: fetchInvoice,
  } = useAxiosFetch<InvoiceResponse>();
  const router = useRouter();
  const {
    data: userData,
    loading: userLoading,
    error: userError,
    fetchData: fetchUserData,
  } = useAxiosFetch<ApiResponse>();
  const {
    data: goldInventoryData,
    loading: goldInventoryLoading,
    error: goldInventoryError,
    fetchData: fetchGoldInventoryData,
  } = useAxiosFetch<GoldInventoryApiResponse>();
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    fullName: "",
    accountNumber: "",
    IFSCCode: "",
  });
  const [isWithdrawDialogOpen, setIsWithdrawDialogOpen] = useState(false);
  const [withdrawType, setWithdrawType] = useState<"money" | "gold" | null>(null);
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const { fetchData: withdrawGold } = useAxiosFetch();

  const { fetchData: updateProfile } = useAxiosFetch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {

      router.push('/Login');
      return;
    }
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (token && user._id) {
      fetchUserData(`${baseUrl}/user/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          user: JSON.stringify({ _id: user._id }),
        },
      });
      fetchGoldInventoryData(`${baseUrl}/user/goldInventory`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          user: JSON.stringify({ id: user._id }),
        },
        params: {
          page: currentPage,
          limit: 10,
          type: table
        },
      });
    }
  }, [fetchUserData, fetchGoldInventoryData, currentPage, table]);


  // edit profile
  useEffect(() => {
    if (userData?.data) {
      setEditForm({
        fullName: userData.data.user.fullName || "",
        accountNumber: userData.data.user.accountNumber?.toString() || "",
        IFSCCode: userData.data.user.IFSCCode || "",
      });
    }
  }, [userData]);

  const handleEditProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push('/Login');
      return;
    }

    try {
      const response = await updateProfile(`${baseUrl}/user/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: editForm,
      });
      console.log(editForm);

      if (response) {
        // Refresh user data
        fetchUserData(`${baseUrl}/user/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            user: JSON.stringify({ _id: userData?.data.user._id }),
          },
        });
        setIsEditDialogOpen(false);
      } else {
        console.error("Failed to update profile:", response?.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  const handleWithdraw = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push('/Login');
      return;
    }

    try {
      const response = await withdrawGold(`${baseUrl}/user/withdraw/amount`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          goldWeight: parseFloat(withdrawAmount*1000),
          paymentMethod: withdrawType === "money" ? "bank_transfer" : "Offline",
          type: withdrawType === "money" ? 1 : 2,
        },
      });

      if (response) {
        // Handle successful withdrawal
        setIsWithdrawDialogOpen(false);
        // Refresh user data or show success message
      } else {
        console.error("Failed to withdraw:", response?.message);
      }
    } catch (error) {
      console.error("Error withdrawing:", error);
    }
  };


  if (userLoading || goldInventoryLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (userError || goldInventoryError) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-500">
        {userError || goldInventoryError}
      </div>
    );
  }

  if (!userData?.data || !goldInventoryData?.data) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        No data found
      </div>
    );
  }
  const handleDownloadInvoice = async (inventoryId: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push('/Login');
      return;
    }

    try {
      const response = await fetchInvoice(`${baseUrl}/user/invoice`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          _id: inventoryId,
        },
      });
      console.log(response);


      if (response && response.status === 200) {
        // Convert base64 to PDF and download
        const pdfContent = atob(response.data);  // Decodes the Base64 string
        const uint8Array = new Uint8Array(
          Array.from(pdfContent).map(char => char.charCodeAt(0))
        );
        const blob = new Blob([uint8Array], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `invoice_${inventoryId}.pdf`;
        link.click();
      } else {
        console.error("Failed to fetch invoice:", response?.message);
      }
    } catch (error) {
      console.error("Error downloading invoice:", error);
    }
  };
  const user = userData.data;
  const goldInventory = goldInventoryData.data;

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 overflow-hidden rounded-lg bg-white shadow-2xl"></div>
        <div className="overflow-hidden rounded-lg bg-white shadow-2xl">
          <div className="h-32 bg-yellow-600 sm:h-48"></div>
          <div>
            <div className="relative px-4 pb-8 sm:px-6 lg:px-8">
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 transform">
                <div className="rounded-full bg-white p-3 shadow-xl">
                  <div className="rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 p-2">
                    <User className="h-16 w-16 text-white sm:h-24 sm:w-24" />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-24 text-center sm:mt-32">
              <h1 className="text-3xl font-bold text-gray-900">
                {user.user.fullName || "Gold Buyer"}
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Member since {new Date(user.user.createdAt).getFullYear()}
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg bg-yellow-50 p-6 shadow-md">
                <h2 className="mb-2 text-lg font-semibold text-gray-900">
                  Contact Information
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Phone className="mr-2 h-5 w-5 text-yellow-600" />
                    <span className="text-gray-700">{`${user.user.countryCode}${user.user.phoneNumber}`}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="mr-2 h-5 w-5 text-yellow-600" />
                    <span className="text-gray-700">
                      {user.user.email || "Not provided"}
                    </span>
                  </div>

                </div>
              </div>

              <div className="rounded-lg bg-yellow-50 p-6 shadow-md">
                <h2 className="mb-2 text-lg font-semibold text-gray-900">
                  Gold Inventories
                </h2>
                <div className="text-3xl font-bold text-yellow-600">
                  {user.totalGoldInventories}
                </div>
                <p className="mt-1 text-sm text-gray-500">Total inventories</p>
              </div>

              <div className="rounded-lg bg-yellow-50 p-6 shadow-md">
                <h2 className="mb-2 text-lg font-semibold text-gray-900">
                  Total Investment
                </h2>
                <div className="text-3xl font-bold text-yellow-600">
                  ₹{user.totalInvestAmount.toLocaleString()}
                </div>
                <p className="mt-1 text-sm text-gray-500">In gold purchases</p>
              </div>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3">


              <div className="rounded-lg bg-yellow-50 p-6 shadow-md">
                <h2 className="mb-2 text-lg font-semibold text-gray-900">
                  Wallet Gold
                </h2>
                <div className="text-3xl font-bold text-yellow-600">
                  {(user.walletGold/1000).toFixed(4)}
                </div>
                <p className="mt-1 text-sm text-gray-500">Total g</p>
              </div>
              <div className="rounded-lg bg-yellow-50 p-6 shadow-md">
                <h2 className="mb-2 text-lg font-semibold text-gray-900">
                  Total Gold
                </h2>
                <div className="text-3xl font-bold text-yellow-600">
                  {(user.totalGoldWeight/1000).toFixed(4)}
                </div>
                <p className="mt-1 text-sm text-gray-500">Total g</p>
              </div>

              <div className="rounded-lg bg-yellow-50 p-6 shadow-md">
                <h2 className="mb-2 text-lg font-semibold text-gray-900">
                  Total Withdraw Weight
                </h2>
                <div className="text-3xl font-bold text-yellow-600">
                  ₹{(user.totalWithdrawalWeight/1000).toFixed(4)}
                </div>
                <p className="mt-1 text-sm text-gray-500">In g</p>
              </div>
              <div className="rounded-lg bg-yellow-50 p-6 shadow-md">
                <h2 className="mb-2 text-lg font-semibold text-gray-900">
                  Account Details
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <p className="font-semibold"> IFSCCode: &nbsp;</p>
                    <span className="text-gray-700">{`${user.user.IFSCCode || "Not provided"}`}</span>
                  </div>
                  <div className="flex items-center">
                    <p className="font-semibold">Account Number:  &nbsp;</p>
                    <span className="text-gray-700">
                      {user.user.accountNumber || "Not provided"}
                    </span>
                  </div>

                </div>
              </div>

            </div>

            <div className=" grid grid-cols-1 gap-6 px-4 sm:grid-cols-2">
              {/* <div className="rounded-lg bg-yellow-50 p-6 shadow-md">
                <h2 className="mb-2 text-lg font-semibold text-gray-900">
                  Account Status
                </h2>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Email Verified:</span>
                    <span
                      className={
                        user.user.isEmailVerified
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {user.user.isEmailVerified ? " Yes" : " No"}
                    </span>
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Mobile Verified:</span>
                    <span
                      className={
                        user.user.isMobileVerified
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {user.user.isMobileVerified ? " Yes" : " No"}
                    </span>
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Account Verified:</span>
                    <span
                      className={
                        user.user.isAccountVerified
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {user.user.isAccountVerified ? " Yes" : " No"}
                    </span>
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Account Active:</span>
                    <span
                      className={
                        user.user.isActive ? "text-green-600" : "text-red-600"
                      }
                    >
                      {user.user.isActive ? " Yes" : " No"}
                    </span>
                  </p>
                </div>
              </div> */}
              {/* 
              <div className="rounded-lg bg-yellow-50 p-6 shadow-md">
                <h2 className="mb-2 text-lg font-semibold text-gray-900">
                  Account Details
                </h2>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">User Type:</span>{" "}
                    {user.user.userType === 0 ? "Regular" : "Premium"}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Login Type:</span>{" "}
                    {user.user.loginType === 0 ? "Email" : "Social"}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Country:</span>{" "}
                    {user.user.isoCode}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Last Updated:</span>{" "}
                    {new Date(user.user.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div> */}
            </div>

            <div className="mb-10 mt-10 text-center">
              <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogTrigger asChild>
                  <button className="mx-auto flex items-center justify-center rounded-full bg-yellow-500 px-4 py-2 font-bold text-white transition duration-300 hover:bg-yellow-600">
                    <Edit2 className="mr-2 h-4 w-4" />
                    Edit Profile
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="fullName" className="text-right">
                        Full Name
                      </label>
                      <Input
                        id="fullName"
                        value={editForm.fullName}
                        onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                        className="col-span-3 border-2 border-yellow-200"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="accountNumber" className="text-right">
                        Account Number
                      </label>
                      <Input
                        id="accountNumber"
                        value={editForm.accountNumber}
                        onChange={(e) => setEditForm({ ...editForm, accountNumber: e.target.value })}
                        className="col-span-3 border-2 border-yellow-200"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="IFSCCode" className="text-right">
                        IFSC Code
                      </label>
                      <Input
                        id="IFSCCode"
                        value={editForm.IFSCCode}
                        onChange={(e) => setEditForm({ ...editForm, IFSCCode: e.target.value })}
                        className="col-span-3 border-2 border-yellow-200"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={handleEditProfile} className="bg-yellow-500 hover:bg-yellow-600 text-white">Save changes</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
        <div className="mt-6 overflow-hidden rounded-lg bg-white shadow-2xl lg:mt-12">
          <div className="px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex mb-6 flex-wrap gap-2">
              <div className={`shadow-md rounded-md p-2 ${table === 0 ? "bg-yellow-200" : "bg-white"}`} onClick={() => setTable(0)}>
                Gold Inventory
              </div>
              <div className={`shadow-md rounded-md p-2 ${table === 1 ? "bg-yellow-200" : "bg-white"}`} onClick={() => setTable(1)}>
                Withdraw Amount
              </div>
              <div className={`shadow-md rounded-md p-2 ${table === 2 ? "bg-yellow-200" : "bg-white"}`} onClick={() => setTable(2)}>
                Withdraw Gold
              </div>
            </div>
            {table === 0 && <h2 className="mb-6 text-2xl font-bold text-gray-900">
              Gold Inventory
            </h2>}
            {table === 1 && <h2 className="mb-6 text-2xl font-bold text-gray-900">
              Withdraw Amount
            </h2>}
            {table === 2 && <h2 className="mb-6 text-2xl font-bold text-gray-900">
              Withdraw Gold
            </h2>}
            <Table>
              <TableHeader>
                <TableRow>
                  {/* <TableHead>Date</TableHead> */}
                  <TableHead> Amount</TableHead>
                  <TableHead>Gold Weight</TableHead>
                  <TableHead>Transaction Date</TableHead>

                  <TableHead>Payment Method </TableHead>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Merchant Transaction ID</TableHead>
                  <TableHead>Invoice</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {goldInventory.goldInventories.map((item) => (
                  <TableRow key={item._id}>
                    {/* <TableCell>
                      {new Date(item.date).toLocaleDateString()}
                    </TableCell> */}
                    <TableCell>₹{item.amount.toFixed(2)}</TableCell>
                    <TableCell>{(item.goldWeight/1000).toFixed(4)} g</TableCell>
                    <TableCell>{item.transactionDate}</TableCell>

                    <TableCell>{item.paymentMethod}</TableCell>

                    <TableCell>{item.transactionId}</TableCell>
                    {/* @ts-ignore */}
                    <TableCell>{item.merchantTransactionId}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleDownloadInvoice(item._id)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white"
                        disabled={fetchloding}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4 flex items-center justify-between">
              <div>
                Page {goldInventory.currentPage} of {goldInventory.totalPages}
              </div>
              <div>
                <Button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="mr-2"
                >
                  Previous
                </Button>
                <Button
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(prev + 1, goldInventory.totalPages),
                    )
                  }
                  disabled={currentPage === goldInventory.totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
       
        <div className="mt-6 overflow-hidden rounded-lg bg-white shadow-2xl lg:mt-12">
          <div className="px-4 py-8 sm:px-6 lg:px-8">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              Withdraw Gold
            </h2>
            {user.user.IFSCCode && user.user.accountNumber ? (
              <div>
                <p className="mb-4 text-gray-600">
                  Choose how you'd like to withdraw your gold:
                </p>
                <div className="flex gap-4 flex-wrap">
                  <Dialog open={isWithdrawDialogOpen} onOpenChange={setIsWithdrawDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => setWithdrawType("money")}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white"
                      >
                        Withdraw as Money (online)
                      </Button>
                    </DialogTrigger>
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => setWithdrawType("gold")}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white"
                      >
                        Withdraw as Gold (Offline)
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>
                          Withdraw as {withdrawType === "money" ? "Money" : "Gold"}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label htmlFor="withdrawAmount" className="text-right">
                            Amount (in g)
                          </label>
                          <Input
                            id="withdrawAmount"
                            type="number"
                            value={withdrawAmount}
                            onChange={(e) => setWithdrawAmount(e.target.value)}
                            className="col-span-3 outline-none ring-0 focus:outline-none focus:ring-0 border-2 border-yellow-200 focus-visible:ring-0"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button onClick={handleWithdraw} className="bg-yellow-500 hover:bg-yellow-600 text-white">Confirm Withdrawal</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ) : (
              <div>
                <p className="mb-4 text-gray-600">
                  Please add your bank details by editing your profile to enable withdrawals.
                </p>
                <Button
                  onClick={() => setIsEditDialogOpen(true)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white"
                  
                >
                  <Edit2 className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
<Footer />
     
    </div>
  );
}
