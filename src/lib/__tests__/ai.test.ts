import { AIService } from '../ai';

jest.mock('openai', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    chat: {
      completions: {
        create: jest.fn(() => Promise.resolve({ choices: [{ message: { content: 'OpenAI response' } }] })),
      },
    },
  })),
}));

jest.mock('@anthropic-ai/sdk', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    completions: {
      create: jest.fn(() => Promise.resolve({ completion: 'Claude response' })),
    },
  })),
}));

jest.mock('together-ai', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    chat: {
      completions: {
        create: jest.fn(() => Promise.resolve({ choices: [{ message: { content: 'Together AI response' } }] })),
      },
    },
  })),
}));

describe('AIService', () => {
  it('should generate a response with OpenAI', async () => {
    process.env.AI_PROVIDER = 'openai';
    const aiService = new AIService();
    const response = await aiService.generateResponse({
      reviewText: 'This is a test review.',
      reviewRating: 5,
      businessName: 'Test Business',
      businessType: 'Test',
      tone: 'friendly',
      platform: 'test',
    });
    expect(response).toBe('OpenAI response');
  });

  it('should generate a response with Claude', async () => {
    process.env.AI_PROVIDER = 'claude';
    const aiService = new AIService();
    const response = await aiService.generateResponse({
      reviewText: 'This is a test review.',
      reviewRating: 5,
      businessName: 'Test Business',
      businessType: 'Test',
      tone: 'friendly',
      platform: 'test',
    });
    expect(response).toBe('Claude response');
  });

  it('should generate a response with Together AI', async () => {
    process.env.AI_PROVIDER = 'together';
    const aiService = new AIService();
    const response = await aiService.generateResponse({
      reviewText: 'This is a test review.',
      reviewRating: 5,
      businessName: 'Test Business',
      businessType: 'Test',
      tone: 'friendly',
      platform: 'test',
    });
    expect(response).toBe('Together AI response');
  });
});
