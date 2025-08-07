import { ChatOllama } from '@langchain/ollama';
import { envKeys } from '../env/constants';
import { getSecretOrThrow } from '../env/get-secret';

export function getOllamaModel() {
  const ollamaModelName = getSecretOrThrow(envKeys.OLLAMA_MODEL_NAME);

  return new ChatOllama({ model: ollamaModelName, temperature: 0 });
}
