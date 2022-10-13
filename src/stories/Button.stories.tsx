import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button as Component } from '../components';

export default {
  title: 'Component-lib/Button',
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args}>Click Me!</Component>;

export const Contained = Template.bind({});
export const Text = Template.bind({});
Text.args = {
  variant: "text"
};

