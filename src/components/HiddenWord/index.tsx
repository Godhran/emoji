import { useGameContext } from "../../context";
import Parser from "html-react-parser";

const HiddenWord = () => {
  const { guessedCharacters, cipheredStringArray, phraseArray, hasSolved, animationTiming } =
    useGameContext();

  if (
    !cipheredStringArray ||
    cipheredStringArray.length === 0 ||
    !phraseArray ||
    phraseArray.length === 0
  ) {
    return <></>;
  }

  const generatedGroupedHTML = () => {
    let html = "";

    cipheredStringArray.map((cipher, index) => {
      const character = phraseArray[index];
      const isGuessed = guessedCharacters.includes(character.toLowerCase());
      const letterClassName = `${
        cipher === " "
          ? "space-letter"
          : hasSolved
          ? "solved-letter"
          : isGuessed
          ? "guessed-letter hidden-letter"
          : ""
      } hidden-letter`;
      const isCompleteWord =
        cipheredStringArray[index + 1] &&
        (cipheredStringArray[index + 1] === " " ||
          cipheredStringArray[index + 1] === "," ||
          cipheredStringArray[index + 1] === ".");
      if (index === 0) {
        html += `<div class='flex flex-row'>`;
      }
      html += `<div key="${cipher}_${index}" class="${letterClassName}" style="${`animation-delay:${
        (hasSolved ? animationTiming : 0) * index
      }s`}">${isGuessed ? character : cipher}</div>${
        isCompleteWord ? `</div><div class='flex flex-row'>` : ""
      }`;
      return [];
    });

    return Parser(html);
  };

  return (
    <div className={hasSolved ? "collapse-word" : ""}>
      <div className="flex flex-row flex-wrap max-w-[300px] mx-auto justify-center mt-5">
        {generatedGroupedHTML()}
      </div>
    </div>
  );
};

export default HiddenWord;
