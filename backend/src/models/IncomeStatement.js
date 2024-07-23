const { Schema, model } = require('mongoose');

const incomeStatementSchema = new Schema({
    businessId: { type: Schema.Types.ObjectId, ref: 'Business', required: true },
    periodo: { type: String, required: true }, // Por ejemplo: '2023-Q1'
    ingresos: { type: Number, required: true },
    costos: { type: Number, required: true },
    gastos_operativos: { type: Number, required: true },
    gastos_financieros: { type: Number, required: true },
    beneficio_bruto: { type: Number, required: true },
    beneficio_neto: { type: Number, required: true }
}, { timestamps: true });

module.exports = model('IncomeStatement', incomeStatementSchema);
