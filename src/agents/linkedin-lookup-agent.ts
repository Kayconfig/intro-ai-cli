import { getOllamaModel } from '../models/ollama-model';
import { PromptTemplate } from '@langchain/core/prompts';
import { pull } from 'langchain/hub';
import { createReactAgent, AgentExecutor } from 'langchain/agents';
import { createTavilySearchTool } from '../tools/social-media-search';
import { createNameValidatorTool } from '../tools/name-validator';
import { getSecretOrThrow } from '../env/get-secret';
import { envKeys } from '../env/constants';

interface LookupLinkedInUrlResult {
  found: boolean;
  url: string | null;
}

const template = `
given the full name {name} I want you to find their linkedin profile.

`;

/**
 *
 * @param name of the person whose linkedIn url is needed
 * @returns an object consisting of two properties, `found` a boolean signifying if linkedIn url was found, and `url` representing the linkedIn url
 */
export async function lookupLinkedInUrl(name: string): Promise<string> {
  const llm = getOllamaModel();
  const promptTemplate = PromptTemplate.fromTemplate(template);
  const toolsForAgent = [createTavilySearchTool(), createNameValidatorTool()];
  const reactPrompt = await pull<PromptTemplate>('hwchase17/react');

  const agent = await createReactAgent({
    llm,
    tools: toolsForAgent,
    prompt: reactPrompt,
  });
  const agent_executor = AgentExecutor.fromAgentAndTools({
    agent,
    tools: toolsForAgent,
    verbose: getSecretOrThrow(envKeys.ENVIRONMENT) === 'development',
    maxIterations: 10,
  });

  const formattedPrompt = await promptTemplate.format({ name });

  const result = await agent_executor.invoke({ input: formattedPrompt });

  return result.output;
}
