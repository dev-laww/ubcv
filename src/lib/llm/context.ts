import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { WebPDFLoader } from '@langchain/community/document_loaders/web/pdf';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { Embeddings } from '@langchain/core/embeddings';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { OpenAIEmbeddings } from '@langchain/openai';

class Context {
    static async loadFromLoader(loader: any, embeddings: Embeddings) {
        const docs = await loader.load();
        const textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 700,
            chunkOverlap: 100
        });
        const splits = await textSplitter.splitDocuments(docs);
        const vectorStore = await MemoryVectorStore.fromDocuments(splits, embeddings);


        return vectorStore.asRetriever({ k: 2 });
    }

    static async load(file: Blob) {
        const loader = new WebPDFLoader(file);
        const embeddings = new OpenAIEmbeddings();

        return Context.loadFromLoader(loader, embeddings);
    }

    static async loadLocal(file: string) {
        const loader = new PDFLoader(file);
        const embeddings = new OpenAIEmbeddings();

        return Context.loadFromLoader(loader, embeddings);
    }
}

export { Context };