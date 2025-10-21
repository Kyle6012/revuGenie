'use client'

import { motion } from 'framer-motion'
import { Star, MessageSquare, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const recentReviews = [
  {
    id: 1,
    author: 'Sarah Johnson',
    avatar: 'SJ',
    rating: 5,
    platform: 'Google',
    content: 'Excellent service! The team was very professional and helpful. Highly recommend this business.',
    date: '2 hours ago',
    status: 'responded',
    sentiment: 'positive',
    aiResponse: 'Thank you so much for your kind words, Sarah! We\'re thrilled to hear about your positive experience.',
  },
  {
    id: 2,
    author: 'Mike Chen',
    avatar: 'MC',
    rating: 4,
    platform: 'Facebook',
    content: 'Good experience overall. The staff was friendly and the service was prompt. Would visit again.',
    date: '5 hours ago',
    status: 'pending',
    sentiment: 'positive',
    aiResponse: 'Thanks for the feedback, Mike! We appreciate your business and look forward to serving you again.',
  },
  {
    id: 3,
    author: 'Emily Rodriguez',
    avatar: 'ER',
    rating: 3,
    platform: 'Yelp',
    content: 'Average experience. The service was okay but could be improved. Staff seemed a bit rushed.',
    date: '1 day ago',
    status: 'pending',
    sentiment: 'neutral',
    aiResponse: 'Thank you for your honest feedback, Emily. We\'re always looking to improve our service.',
  },
]

export function RecentReviews() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Recent Reviews</span>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {recentReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="border-b border-border pb-6 last:border-0 last:pb-0"
            >
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${review.author}`} />
                  <AvatarFallback>{review.avatar}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h4 className="font-semibold">{review.author}</h4>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {review.platform}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={review.status === 'responded' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {review.status === 'responded' ? 'Responded' : 'Pending'}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {review.date}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {review.content}
                  </p>
                  
                  {review.aiResponse && (
                    <div className="bg-muted/50 rounded-lg p-3 space-y-2">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MessageSquare className="h-3 w-3" />
                        <span>AI Generated Response</span>
                      </div>
                      <p className="text-sm">{review.aiResponse}</p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" className="text-xs">
                          Approve & Send
                        </Button>
                        <Button size="sm" variant="ghost" className="text-xs">
                          Edit Response
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}