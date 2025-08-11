import { getOllamaModel } from '../models/ollama-model';
import { PromptTemplate } from '@langchain/core/prompts';
import { createReactAgent } from '@langchain/langgraph/prebuilt';
import { createTavilySearchTool } from '../tools/social-media-search';
import { createNameValidatorTool } from '../tools/name-validator';
import { createLinkedinScraperTool } from '../tools/linkedin-scraper';
import { createHumanMessage } from '../utils/human-message';
import { createSystemMessage } from '../utils/system-message';
import {
  SYSTEM_MSG_PROMPT_TEMPLATE,
  USER_MSG_PROMPT_TEMPLATE,
} from './constants';

/**
 *
 * @param name of the person whose linkedIn url is needed
 * @returns an object consisting of two properties, `found` a boolean signifying if linkedIn url was found, and `url` representing the linkedIn url
 */
export async function lookupLinkedInUrl(name: string) {
  const llm = getOllamaModel();
  const promptTemplate = PromptTemplate.fromTemplate(USER_MSG_PROMPT_TEMPLATE);
  const toolsForAgent = [
    createTavilySearchTool(),
    createNameValidatorTool(),
    createLinkedinScraperTool(),
  ];

  const formattedPrompt = await promptTemplate.format({ name });
  const sysMsg = createSystemMessage(SYSTEM_MSG_PROMPT_TEMPLATE);
  const agent = await createReactAgent({
    llm,
    tools: toolsForAgent,
    prompt: sysMsg,
  });

  const result = await agent.invoke(
    {
      messages: [createHumanMessage(formattedPrompt)],
    },
    {
      recursionLimit: 10,
      durability: 'sync',
    }
  );

  return result.messages[result.messages.length - 1]?.content;
}
