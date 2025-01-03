'use client'

import React from 'react'
import Hero from '@/app/components/Hero'
import Features from '@/app/components/Features'
import HowItWorks from '@/app/components/HowItWorks'
import CTA from '@/app/components/CTA'
import Testimonials from '@/app/components/Testimonials'

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <section className="py-20 px-4 text-center relative overflow-hidden">
        <Hero />
      </section>
      <section className="py-20 px-4 bg-secondary">
        <Features />
      </section>
      <section className="py-20 px-4">
        <HowItWorks />
      </section>
      <section className="py-20 px-4 bg-muted">
        <Testimonials />
      </section>
      <section className="py-20 px-4 text-center relative overflow-hidden">
        <CTA />
      </section>
    </div>
  )
}

export default HomePage