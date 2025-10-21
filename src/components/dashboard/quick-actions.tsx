'use client'

import { motion } from 'framer-motion'
import { 
  MessageSquare, 
  Settings, 
  Plus, 
  Download,
  Share,
  RefreshCw
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const quickActions = [
  {
    title: 'Generate AI Response',
    description: 'Create contextual responses for pending reviews',
    icon: MessageSquare,
    action: () => console.log('Generate AI Response'),
    color: 'blue',
  },
  {
    title: 'Connect New Platform',
    description: 'Link Google Business, Facebook, or Instagram',
    icon: Plus,
    action: () => console.log('Connect New Platform'),
    color: 'green',
  },
  {
    title: 'Export Reports',
    description: 'Download analytics and performance reports',
    icon: Download,
    action: () => console.log('Export Reports'),
    color: 'purple',
  },
  {
    title: 'Share Dashboard',
    description: 'Grant access to team members',
    icon: Share,
    action: () => console.log('Share Dashboard'),
    color: 'orange',
  },
]

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Button
                variant="ghost"
                className="w-full justify-start h-auto p-4 hover:bg-accent/50"
                onClick={action.action}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-${action.color}-500/10`}>
                    <action.icon className={`h-5 w-5 text-${action.color}-500`} />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-sm">{action.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {action.description}
                    </div>
                  </div>
                </div>
              </Button>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}