const priceLiterals = [
  [0, "бесплатно"],
  [10, "почти бесплатно"],
  [20, "очень дёшево"],
  [40, "дёшево"],
  [80, "нормально"],
  [120, "немного дорого"],
  [160, "дорого"],
  [200, "очень дорого"],
  [500, "дорого как чугунный мост"],
] as const;

export const getPriceLiteral = (price: number) => {
  for (let i = 0; i < priceLiterals.length; i++) {
    if (price <= priceLiterals[i][0]) {
      return priceLiterals[i][1];
    }
  }
  return priceLiterals[priceLiterals.length - 1][1];
};
