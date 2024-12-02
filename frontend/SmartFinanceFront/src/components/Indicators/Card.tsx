import React from 'react';
import './Card.css';

export const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <div className="card">{children}</div>;
};

export const CardHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <div className="card-header">{children}</div>;
};

export const CardTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <div className="card-title">{children}</div>;
};

export const CardDescription: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <div className="card-description">{children}</div>;
};

export const CardContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <div className="card-content">{children}</div>;
};
