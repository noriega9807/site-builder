import { ButtonTheme, ButtonSize, ButtonForm } from '/styles/alias/Button'
import Button from './index'

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
export default {
  title: 'Primitive/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    theme: {
      options: Object.keys(ButtonTheme),
      control: 'select',
    },
    size: {
      options: Object.keys(ButtonSize),
      control: 'select',
    },
    form: {
      options: ['', ...Object.keys(ButtonForm)],
      control: 'select',
    },
  },
}

export const Primary = {
  args: {
    label: 'Button',
  },
}
