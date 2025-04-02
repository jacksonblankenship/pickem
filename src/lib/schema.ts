import { z } from 'zod';

export const teamSchema = z.object({
  displayName: z.string(),
  shortDisplayName: z.string(),
  abbreviation: z.string(),
  logo: z.string().url(),
});

export const competitorSchema = z.object({
  team: teamSchema,
});

export const competitionSchema = z.object({
  id: z.coerce.number(),
  date: z.coerce.date(),
  neutralSite: z.boolean(),
  competitors: z.tuple([
    competitorSchema.extend({ homeAway: z.literal('home') }),
    competitorSchema.extend({ homeAway: z.literal('away') }),
  ]),
});

export const eventSchema = z.object({
  id: z.coerce.number(),
  competitions: z.tuple([competitionSchema]),
});

export const scoreboardSchema = z.object({
  events: z.array(eventSchema),
});
