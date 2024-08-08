import React from 'react';

export const Card: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
  <div className="border rounded-lg shadow p-4 bg-white">{children}</div>
);

export const CardHeader: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
  <div className="mb-4 border-b pb-2">{children}</div>
);

export const CardTitle: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
  <h2 className="text-xl font-bold">{children}</h2>
);

export const CardDescription: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
  <p className="text-sm text-gray-600">{children}</p>
);

export const CardContent: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
  <div>{children}</div>
);
