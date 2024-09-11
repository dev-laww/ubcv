import { RichTextEditor } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { createLowlight } from 'lowlight';
import ts from 'highlight.js/lib/languages/typescript';
import { motion, Transition } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { marked } from 'marked';
import { random } from '@utils/number';

const lowlight = createLowlight();

lowlight.register({ ts });

function escapeHtml(unsafe: string) {
    return unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}


const md = `
## Hello, world!

---

\`\`\`
Test Code

import { RichTextEditor } from '@mantine/tiptap';

const lowlight = createLowlight();

// register languages that you are planning to use
lowlight.register({ ts });

function escapeHtml(unsafe: string) {
    return unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
\`\`\`

`

const dot = {
    display: 'block',
    width: '.3rem',
    height: '.3rem',
    backgroundColor: 'gray',
    borderRadius: '50%'
};

const containerVariant = {
    initial: {
        transition: {
            staggerChildren: 0.1
        }
    },
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

const variant = {
    initial: {
        opacity: 0,
        y: '0%'
    },

    animate: {
        opacity: 1,
        y: [ '0%', '100%', '0%' ]
    }
};

const transition: Transition = {
    duration: 0.4,
    repeatType: 'reverse',
    repeat: Infinity,
    ease: 'linear',
    repeatDelay: 1
};

function Loading() {
    return (
        <div
            style={ {
                marginTop: '1rem',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'start'
            } }
        >
            <motion.div
                style={ { display: 'flex', justifyContent: 'space-around', gap: 4 } }
                variants={ containerVariant }
                initial='initial'
                animate='animate'
            >
                <motion.span
                    style={ dot }
                    variants={ variant }
                    transition={ transition }
                />
                <motion.span
                    style={ dot }
                    variants={ variant }
                    transition={ transition }
                />
                <motion.span
                    style={ dot }
                    variants={ variant }
                    transition={ transition }
                />
            </motion.div>
        </div>
    );
}

interface AiProps {
    loading?: boolean;
    content?: string;
    slice?: boolean;
}

const AiChat = ({ loading, content, slice }: AiProps) => {
    const [ message, setMessage ] = useState('');
    const editor = useEditor({
        extensions: [
            StarterKit.configure({ codeBlock: false }),
            CodeBlockLowlight.configure({ lowlight })
        ],
        content: '',
        editable: false
    });

    const parse = useCallback(async (chat: string) => {
        const parsedContent = await marked.parse(escapeHtml(chat));
        editor?.commands.setContent(parsedContent);
    }, [ editor ]);

    useEffect(() => {
        if (!content) return;

        if (!slice) {
            setMessage(content);
            return;
        }

        // TODO: Implement tts
        const words = content.split(' ');
        let index = 0;
        const interval = setInterval(() => {
            setMessage(words.slice(0, index + 1).join(' '));
            index++;

            if (index === words.length)
                clearInterval(interval);

        }, random({ min: 50, max: 100 }));

        return () => clearInterval(interval);

    }, [ content, slice ]);

    useEffect(() => {
        if (!message) return;

        parse(message).then();
    }, [ message, parse ]);

    return loading ? (
        <Loading />
    ) : (
        <RichTextEditor editor={ editor } style={ { border: 'none', pointerEvents: 'none' } }>
            <RichTextEditor.Content />
        </RichTextEditor>
    );
};

export { AiChat };