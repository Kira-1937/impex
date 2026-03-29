import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Users, Shield, Zap, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export default function Home() {
  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-10 overflow-hidden">
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-indigo-50 text-indigo-600 border border-indigo-100 mb-6">
              Revolutionizing Cross-Border Trade
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
              Connecting Indian Sellers to the <span className="text-indigo-600">Global Market</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Impex simplifies international trade with collaborative buying, AI-powered export guidance, and seamless logistics.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              to="/marketplace"
              className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 flex items-center justify-center group"
            >
              Explore Marketplace
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all shadow-sm flex items-center justify-center"
            >
              Start Selling
            </Link>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50 -z-10" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-50 -z-10" />
      </section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-3 gap-8">
        {[
          {
            title: "Collaborative Buying",
            desc: "Join forces with other buyers in your country to unlock bulk shipping rates and reduce logistics costs by up to 60%.",
            icon: Users,
            color: "bg-blue-500"
          },
          {
            title: "AI Export Guidance",
            desc: "Our Gemini-powered assistant helps you navigate complex customs, HS codes, and documentation with ease.",
            icon: Zap,
            color: "bg-amber-500"
          },
          {
            title: "Verified Sellers",
            desc: "Shop with confidence from a curated list of verified Indian manufacturers and wholesalers.",
            icon: Shield,
            color: "bg-emerald-500"
          }
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg", feature.color)}>
              <feature.icon className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
            <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Stats Section */}
      <section className="bg-indigo-900 rounded-[3rem] p-12 md:p-20 text-white overflow-hidden relative">
        <div className="grid md:grid-cols-3 gap-12 text-center relative z-10">
          <div>
            <div className="text-5xl font-extrabold mb-2">500+</div>
            <div className="text-indigo-200 font-medium">Verified Indian Sellers</div>
          </div>
          <div>
            <div className="text-5xl font-extrabold mb-2">40+</div>
            <div className="text-indigo-200 font-medium">Countries Served</div>
          </div>
          <div>
            <div className="text-5xl font-extrabold mb-2">60%</div>
            <div className="text-indigo-200 font-medium">Avg. Shipping Savings</div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full -ml-32 -mb-32 blur-3xl" />
      </section>

      {/* CTA Section */}
      <section className="text-center space-y-8 py-10">
        <h2 className="text-4xl font-bold text-gray-900">Ready to take your business global?</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Join thousands of businesses already using Impex to streamline their international trade.
        </p>
        <Link
          to="/login"
          className="inline-flex items-center px-10 py-5 bg-gray-900 text-white rounded-2xl font-bold text-lg hover:bg-black transition-all shadow-2xl"
        >
          Get Started Now
        </Link>
      </section>
    </div>
  );
}
