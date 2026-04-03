import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Plus, TrendingUp, Package, CheckCircle } from 'lucide-react';

const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444'];

export default function DonorDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await api.get('/analytics/donor/dashboard');
      setAnalytics(response.data.analytics);
    } catch (error) {
      console.error('Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="inline-block animate-spin">
            <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Donor Dashboard</h1>
        <Link to="/create-donation" className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          New Donation
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            icon: <Package size={32} />,
            label: 'Total Donations',
            value: analytics?.totalDonations || 0,
            color: 'primary',
          },
          {
            icon: <TrendingUp size={32} />,
            label: 'Active Donations',
            value: analytics?.activeDonations || 0,
            color: 'blue',
          },
          {
            icon: <CheckCircle size={32} />,
            label: 'Completed',
            value: analytics?.completedDonations || 0,
            color: 'green',
          },
          {
            icon: <Package size={32} />,
            label: 'Total Quantity',
            value: `${analytics?.totalQuantityDonated || 0} kg`,
            color: 'amber',
          },
        ].map((stat, idx) => (
          <div key={idx} className="card">
            <div className={`text-${stat.color}-600 mb-4`}>{stat.icon}</div>
            <p className="text-gray-600 text-sm">{stat.label}</p>
            <p className="text-3xl font-bold text-dark-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Donations by Type */}
        <div className="card">
          <h3 className="text-xl font-semibold mb-6">Donations by Type</h3>
          {analytics?.donationsByType && analytics.donationsByType.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analytics.donationsByType}
                  dataKey="count"
                  nameKey="_id"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {analytics.donationsByType.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-600 text-center py-8">No data available</p>
          )}
        </div>

        {/* Donations by Month */}
        <div className="card">
          <h3 className="text-xl font-semibold mb-6">Donations by Month</h3>
          {analytics?.donationsByMonth && analytics.donationsByMonth.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.donationsByMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="_id"
                  tickFormatter={(value) => `${value.month}/${value.year}`}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-600 text-center py-8">No data available</p>
          )}
        </div>
      </div>

      {/* Requests Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Requests Received</h3>
          <p className="text-4xl font-bold text-primary-600 mb-2">
            {analytics?.requestsReceived || 0}
          </p>
          <p className="text-gray-600">
            {analytics?.requestsAccepted || 0} accepted
          </p>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Your Rating</h3>
          <p className="text-4xl font-bold text-primary-600 mb-2">
            {analytics?.rating?.toFixed(1) || 0}/5
          </p>
          <p className="text-gray-600">⭐ Based on receiver reviews</p>
        </div>
      </div>
    </div>
  );
}
