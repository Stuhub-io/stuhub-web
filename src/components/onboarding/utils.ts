import { z } from "zod";

export const OnboardingSchema = z.object({
  firstName: z.string().min(1, 'Please enter your first name'),
  lastName: z.string().min(1, 'Please enter your last name'),
  avatar: z.string().optional(),
  orgName: z.string().min(1, 'Please enter your organization name').optional(),
  orgDescription: z.string().min(1, 'Please enter your organization description'),
})

export type OnboardingFormValues = z.infer<typeof OnboardingSchema>