import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import api from '../api/axios';
import { MapPin, Calendar, User, AlertCircle, Phone, Mail } from 'lucide-react';

export default function DonationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuthStore();
  const [donation, setDonation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [claimedQuantity, setClaimedQuantity] = useState('');
  const [requestMessage, setRequestMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchDonation();
  }, [id]);

  const fetchDonation = async () => {
    try {
      const response = await api.get(`/donations/${id}`);
      setDonation(response.data.donation);
    } catch (err) {
      setError('Failed to load donation details');
    } finally {
      setLoading(false);
    }
  };

  const handleRequest = async (e) => {
    e.preventDefault();
    if (!token) {
      navigate('/login');
      return;
    }

    if (!claimedQuantity || claimedQuantity <= 0) {
      setError('Please enter a valid quantity');
      return;
    }

    setSubmitting(true);
    try {
      await api.post('/requests', {
        donationId: id,
        message: requestMessage,
        claimedQuantity: parseFloat(claimedQuantity),
      });
      alert('Request sent successfully!');
      setRequestMessage('');
      setClaimedQuantity('');
      fetchDonation();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send request');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
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

  if (!donation) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="card text-center">
          <p className="text-gray-600">Donation not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button
        onClick={() => navigate('/donations')}
        className="mb-6 text-primary-600 hover:text-primary-700 font-medium"
      >
        ← Back to Donations
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="card">
            {donation.image && (
              <img
                src={donation.image}
                alt={donation.foodType}
                className="w-full h-96 object-cover rounded-lg mb-6"
              />
            )}

            <div className="mb-6">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-4xl font-bold">{donation.foodType}</h1>
                <span
                  className={`px-4 py-2 rounded-full font-semibold ${
                    donation.status === 'Pending'
                      ? 'bg-primary-100 text-primary-700'
                      : donation.status === 'Accepted'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {donation.status}
                </span>
              </div>

              <p className="text-xl text-gray-600 mb-6">{donation.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="glass rounded-lg p-4">
                  <p className="text-gray-600 text-sm">Total Quantity</p>
                  <p className="text-2xl font-bold text-primary-600">
                    {donation.totalQuantity} {donation.unit}
                  </p>
                </div>
                <div className="glass rounded-lg p-4">
                  <p className="text-gray-600 text-sm">Remaining</p>
                  <p className="text-2xl font-bold text-green-600">
                    {donation.remainingQuantity} {donation.unit}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="glass rounded-lg p-4">
                  <p className="text-gray-600 text-sm">Claimed</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {donation.claimedQuantity} {donation.unit}
                  </p>
                </div>
                <div className="glass rounded-lg p-4">
                  <p className="text-gray-600 text-sm">Status</p>
                  <p className="text-lg font-bold text-primary-600">{donation.status}</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-gray-700">
                  <MapPin size={20} className="text-primary-600" />
                  <span>{donation.location}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Calendar size={20} className="text-primary-600" />
                  <span>Expires: {formatDate(donation.expiryDate)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Donor Info */}
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Donor Information</h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                {donation.donor?.name?.charAt(0)}
              </div>
              <div>
                <p className="font-semibold">{donation.donor?.name}</p>
                <p className="text-sm text-gray-600">Rating: {donation.donor?.rating || 0}/5 ⭐</p>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-700">
                <Phone size={16} />
                <span>{donation.donor?.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <MapPin size={16} />
                <span>{donation.donor?.city}</span>
              </div>
            </div>
          </div>

          {/* Request Form */}
          {token && user?.role === 'receiver' && (donation.status === 'Pending' || donation.status === 'Partially Claimed') && donation.remainingQuantity > 0 && (
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Claim This Donation</h3>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 flex gap-2">
                  <AlertCircle size={16} className="text-red-600 flex-shrink-0" />
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleRequest} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Quantity to Claim (Max: {donation.remainingQuantity} {donation.unit})
                  </label>
                  <input
                    type="number"
                    value={claimedQuantity}
                    onChange={(e) => setClaimedQuantity(e.target.value)}
                    max={donation.remainingQuantity}
                    step="0.1"
                    className="input-field"
                    placeholder={`0 - ${donation.remainingQuantity}`}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message (Optional)</label>
                  <textarea
                    value={requestMessage}
                    onChange={(e) => setRequestMessage(e.target.value)}
                    className="input-field resize-none"
                    rows="3"
                    placeholder="Tell the donor why you need this food..."
                  />
                </div>
                <button type="submit" disabled={submitting} className="btn-primary w-full">
                  {submitting ? 'Sending...' : 'Send Claim Request'}
                </button>
              </form>
            </div>
          )}

          {!token && (
            <div className="card bg-primary-50 border-2 border-primary-200">
              <p className="text-primary-900 mb-4">Sign in to request this donation</p>
              <button
                onClick={() => navigate('/login')}
                className="btn-primary w-full"
              >
                Sign In
              </button>
            </div>
          )}

          {token && user?.role !== 'receiver' && (
            <div className="card bg-gray-50">
              <p className="text-gray-600">Only receivers can request donations</p>
            </div>
          )}

          {donation.status !== 'Pending' && donation.status !== 'Partially Claimed' && (
            <div className="card bg-yellow-50 border-2 border-yellow-200">
              <p className="text-yellow-900">This donation is no longer available</p>
            </div>
          )}

          {donation.remainingQuantity === 0 && (
            <div className="card bg-gray-50 border-2 border-gray-200">
              <p className="text-gray-700">All food has been claimed</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
