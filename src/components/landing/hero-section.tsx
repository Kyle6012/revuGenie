'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Star, Zap, Shield } from 'lucide-react'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-revugenie-blue/5 via-white to-revugenie-teal/5 dark:from-revugenie-blue/10 dark:via-gray-900 dark:to-revugenie-teal/10">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative container mx-auto px-4 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Zap className="w-4 h-4" />
              <span>AI-Powered Review Management</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              Let AI Handle Your{' '}
              <span className="gradient-text">Reputation</span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              Automate customer review management, generate contextual AI responses, 
              and gain deep insights into customer sentiment. Perfect for local businesses 
              and agencies managing multiple locations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group" asChild>
                <Link href="/signup">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              
              <Button size="lg" variant="outline" asChild>
                <Link href="/demo">Watch Demo</Link>
              </Button>
            </div>
            
            <div className="flex items-center gap-8 pt-4">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-revugenie-blue to-revugenie-teal border-2 border-white" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">Trusted by 1000+ businesses</span>
              </div>
              
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-sm text-muted-foreground ml-2">4.9/5 rating</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10">
              <div className="bg-card border border-border rounded-2xl p-6 shadow-2xl">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Recent Reviews</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      Live
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-revugenie-blue to-revugenie-teal flex items-center justify-center text-white text-sm font-semibold">
                          {String.fromCharCode(65 + i - 1)}
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">Customer {i}</span>
                            <div className="flex gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Great service! The team was very professional and helpful.
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-green-600 font-medium">AI Response Generated</span>
                            <Shield className="w-3 h-3 text-green-600" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Background decoration */}
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-revugenie-blue/20 to-revugenie-teal/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-4 -left-4 w-48 h-48 bg-gradient-to-br from-revugenie-teal/20 to-revugenie-blue/20 rounded-full blur-3xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}