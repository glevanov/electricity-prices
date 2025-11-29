import { describe, expect, it } from "vitest";
import { getPriceLiteral } from "./get-price-literal";

describe("getPriceLiteral", () => {
  it.each([
    { price: -5, literal: "бесплатно" },
    { price: 0, literal: "бесплатно" },
    { price: 1, literal: "почти бесплатно" },
    { price: 9, literal: "почти бесплатно" },
    { price: 10, literal: "почти бесплатно" },
    { price: 11, literal: "очень дёшево" },
    { price: 39, literal: "дёшево" },
    { price: 69, literal: "обычная цена" },
    { price: 499, literal: "дорого как чугунный мост" },
    { price: 501, literal: "дорого как чугунный мост" },
    { price: 20002030, literal: "дорого как чугунный мост" },
  ])("should return correct price literal", ({ price, literal }) => {
    expect(getPriceLiteral(price)).toBe(literal);
  });
});
