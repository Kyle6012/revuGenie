'use client'

import { motion } from 'framer-motion'
import { 
  Settings, 
  MessageSquare, 
  Brain, 
  Send, 
  BarChart3, 
  Bell 
} from 'lucide-react'

const steps = [
  {
    icon: Settings,
    title: 'Connect Your Platforms',
    description: 'Link your Google Business, Facebook, Instagram, and other review platforms with a few clicks.',
    step: 1,
  },
  {
    icon: MessageSquare,
    title: 'Reviews Are Imported',
    description: 'All your existing and new reviews are automatically imported and organized in one dashboard.',
    step: 2,
  },
  {
    icon: Brain,
    title: 'AI Analyzes & Responds',
    description: 'Our AI analyzes sentiment, generates contextual responses, and learns your business tone.',
    step: 3,
  },
  {
    icon: Send,
    title: 'Approve & Send Responses',
    description: 'Review AI-generated responses, make edits if needed, and send them with one click.',
    step: 4,
  },
  {
    icon: BarChart3,
    title: 'Track Performance',
    description: 'Monitor review metrics, sentiment trends, and response times with detailed analytics.',
    step: 5,
  },
  {
    icon: Bell,
    title: 'Get Smart Alerts',
    description: 'Receive notifications for new reviews, low ratings, and important customer feedback.',
    step: 6,
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl lg:text-4xl font-bold mb-4"
          >
            How <span className="gradient-text">RevuGenie</span> Works
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Get started in minutes and let AI transform how you manage customer reviews
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              <div className="bg-white dark:bg-gray-900 border border-border rounded-xl p-6 hover-lift transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-revugenie-blue to-revugenie-teal flex items-center justify-center text-white">
                    <step.icon className="w-6 h-6" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-semibold">
                    {step.step}
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
              
              {/* Connection line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 right-0 w-8 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent transform translate-x-full"></div>
              )}
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-lg text-muted-foreground mb-6">
            Ready to transform your review management?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-gradient-to-r from-revugenie-blue to-revugenie-teal text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300">
              Start Your Free Trial
            </button>
            <button className="px-8 py-3 border border-border rounded-lg font-medium hover:bg-muted transition-all duration-300">
              Schedule a Demo
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}