// file: src/utils/forfiles.ts
import { fields, FormFields } from '../types/formFields';

export const getFieldsByEndpoint = (endpoint: string): FormFields[keyof FormFields] => {
  // Extraemos el nombre del endpoint para que coincida con las claves de "fields"
  const endpointName = endpoint.split('/api/')[1] as keyof FormFields;

  // Verificamos si el nombre del endpoint es válido
  if (fields[endpointName]) {
    return fields[endpointName];
  }

  // En caso de que no haya un endpoint válido, lanzamos un error o retornamos un arreglo vacío
  throw new Error(`Endpoint no válido: ${endpoint}`);
};
