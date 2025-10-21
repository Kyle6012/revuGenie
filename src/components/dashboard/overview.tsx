'use client'

import { motion } from 'framer-motion'
import { 
  MessageSquare, 
  Star, 
  Clock, 
  TrendingUp,
  Users,
  Activity
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const overviewStats = [
  {
    title: 'Total Reviews',
    value: '1,247',
    change: '+12.5%',
    trend: 'up',
    icon: MessageSquare,
    color: 'blue',
  },
  {
    title: 'Average Rating',
    value: '4.8',
    change: '+0.2',
    trend: 'up',
    icon: Star,
    color: 'yellow',
  },
  {
    title: 'Response Rate',
    value: '94%',
    change: '+5.3%',
    trend: 'up',
    icon: Activity,
    color: 'green',
  },
  {
    title: 'Avg Response Time',
    value: '2.4h',
    change: '-15min',
    trend: 'up',
    icon: Clock,
    color: 'purple',
  },
]

export function DashboardOverview() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {overviewStats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <Card className="hover-lift transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg bg-${stat.color}-500/10`}>
                <stat.icon className={`h-4 w-4 text-${stat.color}-500`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3" />
                <span>{stat.change} from last month</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}