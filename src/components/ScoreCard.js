import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/outline"; // ensure you have heroicons installed
import { extractJSONObjectFromString } from "../utils/stringToJson";

const ScoreCard = () => {
  // const [showMarks, setShowMarks] = useState(false);
  // const [showGrammer, setShowGrammer] = useState(false);
  // const [showSpelling, setShowSpelling] = useState(false);
  // const [showImprovement, setShowImprovement] = useState(false);
  // const [output, setOutput] = useState(
  //   extractJSONObjectFromString(JSON.parse(localStorage.getItem("output")))
  // );

  // return (
  //   <div className="flex justify-center items-center h-screen bg-gray-100">
  //     <div className="w-64 bg-white rounded-lg shadow-lg">
  //       <div className="flex flex-col items-center">
  //         <div className="w-full">
  //           <button
  //             onClick={() => setShowMarks(!showMarks)}
  //             className="w-full flex justify-between items-center bg-blue-500 text-white px-5 py-3 rounded-t-lg"
  //           >
  //             <span className="text-lg font-medium">Obtained Marks</span>
  //             <ChevronDownIcon
  //               className={`h-5 w-5 transition-transform ${
  //                 showMarks ? "transform rotate-180" : ""
  //               }`}
  //             />
  //           </button>
  //         </div>
  //         {showMarks && (
  //           <div className="text-5xl font-bold text-blue-700 py-8">78</div>
  //         )}
  //         <div className="w-full">
  //           <AccordionItem title="Grammar Improvements" />
  //           <AccordionItem title="Spelling Improvements" />
  //           <AccordionItem title="Improvement Suggestions" />
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  const [showMarks, setShowMarks] = useState(false);
  const [showGrammer, setShowGrammar] = useState(false);
  const [showSpelling, setShowSpelling] = useState(false);
  const [showImprovement, setShowImprovement] = useState(false);
  const [output, setOutput] = useState(
    extractJSONObjectFromString(JSON.parse(localStorage.getItem("output")))
  );

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-64 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          <div className="w-full">
            <button
              onClick={() => setShowMarks(!showMarks)}
              className="w-full flex justify-between items-center bg-blue-500 text-white px-5 py-3 rounded-t-lg"
            >
              <span className="text-lg font-medium">Obtained Marks</span>
              <ChevronDownIcon
                className={`h-5 w-5 transition-transform ${
                  showMarks ? "transform rotate-180" : ""
                }`}
              />
            </button>
          </div>
          {showMarks && (
            <div className="text-5xl font-bold text-blue-700 py-8">
              {output?.Marks}
            </div>
          )}
          <div className="w-full">
            <AccordionItem
              title="Grammar Improvements"
              show={showGrammer}
              setShow={setShowGrammar}
              content={output?.GrammarImprovements}
            />
            <AccordionItem
              title="Spelling Improvements"
              show={showSpelling}
              setShow={setShowSpelling}
              content={output?.SpellingImprovements}
            />
            <AccordionItem
              title="Improvement Suggestions"
              show={showImprovement}
              setShow={setShowImprovement}
              content={output?.OtherImprovements}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const AccordionItem = ({ title, show, setShow, content }) => {
  const renderImprovementsList = (improvements, type) => {
    if (title == "Improvement Suggestions") {
      return (
        <ul>
          {improvements?.map((improvement, index) => (
            <li key={index}>-{improvement}</li>
          ))}
        </ul>
      );
    } else {
      return (
        <ul>
          {improvements?.map((improvement, index) => (
            <li key={index}>
              <span>
                <strong>{type === "sentence" ? "Sentence" : "Word"}:</strong>{" "}
                {improvement[type]} | <strong>Correction:</strong>{" "}
                {improvement?.correction}
              </span>
            </li>
          ))}
        </ul>
      );
    }
  };

  return (
    <div className="border-t border-gray-200 w-full overflow-y-auto">
      <button
        onClick={() => setShow(!show)}
        className="flex justify-between items-center w-full p-4 text-left focus:outline-none"
      >
        <span className="text-sm font-medium text-gray-800">{title}</span>
        <ChevronDownIcon
          className={`h-5 w-5 text-blue-500 ${
            show ? "transform rotate-180" : ""
          }`}
        />
      </button>
      {show && (
        <div className="bg-gray-100 p-4 rounded-md text-sm text-gray-800 overflow-y-auto max-h-80">
          {renderImprovementsList(
            content,
            title === "Grammar Improvements" ? "sentence" : "word"
          )}
        </div>
      )}
    </div>
  );
};

export default ScoreCard;
