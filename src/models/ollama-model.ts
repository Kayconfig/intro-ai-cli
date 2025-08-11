import { ChatOllama } from '@langchain/ollama';
import { envKeys } from '../env/constants';
import { getSecret, getSecretOrThrow } from '../env/get-secret';

export function getOllamaModel(modelName?: string) {
  if (!modelName) {
    modelName = getSecretOrThrow(envKeys.OLLAMA_MODEL_NAME);
  }

  const devEnv = getSecret(envKeys.ENVIRONMENT) === 'development';
  return new ChatOllama({ model: modelName, temperature: 0, verbose: devEnv });
}
