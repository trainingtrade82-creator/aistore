// src/ai/flows/suggest-ai-tools.ts
'use server';

/**
 * @fileOverview An AI tool suggestion agent. This agent takes a description of a task and returns a ranked list of AI tools that can help the user accomplish the task.
 *
 * - suggestAiTools - A function that suggests AI tools based on a task description.
 * - SuggestAiToolsInput - The input type for the suggestAiTools function.
 * - SuggestAiToolsOutput - The return type for the suggestAiTools function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestAiToolsInputSchema = z.object({
  taskDescription: z.string().describe('The description of the task the user wants to accomplish.'),
});
export type SuggestAiToolsInput = z.infer<typeof SuggestAiToolsInputSchema>;

const SuggestAiToolsOutputSchema = z.array(
  z.object({
    toolName: z.string().describe('The name of the AI tool.'),
    description: z.string().describe('A brief description of the AI tool and how it can help with the task.'),
    rank: z.number().describe('The rank of the AI tool, with 1 being the highest rank.'),
  })
);
export type SuggestAiToolsOutput = z.infer<typeof SuggestAiToolsOutputSchema>;

export async function suggestAiTools(input: SuggestAiToolsInput): Promise<SuggestAiToolsOutput> {
  return suggestAiToolsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestAiToolsPrompt',
  input: {schema: SuggestAiToolsInputSchema},
  output: {schema: SuggestAiToolsOutputSchema},
  prompt: `You are an AI tool recommendation expert. You will receive a description of a task a user wants to accomplish, and you will return a ranked list of AI tools that can help the user accomplish the task.

The tools should be ranked from 1 to N, with 1 being the most helpful tool and N being the least helpful tool.

Task Description: {{{taskDescription}}}

Return the response as a JSON array. Each element in the array should have fields toolName, description and rank.
`,
});

const suggestAiToolsFlow = ai.defineFlow(
  {
    name: 'suggestAiToolsFlow',
    inputSchema: SuggestAiToolsInputSchema,
    outputSchema: SuggestAiToolsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
