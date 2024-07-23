const express = require('express')//
const cors = require('cors')
const app = express()
const errorHandler = require('./middleware/errorHandler');

//configuration 
app.set('port', process.env.PORT || 4000)//seteamos la variable port, le pasamos en el segundo parametro es una variable de entorno PORT 4000

//middlewares
app.use(cors())
app.use(express.json())

//rutas
app.get('/', (req, res)=> {
    res.send('Api de Tareas');
})

// Routes
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/businesses', require('./routes/business.routes'));
app.use('/api/productServices', require('./routes/productService.routes'));
app.use('/api/sales', require('./routes/sales.routes'));
app.use('/api/productionCosts', require('./routes/productionCost.routes'));
app.use('/api/operatingCosts', require('./routes/operatingCost.routes'));
app.use('/api/financialExpenses', require('./routes/financialExpense.routes'));
app.use('/api/financialIndicators', require('./routes/financialIndicator.routes'));
app.use('/api/incomeStatements', require('./routes/incomeStatement.routes'));

// Error Handler
app.use(errorHandler);


module.exports = app;