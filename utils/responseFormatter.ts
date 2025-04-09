/**
 * Remove campos vazios (null, undefined, strings vazias, objetos vazios, arrays vazios) 
 * recursivamente de um objeto
 */
export const removeEmptyFields = (obj: any): any => {
  if (obj === null || obj === undefined) {
    return undefined;
  }

  // Se for um array, filtra os itens vazios
  if (Array.isArray(obj)) {
    const filteredArray = obj
      .map(removeEmptyFields)
      .filter(item => item !== undefined && item !== null);
    return filteredArray.length > 0 ? filteredArray : undefined;
  }

  // Se for um objeto, remove propriedades vazias
  if (typeof obj === 'object') {
    const result: any = {};
    let hasProperties = false;

    for (const key in obj) {
      const value = removeEmptyFields(obj[key]);
      if (value !== undefined && value !== null && value !== '') {
        result[key] = value;
        hasProperties = true;
      }
    }

    return hasProperties ? result : undefined;
  }

  // Retorna undefined para strings vazias
  if (obj === '') {
    return undefined;
  }

  // Retorna o valor original para outros tipos de dados
  return obj;
};
