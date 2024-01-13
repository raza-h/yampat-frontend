import React, { useEffect, useState } from "react";
import Logo from "../pictures/logo.png";
import { ChevronDownIcon } from "@heroicons/react/outline";
import Arrow1 from "../pictures/arrow1.png";
import Arrow2 from "../pictures/arrow2.png";
import Arrow3 from "../pictures/arrow3.png";
import Arrow4 from "../pictures/arrow4.png";
import { useDataContext } from "../DataContext";
import { extractJSONObjectFromString } from "../utils/stringToJson";

export default function Result() {
  const { out } = useDataContext();
  const goToHome=()=>
  {
    window.location.replace("/files")
  }

  const [showMarks, setShowMarks] = useState(false);
  const [showGrammer, setShowGrammer] = useState(false);
  const [showSpelling, setShowSpelling] = useState(false);
  const [showImprovement, setShowImprovement] = useState(false);
  const [output, setOutput] = useState(
    extractJSONObjectFromString(JSON.parse(localStorage.getItem("output")))
  );

  useEffect(() => {
    // Use the outputData as needed
    // console.log("Output Data:", JSON.parse(out?.text));
    // Perform any other operations with the output data
  }, [out]);

  const [text, setText] = useState(localStorage.getItem("text"));

  const fileName = localStorage.getItem("fileName");

  const formatTextWithHighlights = () => {
    if (output) {
      const { EssayWithMistakes, GrammarImprovements, SpellingImprovements } =
        output;
      let formattedText = text; // Initialize with the main text
      // console.log(output);

      // Highlight grammar improvements in pink
      if (GrammarImprovements && GrammarImprovements.length > 0) {
        GrammarImprovements.forEach((improvement) => {
          const regex = new RegExp(improvement.sentence, "g");
          formattedText = formattedText.replace(
            regex,
            `<span class="bg-pink-200">${improvement.sentence}</span>`
          );
        });
      }

      // // Highlight spelling improvements in blue
      if (SpellingImprovements && SpellingImprovements.length > 0) {
        SpellingImprovements.forEach((improvement) => {
          const regex = new RegExp(improvement.word, "g");
          formattedText = formattedText.replace(
            regex,
            `<span class="bg-blue-200">${improvement.word}</span>`
          );
        });
      }

      return { __html: formattedText }; // Returning as HTML for React to render
    }
  };

  const renderImprovementsList = (improvements, type) => {
    return (
      <ul>
        {improvements?.map((improvement, index) => (
          <li key={index}>
            <span>
              <strong>Mistake:</strong> {improvement[type]} |{" "}
              <strong>Correction:</strong> {improvement?.correction}
            </span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="flex flex-col w-full h-screen bg-background font-inter ">
      <div className="ml-6">
        <img onClick={goToHome} src={Logo} />
      </div>
      <div className="flex w-full h-[80%]">
        <div className="w-[70vw] md:w-[79vw] flex flex-col">
          <div className="font-bold flex justify-center text-3xl mt-2">
            Result
          </div>
          <div className="flex justify-between mb-7 mt-6">
            <div></div>
            <div></div>
            <div></div>
            <div className="flex text-sm md:text-base mr-20">
              <span className="font-semibold">Paper Title:</span>
              <span className="ml-3 text-Blue1">{fileName}</span>
            </div>
            <div className="flex text-sm md:text-base">
              <span className="font-semibold">Author:</span>
              <span className="ml-3">Abc name</span>
            </div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className=" flex justify-center w-full h-full">
            <div className=" border border-gray-400 overflow-y-auto w-[65%] py-12 h-[80%]">
              <div className="flex items-center justify-center w-full h-full">
                <div className=" w-[80%] h-[85%] text-Gray9 text-xs md:text-lg">
                  <div
                    className="mb-5"
                    dangerouslySetInnerHTML={formatTextWithHighlights()}
                  />

                  {/* <div className="mb-5">
                    <span>
                      Aliquam erat volutpat. Integer bibendum augue sed est
                      bibendum, et aliquam justo tristique.
                    </span>
                    <span className="bg-pink-200">
                      Suspendisse potenti. Integer dictum euismod vestibulum.
                      Etiam consectetur, lectus in aliquet malesuada, arcu dui
                      aliquet ex, nec tincidunt ipsum
                    </span>
                    <span>
                      enim ac quam. Nunc vitae tellus a nunc hendrerit dictum.
                      Sed vel magna non massa pharetra finibus.
                    </span>
                  </div>
                  <div>
                    <span>
                      volutpat. Integer bibendum augue sed est bibendum, et
                      aliquam justo tristique. Suspendisse potent
                    </span>
                    <span className="bg-blue-200">
                      Integer dictum euismod vestibulum. Etiam consectetur,
                      lectus in aliquet malesuada, arcu dui aliquet ex, nec
                      tincidunt ipsum enim ac quam.
                    </span>
                    <span>
                      Nunc vitae tellus a nunc hendrerit dictum. Sed vel magna
                      non massa pharetra finibus. Aliquam erat volutpat. Integer
                      bibendum augue sed est bibendum, et aliquam justo
                      tristique. Suspendisse potenti. Integer dictum euismod
                      vestibulum. Etiam consectetur, lectus in aliquet
                      malesuada, arcu dui aliquet ex, nec tincidunt ipsum enim
                      ac quam. Nunc vitae tellus a nunc hendrerit dictum. Sed
                      vel magna non massa pharetra finibus.
                    </span>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-200 w-[30vw] md:w-[21vw] h-full flex flex-col">
          <div className="flex justify-center mt-5">
            <div className="w-[90%]">
              <button
                onClick={() => setShowMarks(!showMarks)}
                className="w-full flex justify-center items-center bg-blue-600 text-white px-5 py-3 "
              >
                <span className=" font-semibold text-xs md:text-xl">
                  Mark obtained
                </span>
                {/* <ChevronDownIcon
                className={`h-5 w-5 transition-transform ${showMarks ? 'transform rotate-180' : ''}`}
              /> */}
                <img
                  src={Arrow1}
                  className={`ml-5 h-5 w-5 transition-transform ${
                    showMarks ? "transform rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          </div>
          {showMarks && (
            <div className="flex justify-center">
              <div className="text-5xl font-bold text-white bg-blue-600 w-[90%] pt-0 pb-3">
                <div className="flex justify-center">
                  <div className="bg-blue-300 p-7 w-[92%] rounded-md">
                    <div className="flex justify-center text-4xl font-bold text-white">
                      {output?.Marks}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* <div className="flex justify-center mt-5">
            <div className="w-[90%] bg-white p-3 rounded-md">
              <div className="flex justify-around items-center text-Purple5  text-xs md:text-lg font-semibold">
                <div>Grammer Improvements</div>
                <div>
                  <img src={Arrow2} />
                </div>
              </div>
            </div>
          </div> */}
          <div className="flex justify-center mt-5">
            <div className="w-[90%] bg-white p-3 rounded-md">
              <div
                className="flex justify-between items-center text-Purple5 text-xs md:text-lg font-semibold cursor-pointer"
                onClick={() => setShowGrammer(!showGrammer)}
              >
                <div>Grammer Improvements</div>
                <div>
                  <img src={Arrow2} />
                </div>
              </div>
              {showGrammer && (
                <div className="mt-3 overflow-y-auto h-[8vh] bg-gray-100 p-4 rounded-md text-sm text-Purple5">
                  {/* Grammer Improvements content */}
                  {renderImprovementsList(
                    output?.GrammarImprovements,
                    "sentence"
                  )}
                </div>
              )}
            </div>
          </div>

          {/* <div className="flex justify-center mt-5">
            <div className="w-[90%] bg-white p-3 rounded-md">
              <div className="flex justify-around items-center text-Blue1 text-xs md:text-lg font-semibold">
                <div>Spelling Improvements</div>
                <div>
                  <img src={Arrow3} />
                </div>
              </div>
            </div>
          </div> */}
          <div className="flex justify-center mt-5">
            <div className="w-[90%] bg-white p-3 rounded-md">
              <div
                className="flex justify-between items-center text-Blue1 text-xs md:text-lg font-semibold cursor-pointer"
                onClick={() => setShowSpelling(!showSpelling)}
              >
                <div>Spelling Improvements</div>
                <img
                  src={Arrow3}
                  className={`transform ${showSpelling ? "rotate-180" : ""}`}
                />
              </div>
              {showSpelling && (
                <div className="mt-3 overflow-y-auto h-[8vh] bg-gray-100 p-4 rounded-md text-sm text-Blue1">
                  {/* Spelling Improvements content */}
                  {renderImprovementsList(output?.SpellingImprovements, "word")}
                </div>
              )}
            </div>
          </div>

          {/* <div className="flex justify-center mt-5">
            <div className="w-[90%] bg-white p-3 rounded-md">
              <div className="flex justify-around items-center text-Gray6 text-xs md:text-lg font-semibold">
                <div>Improvement Suggestions</div>
                <div>
                  <img src={Arrow4} />
                </div>
              </div>
            </div>
          </div> */}
          <div className="flex justify-center mt-5">
            <div className="w-[90%] bg-white p-3 rounded-md">
              <div
                className="flex justify-between items-center text-Gray6 text-xs md:text-lg font-semibold cursor-pointer"
                onClick={() => setShowImprovement(!showImprovement)}
              >
                <div>Improvement Suggestions</div>
                <img
                  src={Arrow4}
                  className={`transform ${showImprovement ? "rotate-180" : ""}`}
                />
              </div>
              {showImprovement && (
                <div className="mt-3 overflow-y-auto h-[8vh] bg-gray-100 p-4 rounded-md text-sm text-Gray6">
                  {/* Improvement Suggestions content */}
                  <ul>
                    {output?.OtherImprovements?.map((improvement, index) => (
                      <li key={index}>{improvement}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
