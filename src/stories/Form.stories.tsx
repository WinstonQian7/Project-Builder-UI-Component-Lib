import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Form as Component } from '../components';

export default {
  title: 'Component-lib/Form',
  component: Component,
} as ComponentMeta<typeof Component>;

export const Template: ComponentStory<typeof Component> = (args) => <Component />;

// export const Contained = Template.bind({});
// export const Text = Template.bind({});
// Text.args = {
//   variant: "text"
// };

