import { game } from "./game";

if (process.env.NODE_ENV !== "test") {
  const { getSuggest, userInput, checkIsDone } = game();
  const reader = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  console.log(
    [
      "-----",
      "0: 単語に含まれない (黒)",
      "1: 単語に含まれるが位置が違う (黄)",
      "2: 合っている (緑)",
      "例: 提案された単語を入力して、黒黄黒緑緑と返ってきた場合、 01022 と入力",
      "または単語がなかった場合は '-' と入力",
      "-----",
      `提案: ${getSuggest()}`,
    ].join("\n")
  );
  reader.on("line", (line: string) => {
    try {
      userInput(line);
    } catch (e: any) {
      console.error(e.message);
    }
    if (checkIsDone()) {
      console.log("\n🎉 congratulations!!");
      process.exit(0);
    }
    console.log(`\n-----\n提案: ${getSuggest()}`);
  });
  reader.on("close", () => {
    console.log("bye");
  });
}
