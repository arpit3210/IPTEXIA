'use client'; // Add this at the very top for Next.js App Router



import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Globe, Shield, BrainCircuit, Link } from 'lucide-react';

function About() {
  const features = [
    { icon: <Globe size={40} />, title: "Decentralized Storage", text: "Distributed across Filecoin, IPFS, and Storacha" },
    { icon: <Shield size={40} />, title: "AI Monitoring", text: "24/7 neural network protection scanning the web" },
    { icon: <BrainCircuit size={40} />, title: "Smart Contracts", text: "Automatic licensing and royalty distribution" },
    { icon: <Link size={40} />, title: "Immutable Proof", text: "On-chain timestamping and verification" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-20">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              IPTEXIA
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Intelligent Protection for Creative Minds
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-primary hover:bg-primary-dark px-8 py-3 rounded-full font-semibold transition-all">
              Get Started
            </button>
            <button className="border border-primary text-primary hover:bg-primary/10 px-8 py-3 rounded-full transition-all">
              How It Works
            </button>
          </div>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 p-8 rounded-xl hover:bg-gray-700 transition-all"
            >
              <div className="text-primary mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Interactive Process Flow */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-16">How IPTEXIA Protects Your Work</h2>
          <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0">
            {['Upload', 'Analyze', 'Protect', 'Monitor'].map((step, index) => (
              <motion.div 
                key={step}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step}</h3>
                <p className="text-gray-400 max-w-[200px]">
                  {[
                    'Secure upload with encryption',
                    'AI-powered content analysis',
                    'Blockchain registration',
                    '24/7 web monitoring'
                  ][index]}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <div className="bg-gray-800 p-12 rounded-3xl mb-20">
          <h3 className="text-2xl font-bold text-center mb-8">Powered By</h3>
          <div className="flex flex-wrap justify-center items-center gap-12">
            {['filecoin', 'ipfs', 'storj', 'polygon'].map((tech) => (
              <motion.div
                key={tech}
                whileHover={{ scale: 1.1 }}
                className="relative w-32 h-16 grayscale hover:grayscale-0 transition-all"
              >
                <Image 
                  src={`/tech/${tech}.svg`} 
                  alt={tech}
                  fill
                  className="object-contain"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Animated Stats */}
        <div className="grid md:grid-cols-3 gap-8 text-center mb-20">
          <motion.div
            whileInView={{ scale: [0.9, 1] }}
            className="bg-primary/20 p-8 rounded-xl"
          >
            <div className="text-4xl font-bold mb-2">500K+</div>
            <div className="text-gray-400">Protected Assets</div>
          </motion.div>
          <motion.div
            whileInView={{ scale: [0.9, 1] }}
            className="bg-primary/20 p-8 rounded-xl"
          >
            <div className="text-4xl font-bold mb-2">$10M+</div>
            <div className="text-gray-400">Royalties Distributed</div>
          </motion.div>
          <motion.div
            whileInView={{ scale: [0.9, 1] }}
            className="bg-primary/20 p-8 rounded-xl"
          >
            <div className="text-4xl font-bold mb-2">99.9%</div>
            <div className="text-gray-400">Detection Accuracy</div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default About;