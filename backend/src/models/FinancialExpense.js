const { Schema, model } = require('mongoose');

const financialExpenseSchema = new Schema({
    businessId: { type: Schema.Types.ObjectId, ref: 'Business', required: true },
    tipo_gasto_financiero: { type: String, required: true },
    monto: { type: Number, required: true }
}, { timestamps: true });

module.exports = model('FinancialExpense', financialExpenseSchema);
