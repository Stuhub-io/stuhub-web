import { Heading } from '@tiptap/extension-heading'
import { v4 as uuidv4 } from 'uuid'

export const HeadingWithID = Heading.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      id: {
        default: null,
        parseHTML: () => uuidv4(),
        renderHTML: attributes => {
          // Ensure the heading has a new unique ID whenever it is rendered
          const { id } = attributes
          return { id: id || uuidv4() }
        },
      },
    }
  },
})