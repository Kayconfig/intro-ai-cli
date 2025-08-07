import { HumanMessage } from '@langchain/core/messages';

export function createHumanMessage(content: string): HumanMessage {
  return new HumanMessage({ content });
}
