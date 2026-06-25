import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { AlertCircle } from 'lucide-react';

export default function CreateDonation() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    foodType: 'Cooked Food',
    totalQuantity: '',
    unit: 'kg',
    description: '',
    expiryDate: '',
    location: '',
    city: '',
    pincode: '',
    image: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.post('/donations', formData);
      alert('Donation created successfully!');
      navigate('/donor-dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create donation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="card">
        <h1 className="text-3xl font-bold mb-2">Create Donation</h1>
        <p className="text-gray-600 mb-8">Share food with those in need</p>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex gap-3">
            <AlertCircle size={20} className="text-red-600 flex-shrink-0" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Food Type</label>
              <select
                name="foodType"
                value={formData.foodType}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="Cooked Food">Cooked Food</option>
                <option value="Raw Food">Raw Food</option>
                <option value="Packaged Food">Packaged Food</option>
                <option value="Beverages">Beverages</option>
                <option value="Bakery">Bakery</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  name="totalQuantity"
                  value={formData.totalQuantity}
                  onChange={handleChange}
                  className="input-field flex-1"
                  placeholder="10"
                  step="0.1"
                  required
                />
                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  className="input-field w-24"
                >
                  <option value="kg">kg</option>
                  <option value="liters">liters</option>
                  <option value="packs">packs</option>
                  <option value="plates">plates</option>
                  <option value="pieces">pieces</option>
                  <option value="boxes">boxes</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="input-field resize-none"
              rows="4"
              placeholder="Describe the food, ingredients, preparation method, etc."
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Expiry Date & Time</label>
              <input
                type="datetime-local"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="input-field"
                placeholder="Street address"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="input-field"
                placeholder="New York"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Pincode</label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="input-field"
                placeholder="10001"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Food Image</label>
            <div className="border-2 border-dashed border-primary-300 rounded-lg p-6 text-center cursor-pointer hover:border-primary-500 transition">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="image-input"
              />
              <label htmlFor="image-input" className="cursor-pointer">
                {formData.image ? (
                  <div>
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-lg mx-auto mb-2"
                    />
                    <p className="text-sm text-primary-600">Click to change image</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-600">Click to upload image</p>
                    <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          <div className="flex gap-4">
            <button type="submit" disabled={loading} className="btn-primary flex-1">
              {loading ? 'Creating...' : 'Create Donation'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/donor-dashboard')}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
