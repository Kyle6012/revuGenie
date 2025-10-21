'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Star, Shield, Zap } from 'lucide-react'
import Link from 'next/link'

export function CtaSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-revugenie-blue to-revugenie-teal">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              Ready to Transform Your{' '}
              <span className="text-revugenie-light">Review Management?</span>
            </h2>
            
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Join thousands of businesses using AI to manage their reputation, 
              save time, and improve customer relationships.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-revugenie-blue hover:bg-gray-100 text-lg px-8 py-4"
                asChild
              >
                <Link href="/signup">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-revugenie-blue text-lg px-8 py-4"
                asChild
              >
                <Link href="/demo">Watch Demo</Link>
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <span className="text-sm">No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                <span className="text-sm">Setup in 5 minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                <span className="text-sm">30-day money back guarantee</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}