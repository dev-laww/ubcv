import { Ollama } from '@langchain/ollama';
import { Context } from '@lib/llm/context';
import {
    RunnableConfig,
    RunnablePassthrough,
    RunnableSequence,
    RunnableWithMessageHistory
} from '@langchain/core/runnables';
import { ChatPromptTemplate, MessagesPlaceholder } from '@langchain/core/prompts';
import { formatDocumentsAsString } from 'langchain/util/document';
import { MessageHistory } from '@lib/llm/message-history';

const model = new Ollama({ model: 'llama3.1', temperature: 0.5 });

const systemPrompt = `
    You are an assistant for question-answering tasks.
    Use the following pieces of retrieved context to answer the question.
    If you don't know the answer, just say that you don't know.
    Use three sentences maximum and keep the answer concise.
    
    {context}
 `;

const prompt = ChatPromptTemplate.fromMessages([
    [ 'system', systemPrompt ],
    new MessagesPlaceholder('history'),
    [ 'human', '{input}' ]
])

const chain = async (sessionId: string) => {
    const retriever = await Context.loadLocal('./test.pdf')
    const config: RunnableConfig = { configurable: { sessionId } };

    const runnable = RunnableSequence.from([
        RunnablePassthrough.assign({
            context: async (input: Record<string, unknown>) => {
                const relevantDocs = await retriever.invoke(input.input as string);
                return formatDocumentsAsString(relevantDocs);
            }
        }),
        prompt,
        model
    ]);

    return new RunnableWithMessageHistory({
        runnable,
        getMessageHistory: (sessionId) => new MessageHistory({ sessionId }),
        inputMessagesKey: 'input',
        historyMessagesKey: 'history',
        config
    });
}

(async () => {
    await chain('cm0vbkfer0000dqkm3as5be09')

    console.log('done')
})()


