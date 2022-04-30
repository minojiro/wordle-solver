import ALL_WORDS from "word-list-json";
import inquirer from "inquirer";

declare var ALL_WORDS: string[];

const ALPHABETS = "abcdefghijklmnopqrstuvwxyz".split("");

export type FilterParam = {
  letters: Set<string>[];
  required: string[];
};

export const filterWord = (word: string, filterParam: FilterParam): boolean => {
  return (
    !filterParam.letters.some((lSet, i) => !lSet.has(word[i])) &&
    !filterParam.required.some((c) => !word.includes(c))
  );
};

export const validateUserInput = (value): boolean => {
  return /^[123]{5}$/.test(value);
};

export const setFilter = (
  word: string,
  userIn: string,
  filterParam: FilterParam
): FilterParam => {
  userIn.split("").forEach((userInChar, i) => {
    const wordChar = word[i];
    if (userInChar === "1") {
      // gray
      filterParam.letters.forEach((l) => l.delete(wordChar));
    } else if (userInChar === "2") {
      // yellow
      filterParam.letters[i].delete(wordChar);
      filterParam.required.push(wordChar);
    } else {
      // green
      filterParam.letters[i].clear();
      filterParam.letters[i].add(wordChar);
    }
  });
  filterParam.required = Array.from(new Set(filterParam.required));
  return filterParam;
};

export const getWordList = () => {
  const list: string[] = [];
  const wordScore = Object.fromEntries(ALPHABETS.map((c) => [c, 0]));
  ALL_WORDS.forEach((w) => {
    if (w.length === 5) {
      w.split("").forEach((c) => wordScore[c]++);
      list.push(w);
    }
  });
  const calcScore = (w: string): number => {
    const uniqueChars = Array.from<string>(new Set(w.split("")));
    return uniqueChars.reduce((tot, c) => tot + wordScore[c] + 1000, 0);
  };
  list.sort((a, b) => calcScore(b) - calcScore(a));
  return list;
};

export const initializeFilterParam = (): FilterParam => ({
  letters: Array.from({ length: 5 }, () => new Set(ALPHABETS)),
  required: [],
});

export const getUserInput = async (word: string): Promise<string> => {
  while (1) {
    const { userIn } = await inquirer.prompt([
      {
        name: "userIn",
        message: `How about "${word.toUpperCase()}"?`,
      },
    ]);
    if (!validateUserInput(userIn)) {
      console.log("input is invalid.");
      continue;
    }
    return userIn;
  }
};

export const main = async () => {
  const filterParam = initializeFilterParam();
  const words = getWordList();

  console.log(
    "🥳 Input response from Wordle by 5 letters.\n1: gray, 2: yellow, 3: green (e.g 11123)"
  );

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (!filterWord(word, filterParam)) {
      continue;
    }
    const userInput = await getUserInput(word);
    if (userInput === "33333") {
      console.log("Congratulations 🎉");
      return;
    }
    setFilter(word, userInput, filterParam);
  }
  console.log("🤷");
};

if (process.env.NODE_ENV !== "test") {
  main();
}
