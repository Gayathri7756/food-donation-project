import { Link } from 'react-router-dom';
import { Leaf, Users, TrendingUp, Heart } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export default function Home() {
  const { token } = useAuthStore();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-dark-900 mb-6">
              Share Food, <span className="text-primary-600">Share Hope</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Connect with donors and receivers in your community. Reduce food waste while helping those in need.
            </p>
            <div className="flex gap-4">
              {token ? (
                <>
                  <Link to="/donations" className="btn-primary">
                    Browse Donations
                  </Link>
                  <Link to="/analytics" className="btn-secondary">
                    View Analytics
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/register" className="btn-primary">
                    Get Started
                  </Link>
                  <Link to="/donations" className="btn-secondary">
                    Browse
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="relative">
            <div className="glass rounded-3xl p-8 h-96 flex items-center justify-center">
              <div className="text-center">
                <Leaf size={80} className="text-primary-500 mx-auto mb-4" />
                <p className="text-gray-600">Building a sustainable food sharing community</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-b from-transparent to-primary-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">Why Choose FoodShare?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Leaf size={40} />,
                title: 'Eco-Friendly',
                description: 'Reduce food waste and environmental impact',
              },
              {
                icon: <Users size={40} />,
                title: 'Community',
                description: 'Connect with donors and receivers nearby',
              },
              {
                icon: <TrendingUp size={40} />,
                title: 'Analytics',
                description: 'Track your donations and impact',
              },
              {
                icon: <Heart size={40} />,
                title: 'Make Impact',
                description: 'Help those in need in your community',
              },
            ].map((feature, idx) => (
              <div key={idx} className="card text-center">
                <div className="text-primary-600 mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: '1',
              title: 'Sign Up',
              description: 'Create an account as a donor or receiver',
            },
            {
              step: '2',
              title: 'Post or Browse',
              description: 'Donors post food, receivers browse available items',
            },
            {
              step: '3',
              title: 'Connect',
              description: 'Make requests and complete donations',
            },
          ].map((item, idx) => (
            <div key={idx} className="card">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg mb-4">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="glass-dark rounded-3xl max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mb-20">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 text-gray-300">
            Join thousands of people sharing food and building a better community
          </p>
          {!token && (
            <Link to="/register" className="btn-primary">
              Start Sharing Today
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
