'use server';

/**
 * @fileOverview A Genkit flow that consults a cloud-based compatibility database to
 * automatically adjust backup strategies and DLL deployment schemes for different games.
 *
 * - getGameConfig - A function that retrieves game-specific configuration from the cloud database.
 * - GameConfigInput - The input type for the getGameConfig function (just the game's appid).
 * - GameConfigOutput - The return type for the getGameConfig function, detailing game-specific settings.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the schema for the input (just the appid).
const GameConfigInputSchema = z.object({
  appid: z.string().describe('The Steam AppID of the game.'),
});
export type GameConfigInput = z.infer<typeof GameConfigInputSchema>;

// Define the schema for the output (game-specific settings).
const GameConfigOutputSchema = z.object({
  name: z.string().describe('The name of the game.'),
  has_denuvo: z.boolean().describe('Whether the game has Denuvo DRM.'),
  save_path: z.string().describe('The path to the game save files.'),
  needs_seamless_mod: z
    .boolean()
    .optional()
    .describe('Whether the game needs a seamless co-op mod (e.g., Elden Ring).'),
  config_template: z
    .string()
    .optional()
    .describe('The configuration template to use for the game.'),
});
export type GameConfigOutput = z.infer<typeof GameConfigOutputSchema>;

// Exported function to call the flow.
export async function getGameConfig(input: GameConfigInput): Promise<GameConfigOutput> {
  return getGameConfigFlow(input);
}

// Define the tool to fetch game configuration from a cloud database.
const fetchGameConfig = ai.defineTool({
  name: 'fetchGameConfig',
  description: 'Retrieves game-specific configuration from a cloud database using the AppID.',
  inputSchema: GameConfigInputSchema,
  outputSchema: GameConfigOutputSchema,
},
async (input) => {
    // In a real implementation, this would fetch data from a cloud database.
    // For this example, we'll return some hardcoded data based on the appid.
    // Make sure you install node-fetch: npm install node-fetch
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(`https://example.com/api/gameconfig/${input.appid}`);
    const data = await response.json();
    return data as GameConfigOutput;
  }
);

// Define the Genkit flow.
const getGameConfigFlow = ai.defineFlow(
  {
    name: 'getGameConfigFlow',
    inputSchema: GameConfigInputSchema,
    outputSchema: GameConfigOutputSchema,
  },
  async input => {
    // Call the tool to fetch the game configuration.
    return await fetchGameConfig(input);
  }
);

