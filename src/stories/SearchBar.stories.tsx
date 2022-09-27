import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SearchBar as Component } from './SearchBar';

export default {
  title: 'Component-lib/SearchBar',
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const SearchBar = Template.bind({});
SearchBar.args = {
  searchOptions: ['series one', 'series two', 'series three', 'series four', 'series five']
}