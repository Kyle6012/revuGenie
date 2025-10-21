'use client'

import { DashboardOverview } from '@/components/dashboard/overview'
import { RecentReviews } from '@/components/dashboard/recent-reviews'
import { QuickActions } from '@/components/dashboard/quick-actions'
import { AnalyticsChart } from '@/components/dashboard/analytics-chart'
import { ReviewDistribution } from '@/components/dashboard/review-distribution'

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your reviews today.
          </p>
        </div>
      </div>

      <DashboardOverview />
      
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <AnalyticsChart />
          <RecentReviews />
        </div>
        
        <div className="space-y-6">
          <QuickActions />
          <ReviewDistribution />
        </div>
      </div>
    </div>
  )
}