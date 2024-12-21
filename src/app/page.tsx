'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Zap, Shield, Rocket } from 'lucide-react'
// import ParallaxBackground from '@/components/ParallaxBackground'

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon: Icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
  >
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Icon className="mr-2" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  </motion.div>
)

const HomePage: React.FC = () => {
  const router = useRouter()
  const { scrollY } = useScroll()
  const titleY = useTransform(scrollY, [0, 300], [0, -150])
  const titleScale = useTransform(scrollY, [0, 300], [1, 1.5])
  const titleRotate = useTransform(scrollY, [0, 300], [0, 5])

  const goToDashboard = () => {
    router.push('/dashboard')
  }

  const steps = [
    'Create a Card',
    'Describe your Requirements',
    'Connect Dependencies',
    'Present a Slide Show, Document, or Diagram'
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* <ParallaxBackground /> */}

      {/* Hero Section */}
      <section className="py-20 px-4 text-center relative overflow-hidden">
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
            Automatically generate design documents, presentations, and diagrams
          </motion.p>
          <Button onClick={goToDashboard} size="lg" className="animate-pulse">
            Launch Dashboard <ArrowRight className="ml-2" />
          </Button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-secondary">
        <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <FeatureCard
            title="Easy To Use"
            description="Create Cards to describe your project, then view the results"
            icon={Zap}
          />
          <FeatureCard
            title="Advanced Security"
            description="Ultra Secure, your data is not stored ANYWHERE!"
            icon={Shield}
          />
          <FeatureCard
            title="Present your plan"
            description="Your presentation materials are always up to date with any changes"
            icon={Rocket}
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4">
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
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8">Join several encouraging friends of the developer and transform your design workflow today.</p>
          <Button onClick={goToDashboard} size="lg" variant="secondary" className="animate-bounce">
            Launch Dashboard <ArrowRight className="ml-2" />
          </Button>
        </motion.div>
      </section>
    </div>
  )
}

export default HomePage

