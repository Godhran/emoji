type Config = {
  urls: { api: string; poster: string };
};

const config: Config = {
  urls: {
    api: "https://emoji-api-drn1.onrender.com/movies",
    poster: "https://www.themoviedb.org/t/p/original",
  },
};

export default config;
