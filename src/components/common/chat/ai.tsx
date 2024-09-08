import { RichTextEditor } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { createLowlight } from 'lowlight';
import ts from 'highlight.js/lib/languages/typescript';
import { motion, Transition } from 'framer-motion';

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
}

const Ai = ({ loading }: AiProps) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({ codeBlock: false }),
            CodeBlockLowlight.configure({ lowlight })
        ],
        immediatelyRender: false
    });

    // editor?.commands.setContent


    return (
        loading ? <Loading /> : (
            <RichTextEditor editor={ editor } style={ { border: 'none' } }>
                <RichTextEditor.Content />
            </RichTextEditor>
        )
    );
}

export { Ai };