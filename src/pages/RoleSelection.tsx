import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';
import { ShoppingBag, Store, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function RoleSelection() {
  const { profile, updateRole, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return null;
  if (profile) return <Navigate to="/marketplace" />;

  const handleRoleSelect = async (role: 'buyer' | 'seller') => {
    try {
      await updateRole(role);
      navigate(role === 'seller' ? '/seller' : '/marketplace');
    } catch (error) {
      console.error('Role selection failed:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">How will you use Impex?</h1>
        <p className="text-xl text-gray-600">Choose your primary role to get started.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.button
          whileHover={{ y: -8 }}
          onClick={() => handleRoleSelect('buyer')}
          className="p-10 bg-white rounded-[2.5rem] border-2 border-gray-100 text-left hover:border-indigo-600 transition-all shadow-sm hover:shadow-2xl hover:shadow-indigo-100 group"
        >
          <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">I am a Buyer</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            I want to source high-quality products from India and save on shipping through collaborative buying.
          </p>
          <div className="flex items-center text-indigo-600 font-bold">
            Continue as Buyer <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </motion.button>

        <motion.button
          whileHover={{ y: -8 }}
          onClick={() => handleRoleSelect('seller')}
          className="p-10 bg-white rounded-[2.5rem] border-2 border-gray-100 text-left hover:border-indigo-600 transition-all shadow-sm hover:shadow-2xl hover:shadow-indigo-100 group"
        >
          <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            <Store className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">I am a Seller</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            I am an Indian manufacturer or wholesaler looking to export my products to international markets.
          </p>
          <div className="flex items-center text-indigo-600 font-bold">
            Continue as Seller <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </motion.button>
      </div>
    </div>
  );
}
