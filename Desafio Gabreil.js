function encontrarRecintosViaveis(animal, quantidade) {

  const animais = {
    "LEAO": { tamanho: 3, biomas: ["savana"] },
    "LEOPARDO": { tamanho: 2, biomas: ["savana"] },
    "CROCODILO": { tamanho: 3, biomas: ["rio"] },
    "MACACO": { tamanho: 1, biomas: ["savana", "floresta"] },
    "GAZELA": { tamanho: 2, biomas: ["savana"] },
    "HIPOPOTAMO": { tamanho: 4, biomas: ["savana", "rio"] }
  };
  
  const recintos = [
    { numero: 1, bioma: "savana", tamanhoTotal: 10, animaisExistentes: [{ especie: "MACACO", quantidade: 3 }] },
    { numero: 2, bioma: "floresta", tamanhoTotal: 5, animaisExistentes: [] },
    { numero: 3, bioma: "savana e rio", tamanhoTotal: 7, animaisExistentes: [{ especie: "GAZELA", quantidade: 1 }] },
    { numero: 4, bioma: "rio", tamanhoTotal: 8, animaisExistentes: [] },
    { numero: 5, bioma: "savana", tamanhoTotal: 9, animaisExistentes: [{ especie: "LEAO", quantidade: 1 }] }
  ];

 
  if (!animais.hasOwnProperty(animal)) {
    return { erro: "Animal inválido" };
  }

  if (quantidade < 1 || !Number.isInteger(quantidade)) {
    return { erro: "Quantidade inválida" };
  }

  const infoAnimal = animais[animal];
  const recintosViaveis = [];

  for (let recinto of recintos) {
    const { bioma, tamanhoTotal, animaisExistentes, numero } = recinto;
    let espacoOcupado = animaisExistentes.reduce((total, a) => total + (animais[a.especie].tamanho * a.quantidade), 0);

   
    if (!infoAnimal.biomas.includes(bioma)) {
      continue;
    }

    const isCarnivoro = ["LEAO", "LEOPARDO", "CROCODILO"].includes(animal);
    const temOutraEspecie = animaisExistentes.some(a => a.especie !== animal);
    if (isCarnivoro && temOutraEspecie) {
      continue;
    }

   
    if (animal === "HIPOPOTAMO" && bioma !== "savana e rio" && temOutraEspecie) {
      continue;
    }

    if (animal === "MACACO" && quantidade === 1 && animaisExistentes.length === 0) {
      continue;
    }

    let espacoExtra = temOutraEspecie ? 1 : 0;
    let espacoNecessario = (infoAnimal.tamanho * quantidade) + espacoExtra;
    
    if (tamanhoTotal - espacoOcupado >= espacoNecessario) {
      recintosViaveis.push(`Recinto ${numero} (espaço livre: ${tamanhoTotal - espacoOcupado - espacoNecessario} total: ${tamanhoTotal})`);
    }
  }

  if (recintosViaveis.length > 0) {
    return { recintosViaveis };
  } else {
    return { erro: "Não há recinto viável" };
  }
}
