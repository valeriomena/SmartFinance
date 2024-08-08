import React from 'react';

export const Table: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
  <table className="min-w-full bg-white">{children}</table>
);

export const TableHeader: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
  <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">{children}</thead>
);

export const TableRow: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
  <tr className="border-b border-gray-200 hover:bg-gray-100">{children}</tr>
);

export const TableHead: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
  <th className="py-3 px-6 text-left">{children}</th>
);

export const TableBody: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
  <tbody className="text-gray-600 text-sm font-light">{children}</tbody>
);

export const TableCell: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
  <td className="py-3 px-6 text-left">{children}</td>
);
