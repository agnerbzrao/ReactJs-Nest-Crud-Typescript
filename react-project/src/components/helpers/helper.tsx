const convertCentavosReal = (centavos:unknown): string => {
    const numberDivided = Number(centavos) / 100
    return numberDivided.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
  } 

export default convertCentavosReal