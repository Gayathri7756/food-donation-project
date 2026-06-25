import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import api from '../api/axios';
import { Star, AlertCircle } from 'lucide-react';

export default function MyRequests() {
  const { user } = useAuthStore();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState(user?.role === 'donor' ? 'received' : 'sent');
  const [ratingModal, setRatingModal] = useState(null);
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');

  useEffect(() => {
    fetchRequests();
  }, [activeTab]);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const endpoint =
        user?.role === 'donor'
          ? '/requests/donor/my-requests'
          : '/requests/receiver/my-requests';
      const response = await api.get(endpoint);
      setRequests(response.data.requests);
    } catch (err) {
      setError('Failed to load requests');
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (requestId) => {
    try {
      await api.post(`/requests/${requestId}/accept`, {});
      fetchRequests();
      alert('Request accepted!');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to accept request');
    }
  };

  const handleReject = async (requestId) => {
    try {
      await api.post(`/requests/${requestId}/reject`, {});
      fetchRequests();
      alert('Request rejected');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to reject request');
    }
  };

  const handleComplete = async (requestId) => {
    try {
      await api.post(`/requests/${requestId}/complete`, {});
      fetchRequests();
      alert('Request completed!');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to complete request');
    }
  };

  const handleSubmitRating = async (requestId) => {
    try {
      await api.post(`/requests/${requestId}/rate`, { rating, review });
      setRatingModal(null);
      setRating(5);
      setReview('');
      fetchRequests();
      alert('Rating submitted!');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to submit rating');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'Accepted':
        return 'bg-blue-100 text-blue-700';
      case 'Completed':
        return 'bg-green-100 text-green-700';
      case 'Rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
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
      <h1 className="text-4xl font-bold mb-8">My Requests</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex gap-3">
          <AlertCircle size={20} className="text-red-600 flex-shrink-0" />
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-gray-200">
        {user?.role === 'donor' && (
          <button
            onClick={() => setActiveTab('received')}
            className={`px-4 py-2 font-medium border-b-2 transition ${
              activeTab === 'received'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Requests Received
          </button>
        )}
        {user?.role === 'receiver' && (
          <button
            onClick={() => setActiveTab('sent')}
            className={`px-4 py-2 font-medium border-b-2 transition ${
              activeTab === 'sent'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Requests Sent
          </button>
        )}
      </div>

      {requests.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-600">No requests found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((request) => (
            <div key={request._id} className="card">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">
                    {request.donation?.foodType}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {user?.role === 'donor'
                      ? `From: ${request.receiver?.name}`
                      : `To: ${request.donor?.name}`}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                  {request.status}
                </span>
              </div>

              {request.message && (
                <p className="text-gray-600 mb-4 p-3 bg-gray-50 rounded-lg">
                  {request.message}
                </p>
              )}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                <div>
                  <p className="text-gray-600">Claimed</p>
                  <p className="font-semibold">{request.claimedQuantity} kg</p>
                </div>
                {request.acceptedQuantity && (
                  <div>
                    <p className="text-gray-600">Accepted</p>
                    <p className="font-semibold">{request.acceptedQuantity} kg</p>
                  </div>
                )}
                {request.pickupDate && (
                  <div>
                    <p className="text-gray-600">Pickup Date</p>
                    <p className="font-semibold">
                      {new Date(request.pickupDate).toLocaleDateString()}
                    </p>
                  </div>
                )}
                {request.rating && (
                  <div>
                    <p className="text-gray-600">Rating</p>
                    <p className="font-semibold">{'⭐'.repeat(request.rating)}</p>
                  </div>
                )}
              </div>

              {request.review && (
                <p className="text-gray-600 text-sm mb-4 p-3 bg-blue-50 rounded-lg">
                  Review: {request.review}
                </p>
              )}

              {/* Actions */}
              <div className="flex gap-2 flex-wrap">
                {user?.role === 'donor' && request.status === 'Pending' && (
                  <>
                    <button
                      onClick={() => handleAccept(request._id)}
                      className="btn-primary text-sm"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(request._id)}
                      className="btn-secondary text-sm"
                    >
                      Reject
                    </button>
                  </>
                )}

                {request.status === 'Accepted' && (
                  <button
                    onClick={() => handleComplete(request._id)}
                    className="btn-primary text-sm"
                  >
                    Mark Complete
                  </button>
                )}

                {request.status === 'Completed' && !request.rating && user?.role === 'receiver' && (
                  <button
                    onClick={() => setRatingModal(request._id)}
                    className="btn-primary text-sm flex items-center gap-2"
                  >
                    <Star size={16} />
                    Rate
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Rating Modal */}
      {ratingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="card max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Rate This Donation</h3>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`text-3xl transition ${
                      star <= rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  >
                    ⭐
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Review</label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="input-field resize-none"
                rows="4"
                placeholder="Share your experience..."
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleSubmitRating(ratingModal)}
                className="btn-primary flex-1"
              >
                Submit
              </button>
              <button
                onClick={() => setRatingModal(null)}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
