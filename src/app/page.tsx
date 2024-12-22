'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Zap, Infinity, Layers } from 'lucide-react'

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
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Icon className="mr-2 w-6 h-6 text-primary" />
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
    'Create Cards for Each Project Element',
    'Organize Cards With Familiar, Jira-Like Categories and Lanes',
    'Automatically Generate Slide Shows, Documentation, and Diagrams',
    'Edit, Create, or Remove Cards and See Changes Across All Materials',
  ]

  return (
    <div className="min-h-screen bg-background">
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
            Simplify your technical design process and automate the boring stuff.
          </motion.p>
          <Button onClick={goToDashboard} size="lg" className="animate-pulse">
            Launch Dashboard <ArrowRight className="ml-2" />
          </Button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-secondary">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Will Brief?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <FeatureCard
            title="Organize with Cards"
            description="Break your project down into small, manageable cards containing only the most essential information."
            icon={Layers}
          />
          {/* <FeatureCard
            title="Categorize Efficiently"
            description="Group your cards into categories, sub-categories, and swimlanes for clear project structure."
            icon={Rocket}
          /> */}
          <FeatureCard
            title="Automated Generation"
            description="Automatically create slide shows, design documentation, and diagrams from your organized cards."
            icon={Zap}
          />
          {/* Single source of truth */}
          <FeatureCard
            title="Single Source of Truth"
            description="Cards are the single source of truth for your project, ensuring consistency across all presentation materials."
            icon={Infinity}
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
          <h2 className="text-3xl font-bold mb-4">Ready to Simplify Your Design Process?</h2>
          <p className="text-xl mb-8">Join a community of designers who are transforming their workflow with intuitive card-based organization and automated material generation.</p>
          <Button onClick={goToDashboard} size="lg" variant="secondary" className="animate-bounce">
            Launch Dashboard <ArrowRight className="ml-2" />
          </Button>
        </motion.div>
      </section>

      {/* Optional: Testimonials Section */}
      
      <section className="py-20 px-4 bg-muted">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="bg-card p-6 rounded-radius shadow mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-lg italic">&quot;Will Brief&apos;s single source of truth &quot;Card&quot; system saves me so much time as I go back an revise my presentations&quot;</p>
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
      </section>
     
    </div>
  )
}

export default HomePage
