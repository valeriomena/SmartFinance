import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@components/Indicators/Card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@components/Indicators/Table';
import './Dashboard.css'; // Importa los estilos para el dashboard

const UserIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
      <header className="header">
        <div className="header-content">
          <Link to="/" className="logo">
            SmartFinance
          </Link>
          <nav className="nav">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/products">Products</Link>
            <Link to="/sales">Sales</Link>
            <Link to="/costs">Costs</Link>
            <Link to="/financials">Financials</Link>
            <Link to="/settings">Settings</Link>
          </nav>
          <div className="user-info">
            <UserIcon className="user-icon" />
            <span>John Doe</span>
          </div>
        </div>
      </header>
      <main className="main-content">
        <div className="card-container">
          <Card>
            <CardHeader>
              <CardTitle>Total Sales</CardTitle>
              <CardDescription>View your total sales for the current period.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="card-value">$25,000</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Costs</CardTitle>
              <CardDescription>View your total costs for the current period.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="card-value">$15,000</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Gross Profit</CardTitle>
              <CardDescription>View your gross profit for the current period.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="card-value">$10,000</div>
            </CardContent>
          </Card>
        </div>
        <div className="card-container mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Top Products</CardTitle>
              <CardDescription>View your top-selling products.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Sales</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Product A</TableCell>
                    <TableCell>$5,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Product B</TableCell>
                    <TableCell>$3,500</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Product C</TableCell>
                    <TableCell>$2,000</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Top Customers</CardTitle>
              <CardDescription>View your top-spending customers.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Sales</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Customer A</TableCell>
                    <TableCell>$7,500</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Customer B</TableCell>
                    <TableCell>$5,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Customer C</TableCell>
                    <TableCell>$3,000</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Financial Indicators</CardTitle>
              <CardDescription>View your key financial indicators.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="indicator-grid">
                <div>
                  <div className="indicator-value">25%</div>
                  <div className="indicator-description">Profit Margin</div>
                </div>
                <div>
                  <div className="indicator-value">1.5</div>
                  <div className="indicator-description">Current Ratio</div>
                </div>
                <div>
                  <div className="indicator-value">30 days</div>
                  <div className="indicator-description">Average Collection Period</div>
                </div>
                <div>
                  <div className="indicator-value">45 days</div>
                  <div className="indicator-description">Average Payment Period</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <footer className="footer">
        <div className="footer-content">
          <div>&copy; 2023 SmartFinance. All rights reserved.</div>
          <div className="footer-links">
            <Link to="/terms">Terms of Service</Link>
            <Link to="/privacy">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
