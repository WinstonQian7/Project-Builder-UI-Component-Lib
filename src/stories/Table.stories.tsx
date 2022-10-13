import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Table as Component } from '../components';

export default {
  title: 'Component-lib/Table',
  component: Component,
  parameters: {
    backgrounds: {
      default: "dark-bg",
      values: [{ name: "dark-bg", value: "#272626"}]
    }
  }
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const DataTable = Template.bind({});
DataTable.args = {
  columns: [{
    field: "id",
    headerName: "ID",
    width: 0,
    isHidden: true
  }, {
    field: "title",
    headerName: "series title",
    width: 40
  }, {
    field: "recent_chapter",
    headerName: "chapter",
    width: 10
  }, {
    field: "last_updated",
    headerName: "update",
    width: 10
  }, {
    field: "scanlation_team",
    headerName: "scan team",
    width: 10
  }],
  rows: [
    {
      id: "1",
      title: "sample one",
      recent_chapter: "21",
      last_updated: "5/21",
      scanlation_team: "reaper"
    },
    {
      id: "2",
      title: "sample two",
      recent_chapter: "1",
      last_updated: "5/21",
      scanlation_team: "reaper"
    }
  ]
};
