import { config } from 'dotenv';
import { validateProvidedName, ValidateProvidedNameLLM } from '.';
import { createAIMessage } from '../../utils/create-ai-message';

describe('validateProvideName', () => {
  beforeAll(() => {
    config();
  });

  it('should return true for a valid name', async () => {
    const testName = 'John Doe';
    const mockInvoke = jest.fn().mockImplementation(async (messages) => {
      expect(Array.isArray(messages)).toBe(true);
      expect(messages.length).toBe(2);
      return createAIMessage('yes');
    });
    const mockedLLM: ValidateProvidedNameLLM = { invoke: mockInvoke };
    const isValid = await validateProvidedName(testName, mockedLLM);
    expect(isValid).toBe(true);
  });

  it('should return false for an invalid name', async () => {
    const testName = 'ajhdfkjhsdjhflsadkfhjdsfjh is sick';
    const mockInvoke = jest.fn().mockImplementation(async (messages) => {
      expect(Array.isArray(messages)).toBe(true);
      expect(messages.length).toBe(2);
      return createAIMessage('no');
    });
    const mockedLLM: ValidateProvidedNameLLM = { invoke: mockInvoke };
    const isValid = await validateProvidedName(testName, mockedLLM);
    expect(isValid).toBe(false);
  });
});
