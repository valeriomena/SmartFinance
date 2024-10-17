/**
 * Archivo principal de la aplicación Express para la API.
 * 
 * Este archivo configura el servidor Express, define los middlewares necesarios,
 * establece las rutas públicas y protegidas, y maneja errores globales.
 * 
 * @module app
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./database');
const { authenticateToken, authorizeRoles } = require('./middleware/authenticateToken'); // Importar middlewares de autenticación

const app = express();

/**
 * Configuración del puerto.
 * 
 * Define el puerto en el que correrá el servidor. Utiliza el puerto especificado
 * en la variable de entorno `PORT`, o por defecto el 4000.
 */
const PORT = process.env.PORT || 4000;
app.set('port', PORT);

/**
 * Middleware CORS y JSON.
 * 
 * Se habilita CORS para permitir solicitudes desde diferentes orígenes,
 * y se configura `express.json()` para permitir el manejo de cuerpos de solicitudes en formato JSON.
 */
app.use(cors());
app.use(express.json());

/**
 * Rutas públicas (no requieren autenticación).
 * 
 * - `POST /api/users`: Ruta para el registro de usuarios.
 * - `POST /api/users/login`: Ruta para el inicio de sesión.
 * 
 * Estas rutas están abiertas para cualquier usuario sin necesidad de estar autenticado.
 * 
 * @name /api/users
 */
app.use('/api/users', require('./routes/user.routes')); // La ruta para registro y login no requiere autenticación

/**
 * Rutas protegidas por autenticación y roles.
 * 
 * Las siguientes rutas están protegidas por el middleware `authenticateToken`, lo que significa que
 * el usuario debe estar autenticado para acceder. Algunas rutas pueden estar protegidas por roles específicos.
 * 
 * - `GET /api/businesses`: Rutas relacionadas con la gestión de negocios.
 * - `GET /api/productServices`: Rutas relacionadas con la gestión de productos/servicios.
 * - `GET /api/sales`: Rutas relacionadas con las ventas.
 * - `GET /api/productionCosts`: Rutas relacionadas con los costos de producción.
 * - `GET /api/operatingCosts`: Rutas relacionadas con los costos operativos.
 * - `GET /api/financialExpenses`: Rutas relacionadas con los gastos financieros.
 * - `GET /api/financialIndicators`: Rutas relacionadas con los indicadores financieros.
 * - `GET /api/incomeStatements`: Rutas relacionadas con los estados de resultados.
 * 
 * @name /api/businesses
 * @name /api/productServices
 * @name /api/sales
 * @name /api/productionCosts
 * @name /api/operatingCosts
 * @name /api/financialExpenses
 * @name /api/financialIndicators
 * @name /api/incomeStatements
 */
app.use('/api/businesses', authenticateToken, require('./routes/business.routes')); // Solo usuarios autenticados
app.use('/api/productServices', authenticateToken, require('./routes/productService.routes')); // Solo usuarios autenticados
app.use('/api/sales', authenticateToken, require('./routes/sales.routes')); // Solo usuarios autenticados
app.use('/api/productionCosts', authenticateToken, require('./routes/productionCost.routes')); // Solo usuarios autenticados
app.use('/api/operatingCosts', authenticateToken, require('./routes/operatingCost.routes')); // Solo usuarios autenticados
app.use('/api/financialExpenses', authenticateToken, require('./routes/financialExpense.routes')); // Solo usuarios autenticados
app.use('/api/financialIndicators', authenticateToken, require('./routes/financialIndicator.routes')); // Solo usuarios autenticados
app.use('/api/incomeStatements', authenticateToken, require('./routes/incomeStatement.routes')); // Solo usuarios autenticados

/**
 * Middleware global de manejo de errores.
 * 
 * Cualquier error que ocurra en la aplicación será manejado por este middleware.
 * En modo de producción, se mostrará un mensaje de error genérico; en desarrollo,
 * se mostrará el stack trace para ayudar en la depuración.
 * 
 * @function errorHandler
 * @see module:middleware/errorHandler
 */
app.use(errorHandler);

module.exports = app;
