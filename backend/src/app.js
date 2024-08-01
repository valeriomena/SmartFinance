// app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./database');

const app = express();

// Configuración del puerto
const PORT = process.env.PORT || 4000;
app.set('port', PORT);

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/businesses', require('./routes/business.routes'));
app.use('/api/productServices', require('./routes/productService.routes'));
app.use('/api/sales', require('./routes/sales.routes'));
app.use('/api/productionCosts', require('./routes/productionCost.routes'));
app.use('/api/operatingCosts', require('./routes/operatingCost.routes'));
app.use('/api/financialExpenses', require('./routes/financialExpense.routes'));
app.use('/api/financialIndicators', require('./routes/financialIndicator.routes'));
app.use('/api/incomeStatements', require('./routes/incomeStatement.routes'));

// Middleware de Error
app.use(errorHandler);

module.exports = app;
