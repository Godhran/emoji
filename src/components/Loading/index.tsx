import { useEffect, useState } from "react";
import { useGameContext } from "../../context";

const Loading = () => {
  const { emojis } = useGameContext();
  const [emojiTicker, setEmojiTicker] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setEmojiTicker(emojiTicker + 1);
    }, 500);

    return () => clearInterval(interval);
  }, [emojiTicker]);

  return (
    <div className="flex flex-row flex-wrap max-w-[300px] mx-auto justify-center mt-5">
      {"Loading".split("").map((letter, index) => {
        const showEmoji = emojiTicker % (index + 1) === 1;
        let character = letter;
        if(showEmoji){
          character = emojis.faces[Math.floor(Math.random() * Object.keys(emojis.faces).length)]
        }
        return (
          <div
            className="loading-letter"
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
