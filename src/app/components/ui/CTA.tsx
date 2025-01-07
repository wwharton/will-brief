'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const CTA: React.FC = () => {
  const router = useRouter()

  const goToDashboard = () => {
    router.push('/dashboard')
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <h2 className="text-4xl font-bold mb-6">Ready to Simplify Your Design Process?</h2>
      <p className="text-xl mb-8 max-w-2xl mx-auto">Join a community of designers who are transforming their workflow with intuitive card-based organization and automated material generation.</p>
      <Button 
        onClick={goToDashboard} 
        size="lg" 
        variant="default" 
        className="text-lg px-8 py-6 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
      >
        Launch Dashboard <ArrowRight className="ml-2 w-6 h-6" />
      </Button>
    </motion.div>
  )
}

export default CTA

