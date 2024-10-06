import { useTextmenuCommands } from './hooks/useTextmenuCommands'
import { useTextmenuStates } from './hooks/useTextmenuStates'
import { BubbleMenu, Editor } from '@tiptap/react'
import { memo } from 'react'
import { FontFamilyPicker } from './components/FontFamilyPicker'
import { FontSizePicker } from './components/FontSizePicker'
import { useTextmenuContentTypes } from './hooks/useTextmenuContentTypes'
import { ContentTypePicker } from './components/ContentTypePicker'
import { EditLinkPopover } from './components/EditLinkPopover'
import { useCallback, useState } from 'react'
import { HexColorPicker } from 'react-colorful'
import { themeColors } from './const'
import { Button, ButtonGroup, Divider, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react'
import { LuAlignCenter, LuAlignJustify, LuAlignLeft, LuAlignRight, LuCircleEllipsis, LuHighlighter, LuPalette, LuSubscript, LuSuperscript, LuUndo } from 'react-icons/lu'
import { RiBold, RiCodeBlock, RiItalic, RiStrikethrough, RiUnderline } from 'react-icons/ri'

export type ColorPickerProps = {
  color?: string
  onChange?: (color: string) => void
  onClear?: () => void
}

export const ColorPicker = ({ color, onChange, onClear }: ColorPickerProps) => {
  const [colorInputValue, setColorInputValue] = useState(color || '')

  const handleColorUpdate = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setColorInputValue(event.target.value)
  }, [])

  const handleColorChange = useCallback(() => {
    const isCorrectColor = /^#([0-9A-F]{3}){1,2}$/i.test(colorInputValue)

    if (!isCorrectColor) {
      if (onChange) {
        onChange('')
      }

      return
    }

    if (onChange) {
      onChange(colorInputValue)
    }
  }, [colorInputValue, onChange])

  return (
    <div className="flex flex-col gap-2">
      <HexColorPicker className="w-full" color={color || ''} onChange={onChange} />
      <input
        type="text"
        className="w-full rounded border border-neutral-200 bg-white p-2 text-black focus:outline-1 focus:outline-neutral-300 focus:ring-0 dark:border-neutral-800 dark:bg-black dark:text-white dark:focus:outline-neutral-700"
        placeholder="#000000"
        value={colorInputValue}
        onChange={handleColorUpdate}
        onBlur={handleColorChange}
      />
      <ButtonGroup className="max-w-[15rem]">
        {themeColors.map((currentColor) => (
          <Button
            className={`text-[${currentColor}]`}
            key={currentColor}
            onClick={() => onChange?.(currentColor)}
          />
        ))}
        <Button onClick={onClear}>
          <LuUndo size={16} />
        </Button>
      </ButtonGroup>
    </div>
  )
}


// We memorize the button so each button is not rerendered
// on every editor state change
const MemoButton = memo(Button)
const MemoColorPicker = memo(ColorPicker)
const MemoFontFamilyPicker = memo(FontFamilyPicker)
const MemoFontSizePicker = memo(FontSizePicker)
const MemoContentTypePicker = memo(ContentTypePicker)

export type TextMenuProps = {
  editor: Editor
}

export const TextMenu = ({ editor }: TextMenuProps) => {
  const commands = useTextmenuCommands(editor)
  const states = useTextmenuStates(editor)
  const blockOptions = useTextmenuContentTypes(editor)

  return (
    <BubbleMenu
      tippyOptions={{
        popperOptions: {
          placement: 'top-start',
          modifiers: [
            {
              name: 'preventOverflow',
              options: {
                boundary: 'viewport',
                padding: 8,
              },
            },
            {
              name: 'flip',
              options: {
                fallbackPlacements: ['bottom-start', 'top-end', 'bottom-end'],
              },
            },
          ],
        },
        maxWidth: 'calc(100vw - 16px)',
      }}
      editor={editor}
      pluginKey="textMenu"
      shouldShow={states.shouldShow}
      updateDelay={100}
    >
      <div className='flex gap-1'>
        <MemoContentTypePicker options={blockOptions} />
        <MemoFontFamilyPicker onChange={commands.onSetFont} value={states.currentFont || ''} />
        <MemoFontSizePicker onChange={commands.onSetFontSize} value={states.currentSize || ''} />
        <Divider orientation="vertical" />
        <MemoButton
          tooltip="Bold"
          tooltipShortcut={['Mod', 'B']}
          onClick={commands.onBold}
          active={states.isBold}
        >
          <RiBold />
        </MemoButton>
        <MemoButton
          tooltip="Italic"
          tooltipShortcut={['Mod', 'I']}
          onClick={commands.onItalic}
          active={states.isItalic}
        >
          <RiItalic />
        </MemoButton>
        <MemoButton
          tooltip="Underline"
          tooltipShortcut={['Mod', 'U']}
          onClick={commands.onUnderline}
          active={states.isUnderline}
        >
          <RiUnderline/>
        </MemoButton>
        <MemoButton
          tooltip="Strikehrough"
          tooltipShortcut={['Mod', 'Shift', 'S']}
          onClick={commands.onStrike}
          active={states.isStrike}
        >
          <RiStrikethrough />
        </MemoButton>
        <MemoButton
          tooltip="Code"
          tooltipShortcut={['Mod', 'E']}
          onClick={commands.onCode}
          active={states.isCode}
        >
          <RiCodeBlock />
        </MemoButton>
        <MemoButton tooltip="Code block" onClick={commands.onCodeBlock}>
          <RiCodeBlock />
        </MemoButton>
        <EditLinkPopover onSetLink={commands.onLink} />
        <Popover placement="top">
          <PopoverTrigger>
            <MemoButton active={!!states.currentHighlight} tooltip="Highlight text">
              <LuHighlighter />
            </MemoButton>
          </PopoverTrigger>
          <PopoverContent >
              <MemoColorPicker
                color={states.currentHighlight}
                onChange={commands.onChangeHighlight}
                onClear={commands.onClearHighlight}
              />
          </PopoverContent>
        </Popover>
        <Popover placement="top">
          <PopoverTrigger>
            <MemoButton active={!!states.currentColor} tooltip="Text color">
              <LuPalette />
            </MemoButton>
          </PopoverTrigger>
          <PopoverContent>
              <MemoColorPicker
                color={states.currentColor}
                onChange={commands.onChangeColor}
                onClear={commands.onClearColor}
              />
          </PopoverContent>
        </Popover>
        <Popover placement="top">
          <PopoverTrigger>
            <MemoButton tooltip="More options">
              <LuCircleEllipsis />
            </MemoButton>
          </PopoverTrigger>
          <PopoverContent>
              <MemoButton
                tooltip="Subscript"
                tooltipShortcut={['Mod', '.']}
                onClick={commands.onSubscript}
                active={states.isSubscript}
              >
                <LuSubscript />
              </MemoButton>
              <MemoButton
                tooltip="Superscript"
                tooltipShortcut={['Mod', ',']}
                onClick={commands.onSuperscript}
                active={states.isSuperscript}
              >
                <LuSuperscript />
              </MemoButton>
              <Divider orientation="vertical" />
              <MemoButton
                tooltip="Align left"
                tooltipShortcut={['Shift', 'Mod', 'L']}
                onClick={commands.onAlignLeft}
                active={states.isAlignLeft}
              >
                <LuAlignLeft />
              </MemoButton>
              <MemoButton
                tooltip="Align center"
                tooltipShortcut={['Shift', 'Mod', 'E']}
                onClick={commands.onAlignCenter}
                active={states.isAlignCenter}
              >
                <LuAlignCenter />
              </MemoButton>
              <MemoButton
                tooltip="Align right"
                tooltipShortcut={['Shift', 'Mod', 'R']}
                onClick={commands.onAlignRight}
                active={states.isAlignRight}
              >
                <LuAlignRight />
              </MemoButton>
              <MemoButton
                tooltip="Justify"
                tooltipShortcut={['Shift', 'Mod', 'J']}
                onClick={commands.onAlignJustify}
                active={states.isAlignJustify}
              >
                <LuAlignJustify />
              </MemoButton>
          </PopoverContent>
        </Popover>
      </div>
    </BubbleMenu>
  )
}
