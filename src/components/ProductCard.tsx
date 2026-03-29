import React from 'react';
import { ShoppingCart, ExternalLink, Package, Info } from 'lucide-react';
import { formatCurrency, cn } from '../lib/utils';
import { motion } from 'motion/react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  stock: number;
  minExportQty: number;
  sellerId: string;
}

export function ProductCard({ product, onAddToCart }: { product: Product, onAddToCart: (p: Product) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-indigo-50 transition-all group"
    >
      <div className="aspect-square relative overflow-hidden">
        <img
          src={product.images[0] || `https://picsum.photos/seed/${product.id}/400/400`}
          alt={product.name}
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 right-4">
          <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-indigo-600 shadow-sm">
            {product.category}
          </span>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{product.name}</h3>
          <p className="text-sm text-gray-500 line-clamp-2 mt-1">{product.description}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-2xl font-black text-indigo-600">{formatCurrency(product.price)}</div>
          <div className="flex items-center text-xs font-semibold text-gray-400">
            <Package className="w-3 h-3 mr-1" />
            Min: {product.minExportQty} units
          </div>
        </div>

        <div className="pt-2 flex gap-2">
          <button
            onClick={() => onAddToCart(product)}
            className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors flex items-center justify-center shadow-lg shadow-indigo-100"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Order
          </button>
          <button className="p-3 bg-gray-50 text-gray-400 rounded-xl hover:bg-gray-100 transition-colors">
            <Info className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
