import OpenAILibrary from "openai"
import config from "config"
import { createReadStream } from 'fs'

class OpenAI {
    roles = {
        SYSTEM: 'system',
        ASSISTANT: 'assistant',
        USER: 'user'
    }

    constructor(apiKey) {
        this.openai = new OpenAILibrary({
            apiKey,
        });
    }
    
    async chat(messages) {
        try {
            const response = await this.openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages
            })

            return response.data.choices[0].message
        } catch (e) {
            console.log('Error while gpt chat', e.message)
        }
    }
    
    async transcription(filePath) {
        try {
            const transcription = await this.openai.audio.transcriptions.create({
                file: createReadStream(filePath),
                model: 'whisper-1',
                response_format: "text",
            })

            console.log(JSON.stringify(transcription, null, 2))

            return transcription.text
        } catch (e) {
            console.log('Error while transcription', e.message)
        }
    }
}

export const openai = new OpenAI(config.get('OPENAI_KEY'))
