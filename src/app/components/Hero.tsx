'use client'

import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const Hero: React.FC = () => {
  const router = useRouter()
  const { scrollY } = useScroll()
  const titleY = useTransform(scrollY, [0, 300], [0, -150])
  const titleScale = useTransform(scrollY, [0, 300], [1, 1.5])
  const titleRotate = useTransform(scrollY, [0, 300], [0, 5])

  const goToDashboard = () => {
    router.push('/dashboard')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 
        className="text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
        style={{ y: titleY, scale: titleScale, rotateZ: titleRotate }}
      >
        Welcome to Will Brief
      </motion.h1>
      <motion.p 
        className="text-2xl mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Simplify your technical design process and automate the boring stuff.
      </motion.p>
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

export default Hero