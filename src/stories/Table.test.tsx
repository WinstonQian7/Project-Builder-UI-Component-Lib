import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event/';
import { axe, toHaveNoViolations } from "jest-axe";
import { BaseItem, ColumnProps, Table } from './Table';

expect.extend(toHaveNoViolations);

function renderSeriesTable(cols: ColumnProps[] = fakeCol, rows: BaseItem[] = fakeRows, selectedListenerMock?: ((selectedRows: string[]) => void)) {
  return render(<Table columns={cols} rows={rows} selectedRowListener={selectedListenerMock} />);
}

describe('Table', () => {
  it('renders the table with column and row cells', () => {
    renderSeriesTable();

    expect(screen.getByRole('table')).toBeVisible();
    expect(screen.getAllByRole('row')).toHaveLength(totalRowCount);
    expect(screen.getAllByRole('checkbox')).toHaveLength(headerRowSize);

    let expectedVisibleColHeaders = fakeCol.length;
    fakeCol.forEach(col => { if (col.isHidden) { expectedVisibleColHeaders -= 1 } });

    expect(screen.getAllByRole('columnheader')).toHaveLength(expectedVisibleColHeaders);
  });
  it('renders table with no row data', () => {
    renderSeriesTable(fakeCol, []);

    expect(screen.getByRole('table')).toBeVisible();
    expect(screen.getAllByRole('row')).toHaveLength(headerRowSize);
    expect(screen.getAllByRole('checkbox')).toHaveLength(headerRowSize);
  });
  it.skip('column entries that are hidden should not render column and row cells', () => {
    renderSeriesTable();

    let expectedVisibleColHeaders: string[] = [];
    fakeCol.forEach(col => { if (col.isHidden) { expectedVisibleColHeaders.push(col.field) } });

    expect(screen.getAllByRole('columnheader')).toHaveLength(expectedVisibleColHeaders.length);
    // todo check row cells to be hidden
    let nonCheckboxAndNonHeaderRowCells = fakeRows.length * expectedVisibleColHeaders.length;
    expect(screen.getAllByRole('cell')).toHaveLength(nonCheckboxAndNonHeaderRowCells)
  })
  it('clicking checkbox in non-header row selects only that row', async () => {
    renderSeriesTable();
    const rows = screen.getAllByRole('row');
    const nonHeaderRow = 1;
    const anotherNonHeaderRow = 2;

    await userEvent.click(rows[nonHeaderRow]);

    const checkbox = screen.getAllByRole('checkbox');
    expect(checkbox[nonHeaderRow]).toBeChecked();
    expect(checkbox[anotherNonHeaderRow]).toBeUndefined();
  });
  it('clicking checkbox in header row selects all', async () => {
    renderSeriesTable();
    const headerRow = 0;
    let checkbox = screen.getAllByRole('checkbox');

    await userEvent.click(checkbox[headerRow]);

    checkbox = screen.getAllByRole('checkbox');
    checkbox.forEach(checkbox => expect(checkbox).toBeChecked());
    expect(checkbox).toHaveLength(totalRowCount);
  });
  it('header row checkbox should be indeterminate state when some rows are selected', async () => {
    renderSeriesTable();
    const rows = screen.getAllByRole('row');
    const headerRow = 0;
    const nonHeaderRow = 1;

    await userEvent.click(rows[nonHeaderRow]);

    const checkbox = screen.getAllByRole('checkbox');
    expect(checkbox[headerRow]).toBePartiallyChecked();
  });
  it('selected row listener when rows are selected returns row ids', async () => {
    const mockSelectedIdListener = jest.fn(x => x);
    renderSeriesTable(fakeCol, fakeRows, mockSelectedIdListener);
    const rows = screen.getAllByRole('row');
    const nonHeaderRow = 1;

    await userEvent.click(rows[nonHeaderRow]);

    expect(mockSelectedIdListener).toHaveLastReturnedWith<string[]>([fakeRows[nonHeaderRow - 1].id]);
  })
  it('no a11y violation', async () => {
    const { container } = renderSeriesTable();
    expect(await axe(container)).toHaveNoViolations();
  })
});

const fakeCol = [{
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
}];

const fakeRows = [
  {
    id: "1",
    title: "sample one",
    recent_chapter: "21",
    last_updated: "5/21",
    scanlation_team: "reaper"
  },
  {
    id: "2",
    title: "sample two long title asdf asdfasdf asdfasdf asdfa ",
    recent_chapter: "1",
    last_updated: "5/21",
    scanlation_team: "reaper"
  }
]

const headerRowSize = 1;
const totalRowCount = fakeRows.length + headerRowSize;