'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Infinity, Layers } from 'lucide-react'

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

const Features: React.FC = () => (
  <div>
    <h2 className="text-3xl font-bold text-center mb-12">Why Choose Will Brief?</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      <FeatureCard
        title="Organize with Cards"
        description="Break your project down into small, manageable cards containing only the most essential information."
        icon={Layers}
      />
      <FeatureCard
        title="Automated Generation"
        description="Automatically create slide shows, design documentation, and diagrams from your organized cards."
        icon={Zap}
      />
      <FeatureCard
        title="Single Source of Truth"
        description="Cards are the single source of truth for your project, ensuring consistency across all presentation materials."
        icon={Infinity}
      />
    </div>
  </div>
)

export default Features