import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'

export async function POST(req) {
  const { messages } = await req.json()

  const result = await streamText({
    model: openai('gpt-4o'),
    messages,
  })

  // Instead of StreamingTextResponse, just return a standard stream
  return new Response(result.body, {
    headers: {
      'Content-Type': 'text/event-stream',
    },
  })
}