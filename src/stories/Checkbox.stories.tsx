import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Checkbox as Component } from '../components';

export default {
  title: 'Component-lib/Checkbox',
  component: Component,
  parameters: {
    backgrounds: {
      default: "dark-bg",
      values: [
        { name: "dark-bg", value: "#454145"}
      ]
    }
  }
} as ComponentMeta<typeof Component>;

export const Checkbox: ComponentStory<typeof Component> = (args) => <Component {...args} />;