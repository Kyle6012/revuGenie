'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Restaurant Owner',
    company: 'The Garden Bistro',
    content: 'RevuGenie has transformed how we handle customer feedback. The AI responses are incredibly contextual and save us hours every week. Our response rate improved by 85%!',
    rating: 5,
    avatar: 'SJ'
  },
  {
    name: 'Mike Chen',
    role: 'Marketing Director',
    company: 'TechFlow Solutions',
    content: 'The sentiment analysis and insights have helped us identify key areas for improvement. We\'ve seen a 40% increase in positive reviews since using RevuGenie.',
    rating: 5,
    avatar: 'MC'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Agency Owner',
    company: 'LocalBoost Marketing',
    content: 'Managing reviews for multiple clients was overwhelming until we found RevuGenie. The multi-location support and white-label options are perfect for agencies.',
    rating: 5,
    avatar: 'ER'
  },
  {
    name: 'David Kim',
    role: 'Hotel Manager',
    company: 'Sunrise Hospitality',
    content: 'The AI learns our brand voice perfectly. Guests often think our responses are personally written by management. The time savings alone justify the cost.',
    rating: 5,
    avatar: 'DK'
  }
]

export function TestimonialsSection() {
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
            Trusted by Businesses{' '}
            <span className="gradient-text">Everywhere</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            See how RevuGenie is helping businesses manage their reputation and improve customer relationships
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-border hover-lift transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${testimonial.name}`} />
                  <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  
                  <blockquote className="text-muted-foreground mb-4 italic">
                    <Quote className="w-4 h-4 inline-block mr-1 -mt-1" />
                    {testimonial.content}
                  </blockquote>
                  
                  <div className="border-t pt-4">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-semibold">4.9</span>
              </div>
              <span>Average Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold">1k+</span>
              </div>
              <span>Happy Customers</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-semibold">99%</span>
              </div>
              <span>Satisfaction Rate</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}