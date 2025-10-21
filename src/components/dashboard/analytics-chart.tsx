'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

const reviewData = [
  { name: 'Jan', reviews: 45, rating: 4.2, responses: 38 },
  { name: 'Feb', reviews: 52, rating: 4.3, responses: 48 },
  { name: 'Mar', reviews: 61, rating: 4.1, responses: 55 },
  { name: 'Apr', reviews: 58, rating: 4.4, responses: 52 },
  { name: 'May', reviews: 67, rating: 4.5, responses: 62 },
  { name: 'Jun', reviews: 73, rating: 4.6, responses: 69 },
  { name: 'Jul', reviews: 89, rating: 4.7, responses: 85 },
]

const sentimentData = [
  { name: 'Positive', value: 75, color: '#10B981' },
  { name: 'Neutral', value: 15, color: '#F59E0B' },
  { name: 'Negative', value: 10, color: '#EF4444' },
]

export function AnalyticsChart() {
  const [activeTab, setActiveTab] = useState('reviews')

  return (
    <Card>
      <CardHeader>
        <CardTitle>Analytics Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="ratings">Ratings</TabsTrigger>
            <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
          </TabsList>
          
          <TabsContent value="reviews" className="mt-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={reviewData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="reviews" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    dot={{ fill: '#3B82F6' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="responses" 
                    stroke="#10B981" 
                    strokeWidth={2}
                    dot={{ fill: '#10B981' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="ratings" className="mt-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={reviewData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 5]} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="rating" 
                    stroke="#8B5CF6" 
                    strokeWidth={2}
                    dot={{ fill: '#8B5CF6' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="sentiment" className="mt-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sentimentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill={(entry: any) => entry.color} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}