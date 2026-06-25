import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { Search, MapPin, Calendar, AlertCircle } from 'lucide-react';

export default function Donations() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    city: '',
    pincode: '',
    foodType: '',
    page: 1,
  });

  useEffect(() => {
    fetchDonations();
  }, [filters]);

  const fetchDonations = async () => {
    try {
      setLoading(true);
      const response = await api.get('/donations', { params: filters });
      setDonations(response.data.donations);
    } catch (err) {
      setError('Failed to load donations');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value, page: 1 });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const isExpiringSoon = (expiryDate) => {
    const now = new Date();
    const expiry = new Date(expiryDate);
    const hoursUntilExpiry = (expiry - now) / (1000 * 60 * 60);
    return hoursUntilExpiry < 24 && hoursUntilExpiry > 0;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">Available Donations</h1>

      {/* Filters */}
      <div className="glass rounded-2xl p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">City</label>
            <input
              type="text"
              name="city"
              value={filters.city}
              onChange={handleFilterChange}
              className="input-field"
              placeholder="Search by city"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Pincode</label>
            <input
              type="text"
              name="pincode"
              value={filters.pincode}
              onChange={handleFilterChange}
              className="input-field"
              placeholder="Search by pincode"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Food Type</label>
            <select
              name="foodType"
              value={filters.foodType}
              onChange={handleFilterChange}
              className="input-field"
            >
              <option value="">All Types</option>
              <option value="Cooked Food">Cooked Food</option>
              <option value="Raw Food">Raw Food</option>
              <option value="Packaged Food">Packaged Food</option>
              <option value="Beverages">Beverages</option>
              <option value="Bakery">Bakery</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              name="status"
              value={filters.status || ''}
              onChange={handleFilterChange}
              className="input-field"
            >
              <option value="">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Accepted">Accepted</option>
            </select>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex gap-3">
          <AlertCircle size={20} className="text-red-600 flex-shrink-0" />
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin">
            <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full"></div>
          </div>
        </div>
      ) : donations.length === 0 ? (
        <div className="card text-center py-12">
          <Search size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">No donations found. Try adjusting your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {donations.map((donation) => (
            <Link key={donation._id} to={`/donations/${donation._id}`}>
              <div className="card h-full hover:shadow-2xl transition-all duration-300 cursor-pointer">
                {donation.image && (
                  <img
                    src={donation.image}
                    alt={donation.foodType}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}

                {isExpiringSoon(donation.expiryDate) && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 mb-4 flex gap-2">
                    <AlertCircle size={16} className="text-yellow-600 flex-shrink-0" />
                    <p className="text-yellow-700 text-sm">Expiring soon!</p>
                  </div>
                )}

                <div className="mb-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{donation.foodType}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        donation.status === 'Pending'
                          ? 'bg-primary-100 text-primary-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {donation.status}
                    </span>
                  </div>
                  <p className="text-gray-600 line-clamp-2">{donation.description}</p>
                </div>

                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>
                      {donation.city}, {donation.pincode}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>Expires: {formatDate(donation.expiryDate)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-500">Total</p>
                      <p className="font-semibold text-primary-600">
                        {donation.totalQuantity || donation.quantity} {donation.unit}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Available</p>
                      <p className="font-semibold text-green-600">
                        {donation.remainingQuantity || donation.totalQuantity || donation.quantity} {donation.unit}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-bold text-sm">
                      {donation.donor?.name?.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{donation.donor?.name}</p>
                    <p className="text-xs text-gray-500">Rating: {donation.donor?.rating || 0}/5</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
