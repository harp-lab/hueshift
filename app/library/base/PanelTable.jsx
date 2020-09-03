import React from 'react';
import {
  Table, TableHead, TableBody, TableRow, TableCell,
} from '@material-ui/core';

function PanelTable({ labels, entries }) {
  const head = labels
    .map((label) => <TableCell key={label}>{ label }</TableCell>);
  const body = entries
    .map((entry, row) => {
      const fields = entry.map((field, cell) => <TableCell key={`${cell}: ${field}`}>{ field }</TableCell>);
      return <TableRow key={`${row}: ${entry}`}>{ fields }</TableRow>;
    });
  return (
    <Table size="small">
      <TableHead>
        <TableRow>{ head }</TableRow>
      </TableHead>
      <TableBody>{ body }</TableBody>
    </Table>
  );
}

export default PanelTable;
