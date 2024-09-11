import { BaseListChatMessageHistory } from '@langchain/core/chat_history';
import {
    BaseMessage,
    mapChatMessagesToStoredMessages,
    mapStoredMessagesToChatMessages,
    StoredMessageData
} from '@langchain/core/messages';
import { prisma } from '@lib/prisma';
import { MessageType } from '@prisma/client';

interface MessageHistoryOptions {
    sessionId: string;
}

class MessageHistory extends BaseListChatMessageHistory {
    lc_namespace = [ 'langchain', 'stores', 'message' ];

    sessionId: string;
    database = prisma.message

    constructor(options: MessageHistoryOptions) {
        const { sessionId } = options;
        super(options);
        this.sessionId = sessionId;
    }

    async getMessages(): Promise<BaseMessage[]> {
        const messages = await this.database.findMany({
            where: { conversationId: this.sessionId }
        });

        return mapStoredMessagesToChatMessages(messages.map(msg => ({
            type: msg.type === MessageType.HUMAN ? 'human' : 'ai',
            data: { content: msg.content } as StoredMessageData
        })));
    }

    async addMessage(message: BaseMessage): Promise<void> {
        const stored = mapChatMessagesToStoredMessages([ message ])[0];

        await this.database.create({
            data: {
                content: stored.data.content,
                conversationId: this.sessionId,
                type: stored.type === 'human' ? MessageType.HUMAN : MessageType.AI
            }
        });
    }

    async addMessages(messages: BaseMessage[]): Promise<void> {
        const stored = mapChatMessagesToStoredMessages(messages);

        await this.database.createMany({
            data: stored.map(msg => ({
                content: msg.data.content,
                conversationId: this.sessionId,
                type: msg.type === 'human' ? MessageType.HUMAN : MessageType.AI
            }))
        })
    }

    async clear(): Promise<void> {
        await this.database.deleteMany({
            where: { conversationId: this.sessionId }
        });
    }
}

export { MessageHistory };