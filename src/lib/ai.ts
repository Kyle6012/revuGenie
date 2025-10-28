import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import Together from 'together-ai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const together = new Together({
  apiKey: process.env.TOGETHER_API_KEY,
});

export interface AIResponseOptions {
  reviewText: string;
  reviewRating: number;
  businessName: string;
  businessType: string;
  tone: 'friendly' | 'formal' | 'empathetic' | 'witty';
  platform: string;
  customerName?: string;
}

export interface SentimentAnalysis {
  sentiment: 'positive' | 'neutral' | 'negative';
  confidence: number;
  keywords: string[];
  category?: string;
}

type AIProvider = 'openai' | 'claude' | 'together';

export class AIService {
  private provider: AIProvider;

  constructor(provider: AIProvider = 'openai') {
    this.provider = (process.env.AI_PROVIDER as AIProvider) || provider;
  }

  async generateResponse(options: AIResponseOptions): Promise<string> {
    switch (this.provider) {
      case 'openai':
        return this.generateOpenAIResponse(options);
      case 'claude':
        return this.generateClaudeResponse(options);
      case 'together':
        return this.generateTogetherResponse(options);
      default:
        throw new Error(`Invalid AI provider: ${this.provider}`);
    }
  }

  private async generateOpenAIResponse(options: AIResponseOptions): Promise<string> {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'You are an expert customer service AI that generates professional, contextual responses to business reviews.',
        },
        {
          role: 'user',
          content: this.createPrompt(options),
        },
      ],
      max_tokens: 150,
      temperature: 0.7,
    });
    return completion.choices[0]?.message?.content?.trim() || '';
  }

  private async generateClaudeResponse(options: AIResponseOptions): Promise<string> {
    const completion = await anthropic.completions.create({
      model: 'claude-2',
      prompt: `\n\nHuman: ${this.createPrompt(options)}\n\nAssistant:`,
      max_tokens_to_sample: 150,
      temperature: 0.7,
    });
    return completion.completion.trim();
  }

  private async generateTogetherResponse(options: AIResponseOptions): Promise<string> {
    const response = await together.chat.completions.create({
      model: 'togethercomputer/llama-2-7b-chat',
      messages: [{ role: 'user', content: this.createPrompt(options) }],
    });
    return response.choices[0].message.content.trim();
  }

  private createPrompt(options: AIResponseOptions): string {
    const {
      reviewText,
      reviewRating,
      businessName,
      businessType,
      tone,
      platform,
      customerName,
    } = options;

    const toneInstructions = {
      friendly: 'Use a warm, conversational tone that feels personal and approachable.',
      formal: 'Maintain a professional, courteous tone appropriate for business communications.',
      empathetic: 'Show understanding and empathy for the customer\'s experience.',
      witty: 'Use light humor and clever responses when appropriate, keeping it professional.',
    };

    return `
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

      Response:`;
  }

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
}`;

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
      });

      const response = completion.choices[0]?.message?.content;
      if (response) {
        try {
          const analysis = JSON.parse(response);
          return {
            sentiment: analysis.sentiment,
            confidence: analysis.confidence,
            keywords: analysis.keywords,
            category: analysis.category,
          };
        } catch (parseError) {
          console.error('Error parsing sentiment analysis:', parseError);
        }
      }

      // Fallback response
      return {
        sentiment: 'neutral',
        confidence: 0.5,
        keywords: [],
        category: 'general',
      };
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
      throw new Error('Failed to analyze sentiment');
    }
  }

  async generateWeeklyInsights(
    reviews: any[],
    businessName: string
  ): Promise<string> {
    const reviewSummary = reviews
      .map((review) => `- ${review.rating}/5 stars: "${review.content.substring(0, 100)}..."`)
      .join('\n');

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

Keep it concise and actionable for business owners.`;

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
      });

      return completion.choices[0]?.message?.content?.trim() || '';
    } catch (error) {
      console.error('Error generating weekly insights:', error);
      throw new Error('Failed to generate insights');
    }
  }
}

export const aiService = new AIService();
