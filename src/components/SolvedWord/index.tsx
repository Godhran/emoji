import { useGameContext } from "../../context";

const SolvedWord = () => {
  const { hasSolved, target, animationTiming } = useGameContext();

  if (!hasSolved || !target?.title) {
    return <div />;
  }

  return (
    <>
      {hasSolved ? (
        <div
          className="author flex flex-wrap justify-center align-center content-center mt-5 flex-col"
          style={{
            animationDelay: `${animationTiming * target?.title.length}s`,
          }}
        >
          <p className="font-bold mb-5">{target?.title}</p>
          <img
            src={`https://www.themoviedb.org/t/p/original${target.poster_path}`}
            className="object-scale-down h-96"
            alt={target?.title}
          />
          <button
            className="bg-black text-white font-bold py-2 px-4 rounded w-32 mt-5 mx-auto"
            onClick={() => window.location.reload()}
          >
            Go Again
          </button>
          {/* <p className="italic">{target?.author}</p> */}
        </div>
      ) : null}
    </>
  );
};

export default SolvedWord;
