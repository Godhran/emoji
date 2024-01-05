import "./App.css";
import HiddenWord from "./components/HiddenWord";
import Loading from "./components/Loading";
import OnScreenKeyboard from "./components/OnScreenKeyboard";
import SolvedWord from "./components/SolvedWord";
import { useGameContext } from "./context";

function App() {
  const { target } = useGameContext();

  return (
    <div className="App h-screen pl-3  pr-3">
      {target ? (
        <div className="h-[500px] max-w-[500px] flex flex-col justify-between mx-auto">
          <HiddenWord />
          <SolvedWord />
          <OnScreenKeyboard />
        </div>
      ) : null}
      {!target ? (
        <div className="h-[500px] max-w-[500px] flex flex-col justify-center mx-auto">
        <div className="mt-5">
          <p>
            This project uses <a href="https://render.com/">Render.com</a> and may take a minute or two for the free
            server instance to start up
          </p>
        </div>
          <Loading />
        </div>
      ) : null}
    </div>
  );
}

export default App;
