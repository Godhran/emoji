import { ReactNode, useEffect, useState } from "react";
import { useGameContext } from "../../context";
import emojo from "./../../assets/images/web/emojo_192.png";
const Loading = () => {
  const { emojis } = useGameContext();
  const [emojiTicker, setEmojiTicker] = useState<number>(0);

  const copy = {
    loading: "Loading",
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setEmojiTicker(emojiTicker + 1);
    }, 500);

    return () => clearInterval(interval);
  }, [emojiTicker]);

  return (
    <div className="flex flex-row flex-wrap max-w-[300px] mx-auto justify-center mt-5">
      <img src={emojo} alt="Emojo" />
      <div className="mt-5 mb-5">
        <p>
          This project uses <a href="https://render.com/">Render.com</a> and may
          take a minute or two for the free server instance to start up
        </p>
      </div>
      {copy.loading.split("").map((letter, index) => {
        const showEmoji = emojiTicker % (index + 1) === 1;
        let character: string | ReactNode = letter;
        if (showEmoji) {
          character = (
            <img
              className="emoji"
              src={
                emojis.faces[
                  Math.floor(Math.random() * Object.keys(emojis.faces).length)
                ]
              }
              alt="Emoji"
            />
          );
        }
        return (
          <div
            key={`loading-key-${index}`}
            className="loading-letter flex flex-wrap justify-center content-center"
            style={{ animationDelay: `${(1 / 7) * index}s` }}
          >
            {character}
          </div>
        );
      })}
    </div>
  );
};

export default Loading;
