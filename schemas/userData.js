import { z } from "zod"

// Index(['What is your name?', 'What is your gender?',
//     'What was your course in UG?',
//     'What is your UG specialization? Major Subject (Eg; Mathematics)',
//     'What are your interests?',
//     'What are your skills ? (Select multiple if necessary)',
//     'What was the average CGPA or Percentage obtained in under graduation?',
//     'Did you do any certification courses additionally?',
//     'If yes, please specify your certificate course title.',
//     'Are you working?',
//     'If yes, then what is/was your first Job title in your current field of work? If not applicable, write NA.               ',
//     'Have you done masters after undergraduation? If yes, mention your field of masters.(Eg; Masters in Mathematics)'],
//    dtype='object')


const userData = z.object({
    name: z.string().min(5, { message: "Minium length should be 5 characters." }),
    gender:z.string(),
    course: z.string(),
    specialization: z.string(),
    interests: z.array(z.string()),
    skills: z.array(z.string()),
    cgpa: z.number().min(0, { message: "CGPA should be within 0-10 ." }).max(10, { message: "CGPA should be within 0-10 ." }),
    certifications: z.boolean().default(false),
    coursetitle: z.array(z.string()).default([]),
    working: z.boolean().default(false),
    jobtitle: z.string().default("Not working"),
    masters: z.boolean().default(false),
    fieldofmasters: z.string().default("No")
})


export default userData