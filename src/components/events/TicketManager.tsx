"use client";

import React, { useState, useEffect } from "react";

interface TicketType {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  quantity: number;
  sold: number;
  available: number;
  benefits: string[];
  isActive: boolean;
  saleStartDate: string;
  saleEndDate: string;
  status: "available" | "selling_fast" | "sold_out" | "not_on_sale";
}

interface TicketSale {
  id: string;
  ticketTypeId: string;
  ticketTypeName: string;
  buyerName: string;
  buyerEmail: string;
  quantity: number;
  totalAmount: number;
  purchaseDate: string;
  status: "confirmed" | "pending" | "cancelled";
  paymentMethod: string;
}

export function TicketManager({ eventId }: { eventId: string }) {
  const [ticketTypes, setTicketTypes] = useState<TicketType[]>([]);
  const [sales, setSales] = useState<TicketSale[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "tickets" | "sales" | "analytics">("overview");
  const [selectedTicketType, setSelectedTicketType] = useState<string | null>(null);

  // Demo data for ticket types
  useEffect(() => {
    const demoTicketTypes: TicketType[] = [
      {
        id: "1",
        name: "Early Bird",
        description: "Limited time offer with 20% discount",
        price: 40,
        currency: "AUD",
        quantity: 100,
        sold: 75,
        available: 25,
        benefits: ["20% discount", "Priority seating", "Free drink"],
        isActive: true,
        saleStartDate: "2024-01-10",
        saleEndDate: "2024-01-20",
        status: "selling_fast"
      },
      {
        id: "2",
        name: "General Admission",
        description: "Standard event access",
        price: 50,
        currency: "AUD",
        quantity: 200,
        sold: 120,
        available: 80,
        benefits: ["Standard seating", "Event access"],
        isActive: true,
        saleStartDate: "2024-01-15",
        saleEndDate: "2024-01-30",
        status: "available"
      },
      {
        id: "3",
        name: "VIP Package",
        description: "Premium experience with exclusive benefits",
        price: 120,
        currency: "AUD",
        quantity: 50,
        sold: 50,
        available: 0,
        benefits: ["VIP seating", "Meet & greet", "Exclusive lounge", "Complimentary food & drinks"],
        isActive: true,
        saleStartDate: "2024-01-10",
        saleEndDate: "2024-01-25",
        status: "sold_out"
      },
      {
        id: "4",
        name: "Student Discount",
        description: "Special pricing for students with valid ID",
        price: 25,
        currency: "AUD",
        quantity: 75,
        sold: 0,
        available: 75,
        benefits: ["Student pricing", "Standard seating"],
        isActive: false,
        saleStartDate: "2024-01-20",
        saleEndDate: "2024-01-25",
        status: "not_on_sale"
      }
    ];

    const demoSales: TicketSale[] = [
      {
        id: "1",
        ticketTypeId: "1",
        ticketTypeName: "Early Bird",
        buyerName: "John Smith",
        buyerEmail: "john@example.com",
        quantity: 2,
        totalAmount: 80,
        purchaseDate: "2024-01-15T10:30:00Z",
        status: "confirmed",
        paymentMethod: "Credit Card"
      },
      {
        id: "2",
        ticketTypeId: "2",
        ticketTypeName: "General Admission",
        buyerName: "Sarah Johnson",
        buyerEmail: "sarah@example.com",
        quantity: 1,
        totalAmount: 50,
        purchaseDate: "2024-01-16T14:20:00Z",
        status: "confirmed",
        paymentMethod: "PayPal"
      },
      {
        id: "3",
        ticketTypeId: "3",
        ticketTypeName: "VIP Package",
        buyerName: "Mike Wilson",
        buyerEmail: "mike@example.com",
        quantity: 1,
        totalAmount: 120,
        purchaseDate: "2024-01-14T09:15:00Z",
        status: "confirmed",
        paymentMethod: "Credit Card"
      },
      {
        id: "4",
        ticketTypeId: "1",
        ticketTypeName: "Early Bird",
        buyerName: "Lisa Brown",
        buyerEmail: "lisa@example.com",
        quantity: 3,
        totalAmount: 120,
        purchaseDate: "2024-01-17T16:45:00Z",
        status: "pending",
        paymentMethod: "Bank Transfer"
      }
    ];

    setTicketTypes(demoTicketTypes);
    setSales(demoSales);
    setIsLoading(false);
  }, [eventId]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return "text-green-600 bg-green-100";
      case "selling_fast": return "text-orange-600 bg-orange-100";
      case "sold_out": return "text-red-600 bg-red-100";
      case "not_on_sale": return "text-gray-600 bg-gray-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available": return "✅";
      case "selling_fast": return "🔥";
      case "sold_out": return "❌";
      case "not_on_sale": return "⏸️";
      default: return "❓";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getProgressPercentage = (sold: number, total: number) => {
    return Math.round((sold / total) * 100);
  };

  const totalRevenue = sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
  const totalTicketsSold = sales.reduce((sum, sale) => sum + sale.quantity, 0);
  const totalCapacity = ticketTypes.reduce((sum, ticket) => sum + ticket.quantity, 0);
  const totalAvailable = ticketTypes.reduce((sum, ticket) => sum + ticket.available, 0);

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-20 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Ticket Management</h2>
        <div className="flex space-x-2">
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            📊 Export Report
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            ➕ Add Ticket Type
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: "overview", name: "Overview", icon: "📊" },
            { id: "tickets", name: "Ticket Types", icon: "🎫" },
            { id: "sales", name: "Sales", icon: "💰" },
            { id: "analytics", name: "Analytics", icon: "📈" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-1 ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalRevenue)}</p>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 text-lg">💰</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tickets Sold</p>
                  <p className="text-2xl font-bold text-gray-900">{totalTicketsSold}</p>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 text-lg">🎫</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Available</p>
                  <p className="text-2xl font-bold text-gray-900">{totalAvailable}</p>
                </div>
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <span className="text-yellow-600 text-lg">📦</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Sold Out Types</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {ticketTypes.filter(t => t.status === "sold_out").length}
                  </p>
                </div>
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <span className="text-red-600 text-lg">❌</span>
                </div>
              </div>
            </div>
          </div>

          {/* Ticket Types Summary */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ticket Types Overview</h3>
            <div className="space-y-3">
              {ticketTypes.map((ticket) => (
                <div key={ticket.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-gray-600">🎫</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{ticket.name}</h4>
                      <p className="text-sm text-gray-600">{ticket.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">{formatCurrency(ticket.price)}</p>
                      <p className="text-xs text-gray-600">{ticket.sold}/{ticket.quantity} sold</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(ticket.status)}`}>
                      {getStatusIcon(ticket.status)} {ticket.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Sales */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Sales</h3>
            <div className="space-y-3">
              {sales.slice(0, 5).map((sale) => (
                <div key={sale.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{sale.buyerName}</p>
                    <p className="text-sm text-gray-600">{sale.ticketTypeName} × {sale.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{formatCurrency(sale.totalAmount)}</p>
                    <p className="text-xs text-gray-600">{formatDate(sale.purchaseDate)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Ticket Types Tab */}
      {activeTab === "tickets" && (
        <div className="space-y-4">
          {ticketTypes.map((ticket) => (
            <div key={ticket.id} className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{ticket.name}</h3>
                  <p className="text-gray-600">{ticket.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(ticket.status)}`}>
                    {getStatusIcon(ticket.status)} {ticket.status.replace('_', ' ')}
                  </span>
                  <button className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors">
                    ✏️ Edit
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Price</p>
                  <p className="text-lg font-semibold text-gray-900">{formatCurrency(ticket.price)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Quantity</p>
                  <p className="text-lg font-semibold text-gray-900">{ticket.quantity}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Sold</p>
                  <p className="text-lg font-semibold text-gray-900">{ticket.sold}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Available</p>
                  <p className="text-lg font-semibold text-gray-900">{ticket.available}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Sales Progress</span>
                  <span>{getProgressPercentage(ticket.sold, ticket.quantity)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getProgressPercentage(ticket.sold, ticket.quantity)}%` }}
                  ></div>
                </div>
              </div>

              {/* Benefits */}
              {ticket.benefits.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Benefits:</p>
                  <div className="flex flex-wrap gap-2">
                    {ticket.benefits.map((benefit, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Sale Period */}
              <div className="text-sm text-gray-600">
                <p>Sale Period: {new Date(ticket.saleStartDate).toLocaleDateString()} - {new Date(ticket.saleEndDate).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Sales Tab */}
      {activeTab === "sales" && (
        <div className="space-y-4">
          {/* Filters */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">All Ticket Types</option>
                  {ticketTypes.map((ticket) => (
                    <option key={ticket.id} value={ticket.id}>{ticket.name}</option>
                  ))}
                </select>
                <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">All Status</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div className="text-sm text-gray-600">
                Showing {sales.length} sales
              </div>
            </div>
          </div>

          {/* Sales List */}
          <div className="space-y-3">
            {sales.map((sale) => (
              <div key={sale.id} className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-gray-600">👤</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{sale.buyerName}</h4>
                      <p className="text-sm text-gray-600">{sale.buyerEmail}</p>
                      <p className="text-sm text-gray-600">{sale.ticketTypeName} × {sale.quantity}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">{formatCurrency(sale.totalAmount)}</p>
                    <p className="text-sm text-gray-600">{formatDate(sale.purchaseDate)}</p>
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                      sale.status === "confirmed" ? "text-green-600 bg-green-100" :
                      sale.status === "pending" ? "text-yellow-600 bg-yellow-100" :
                      "text-red-600 bg-red-100"
                    }`}>
                      {sale.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-end space-x-2 mt-4 pt-4 border-t border-gray-100">
                  <button className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors">
                    📧 Send Receipt
                  </button>
                  <button className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors">
                    ✏️ Edit
                  </button>
                  <button className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
                    ❌ Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === "analytics" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales by Ticket Type</h3>
              <div className="space-y-3">
                {ticketTypes.map((ticket) => {
                  const ticketSales = sales.filter(sale => sale.ticketTypeId === ticket.id);
                  const ticketRevenue = ticketSales.reduce((sum, sale) => sum + sale.totalAmount, 0);
                  const ticketQuantity = ticketSales.reduce((sum, sale) => sum + sale.quantity, 0);
                  
                  return (
                    <div key={ticket.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span>🎫</span>
                        <span className="text-sm font-medium">{ticket.name}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{formatCurrency(ticketRevenue)}</p>
                        <p className="text-xs text-gray-600">{ticketQuantity} tickets</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Timeline</h3>
              <div className="space-y-3">
                {sales.slice(0, 5).map((sale) => (
                  <div key={sale.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{sale.buyerName}</p>
                      <p className="text-xs text-gray-600">{sale.ticketTypeName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{formatCurrency(sale.totalAmount)}</p>
                      <p className="text-xs text-gray-600">{formatDate(sale.purchaseDate)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{formatCurrency(totalRevenue)}</p>
                <p className="text-sm text-blue-700">Total Revenue</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{totalTicketsSold}</p>
                <p className="text-sm text-green-700">Tickets Sold</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">
                  {totalCapacity > 0 ? Math.round((totalTicketsSold / totalCapacity) * 100) : 0}%
                </p>
                <p className="text-sm text-purple-700">Sold Percentage</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 