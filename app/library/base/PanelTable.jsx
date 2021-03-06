import React from 'react';
import {
  Table, TableHead, TableBody, TableRow, TableCell,
} from '@material-ui/core';

function PanelTable({ labels, entries }) {
  const head = labels
    .map((label) => <TableCell key={label}>{ label }</TableCell>);
  const body = entries
    .map((entry) => {
      const fields = entry.map((field) => <TableCell key={field}>{ field }</TableCell>);
      return <TableRow key={entry}>{ fields }</TableRow>;
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
