require('dotenv').config();
const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./database');
const { authenticateToken, authorizeRoles } = require('./middleware/authenticateToken'); // Importar middlewares de autenticación

const app = express();

// Configuración del puerto
const PORT = process.env.PORT || 4000;
app.set('port', PORT);

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas públicas (sin autenticación requerida)
app.use('/api/users', require('./routes/user.routes')); // La ruta para registro y login no requiere autenticación

// Rutas protegidas por autenticación y roles
app.use('/api/businesses', authenticateToken, require('./routes/business.routes')); // Solo usuarios autenticados
app.use('/api/productServices', authenticateToken, require('./routes/productService.routes')); // Solo usuarios autenticados
app.use('/api/sales', authenticateToken, require('./routes/sales.routes')); // Solo usuarios autenticados
app.use('/api/productionCosts', authenticateToken, require('./routes/productionCost.routes')); // Solo usuarios autenticados
app.use('/api/operatingCosts', authenticateToken, require('./routes/operatingCost.routes')); // Solo usuarios autenticados
app.use('/api/financialExpenses', authenticateToken, require('./routes/financialExpense.routes')); // Solo usuarios autenticados
app.use('/api/financialIndicators', authenticateToken, require('./routes/financialIndicator.routes')); // Solo usuarios autenticados
app.use('/api/incomeStatements', authenticateToken, require('./routes/incomeStatement.routes')); // Solo usuarios autenticados

// Middleware de Error
app.use(errorHandler);

module.exports = app;
