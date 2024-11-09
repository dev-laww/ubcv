import { Runnable, RunnableConfig, RunnableWithMessageHistory } from '@langchain/core/runnables';
import { ChatPromptTemplate, MessagesPlaceholder } from '@langchain/core/prompts';
import { VectorStoreRetriever } from '@langchain/core/vectorstores';
import { Context } from '@lib/llm/context';
import { createHistoryAwareRetriever } from 'langchain/chains/history_aware_retriever';
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents';
import { createRetrievalChain } from 'langchain/chains/retrieval';
import { MessageHistory } from '@lib/llm/message-history';
import { IterableReadableStream } from '@langchain/core/dist/utils/stream';
import { ChatOpenAI } from '@langchain/openai';


const CONTEXTUALIZE_Q_PROMPT = `
    Given a chat history and the latest user question or statement,
    which might reference context in the chat history, formulate a standalone answer 
    which can be understood without the chat history.
`;

const QA_PROMPT = `
    You are an assistant for question-answering tasks.
    Use the following pieces of retrieved context to answer the question.
    If you don't know the answer, just say that you don't know.
    Use three sentences maximum and keep the answer concise.
    
    {context}
`;

const TITLE_PROMPT = `
    You are an author capable of generating titles for chat histories.
    Given a chat history, generate a title for the chat.
    The title should be a concise summary of the chat history.
    The title should not include anything that mentions that it is a chat history summary.
    It should be a single sentence and should not exceed 50 characters.
    Just return the title, do not include any other information.
`;

interface Session {
    chain: Runnable;
    invoke: (input: string) => Promise<{ context: Document[], answer: string }>;
    stream: (input: string) => Promise<IterableReadableStream<any>>;
}

class Chain {
    static llm = new ChatOpenAI({ model: 'gpt-4o-mini', temperature: 0.5 });
    static retriever: VectorStoreRetriever;
    static chain: Runnable;

    static contextualizeQPrompt = ChatPromptTemplate.fromMessages([
        [ 'system', CONTEXTUALIZE_Q_PROMPT ],
        new MessagesPlaceholder('chat_history'),
        [ 'human', '{input}' ]
    ]);

    static qAPrompt = ChatPromptTemplate.fromMessages([
        [ 'system', QA_PROMPT ],
        new MessagesPlaceholder('chat_history'),
        [ 'human', '{input}' ]
    ]);

    static titlePrompt = ChatPromptTemplate.fromMessages([
        [ 'system', TITLE_PROMPT ],
        new MessagesPlaceholder('chat_history')
    ]);

    static async assemble(retriever: VectorStoreRetriever, config: RunnableConfig = {}) {
        const historyAwareRetriever = await createHistoryAwareRetriever({
            llm: Chain.llm,
            retriever,
            rephrasePrompt: Chain.contextualizeQPrompt
        });

        const combineDocsChain = await createStuffDocumentsChain({
            llm: Chain.llm,
            prompt: Chain.qAPrompt
        })

        const rag = await createRetrievalChain({
            retriever: historyAwareRetriever,
            combineDocsChain
        })

        if (!this.chain)
            this.chain = new RunnableWithMessageHistory({
                runnable: rag,
                getMessageHistory: (sessionId: string) => new MessageHistory({ sessionId }),
                inputMessagesKey: 'input',
                historyMessagesKey: 'chat_history',
                outputMessagesKey: 'answer'
            })

        return this.chain;
    }

    static async session(sessionId: string) {
        if (!this.retriever) {
            const res = await fetch(`${process.env.AUTH_URL}/context.pdf`);
            const blob = await res.blob();
            this.retriever = await Context.load(blob);
        }

        const chain = await Chain.assemble(this.retriever);

        const config = { configurable: { sessionId } }
        const invoke = async (input: string) => chain.invoke({ input }, config);
        const stream = async (input: string) => chain.stream({ input }, config);

        return { chain, invoke, stream } as Session;
    }

    static async title(sessionId: string) {
        const history = new MessageHistory({ sessionId });
        const messages = await history.getMessages();

        const res = await this.titlePrompt.pipe(this.llm).invoke({ chat_history: messages });

        return res.content;
    }
}

export { Chain };
