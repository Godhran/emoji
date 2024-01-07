import { useGameContext } from "../../context";
import Parser from "html-react-parser";

const HiddenWord = () => {
  const {
    guessedCharacters,
    cipheredStringArray,
    phraseArray,
    hasSolved,
    animationTiming,
  } = useGameContext();

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

    cipheredStringArray.map((emoji, index) => {
      const character = phraseArray[index];
      const isGuessed = guessedCharacters.includes(character.toLowerCase());
      const letterClassName = `${
        emoji === " "
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

      html += `<div key="emoji_${index}" class="${letterClassName} flex justify-center align-center content-center flex-wrap" style="${`animation-delay:${
        (hasSolved ? animationTiming : 0) * index
      }s`}">${
        isGuessed || /[^A-Za-z]/.test(character)
          ? character
          : `<img className="emoji" src="${emoji}" alt="Emoji"/>`
      }</div>${isCompleteWord ? `</div><div class='flex flex-row'>` : ""}`;
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
