import "../../App.css";
import { useGameContext } from "../../context";
import "../../styles/css/keyboard.css";
import Emojo from "../../assets/images/web/emojo_32.png";

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
    hasFailed,
    wrongGuesses,
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
      if (target?.title.toLowerCase().includes(letter.toLowerCase())) {
        const letterIndex = phraseArray.findIndex(
          (item) => item.toLowerCase() === letter.toLowerCase()
        );

        if (cipheredStringArray[letterIndex]) {
          return (
            <img
              className="emoji"
              src={cipheredStringArray[letterIndex]}
              alt="Emoji"
            />
          );
        }

        return "";
      }

      return <img className="emoji" src={Emojo} alt="Wrong answer" />;
    }
    return letter;
  };

  return (
    <div
      className={
        hasSolved || hasFailed ? "keyboard-solved grid w-full" : "grid w-full"
      }
    >
      <div className="w-full h-[40px] flex flex-row justify-center mb-2">
        <div className="flex flex-row justify-between align-center content-center h-[40px] w-32 self-auto">
          {wrongGuesses > 0 ? (
            <div className="strike-letter">
              <img className="emoji" src={Emojo} alt="Wrong answer" />
            </div>
          ) : (
            <div className="strike-placeholder" />
          )}
          {wrongGuesses > 1 ? (
            <div className="strike-letter">
              <img className="emoji" src={Emojo} alt="Wrong answer" />
            </div>
          ) : (
            <div className="strike-placeholder" />
          )}
          {wrongGuesses > 2 ? (
            <div className="strike-letter">
              <img className="emoji" src={Emojo} alt="Wrong answer" />
            </div>
          ) : (
            <div className="strike-placeholder" />
          )}
        </div>
      </div>
      <div className={"keyboard-container mx-auto w-full"}>
        <div className={"flex flex-row justify-between"}>
          {keyRows.top.map((key, index) => (
            <div key={`${key}_${index}`} style={{ width: "100%" }}>
              <div
                className={`${getKeyClass(key)} ${
                  index > 0 ? "" : ""
                }flex flex-wrap montserrat`}
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
                } flex flex-wrap montserrat`}
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
                } flex flex-wrap montserrat font-black`}
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
