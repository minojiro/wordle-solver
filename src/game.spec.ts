import { game } from "./game";

describe("game", () => {
  it("collect", () => {
    const ANSWER = "vinyl";
    const ANSWER_ARR = ANSWER.split("");
    const { userInput, getSuggest } = game();
    let won = false;
    for (let i = 0; i < 7; i++) {
      const theSuggest = getSuggest();
      if (theSuggest === ANSWER) {
        won = true;
        break;
      }
      const hint = theSuggest
        .split("")
        .map((c, i) => {
          if (c === ANSWER_ARR[i]) return "2";
          if (ANSWER_ARR.includes(c)) return "1";
          return "0";
        })
        .join("");
      userInput(hint);
    }
    expect(won).toBeTruthy();
  });

  it("invalid userInput", () => {
    const { userInput } = game();
    expect(() => userInput("abcde")).toThrowError();
  });

  it("checkIsDone", () => {
    const { userInput, checkIsDone } = game();
    expect(checkIsDone()).toBe(false);
    userInput("22222");
    expect(checkIsDone()).toBe(true);
  });
});
