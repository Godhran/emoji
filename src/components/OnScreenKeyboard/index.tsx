import "../../App.css";
import { useGameContext } from "../../context";
import "../../styles/css/keyboard.css";

const keyRows = {
  top: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  middle: ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  bottom: ["z", "x", "c", "v", "b", "n", "m"],
};

const OnScreenKeyboard = () => {
  const {
    guessedCharacters,
    guessCharacter,
    target,
    cipheredStringArray,
    phraseArray,
    hasSolved,
  } = useGameContext();

  const getKeyClass = (letter: string) => {
    if (guessedCharacters.includes(letter.toLowerCase())) {
      if (target?.title.toLowerCase().includes(letter.toLowerCase())) {
        return "keyboard-key correct-character";
      }
      return "keyboard-key wrong-character";
    }
    return "keyboard-key";
  };

  const getKey = (letter: string) => {
    if (guessedCharacters.includes(letter.toLowerCase())) {
      if (
        target?.title.toLowerCase().includes(letter.toLowerCase()) &&
        !!phraseArray &&
        !!cipheredStringArray
      ) {
        let index = phraseArray?.indexOf(letter.toLowerCase());

        if (index < 0) {
          index = phraseArray?.indexOf(letter.toUpperCase());
        }

        if (cipheredStringArray[index]) {
          return (
            <img
              className="emoji"
              src={cipheredStringArray[index]}
              alt="Emoji"
            />
          );
        }

        return "";
      }
      return "X";
    }

    return letter;
  };

  return (
    <div className={hasSolved ? "keyboard-solved grid w-full" : "grid w-full"}>
      <div className={"keyboard-container mx-auto w-full"}>
        <div className={"flex flex-row justify-between"}>
          {keyRows.top.map((key, index) => (
            <div key={`${key}_${index}`} style={{ width: "100%" }}>
              <div
                className={`${getKeyClass(key)} ${
                  index > 0 ? "" : ""
                }flex flex-wrap`}
                onClick={() => guessCharacter(key)}
              >
                {getKey(key)}
              </div>
            </div>
          ))}
        </div>
        <div
          className={
            "flex flex-row justify-between max-width-[90%] mx-auto mt-1"
          }
          style={{ width: "90%" }}
        >
          {keyRows.middle.map((key, index) => (
            <div key={`${key}_${index}`}>
              <div
                key={`${key}_${index}`}
                className={`${getKeyClass(key)} ${
                  index > 0 ? "" : ""
                } flex flex-wrap`}
                onClick={() => guessCharacter(key)}
              >
                {getKey(key)}
              </div>
            </div>
          ))}
        </div>
        <div
          className={
            "flex flex-row justify-between max-width-[90%] mx-auto mt-1"
          }
          style={{ width: "90%" }}
        >
          <div className={"keyboard-key-placeholder"} />
          {keyRows.bottom.map((key, index) => (
            <div key={`${key}_${index}`}>
              <div
                key={`${key}_${index}`}
                className={`${getKeyClass(key)} ${
                  index > 0 ? "" : ""
                } flex flex-wrap`}
                onClick={() => guessCharacter(key)}
              >
                {getKey(key)}
              </div>
            </div>
          ))}
          <div className={"keyboard-key-placeholder"} />
        </div>
      </div>
    </div>
  );
};

export default OnScreenKeyboard;
