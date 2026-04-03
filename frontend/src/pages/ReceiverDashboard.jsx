import { useState, useEffect } from 'react';
import api from '../api/axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Package, CheckCircle, Clock, TrendingUp } from 'lucide-react';

const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444'];

export default function ReceiverDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await api.get('/analytics/receiver/dashboard');
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
      <h1 className="text-4xl font-bold mb-8">Receiver Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            icon: <Package size={32} />,
            label: 'Total Requests',
            value: analytics?.totalRequests || 0,
            color: 'primary',
          },
          {
            icon: <Clock size={32} />,
            label: 'Pending',
            value: analytics?.requestsByStatus?.find((s) => s._id === 'Pending')?.count || 0,
            color: 'amber',
          },
          {
            icon: <CheckCircle size={32} />,
            label: 'Completed',
            value: analytics?.completedRequests || 0,
            color: 'green',
          },
          {
            icon: <TrendingUp size={32} />,
            label: 'Total Received',
            value: `${analytics?.totalQuantityReceived || 0} kg`,
            color: 'blue',
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
        {/* Requests by Status */}
        <div className="card">
          <h3 className="text-xl font-semibold mb-6">Requests by Status</h3>
          {analytics?.requestsByStatus && analytics.requestsByStatus.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analytics.requestsByStatus}
                  dataKey="count"
                  nameKey="_id"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {analytics.requestsByStatus.map((entry, index) => (
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

        {/* Requests by Month */}
        <div className="card">
          <h3 className="text-xl font-semibold mb-6">Requests by Month</h3>
          {analytics?.requestsByMonth && analytics.requestsByMonth.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.requestsByMonth}>
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

      {/* Summary */}
      <div className="card">
        <h3 className="text-xl font-semibold mb-6">Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-gray-600 text-sm mb-2">Acceptance Rate</p>
            <p className="text-3xl font-bold text-primary-600">
              {analytics?.totalRequests > 0
                ? Math.round((analytics.acceptedRequests / analytics.totalRequests) * 100)
                : 0}
              %
            </p>
          </div>
          <div>
            <p className="text-gray-600 text-sm mb-2">Completion Rate</p>
            <p className="text-3xl font-bold text-primary-600">
              {analytics?.acceptedRequests > 0
                ? Math.round((analytics.completedRequests / analytics.acceptedRequests) * 100)
                : 0}
              %
            </p>
          </div>
          <div>
            <p className="text-gray-600 text-sm mb-2">Avg per Request</p>
            <p className="text-3xl font-bold text-primary-600">
              {analytics?.completedRequests > 0
                ? (analytics.totalQuantityReceived / analytics.completedRequests).toFixed(1)
                : 0}{' '}
              kg
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
