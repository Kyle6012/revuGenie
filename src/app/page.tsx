'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { HeroSection } from '@/components/landing/hero-section'
import { FeaturesSection } from '@/components/landing/features-section'
import { HowItWorksSection } from '@/components/landing/how-it-works-section'
import { PricingSection } from '@/components/landing/pricing-section'
import { TestimonialsSection } from '@/components/landing/testimonials-section'
import { CtaSection } from '@/components/landing/cta-section'
import { Footer } from '@/components/landing/footer'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

function LandingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-revugenie-blue to-revugenie-teal rounded-lg"></div>
            <span className="text-xl font-bold">RevuGenie</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">
              How It Works
            </Link>
            <Link href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
              Pricing
            </Link>
            <Link href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors">
              Testimonials
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <Link
              href="#features"
              className="block text-gray-600 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="block text-gray-600 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="#pricing"
              className="block text-gray-600 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="#testimonials"
              className="block text-gray-600 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              Testimonials
            </Link>
            <div className="flex flex-col gap-2 pt-4 border-t">
              <Button variant="ghost" className="w-full" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button className="w-full" asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <LandingHeader />
      <main className="pt-16">
        <HeroSection />
        <section id="features">
          <FeaturesSection />
        </section>
        <section id="how-it-works">
          <HowItWorksSection />
        </section>
        <section id="pricing">
          <PricingSection />
        </section>
        <section id="testimonials">
          <TestimonialsSection />
        </section>
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}