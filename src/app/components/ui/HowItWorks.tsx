'use client'

import React from 'react'
import { motion } from 'framer-motion'

const steps = [
  'Create Cards for Each Project Element',
  'Organize Cards With Familiar, Jira-Like Categories and Lanes',
  'Automatically Generate Slide Shows, Documentation, and Diagrams',
  'Edit, Create, or Remove Cards and See Changes Across All Materials',
]

const HowItWorks: React.FC = () => (
  <div>
    <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
    <div className="max-w-4xl mx-auto">
      {steps.map((step, index) => (
        <motion.div
          key={step}
          className="flex items-center mb-8"
          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mr-4"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {index + 1}
          </motion.div>
          <div>
            <h3 className="text-xl font-semibold">{step}</h3>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
)

export default HowItWorks