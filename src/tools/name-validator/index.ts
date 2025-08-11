import { createHumanMessage } from '../../utils/human-message';
import { createSystemMessage } from '../../utils/system-message';
import { AIMessageChunk, BaseMessage } from '@langchain/core/messages';
import { SYSTEM_PROMPT_FOR_NAME_VALIDATION } from './constants';
import { tool } from '@langchain/core/tools';
import { getOllamaModel } from '../../models/ollama-model';
import { stripThinkTag } from '../../utils/thinking-agent-response';
import { getSecret } from '../../env/get-secret';
import { envKeys } from '../../env/constants';

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
  const content = stripThinkTag(aiMsg.content.toLocaleString().toLowerCase());
  if (content == 'yes') {
    return true;
  }
  return false;
}

async function validateProvidedNameWithOllama(name: string) {
  const nameValidatorModel = getSecret(envKeys.NAME_VALIDATOR_MODEL_NAME);
  const llm = getOllamaModel(nameValidatorModel);
  return JSON.stringify(await validateProvidedName(name, llm));
}

export function createNameValidatorTool() {
  return tool(validateProvidedNameWithOllama, {
    name: 'validate_provided_name',
    description:
      'useful for checking if a name is a valid name or not, returns a boolean  `true` or `false`',
  });
}
