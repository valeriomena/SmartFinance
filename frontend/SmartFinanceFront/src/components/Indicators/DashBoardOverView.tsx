import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '../Indicators/Card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../Indicators/Table';
import { Badge } from '../Indicators/Badge';
import './DashBoardOverView.modules.css';

const DashBoardOverView: React.FC = () => {
  const navigate = useNavigate();

  const navigateTo = (path: string) => {
    navigate(path);
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-left">
          <h1>SmartFinance</h1>
        </div>
        <nav className="header-nav">
          <button onClick={() => navigateTo('/dashboard')} className="nav-button">Dashboard</button>
          <button onClick={() => navigateTo('/products')} className="nav-button">Products</button>
          <button onClick={() => navigateTo('/sales')} className="nav-button">Sales</button>
          <button onClick={() => navigateTo('/costs')} className="nav-button">Costs</button>
          <button onClick={() => navigateTo('/reports')} className="nav-button">Reports</button>
          <button onClick={() => navigateTo('/settings')} className="nav-button">Settings</button>
        </nav>
      </header>
      <main className="dashboard-main">
        <div className="cards-container">
          <Card>
            <CardHeader>
              <div className="card-header">
                <h2>Sales Overview</h2>
              </div>
            </CardHeader>
            <CardContent>
              <div className="card-content">
                <div>
                  <h3>Total Sales</h3>
                  <p>$250,000</p>
                </div>
                <div>
                  <h3>YoY Growth</h3>
                  <p>+15%</p>
                </div>
                <div>
                  <h3>Avg. Order Value</h3>
                  <p>$75</p>
                </div>
                <div>
                  <h3>Conversion Rate</h3>
                  <p>3.5%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="card-header">
                <h2>Costs Overview</h2>
              </div>
            </CardHeader>
            <CardContent>
              <div className="card-content">
                <div>
                  <h3>Total Costs</h3>
                  <p>$150,000</p>
                </div>
                <div>
                  <h3>Gross Margin</h3>
                  <p>40%</p>
                </div>
                <div>
                  <h3>Production Costs</h3>
                  <p>$80,000</p>
                </div>
                <div>
                  <h3>Operating Costs</h3>
                  <p>$70,000</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="card-header">
                <h2>Products Overview</h2>
              </div>
            </CardHeader>
            <CardContent>
              <div className="card-content">
                <div>
                  <h3>Total Products</h3>
                  <p>25</p>
                </div>
                <div>
                  <h3>New Products</h3>
                  <p>5</p>
                </div>
                <div>
                  <h3>Best Seller</h3>
                  <p>Widget Pro</p>
                </div>
                <div>
                  <h3>Inventory Value</h3>
                  <p>$100,000</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="recent-sales">
          <h2>Recent Sales</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order #</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>1234</TableCell>
                <TableCell>John Doe</TableCell>
                <TableCell>2023-04-15</TableCell>
                <TableCell>$250.00</TableCell>
                <TableCell><Badge variant="success">Paid</Badge></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>5678</TableCell>
                <TableCell>Jane Smith</TableCell>
                <TableCell>2023-04-12</TableCell>
                <TableCell>$150.00</TableCell>
                <TableCell><Badge variant="warning">Pending</Badge></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>9012</TableCell>
                <TableCell>Bob Johnson</TableCell>
                <TableCell>2023-04-10</TableCell>
                <TableCell>$350.00</TableCell>
                <TableCell><Badge variant="danger">Cancelled</Badge></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </main>
      <footer className="dashboard-footer">
        <p>&copy; 2023 SmartFinance. All rights reserved.</p>
        <div className="footer-links">
          <button onClick={() => navigateTo('/terms')} className="footer-link">Terms</button>
          <button onClick={() => navigateTo('/privacy')} className="footer-link">Privacy</button>
          <button onClick={() => navigateTo('/contact')} className="footer-link">Contact</button>
        </div>
      </footer>
    </div>
  );
};

export default DashBoardOverView;
