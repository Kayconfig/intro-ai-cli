export function stripThinkTag(input: string): string {
  return input.replaceAll(/<think>*?<\/think>/g, '').trim();
}
