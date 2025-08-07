import { createHumanMessage } from '../../utils/human-message';
import { createSystemMessage } from '../../utils/system-message';
import { AIMessageChunk, BaseMessage } from '@langchain/core/messages';
import { SYSTEM_PROMPT_FOR_NAME_VALIDATION } from './constants';
import { tool } from '@langchain/core/tools';
import { getOllamaModel } from '../../models/ollama-model';
import { RunnableLambda } from '@langchain/core/runnables';

export interface ValidateProvidedNameLLM {
  invoke: (messages: Array<BaseMessage>) => Promise<AIMessageChunk>;
}

/**
 *
 * @param name of the person
 * @param llm large language model to use to validate if name is valid or not
 * @returns true if the name is evaluated to likely be a valid name otherwise false
 */
export async function validateProvidedName(
  name: string,
  llm: ValidateProvidedNameLLM
): Promise<boolean> {
  const sysMsg = createSystemMessage(SYSTEM_PROMPT_FOR_NAME_VALIDATION);
  const aiMsg = await llm.invoke([sysMsg, createHumanMessage(name)]);

  if (aiMsg.content.toLocaleString().toLowerCase() == 'yes') {
    return true;
  }
  return false;
}

async function validateProvidedNameWithOllama({ name }: { name: string }) {
  const llm = getOllamaModel();
  return validateProvidedName(name, llm);
}

export function createNameValidatorTool() {
  const validateProvidedNameRunable = RunnableLambda.from(
    validateProvidedNameWithOllama
  );
  return tool(validateProvidedNameRunable.invoke, {
    name: 'validate provided name',
    description:
      'useful for checking if a name is a valid name or not, returns a boolean  `true` or `false`',
  });
}
