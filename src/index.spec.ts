import { Wordle } from "./";

describe("wordle", () => {
  it("solve", () => {
    // A: absent / P: present / C: correct
    const wordle = Wordle();
    wordle.set("arose", ["A", "P", "A", "A", "P"]);
    wordle.set("relit", ["P", "C", "A", "A", "A"]);
    wordle.set("demur", ["A", "C", "A", "A", "P"]);
    wordle.set("henry", ["A", "C", "A", "P", "C"]);
    const suggest = wordle.suggest();
    console.log(suggest);
    expect(suggest).toBe("perky");
  });

  it("skip", () => {
    const wordle = Wordle();
    const firstSuggest = wordle.suggest();
    wordle.set(firstSuggest, null);
    expect(wordle.suggest()).not.toBe(firstSuggest);
  });
});
