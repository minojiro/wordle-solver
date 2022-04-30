var import_vitest = require("vitest");
var import_main = require("./main");
(0, import_vitest.describe)("getWordList", () => {
  (0, import_vitest.it)("has words", () => {
    const r = (0, import_main.getWordList)();
    (0, import_vitest.expect)(r[0]).toBe("arose");
    (0, import_vitest.expect)(r.length).greaterThan(0);
  });
});
const getMockFilter = () => ({
  letters: [
    /* @__PURE__ */ new Set(["a", "h"]),
    /* @__PURE__ */ new Set(["p", "e"]),
    /* @__PURE__ */ new Set(["p", "l"]),
    /* @__PURE__ */ new Set(["l", "l"]),
    /* @__PURE__ */ new Set(["e", "o"])
  ],
  required: ["p"]
});
(0, import_vitest.describe)("filterWord", () => {
  const filterParam = getMockFilter();
  (0, import_vitest.it)("filterWord", () => {
    (0, import_vitest.expect)((0, import_main.filterWord)("apple", filterParam)).toBe(true);
    (0, import_vitest.expect)((0, import_main.filterWord)("bpple", filterParam)).toBe(false);
    (0, import_vitest.expect)((0, import_main.filterWord)("applc", filterParam)).toBe(false);
  });
});
(0, import_vitest.describe)("validateUserInput", () => {
  (0, import_vitest.it)("validateUserInput", () => {
    (0, import_vitest.expect)((0, import_main.validateUserInput)("12333")).toBe(true);
    (0, import_vitest.expect)((0, import_main.validateUserInput)("00000")).toBe(false);
    (0, import_vitest.expect)((0, import_main.validateUserInput)("1111")).toBe(false);
    (0, import_vitest.expect)((0, import_main.validateUserInput)("111111")).toBe(false);
    (0, import_vitest.expect)((0, import_main.validateUserInput)("")).toBe(false);
  });
});
(0, import_vitest.describe)("setFilter", () => {
  (0, import_vitest.it)("correct", () => {
    const d = getMockFilter();
    (0, import_main.setFilter)("apple", "33333", d);
    (0, import_vitest.expect)(d.letters.every((set) => Array.from(set).length === 1)).toBe(true);
  });
  (0, import_vitest.it)("present", () => {
    const d = getMockFilter();
    (0, import_main.setFilter)("apple", "21111", d);
    (0, import_vitest.expect)(d.letters[0].has("a")).toBe(false);
    (0, import_vitest.expect)(d.required.includes("a")).toBe(true);
  });
  (0, import_vitest.it)("incorrect", () => {
    const d = getMockFilter();
    (0, import_main.setFilter)("apple", "11111", d);
    (0, import_vitest.expect)(d.letters[0].has("a")).toBe(false);
    (0, import_vitest.expect)(d.letters[1].has("p")).toBe(false);
    (0, import_vitest.expect)(d.letters[2].has("p")).toBe(false);
    (0, import_vitest.expect)(d.letters[3].has("l")).toBe(false);
    (0, import_vitest.expect)(d.letters[4].has("e")).toBe(false);
  });
});
