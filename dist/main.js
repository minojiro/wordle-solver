var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var main_exports = {};
__export(main_exports, {
  filterWord: () => filterWord,
  getUserInput: () => getUserInput,
  getWordList: () => getWordList,
  initializeFilterParam: () => initializeFilterParam,
  main: () => main,
  setFilter: () => setFilter,
  validateUserInput: () => validateUserInput
});
module.exports = __toCommonJS(main_exports);
var import_word_list_json = __toESM(require("word-list-json"));
var import_inquirer = __toESM(require("inquirer"));
const ALPHABETS = "abcdefghijklmnopqrstuvwxyz".split("");
const filterWord = (word, filterParam) => {
  return !filterParam.letters.some((lSet, i) => !lSet.has(word[i])) && !filterParam.required.some((c) => !word.includes(c));
};
const validateUserInput = (value) => {
  return /^[123]{5}$/.test(value);
};
const setFilter = (word, userIn, filterParam) => {
  userIn.split("").forEach((userInChar, i) => {
    const wordChar = word[i];
    if (userInChar === "1") {
      filterParam.letters.forEach((l) => l.delete(wordChar));
    } else if (userInChar === "2") {
      filterParam.letters[i].delete(wordChar);
      filterParam.required.push(wordChar);
    } else {
      filterParam.letters[i].clear();
      filterParam.letters[i].add(wordChar);
    }
  });
  filterParam.required = Array.from(new Set(filterParam.required));
  return filterParam;
};
const getWordList = () => {
  const list = [];
  const wordScore = Object.fromEntries(ALPHABETS.map((c) => [c, 0]));
  import_word_list_json.default.forEach((w) => {
    if (w.length === 5) {
      w.split("").forEach((c) => wordScore[c]++);
      list.push(w);
    }
  });
  const calcScore = (w) => {
    const uniqueChars = Array.from(new Set(w.split("")));
    return uniqueChars.reduce((tot, c) => tot + wordScore[c] + 1e3, 0);
  };
  list.sort((a, b) => calcScore(b) - calcScore(a));
  return list;
};
const initializeFilterParam = () => ({
  letters: Array.from({ length: 5 }, () => new Set(ALPHABETS)),
  required: []
});
const getUserInput = async (word) => {
  while (1) {
    const { userIn } = await import_inquirer.default.prompt([
      {
        name: "userIn",
        message: `How about "${word.toUpperCase()}"?`
      }
    ]);
    if (!validateUserInput(userIn)) {
      console.log("input is invalid.");
      continue;
    }
    return userIn;
  }
};
const main = async () => {
  const filterParam = initializeFilterParam();
  const words = getWordList();
  console.log("\u{1F973} Input response from Wordle by 5 letters.\n1: gray, 2: yellow, 3: green (e.g 11123)");
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (!filterWord(word, filterParam)) {
      continue;
    }
    const userInput = await getUserInput(word);
    if (userInput === "33333") {
      console.log("Congratulations \u{1F389}");
      return;
    }
    setFilter(word, userInput, filterParam);
  }
  console.log("\u{1F937}");
};
if (process.env.NODE_ENV !== "test") {
  main();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  filterWord,
  getUserInput,
  getWordList,
  initializeFilterParam,
  main,
  setFilter,
  validateUserInput
});
