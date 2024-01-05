import { useGameContext } from "../../context";

const SolvedWord = () => {
  const { hasSolved, target, animationTiming } = useGameContext();

  if (!hasSolved || !target?.quote) {
    return <div />;
  }

  return (
    <>
      {hasSolved ? (
        <div
          className="author"
          style={{ animationDelay: `${animationTiming * target?.quote.length}s` }}
        >
          <p className="font-bold">{target?.quote}</p>

          <p className="italic">{target?.author}</p>
        </div>
      ) : null}
    </>
  );
};

export default SolvedWord;
