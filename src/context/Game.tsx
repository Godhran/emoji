import React, { useState, createContext, useContext, useEffect } from "react";

const faceEmojis = require.context(
  "../assets/images/emojis/faces",
  true,
  /\.(png)$/
);
const faceEmojiList = faceEmojis.keys().map((emoji) => faceEmojis(emoji));

const animalEmojis = require.context(
  "../assets/images/emojis/animals",
  true,
  /\.(png)$/
);
const animalEmojiList = animalEmojis.keys().map((emoji) => animalEmojis(emoji));

const foodEmojis = require.context(
  "../assets/images/emojis/food",
  true,
  /\.(png)$/
);
const foodEmojiList = foodEmojis.keys().map((emoji) => foodEmojis(emoji));

const emojis: Emojis = {
  food: foodEmojiList,
  faces: faceEmojiList,
  animals: animalEmojiList,
};

type Emojis = {
  faces: string[];
  food: string[];
  animals: string[];
  [key: string]: string[];
};

const initialState = {
  hasSolved: false,
  guessedCharacters: [],
  cipheredStringArray: [],
  phraseArray: [],
  target: null,
  guessCharacter: (character: string) => {},
  animationTiming: 0.0025,
  emojis: {},
};

type Target = {
  // author: string;
  // quote: string;
  genres: string[];
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
} | null;

type Context = {
  hasSolved: boolean;
  guessedCharacters: string[];
  cipheredStringArray: string[] | null;
  phraseArray: string[] | null;
  target: Target;
  guessCharacter: (character: string) => void;
  animationTiming: number;
  emojis: any;
};

type Provider = {
  children: JSX.Element | JSX.Element[];
};

const GameContext = createContext<Context>(initialState);

export const useGameContext = () => useContext(GameContext);

export function GameProvider({ children }: Provider) {
  const [hasSolved, setHasSolved] = useState<boolean>(initialState.hasSolved);
  const [guessedCharacters, setGuessedCharacters] = useState<string[]>(
    initialState.guessedCharacters
  );
  const [cipheredStringArray, setCipheredStringArray] = useState<
    string[] | null
  >(initialState.cipheredStringArray);

  const [phraseArray, setPhraseArray] = useState<string[] | null>(
    initialState.phraseArray
  );
  const [target, setTarget] = useState<Target>(initialState.target);
  const guessCharacter = (character: string) => {
    if (!guessedCharacters.includes(character)) {
      setGuessedCharacters(() => {
        const _newGuessedCharacters = [...guessedCharacters, character];
        return _newGuessedCharacters;
      });
    }
  };

  const [animationTiming, setAnimationTiming] = useState<number>(
    initialState.animationTiming
  );

  const url = `https://emoji-api-drn1.onrender.com/movies`;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setTarget(data);
      })
      .catch(() => {});
  };

  useEffect(() => {
    if (guessedCharacters.length > 0 && phraseArray && phraseArray.length > 0) {
      const cleanPhraseArray = phraseArray
        ?.join("")
        .replace(/[^a-zA-Z]/g, "")
        .toLowerCase();

      if (
        Array.from(new Set(cleanPhraseArray)).every((char) =>
          guessedCharacters.includes(char)
        )
      ) {
        setHasSolved(true);
      }
    }
  }, [guessedCharacters, phraseArray]);

  useEffect(() => {
    if (target && cipheredStringArray?.length === 0 && target.title) {
      let uniqueCharacters = new Set();

      for (let char of target.title.replace(/[^a-zA-Z]/g, "").toLowerCase()) {
        uniqueCharacters.add(char);
      }

      // const randomEmojiSet =
      //   emojis[
      //     Object.keys(emojis)[
      //       Math.floor(Math.random() * Object.keys(emojis).length)
      //     ]
      //   ];

      const randomEmojiSet =
        emojis[
          Object.keys(emojis)[
            Math.floor(Math.random() * Object.keys(emojis).length)
          ]
        ];

      const shuffledEmojis = randomEmojiSet
        .sort(() => 0.5 - Math.random())
        .slice(0);
      const emojiCipher = {};
      Array.from(uniqueCharacters).forEach(
        //@ts-ignore todo type for each bracket notation
        (character, index) => (emojiCipher[character] = shuffledEmojis[index])
      );

      let _cipheredStringArray: string[] = [];

      target.title
        .toLowerCase()
        .split("")
        .forEach((character) => {
          //@ts-ignore todo type for each bracket notation
          if (emojiCipher[character]) {
            //@ts-ignore todo type for each bracket notation
            _cipheredStringArray.push(emojiCipher[character]);
          } else {
            _cipheredStringArray.push(character);
          }
        });
      setCipheredStringArray(_cipheredStringArray);
      setPhraseArray(target.title.split(""));
      setAnimationTiming(1 / _cipheredStringArray.length);
    }
  }, [target, target?.title, cipheredStringArray]);

  const exports = {
    guessedCharacters,
    setGuessedCharacters,
    guessCharacter,
    cipheredStringArray,
    phraseArray,
    target,
    hasSolved,
    animationTiming,
    emojis,
  };

  return (
    <GameContext.Provider value={exports}>{children}</GameContext.Provider>
  );
}
