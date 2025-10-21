'use client'

import { motion } from 'framer-motion'
import { 
  MessageCircle, 
  Brain, 
  TrendingUp, 
  Bell, 
  Users, 
  Shield,
  Zap,
  Globe
} from 'lucide-react'

const features = [
  {
    icon: MessageCircle,
    title: 'AI-Powered Responses',
    description: 'Generate contextual, professional responses to customer reviews using advanced AI that understands tone and sentiment.',
    color: 'blue',
  },
  {
    icon: Brain,
    title: 'Sentiment Analysis',
    description: 'Automatically analyze customer sentiment, extract key insights, and identify trends to improve your business.',
    color: 'purple',
  },
  {
    icon: TrendingUp,
    title: 'Analytics Dashboard',
    description: 'Track review performance, response times, and customer satisfaction with comprehensive analytics and reporting.',
    color: 'green',
  },
  {
    icon: Bell,
    title: 'Smart Notifications',
    description: 'Get instant alerts for new reviews via email and WhatsApp, with customizable notification preferences.',
    color: 'orange',
  },
  {
    icon: Users,
    title: 'Multi-Location Support',
    description: 'Manage reviews across multiple business locations and platforms from a single, unified dashboard.',
    color: 'indigo',
  },
  {
    icon: Shield,
    title: 'Secure & Compliant',
    description: 'Enterprise-grade security with encrypted data, GDPR compliance, and regular security audits.',
    color: 'red',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Real-time review synchronization and instant AI response generation for immediate customer engagement.',
    color: 'yellow',
  },
  {
    icon: Globe,
    title: 'Multi-Platform Integration',
    description: 'Connect with Google Business, Facebook, Instagram, Yelp, and other major review platforms seamlessly.',
    color: 'teal',
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl lg:text-4xl font-bold mb-4"
          >
            Everything You Need for{' '}
            <span className="gradient-text">Review Management</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Powerful features designed to help businesses manage their online reputation 
            efficiently with the power of artificial intelligence.
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-card border border-border rounded-xl p-6 h-full hover-lift hover-glow transition-all duration-300">
                <div className={`w-12 h-12 rounded-lg bg-${feature.color}-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-6 h-6 text-${feature.color}-500`} />
                </div>
                
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}