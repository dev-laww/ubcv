import OpenAI from 'openai'
import { Voice } from '@types';
import z from 'zod';


const openai = new OpenAI()

interface SpeechOptions {
    input: string
    voice?: Voice
}

export const SpeechOptionsSchema = z.object({
    input: z.string(),
    voice: z.enum([ 'alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer' ]).optional()
})

export const speech = async ({ input, voice = 'alloy' }: SpeechOptions) => {
    return openai.audio.speech.create({
        model: 'tts-1',
        voice,
        input
    })
}

export const POST = async (req: Request) => {
    const body = await req.json()

    console.log(body)

    const { data, error } = SpeechOptionsSchema.safeParse(body)

    if (error)
        return Response.json({ error: error.errors }, { status: 400 })

    const { input, voice } = data

    const res = await speech({ input, voice })

    return new Response(res.body, { headers: { 'Content-Type': 'audio/mpeg' } })
}