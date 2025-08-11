export function stripThinkTag(input: string): string {
  return input.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
}
