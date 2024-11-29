// src/types/formFields.ts

export type FieldType = 'text' | 'number' | 'date';

export interface Field {
  name: string;
  label: string;
  type: FieldType;
  required: boolean;
  validationMessage: string;
}

export interface FormFields {
  business: Field[];
  indicator: Field[];
  cost: Field[];
  product: Field[];
  report: Field[];
  sales: Field[];
}

// Mantenemos el objeto de campos como está.
export const fields: FormFields = {
  business: [
    { name: 'name', label: 'Nombre', type: 'text', required: true, validationMessage: 'El nombre es obligatorio' },
    { name: 'description', label: 'Descripción', type: 'text', required: false, validationMessage: '' },
  ],
  indicator: [
    { name: 'businessId', label: 'ID del Negocio', type: 'text', required: true, validationMessage: 'El ID es obligatorio' },
    { name: 'fecha', label: 'Fecha', type: 'date', required: true, validationMessage: 'La fecha es obligatoria' },
    { name: 'beneficioBruto', label: 'Beneficio Bruto', type: 'number', required: true, validationMessage: 'Campo requerido' },
    { name: 'beneficioNeto', label: 'Beneficio Neto', type: 'number', required: true, validationMessage: 'Campo requerido' },
    { name: 'margenBeneficioBruto', label: 'Margen Beneficio Bruto', type: 'number', required: true, validationMessage: 'Campo requerido' },
    { name: 'margenBeneficioNeto', label: 'Margen Beneficio Neto', type: 'number', required: true, validationMessage: 'Campo requerido' },
  ],
  cost: [
    { name: 'businessId', label: 'ID del Negocio', type: 'text', required: true, validationMessage: 'El ID del negocio es obligatorio' },
    { name: 'tipoGasto', label: 'Tipo de Gasto', type: 'text', required: true, validationMessage: 'El tipo de gasto es obligatorio' },
    { name: 'monto', label: 'Monto', type: 'number', required: true, validationMessage: 'El monto es obligatorio' },
  ],
  product: [
    { name: 'name', label: 'Nombre', type: 'text', required: true, validationMessage: 'El nombre es obligatorio' },
    { name: 'description', label: 'Descripción', type: 'text', required: false, validationMessage: '' },
    { name: 'price', label: 'Precio', type: 'number', required: true, validationMessage: 'El precio es obligatorio' },
    { name: 'businessId', label: 'ID del Negocio', type: 'text', required: true, validationMessage: 'El ID del negocio es obligatorio' },
  ],
  report: [
    { name: 'businessId', label: 'ID del Negocio', type: 'text', required: true, validationMessage: 'El ID del negocio es obligatorio' },
    { name: 'periodo', label: 'Periodo', type: 'text', required: true, validationMessage: 'El periodo es obligatorio' },
    { name: 'ingresos', label: 'Ingresos', type: 'number', required: true, validationMessage: 'Los ingresos son obligatorios' },
    { name: 'costos', label: 'Costos', type: 'number', required: true, validationMessage: 'Los costos son obligatorios' },
    { name: 'gastosOperativos', label: 'Gastos Operativos', type: 'number', required: true, validationMessage: 'Los gastos operativos son obligatorios' },
    { name: 'gastosFinancieros', label: 'Gastos Financieros', type: 'number', required: true, validationMessage: 'Los gastos financieros son obligatorios' },
    { name: 'beneficioBruto', label: 'Beneficio Bruto', type: 'number', required: true, validationMessage: 'El beneficio bruto es obligatorio' },
    { name: 'beneficioNeto', label: 'Beneficio Neto', type: 'number', required: true, validationMessage: 'El beneficio neto es obligatorio' },
  ],
  sales: [
    { name: 'businessId', label: 'ID del Negocio', type: 'text', required: true, validationMessage: 'El ID del negocio es obligatorio' },
    { name: 'productServiceId', label: 'Producto/Servicio', type: 'text', required: true, validationMessage: 'El producto/servicio es obligatorio' },
    { name: 'fecha', label: 'Fecha', type: 'date', required: true, validationMessage: 'La fecha es obligatoria' },
    { name: 'precioVenta', label: 'Precio de Venta', type: 'number', required: true, validationMessage: 'El precio de venta es obligatorio' },
    { name: 'cantidadVendida', label: 'Cantidad Vendida', type: 'number', required: true, validationMessage: 'La cantidad vendida es obligatoria' },
    { name: 'ingresoTotal', label: 'Ingreso Total', type: 'number', required: true, validationMessage: 'El ingreso total es obligatorio' },
  ],
};
