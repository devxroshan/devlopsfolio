import z from 'zod';


export const newVerificationSession = z.object({
    email: z.email("Invalid email.")
})