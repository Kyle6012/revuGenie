'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Star } from 'lucide-react'

const ratingDistribution = [
  { rating: 5, count: 156, percentage: 65 },
  { rating: 4, count: 45, percentage: 19 },
  { rating: 3, count: 23, percentage: 10 },
  { rating: 2, count: 12, percentage: 5 },
  { rating: 1, count: 3, percentage: 1 },
]

const platformDistribution = [
  { platform: 'Google', count: 189, color: 'blue' },
  { platform: 'Facebook', count: 34, color: 'indigo' },
  { platform: 'Yelp', count: 16, color: 'red' },
]

export function ReviewDistribution() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Rating Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {ratingDistribution.map((item, index) => (
              <motion.div
                key={item.rating}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="space-y-1"
              >
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span>{item.rating}</span>
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-muted-foreground">({item.count})</span>
                  </div>
                  <span className="text-muted-foreground">{item.percentage}%</span>
                </div>
                <Progress value={item.percentage} className="h-2" />
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Platform Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {platformDistribution.map((item, index) => (
              <motion.div
                key={item.platform}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full bg-${item.color}-500`}></div>
                  <span className="text-sm">{item.platform}</span>
                </div>
                <span className="text-sm font-medium">{item.count}</span>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}