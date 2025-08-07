import { AIMessage } from '@langchain/core/messages';

export function createAIMessage(content: string): AIMessage {
  return new AIMessage({ content });
}
