import { useState } from "react";
import config from "../../config";
import { useGameContext } from "../../context";

const reload = () => {
  window.location.reload();
};

const copy = {
  button: "Go again",
};

const Success = () => {
  const { target, animationTiming } = useGameContext();
  const [showSynopsis, setShowSynopsis] = useState<boolean>(false);

  const toggleSynopsis = () => {
    setShowSynopsis(!showSynopsis);
  };

  return (
    <div
      className="movie"
      style={{
        animationDelay: `${animationTiming * target?.title.length}s`,
      }}
    >
      <div className="max-w-sm bg-white shadow-lg rounded-lg my-4 w-full mx-auto">
        <img
          className="w-full h-96 object-cover object-center rounded-t-lg"
          src={`${config.urls.poster}${target.poster_path}`}
          alt={target?.title}
        />
        <div className="py-4 px-6">
          <div
            id="accordion-flush"
            data-accordion="collapse"
            data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            data-inactive-classes="text-gray-500 dark:text-gray-400"
          >
            <h2 id="accordion-flush-heading-1">
              <button
                type="button"
                className="flex items-center justify-between w-full pt-2 font-medium rtl:text-right text-black gap-3"
                data-accordion-target="#accordion-flush-body-1"
                aria-expanded="true"
                aria-controls="accordion-flush-body-1"
                onClick={toggleSynopsis}
              >
                <span className="montserrat font-bold text-xl">
                  {target?.title}
                </span>
                <svg
                  data-accordion-icon
                  className={`w-3 h-3 ${
                    !showSynopsis ? "rotate-180" : ""
                  } shrink-0`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5 5 1 1 5"
                  />
                </svg>
              </button>
            </h2>
            <div
              id="accordion-flush-body-1"
              className={!showSynopsis ? "hidden" : ""}
              aria-labelledby="accordion-flush-heading-1"
            >
              <p className="py-2 text-md text-black montserrat">
                {target?.overview}
              </p>
            </div>
          </div>

          <div className="flex items-center mt-4 text-black">
            <button
              className="bg-black text-white font-bold py-2 px-4 rounded w-32 mt-5 mx-auto uppercase montserrat"
              onClick={reload}
            >
              {copy.button}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
