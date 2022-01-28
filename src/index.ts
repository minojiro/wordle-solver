import { RAW_WORDS } from "./words";

const ANSWER_CHAR_COUNT = 5;

const letterCount = RAW_WORDS.reduce((letterCount, word) => {
  word.split("").forEach((c) => (letterCount[c] = (letterCount[c] || 0) + 1));
  return letterCount;
}, {});

const scoreWord = (s: string) => {
  const charSet = new Set(s.split(""));
  return Array.from(charSet).reduce(
    (sum, char) => (sum += letterCount[char] + 20000),
    0
  );
};

export const words = RAW_WORDS.sort((a, b) => scoreWord(b) - scoreWord(a));

const allAlp = "abcdefghijklmnopqrstuvwxyz".split("");
type ResultCell = "A" | "P" | "C";

export function Wordle() {
  let possibleChars: string[][] = Array(ANSWER_CHAR_COUNT).fill(allAlp);
  const presentLetters = new Set<string>();
  const noMatchWords = new Set<string>();

  const set = (word: string, result: ResultCell[] | null) => {
    if (!result) {
      noMatchWords.add(word);
      return;
    }
    const wordArr = word.split("");
    result.forEach((r, i) => {
      const char = wordArr[i];
      if (r === "C") {
        possibleChars[i] = [char];
      } else if (r === "P") {
        presentLetters.add(char);
        possibleChars[i] = possibleChars[i].filter((c) => c !== char);
      } else {
        if (presentLetters.has(char)) return;
        possibleChars = possibleChars.map((cs) => cs.filter((c) => c !== char));
      }
    });
  };

  const suggest = () => {
    const presentCharsArr = Array.from(presentLetters);
    return words.find((word) => {
      if (noMatchWords.has(word)) {
        return false;
      }
      const chars = word.split("");
      if (
        presentCharsArr.length &&
        presentCharsArr.some((letter) => !chars.includes(letter))
      ) {
        return false;
      }
      return chars.every((c, i) => possibleChars[i].includes(c));
    });
  };

  return { suggest, set };
}
