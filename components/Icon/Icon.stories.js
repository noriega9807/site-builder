import { IconStyle, IconSize } from '/styles/alias/Icon'
import Icon from './index'

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
export default {
  title: 'Primitive/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    style: {
      options: Object.keys(IconStyle),
      control: 'select',
    },
    size: {
      options: Object.keys(IconSize),
      control: 'select',
    },
  },
}

export const MyIcon = {
  args: {
    style: 'fas',
    icon: 'user',
  },
}
