import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button, Card as Component } from '../components';

export default {
  title: 'Component-lib/Card',
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  header: "Header Content",
  content: "Main Content Area",
  actions: <Button onClick={()=>{}}>Click Me</Button>
};