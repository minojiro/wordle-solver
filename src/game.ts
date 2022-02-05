import { WORDS } from "./words";

const ALPHABETS = "abcdefghijklmnopqrstuvwxyz".split("");

export const game = () => {
  let words = WORDS;

  let currentSuggest = words[0];

  // Cells filled with configurable characters.
  let cells: Set<string>[] = Array.from(
    { length: 5 },
    () => new Set(ALPHABETS)
  );

  const necessaryChars: Set<string> = new Set();

  const getSuggest = () => currentSuggest;

  const checkIsDone = () => cells.every((cell) => cell.size === 1);

  const userInput = (inputHints: string) => {
    if (inputHints === "-") {
      words = words.filter((word) => word !== currentSuggest);
    } else if (/^[012]{5}$/.test(inputHints)) {
      inputHints.split("").forEach((h, i) => {
        const char = currentSuggest[i];
        const cell = cells[i];
        if (h === "2") {
          cell.clear();
          cell.add(char);
        } else if (h === "1") {
          cell.delete(char);
          necessaryChars.add(char);
        } else {
          cells.forEach((l) => l.delete(char));
        }
      });
    } else {
      throw new Error("入力が正しくありません");
    }
    const necessaryCharsArr = Array.from(necessaryChars);
    const nextSuggest = words.find(
      (word) =>
        word.split("").every((l, i) => cells[i].has(l)) &&
        necessaryCharsArr.every((l) => word.includes(l))
    );
    if (nextSuggest) {
      currentSuggest = nextSuggest;
    } else {
      console.log(necessaryChars, cells);
      throw new Error("見つかりませんでした");
    }
  };

  return { getSuggest, userInput, checkIsDone };
};
