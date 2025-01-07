'use client'

import React from 'react'
import { motion } from 'framer-motion'

const Testimonials: React.FC = () => {
  return (
    <>
        <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="bg-card p-6 rounded-radius shadow mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-lg italic">&quot;Will Brief&apos;s single source of truth &quot;Card&quot; system saves me so much time as I go back and revise my presentations&quot;</p>
            <p className="mt-4 text-right font-semibold">- Jane Doe, Designer</p>
          </motion.div>
          <motion.div
            className="bg-card p-6 rounded-radius shadow"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-lg italic">&quot;Like bullet journaling, by focusing on only the most important details, I can turn my project outlines into presentable materials in minutes not hours&quot;</p>
            <p className="mt-4 text-right font-semibold">- John Smith, Project Manager</p>
          </motion.div>
        </div>
    </>
  )
}

export default Testimonials
