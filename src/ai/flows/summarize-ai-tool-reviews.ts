'use server';
/**
 * @fileOverview Summarizes AI tool reviews to provide users with a quick understanding of strengths and weaknesses.
 *
 * - summarizeAiToolReviews - A function that handles the summarization of AI tool reviews.
 * - SummarizeAiToolReviewsInput - The input type for the summarizeAiToolReviews function.
 * - SummarizeAiToolReviewsOutput - The return type for the summarizeAiToolReviews function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeAiToolReviewsInputSchema = z.object({
  toolName: z.string().describe('The name of the AI tool to summarize reviews for.'),
  reviews: z.array(z.string()).describe('An array of user reviews for the AI tool.'),
});
export type SummarizeAiToolReviewsInput = z.infer<typeof SummarizeAiToolReviewsInputSchema>;

const SummarizeAiToolReviewsOutputSchema = z.object({
  summary: z.string().describe('A summary of the user reviews, highlighting strengths and weaknesses.'),
});
export type SummarizeAiToolReviewsOutput = z.infer<typeof SummarizeAiToolReviewsOutputSchema>;

export async function summarizeAiToolReviews(input: SummarizeAiToolReviewsInput): Promise<SummarizeAiToolReviewsOutput> {
  return summarizeAiToolReviewsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeAiToolReviewsPrompt',
  input: {schema: SummarizeAiToolReviewsInputSchema},
  output: {schema: SummarizeAiToolReviewsOutputSchema},
  prompt: `You are an AI expert, skilled at summarizing user reviews for AI tools.

  Summarize the following reviews for the AI tool: {{{toolName}}}.
  Highlight the strengths and weaknesses mentioned in the reviews.

  Reviews:
  {{#each reviews}}- {{{this}}}
  {{/each}}
  `,
});

const summarizeAiToolReviewsFlow = ai.defineFlow(
  {
    name: 'summarizeAiToolReviewsFlow',
    inputSchema: SummarizeAiToolReviewsInputSchema,
    outputSchema: SummarizeAiToolReviewsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
