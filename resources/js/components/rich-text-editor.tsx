import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Placeholder from '@tiptap/extension-placeholder'
import { Bold, Italic, Underline as UnderlineIcon, List, ListOrdered } from 'lucide-react'
import { Toggle } from '@/components/ui/toggle'
import { cn } from '@/lib/utils'
import { useCallback, useEffect, useRef } from 'react'

interface RichTextEditorProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
    disabled?: boolean
    className?: string
}

export function RichTextEditor({ value, onChange, placeholder, disabled, className }: RichTextEditorProps) {
    const isExternalUpdate = useRef(false)

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: false,
                codeBlock: false,
                blockquote: false,
                horizontalRule: false,
                code: false,
            }),
            Underline,
            Placeholder.configure({
                placeholder: placeholder ?? 'Type something…',
                emptyEditorClass: 'is-editor-empty',
            }),
        ],
        editorProps: {
            attributes: {
                class: 'tiptap prose prose-sm max-w-none p-3 focus:outline-none',
            },
        },
        content: value,
        editable: !disabled,
        onUpdate: ({ editor }) => {
            if (!isExternalUpdate.current) {
                const html = editor.getHTML()
                const text = html.replace(/<[^>]*>/g, '').trim()
                onChange(text ? html : '')
            }
        },
    })

    useEffect(() => {
        if (disabled !== undefined && editor) {
            editor.setEditable(!disabled)
        }
    }, [disabled, editor])

    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            isExternalUpdate.current = true
            editor.commands.setContent(value)
            isExternalUpdate.current = false
        }
    }, [value, editor])

    useEffect(() => {
        return () => editor?.destroy()
    }, [editor])

    const toggleBold = useCallback(() => editor?.chain().focus().toggleBold().run(), [editor])
    const toggleItalic = useCallback(() => editor?.chain().focus().toggleItalic().run(), [editor])
    const toggleUnderline = useCallback(() => editor?.chain().focus().toggleUnderline().run(), [editor])
    const toggleBulletList = useCallback(() => editor?.chain().focus().toggleBulletList().run(), [editor])
    const toggleOrderedList = useCallback(() => editor?.chain().focus().toggleOrderedList().run(), [editor])

    if (!editor) return null

    return (
        <div className={cn('border-input focus-within:border-ring focus-within:ring-ring/50 flex w-full flex-col rounded-md border shadow-xs transition-[color,box-shadow] focus-within:ring-[3px]', className)}>
            <div className="flex items-center gap-0.5 border-b px-1 py-1">
                <Toggle size="sm" pressed={editor.isActive('bold')} onPressedChange={toggleBold} disabled={disabled}>
                    <Bold className="h-3.5 w-3.5" />
                </Toggle>
                <Toggle size="sm" pressed={editor.isActive('italic')} onPressedChange={toggleItalic} disabled={disabled}>
                    <Italic className="h-3.5 w-3.5" />
                </Toggle>
                <Toggle size="sm" pressed={editor.isActive('underline')} onPressedChange={toggleUnderline} disabled={disabled}>
                    <UnderlineIcon className="h-3.5 w-3.5" />
                </Toggle>
                <div className="bg-border mx-0.5 h-5 w-px" />
                <Toggle size="sm" pressed={editor.isActive('bulletList')} onPressedChange={toggleBulletList} disabled={disabled}>
                    <List className="h-3.5 w-3.5" />
                </Toggle>
                <Toggle size="sm" pressed={editor.isActive('orderedList')} onPressedChange={toggleOrderedList} disabled={disabled}>
                    <ListOrdered className="h-3.5 w-3.5" />
                </Toggle>
            </div>
            <EditorContent editor={editor} />
        </div>
    )
}
