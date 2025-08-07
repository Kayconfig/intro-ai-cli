import { SystemMessage } from '@langchain/core/messages';

export function createSystemMessage(content: string): SystemMessage {
  return new SystemMessage({ content });
}
