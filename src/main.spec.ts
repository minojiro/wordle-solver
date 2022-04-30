import { describe, it, expect } from "vitest";

import {
  getWordList,
  FilterParam,
  setFilter,
  filterWord,
  validateUserInput,
} from "./main";

describe("getWordList", () => {
  it("has words", () => {
    const r = getWordList();
    expect(r[0]).toBe("arose");
    expect(r.length).greaterThan(0);
  });
});

const getMockFilter = (): FilterParam => ({
  letters: [
    new Set(["a", "h"]),
    new Set(["p", "e"]),
    new Set(["p", "l"]),
    new Set(["l", "l"]),
    new Set(["e", "o"]),
  ],
  required: ["p"],
});

describe("filterWord", () => {
  const filterParam = getMockFilter();
  it("filterWord", () => {
    expect(filterWord("apple", filterParam)).toBe(true);
    expect(filterWord("bpple", filterParam)).toBe(false);
    expect(filterWord("applc", filterParam)).toBe(false);
  });
});

describe("validateUserInput", () => {
  it("validateUserInput", () => {
    expect(validateUserInput("12333")).toBe(true);
    expect(validateUserInput("00000")).toBe(false);
    expect(validateUserInput("1111")).toBe(false);
    expect(validateUserInput("111111")).toBe(false);
    expect(validateUserInput("")).toBe(false);
  });
});

describe("setFilter", () => {
  it("correct", () => {
    const d = getMockFilter();
    setFilter("apple", "33333", d);
    expect(d.letters.every((set) => Array.from(set).length === 1)).toBe(true);
  });

  it("present", () => {
    const d = getMockFilter();
    setFilter("apple", "21111", d);
    expect(d.letters[0].has("a")).toBe(false);
    expect(d.required.includes("a")).toBe(true);
  });

  it("incorrect", () => {
    const d = getMockFilter();
    setFilter("apple", "11111", d);
    expect(d.letters[0].has("a")).toBe(false);
    expect(d.letters[1].has("p")).toBe(false);
    expect(d.letters[2].has("p")).toBe(false);
    expect(d.letters[3].has("l")).toBe(false);
    expect(d.letters[4].has("e")).toBe(false);
  });
});
