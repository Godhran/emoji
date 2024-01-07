import "./App.css";
import HiddenWord from "./components/HiddenWord";
import Loading from "./components/Loading";
import OnScreenKeyboard from "./components/OnScreenKeyboard";
import Success from "./components/Success";
import Failed from "./components/Failed";
import { useGameContext } from "./context";

function App() {
  const { isLoading, hasSolved, hasFailed } = useGameContext();

  return (
    <div className="App h-screen pl-3 pr-3">
      {!isLoading ? (
        <div className="h-[500px] max-w-[500px] flex flex-col justify-between mx-auto">
          <HiddenWord />
          {hasSolved ? <Success /> : null}
          {hasFailed ? <Failed /> : null}
          <OnScreenKeyboard />
        </div>
      ) : null}
      {isLoading ? (
        <div className="h-[500px] max-w-[500px] flex flex-col justify-center mx-auto">
          <Loading />
        </div>
      ) : null}
    </div>
  );
}

export default App;
