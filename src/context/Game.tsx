import React, { useState, createContext, useContext, useEffect } from "react";
import config from "../config";

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

type EmojiCipher = {
  [key: string]: string;
};

const initialState = {
  hasSolved: false,
  hasFailed: false,
  isLoading: true,
  guessedCharacters: [],
  cipheredStringArray: [],
  phraseArray: [],
  target: {
    genres: [],
    overview: "",
    poster_path: "",
    release_date: "",
    title: "",
  },
  guessCharacter: (character: string) => {},
  animationTiming: 0.0025,
  emojis: {},
  wrongGuesses: 0,
};

type Target = {
  genres: string[];
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
};

type Context = {
  hasSolved: boolean;
  hasFailed: boolean;
  isLoading: boolean;
  guessedCharacters: string[];
  cipheredStringArray: string[];
  phraseArray: string[];
  target: Target;
  guessCharacter: (character: string) => void;
  animationTiming: number;
  emojis: any;
  wrongGuesses: number;
};

type Provider = {
  children: JSX.Element | JSX.Element[];
};

const GameContext = createContext<Context>(initialState);

const maxWrongGuesses = 3;

export const useGameContext = () => useContext(GameContext);

export function GameProvider({ children }: Provider) {
  const [hasSolved, setHasSolved] = useState<boolean>(initialState.hasSolved);
  const [hasFailed, setHasFailed] = useState<boolean>(initialState.hasFailed);
  const [isLoading, setIsLoading] = useState<boolean>(initialState.isLoading);
  const [wrongGuesses, setWrongGuesses] = useState<number>(
    initialState.wrongGuesses
  );
  const [guessedCharacters, setGuessedCharacters] = useState<string[]>(
    initialState.guessedCharacters
  );
  const [cipheredStringArray, setCipheredStringArray] = useState<string[]>(
    initialState.cipheredStringArray
  );

  const [phraseArray, setPhraseArray] = useState<string[]>(
    initialState.phraseArray
  );
  const [target, setTarget] = useState<Target>(initialState.target);

  const guessCharacter = (character: string) => {
    if (
      phraseArray &&
      !guessedCharacters.includes(character) &&
      wrongGuesses < maxWrongGuesses
    ) {
      if (
        !phraseArray.find(
          (element) => element.toLowerCase() === character.toLowerCase()
        )
      ) {
        setWrongGuesses(wrongGuesses + 1);
        if (wrongGuesses === maxWrongGuesses - 1) {
          setHasFailed(true);
        }
      }

      setGuessedCharacters(() => {
        const _newGuessedCharacters = [...guessedCharacters, character];
        return _newGuessedCharacters;
      });
    }
  };

  const [animationTiming, setAnimationTiming] = useState<number>(
    initialState.animationTiming
  );

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = () => {
    // if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    //   setTarget({
    //     title: "Test Movie",
    //     genres: ["Development", "Testing"],
    //     poster_path: "",
    //     release_date: "2024-01-01",
    //     overview: "Testing environment test",
    //   });
    // } else {
    fetch(config.urls.api)
      .then((response) => response.json())
      .then((data) => {
        setTarget(data);
        setIsLoading(false);
      })
      .catch(() => {});
    // }
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
    if (target.title.length > 0 && cipheredStringArray?.length === 0) {
      let uniqueCharacters = new Set();

      for (let char of target.title.replace(/[^a-zA-Z]/g, "").toLowerCase()) {
        uniqueCharacters.add(char);
      }

      const randomEmojiSet =
        emojis[
          Object.keys(emojis)[
            Math.floor(Math.random() * Object.keys(emojis).length)
          ]
        ];

      const shuffledEmojis = randomEmojiSet
        .sort(() => 0.5 - Math.random())
        .slice(0);
      const emojiCipher: EmojiCipher = {};

      Array.from(uniqueCharacters).forEach(
        (character, index) =>
          (emojiCipher[character as string] = shuffledEmojis[index])
      );

      let _cipheredStringArray: string[] = [];

      target.title
        .toLowerCase()
        .split("")
        .forEach((character) => {
          if (emojiCipher[character]) {
            _cipheredStringArray.push(emojiCipher[character]);
          } else {
            _cipheredStringArray.push(character);
          }
        });
      setCipheredStringArray(_cipheredStringArray);
      setPhraseArray(target.title.split(""));
      setAnimationTiming(1 / _cipheredStringArray.length);
    }
  }, [cipheredStringArray, target.title]);

  const exports = {
    guessedCharacters,
    setGuessedCharacters,
    guessCharacter,
    cipheredStringArray,
    phraseArray,
    target,
    hasSolved,
    hasFailed,
    animationTiming,
    emojis,
    wrongGuesses,
    isLoading,
  };

  return (
    <GameContext.Provider value={exports}>{children}</GameContext.Provider>
  );
}
