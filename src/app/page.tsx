/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  AlertTriangle,
  Bell,
  CreditCard,
  FileText,
  Home,
  MessageSquare,
  Search,
  Upload,
  User,
} from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
// import { Bell, Calendar, CreditCard, FileText, Home, Upload, User, MessageSquare, AlertTriangle, CheckCircle, Search } from 'lucide-react';
import { motion } from "framer-motion";

// Felicity Chat Component
function FelicityChat({ onClose }: { onClose: VoidFunction }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "felicity",
      text: "Hi there! I'm Felicity, your AI assistant. How can I help you manage your properties today?",
    },
  ]);
  const [inputText, setInputText] = useState("");

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: "user",
      text: inputText,
    };

    setMessages([...messages, userMessage]);
    setInputText("");

    // Simulate AI response after a short delay
    setTimeout(() => {
      let responseText = "";

      // Simple response logic based on keywords
      const input = inputText.toLowerCase();
      if (input.includes("reminder") || input.includes("remind")) {
        responseText =
          "I can schedule payment reminders for your invoices. Just let me know which property and when you'd like the reminder sent.";
      } else if (
        input.includes("expired") ||
        input.includes("expiry") ||
        input.includes("certificate")
      ) {
        responseText =
          "I can help you track certificate expiry dates and notify you when renewals are needed. Would you like me to set up automatic reminders?";
      } else if (input.includes("invoice") || input.includes("payment")) {
        responseText =
          "I can help you create and manage invoices. Would you like me to create a new invoice or check the status of existing ones?";
      } else {
        responseText =
          "I'm here to help with property management tasks including compliance documents, invoices, and reminders. What specific assistance do you need today?";
      }

      const aiMessage = {
        id: messages.length + 2,
        sender: "felicity",
        text: responseText,
      };

      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    }, 1000);
  };

  return (
    <>
      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-t-lg">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
            <MessageSquare size={16} className="text-blue-500" />
          </div>
          <h3 className="font-medium text-white">Felicity AI</h3>
        </div>
        <button onClick={onClose} className="text-white hover:text-gray-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div className="flex-1 p-3 overflow-y-auto bg-gray-50 max-h-72">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-3 ${message.sender === "user" ? "text-right" : ""}`}
          >
            <div
              className={`inline-block p-3 rounded-lg max-w-xs ${
                message.sender === "user"
                  ? "bg-black text-white rounded-br-none"
                  : "bg-white border border-gray-200 text-gray-800 rounded-bl-none"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSendMessage}
        className="p-3 border-t border-gray-200 flex gap-2"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <motion.button
          type="submit"
          className="p-2 rounded-lg bg-blue-500 text-white"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={!inputText.trim()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </motion.button>
      </form>
    </>
  );
}

// Main Dashboard Component
export default function ComplianceDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showFelicity, setShowFelicity] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<null | {
    name: string;
    email: string;
    role: string;
  }>(null);

  // Mock data - would come from Supabase in real implementation
  const documents = [
    {
      id: 1,
      name: "Gas Safety Certificate - 123 Main St",
      type: "Gas Safety",
      expiryDate: "2025-07-15",
      status: "Valid",
    },
    {
      id: 2,
      name: "EICR - 456 Park Ave",
      type: "EICR",
      expiryDate: "2025-05-20",
      status: "Expiring Soon",
    },
    {
      id: 3,
      name: "Gas Safety Certificate - 789 Oak Rd",
      type: "Gas Safety",
      expiryDate: "2025-06-01",
      status: "Valid",
    },
    {
      id: 4,
      name: "EICR - 123 Main St",
      type: "EICR",
      expiryDate: "2025-04-30",
      status: "Expired",
    },
  ];

  const invoices = [
    {
      id: 1,
      property: "123 Main St",
      contractor: "ABC Plumbing",
      amount: 350,
      dueDate: "2025-05-15",
      status: "Unpaid",
    },
    {
      id: 2,
      property: "456 Park Ave",
      contractor: "Safety First",
      amount: 220,
      dueDate: "2025-05-10",
      status: "Unpaid",
    },
    {
      id: 3,
      property: "789 Oak Rd",
      contractor: "ElectroPro",
      amount: 175,
      dueDate: "2025-04-25",
      status: "Overdue",
    },
    {
      id: 4,
      property: "123 Main St",
      contractor: "GreenScapes",
      amount: 450,
      dueDate: "2025-04-15",
      status: "Paid",
    },
  ];

  // Check authentication status
  useEffect(() => {
    // In a real implementation, this would check Supabase auth status
    const checkAuth = () => {
      const savedUser = localStorage.getItem("lightwork_user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
        setIsLoggedIn(true);
      }
    };

    checkAuth();
  }, []);

  // Handle login submission
  const handleLogin = (email: string, password: string) => {
    // Mock login - would use Supabase auth in real implementation
    const mockUser = { name: "Alex Johnson", email, role: "Property Manager" };
    localStorage.setItem("lightwork_user", JSON.stringify(mockUser));
    setUser(mockUser);
    setIsLoggedIn(true);
  };

  // Handle signup submission
  const handleSignup = (name: string, email: string, password: string) => {
    // Mock signup - would use Supabase auth in real implementation
    const mockUser = { name, email, role: "Property Manager" };
    localStorage.setItem("lightwork_user", JSON.stringify(mockUser));
    setUser(mockUser);
    setIsLoggedIn(true);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("lightwork_user");
    setUser(null);
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <AuthScreen onLogin={handleLogin} onSignup={handleSignup} />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center">
              <span className="text-white font-bold">L</span>
            </div>
            <span className="text-lg font-bold text-gray-800">LightWork</span>
          </div>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            <li>
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`flex items-center gap-3 p-3 w-full rounded-lg ${
                  activeTab === "dashboard"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Home size={18} />
                <span>Dashboard</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("documents")}
                className={`flex items-center gap-3 p-3 w-full rounded-lg ${
                  activeTab === "documents"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <FileText size={18} />
                <span>Compliance Docs</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("invoices")}
                className={`flex items-center gap-3 p-3 w-full rounded-lg ${
                  activeTab === "invoices"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <CreditCard size={18} />
                <span>Invoices</span>
              </button>
            </li>
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <User size={16} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-700">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.role}</p>
            </div>
            <button
              onClick={handleLogout}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center px-6">
          <h1 className="text-lg font-medium text-gray-800">
            {activeTab === "dashboard" && "Dashboard"}
            {activeTab === "documents" && "Compliance Documents"}
            {activeTab === "invoices" && "Invoices"}
          </h1>
          <div className="ml-auto flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="py-1.5 pl-8 pr-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <Search
                size={16}
                className="absolute left-2.5 top-2 text-gray-400"
              />
            </div>
            <button className="relative p-1.5 rounded-full text-gray-500 hover:bg-gray-100">
              <Bell size={18} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {activeTab === "dashboard" && (
            <DashboardContent documents={documents} invoices={invoices} />
          )}
          {activeTab === "documents" && (
            <DocumentsContent documents={documents} />
          )}
          {activeTab === "invoices" && <InvoicesContent invoices={invoices} />}
        </main>
      </div>

      {/* Felicity Chat Button */}
      <div className="fixed bottom-6 right-6">
        <motion.button
          onClick={() => setShowFelicity(!showFelicity)}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="relative">
            <MessageSquare size={20} />
            <motion.div
              className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full"
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.2, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
              }}
            />
          </div>
          <span className="font-medium">Talk to Felicity!</span>
        </motion.button>
      </div>

      {/* Felicity Chat Widget */}
      {showFelicity && (
        <div className="fixed bottom-20 right-6 w-80 h-96 bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col overflow-hidden">
          <FelicityChat onClose={() => setShowFelicity(false)} />
        </div>
      )}
    </div>
  );
}

// Invoices Content Component
function InvoicesContent({ invoices }: { invoices: any[] }) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filteredInvoices, setFilteredInvoices] = useState(invoices);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (filter === "all") {
      setFilteredInvoices(invoices);
    } else {
      setFilteredInvoices(
        invoices.filter((invoice) => invoice.status === filter)
      );
    }
  }, [invoices, filter]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Invoices</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage contractor invoices and payments
          </p>
        </div>
        <motion.button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg font-medium"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <CreditCard size={16} />
          <span>Create Invoice</span>
        </motion.button>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-1.5 text-sm font-medium rounded-md ${
            filter === "all"
              ? "bg-white shadow-sm"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("Paid")}
          className={`px-4 py-1.5 text-sm font-medium rounded-md ${
            filter === "Paid"
              ? "bg-white shadow-sm"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          Paid
        </button>
        <button
          onClick={() => setFilter("Unpaid")}
          className={`px-4 py-1.5 text-sm font-medium rounded-md ${
            filter === "Unpaid"
              ? "bg-white shadow-sm"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          Unpaid
        </button>
        <button
          onClick={() => setFilter("Overdue")}
          className={`px-4 py-1.5 text-sm font-medium rounded-md ${
            filter === "Overdue"
              ? "bg-white shadow-sm"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          Overdue
        </button>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Property
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Contractor
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Amount
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Due Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredInvoices.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-800">
                    {invoice.property}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {invoice.contractor}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">£{invoice.amount}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {new Date(invoice.dueDate).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      invoice.status === "Paid"
                        ? "bg-green-100 text-green-800"
                        : invoice.status === "Unpaid"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {invoice.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      View
                    </button>
                    <button className="text-blue-600 hover:text-blue-800">
                      Pay
                    </button>
                    <button className="text-blue-600 hover:text-blue-800">
                      Remind
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Invoice Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800">
                Create Invoice
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label
                  htmlFor="property"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Property
                </label>
                <select
                  id="property"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select property...</option>
                  <option value="123-main">123 Main St</option>
                  <option value="456-park">456 Park Ave</option>
                  <option value="789-oak">789 Oak Rd</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="contractor"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Contractor
                </label>
                <input
                  id="contractor"
                  type="text"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Contractor name"
                />
              </div>

              <div>
                <label
                  htmlFor="service"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Service Provided
                </label>
                <input
                  id="service"
                  type="text"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Service description"
                />
              </div>

              <div>
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Amount (£)
                </label>
                <input
                  id="amount"
                  type="number"
                  step="0.01"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label
                  htmlFor="invoice-date"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Invoice Date
                </label>
                <input
                  id="invoice-date"
                  type="date"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="due-date"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Due Date
                </label>
                <input
                  id="due-date"
                  type="date"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 border border-gray-300 rounded-lg"
                >
                  Cancel
                </button>
                <motion.button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-black rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Create Invoice
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

// Authentication Screen Component
function AuthScreen({
  onLogin,
  onSignup,
}: {
  onLogin: (email: string, password: string) => void;
  onSignup: (name: string, email: string, password: string) => void;
}) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      onLogin(email, password);
    } else {
      onSignup(name, email, password);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center">
              <span className="text-white font-bold text-xl">L</span>
            </div>
            <span className="text-2xl font-bold text-gray-800">LightWork</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            {isLogin ? "Sign in to your account" : "Create your account"}
          </h2>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required={!isLogin}
                />
              </div>
            )}

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <motion.button
              type="submit"
              className="w-full py-2 px-4 bg-black text-white rounded-lg font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLogin ? "Sign In" : "Sign Up"}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-600 hover:underline font-medium"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Dashboard Content Component
function DashboardContent({
  documents,
  invoices,
}: {
  documents: any[];
  invoices: any[];
}) {
  // Calculate summary statistics
  const expiringDocs = documents.filter(
    (doc) => doc.status === "Expiring Soon"
  ).length;
  const expiredDocs = documents.filter(
    (doc) => doc.status === "Expired"
  ).length;
  const overdueInvoices = invoices.filter(
    (inv) => inv.status === "Overdue"
  ).length;
  const unpaidInvoices = invoices.filter(
    (inv) => inv.status === "Unpaid"
  ).length;

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800">Welcome back!</h2>
        <p className="text-gray-600">{formattedDate}</p>
        <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center flex-shrink-0">
              <Bell size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-medium text-gray-800">{"Today's Tasks"}</h3>
              <p className="text-sm text-gray-600 mt-1">
                You have {expiringDocs + expiredDocs} compliance documents and{" "}
                {overdueInvoices + unpaidInvoices} invoices that need attention.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
          whileHover={{
            y: -5,
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
          }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Expiring Documents
              </p>
              <p className="text-2xl font-bold text-gray-800 mt-1">
                {expiringDocs}
              </p>
            </div>
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AlertTriangle size={18} className="text-yellow-600" />
            </div>
          </div>
          <div className="mt-4">
            <a href="#" className="text-xs text-blue-600 hover:underline">
              View all
            </a>
          </div>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
          whileHover={{
            y: -5,
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
          }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Expired Documents
              </p>
              <p className="text-2xl font-bold text-gray-800 mt-1">
                {expiredDocs}
              </p>
            </div>
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle size={18} className="text-red-600" />
            </div>
          </div>
          <div className="mt-4">
            <a href="#" className="text-xs text-blue-600 hover:underline">
              View all
            </a>
          </div>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
          whileHover={{
            y: -5,
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
          }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Overdue Invoices
              </p>
              <p className="text-2xl font-bold text-gray-800 mt-1">
                {overdueInvoices}
              </p>
            </div>
            <div className="p-2 bg-red-100 rounded-lg">
              <CreditCard size={18} className="text-red-600" />
            </div>
          </div>
          <div className="mt-4">
            <a href="#" className="text-xs text-blue-600 hover:underline">
              View all
            </a>
          </div>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
          whileHover={{
            y: -5,
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
          }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Unpaid Invoices
              </p>
              <p className="text-2xl font-bold text-gray-800 mt-1">
                {unpaidInvoices}
              </p>
            </div>
            <div className="p-2 bg-yellow-100 rounded-lg">
              <CreditCard size={18} className="text-yellow-600" />
            </div>
          </div>
          <div className="mt-4">
            <a href="#" className="text-xs text-blue-600 hover:underline">
              View all
            </a>
          </div>
        </motion.div>
      </div>

      {/* Recent Items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Documents */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-gray-800">
                Recent Compliance Documents
              </h3>
              <a href="#" className="text-xs text-blue-600 hover:underline">
                View all
              </a>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {documents.slice(0, 3).map((doc) => (
              <div key={doc.id} className="p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-800">{doc.name}</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      Expires: {new Date(doc.expiryDate).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      doc.status === "Valid"
                        ? "bg-green-100 text-green-800"
                        : doc.status === "Expiring Soon"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {doc.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Invoices */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-gray-800">Recent Invoices</h3>
              <a href="#" className="text-xs text-blue-600 hover:underline">
                View all
              </a>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {invoices.slice(0, 3).map((invoice) => (
              <div key={invoice.id} className="p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-800">
                      {invoice.property}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      {invoice.contractor} - £{invoice.amount}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Due: {new Date(invoice.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      invoice.status === "Paid"
                        ? "bg-green-100 text-green-800"
                        : invoice.status === "Unpaid"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {invoice.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Documents Content Component
function DocumentsContent({ documents }: { documents: any[] }) {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [filteredDocuments, setFilteredDocuments] = useState(documents);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (filter === "all") {
      setFilteredDocuments(documents);
    } else {
      setFilteredDocuments(documents.filter((doc) => doc.status === filter));
    }
  }, [documents, filter]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Compliance Documents
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage safety certificates and compliance documents
          </p>
        </div>
        <motion.button
          onClick={() => setShowUploadModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg font-medium"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Upload size={16} />
          <span>Upload Document</span>
        </motion.button>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-1.5 text-sm font-medium rounded-md ${
            filter === "all"
              ? "bg-white shadow-sm"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("Valid")}
          className={`px-4 py-1.5 text-sm font-medium rounded-md ${
            filter === "Valid"
              ? "bg-white shadow-sm"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          Valid
        </button>
        <button
          onClick={() => setFilter("Expiring Soon")}
          className={`px-4 py-1.5 text-sm font-medium rounded-md ${
            filter === "Expiring Soon"
              ? "bg-white shadow-sm"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          Expiring Soon
        </button>
        <button
          onClick={() => setFilter("Expired")}
          className={`px-4 py-1.5 text-sm font-medium rounded-md ${
            filter === "Expired"
              ? "bg-white shadow-sm"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          Expired
        </button>
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Document Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Type
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Expiry Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredDocuments.map((doc) => (
              <tr key={doc.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-800">{doc.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{doc.type}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {new Date(doc.expiryDate).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      doc.status === "Valid"
                        ? "bg-green-100 text-green-800"
                        : doc.status === "Expiring Soon"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {doc.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      View
                    </button>
                    <button className="text-blue-600 hover:text-blue-800">
                      Renew
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800">
                Upload Compliance Document
              </h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label
                  htmlFor="doc-type"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Document Type
                </label>
                <select
                  id="doc-type"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select type...</option>
                  <option value="gas">Gas Safety Certificate</option>
                  <option value="eicr">EICR</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="property"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Property
                </label>
                <select
                  id="property"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select property...</option>
                  <option value="123-main">123 Main St</option>
                  <option value="456-park">456 Park Ave</option>
                  <option value="789-oak">789 Oak Rd</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="issue-date"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Issue Date
                </label>
                <input
                  id="issue-date"
                  type="date"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="expiry-date"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Expiry Date
                </label>
                <input
                  id="expiry-date"
                  type="date"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Document File
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PDF, DOCX, PNG, JPG up to 10MB
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 border border-gray-300 rounded-lg"
                >
                  Cancel
                </button>
                <motion.button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-black rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Upload Document
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
