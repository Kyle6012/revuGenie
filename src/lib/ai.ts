import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface AIResponseOptions {
  reviewText: string
  reviewRating: number
  businessName: string
  businessType: string
  tone: 'friendly' | 'formal' | 'empathetic' | 'witty'
  platform: string
  customerName?: string
}

export interface SentimentAnalysis {
  sentiment: 'positive' | 'neutral' | 'negative'
  confidence: number
  keywords: string[]
  category?: string
}

export class AIService {
  /**
   * Generate contextual AI response for customer reviews
   */
  async generateResponse(options: AIResponseOptions): Promise<string> {
    const {
      reviewText,
      reviewRating,
      businessName,
      businessType,
      tone,
      platform,
      customerName,
    } = options

    const toneInstructions = {
      friendly: 'Use a warm, conversational tone that feels personal and approachable.',
      formal: 'Maintain a professional, courteous tone appropriate for business communications.',
      empathetic: 'Show understanding and empathy for the customer\'s experience.',
      witty: 'Use light humor and clever responses when appropriate, keeping it professional.',
    }

    const prompt = `
You are an AI assistant helping ${businessName}, a ${businessType}, respond to customer reviews on ${platform}.

Review Details:
- Customer: ${customerName || 'Customer'}
- Rating: ${reviewRating}/5 stars
- Review: "${reviewText}"

Instructions:
1. Generate a personalized, professional response
2. Use a ${tone} tone: ${toneInstructions[tone]}
3. Address specific points from the review
4. Keep it concise (50-100 words)
5. Include a call-to-action when appropriate
6. Thank the customer for their feedback
7. Sign as the business owner/manager

Response:`

    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'You are an expert customer service AI that generates professional, contextual responses to business reviews.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: 150,
        temperature: 0.7,
      })

      return completion.choices[0]?.message?.content?.trim() || ''
    } catch (error) {
      console.error('Error generating AI response:', error)
      throw new Error('Failed to generate AI response')
    }
  }

  /**
   * Analyze sentiment of customer reviews
   */
  async analyzeSentiment(reviewText: string): Promise<SentimentAnalysis> {
    const prompt = `
Analyze the sentiment of this customer review and extract key insights:

Review: "${reviewText}"

Please provide:
1. Overall sentiment (positive, neutral, or negative)
2. Confidence score (0-1)
3. Key keywords and phrases
4. Business category (service, product, experience, etc.)

Respond in JSON format:
{
  "sentiment": "positive|neutral|negative",
  "confidence": 0.95,
  "keywords": ["keyword1", "keyword2"],
  "category": "service"
}`

    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'You are a sentiment analysis expert. Analyze customer reviews and provide structured insights.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: 200,
        temperature: 0.3,
      })

      const response = completion.choices[0]?.message?.content
      if (response) {
        try {
          const analysis = JSON.parse(response)
          return {
            sentiment: analysis.sentiment,
            confidence: analysis.confidence,
            keywords: analysis.keywords,
            category: analysis.category,
          }
        } catch (parseError) {
          console.error('Error parsing sentiment analysis:', parseError)
        }
      }

      // Fallback response
      return {
        sentiment: 'neutral',
        confidence: 0.5,
        keywords: [],
        category: 'general',
      }
    } catch (error) {
      console.error('Error analyzing sentiment:', error)
      throw new Error('Failed to analyze sentiment')
    }
  }

  /**
   * Generate weekly insights summary
   */
  async generateWeeklyInsights(
    reviews: any[],
    businessName: string
  ): Promise<string> {
    const reviewSummary = reviews
      .map((review) => `- ${review.rating}/5 stars: "${review.content.substring(0, 100)}..."`)
      .join('\n')

    const prompt = `
Generate a weekly insights summary for ${businessName} based on recent customer reviews:

Recent Reviews:
${reviewSummary}

Please provide:
1. Key themes and trends
2. Areas of excellence
3. Areas for improvement
4. Actionable recommendations
5. Overall sentiment summary

Keep it concise and actionable for business owners.`

    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'You are a business analytics expert providing actionable insights from customer feedback.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: 300,
        temperature: 0.5,
      })

      return completion.choices[0]?.message?.content?.trim() || ''
    } catch (error) {
      console.error('Error generating weekly insights:', error)
      throw new Error('Failed to generate insights')
    }
  }

  /**
   * Train AI model with approved responses
   */
  async trainWithApprovedResponse(
    reviewText: string,
    approvedResponse: string,
    businessId: string
  ): Promise<void> {
    // Store training data for future model fine-tuning
    // This would typically be stored in a database for batch training
    console.log('Training data stored for business:', businessId)
  }
}

// Export singleton instance
export const aiService = new AIService()