import React, { useState, ReactNode, useEffect } from 'react';
import { Checkbox } from ".";
import styled, { css } from 'styled-components';

const TableStyle = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 600px;
  color: white;
  padding-top: 0.3rem;
`;

const Row = styled.div<{isHeader?: boolean}>`
  display: flex;
  height: 2.5rem;
  padding: 0.2rem 0;
  background-color: #454145;
  border-bottom: 0.15rem solid #272626;

  &:hover {
    background-color: rgba(0, 187, 255, 0.157);
  }

  ${prop => prop.isHeader ? css`
    font-family: Poppins;
    font-weight: 800;
    text-transform: uppercase;
    padding-bottom: 0.5rem; 

    &:hover {
      background-color: #454145;
    }
  `: 
    css`  
    font-family: Verdana, Roboto Condensed, sans-serif;
  `}
`;

const Cell = styled.div<{ width?: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${prop => prop.width ? prop.width + "%" : 10 + "%"}; // magic numbers ?
  height: 100%;
  text-align: center;
  word-break: break-all;
  white-space: nowrap;
`;

export interface TableProps {
  columns: ColumnProps[];
  rows: BaseItem[] | undefined;
  selectedRowListener?: (selectedRows: string[])=>void;
}

export interface ColumnProps {
  field: string;
  headerName: string;
  isHidden?: boolean;
  width?: number;
}

export interface BaseItem {
  id: string;
  [key: string]: ReactNode;
}

export function Table({ columns, rows, selectedRowListener }: TableProps) {
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [selectedCount, setSelectedCount] = useState(0);
  const [selectAllCheckbox, setSelectAllCheckbox] = useState({ checked: false, indeterminate: false });

  const columnWidth: Record<string, number> = {};
  const hiddenColumn: Record<string, boolean> = {};

  columns.forEach(col => {
    columnWidth[col.field] = col.width || 10;
    if (col.isHidden) {
      hiddenColumn[col.field] = true;
    }
  });
  
  useEffect(function SelectedRowsProvider() {
    if (selectedRowListener) {
      let selectedIds: string[] = [];
      Object.entries(selected).forEach(([id,selectedRow]) => {
        if (selectedRow) {
          selectedIds.push(id);
        }
      });
      selectedRowListener(selectedIds);
    }
  }, [selected, selectedRowListener]);

  const toggleSelected = (id: string) => (e: React.ChangeEvent | React.MouseEvent) => {
    if (rows) {
      e.preventDefault();
      const newState = !selected[id];
      const newCount = newState ? selectedCount + 1 : selectedCount - 1;

      if (newCount === rows.length) {
        selectAllCheckbox.checked = true;
        selectAllCheckbox.indeterminate = false;
      }
      else {
        selectAllCheckbox.checked = false;
        selectAllCheckbox.indeterminate = newCount === 0 ? false : true;
      }

      setSelectAllCheckbox(selectAllCheckbox);
      setSelectedCount(newCount);
      setSelected({
        ...selected,
        [id]: newState
      });
    }
  };

  const toggleSelectedAll = () => {
    const newState = !(selectAllCheckbox.checked);

    if (newState) {
      selectAllCheckbox.checked = true;
      selectAllCheckbox.indeterminate = false;
      setSelectedCount(rows ? rows.length : 0);
    }
    else {
      selectAllCheckbox.checked = false;
      selectAllCheckbox.indeterminate = false;
      setSelectedCount(0);
    }
    setSelectAllCheckbox(selectAllCheckbox);
    if (rows) {
      rows.forEach(item => setSelected(prevState => ({
        ...prevState,
        [item.id]: newState
      })));
    }
  }

  return (
    <>
      <TableStyle role="table">
        <Row isHeader={true} role="row" key="colHeaderRow">
          <Cell width={5} role="cell" key="colHeaderCheckbox">
            <Checkbox
              onChange={toggleSelectedAll}
              checked={selectAllCheckbox.checked}
              isIndeterminate={selectAllCheckbox.indeterminate}
            />
          </Cell>
          {columns.map((col,colIdx) => {
            return (
              !hiddenColumn[col.field] && 
                <Cell 
                  role="columnheader" 
                  width={col.width}
                  key={`columnRow${col.field}${colIdx}`}
                >
                  {col.headerName}
                </Cell>
            );
          })}
        </Row>
        {rows ? rows.map((item, rowIdx) => {
          return (
            <Row
              key={item.id}
              onClick={toggleSelected(item.id)}
              role="row"
            >
              <Cell width={5} role="cell" key={`RowCheckbox${item.id}`}>
                {selected[item.id] &&
                <Checkbox
                  onChange={()=>{}}
                  checked={selected[item.id]}
                />}
              </Cell>
              {Object.entries(item).map(([field, val],cellIdx) => {
                return (
                  !hiddenColumn[field] && <Cell role="cell" key={`Row${rowIdx}Cell${field}${cellIdx+1}`}
                  width={columnWidth[field]}>{val}</Cell>
                );
              })
              }
            </Row>
          )
        }) : null}
      </TableStyle>
    </>
  );
}