import React, { useEffect, useState } from "react";
import Logo from "../pictures/logo.png";
import axios from "axios";
import { supabase } from "../client";

import { useHistory } from 'react-router-dom';
import { useDataContext } from "../DataContext";
import LoadingScreen from "../components/Loading";

export default function MarksScheme() {
  const { setOut } = useDataContext();
  const history = useHistory();
  const [check,setCheck]=useState(false)
  const goToHome=()=>
  {
    window.location.replace("/files")
  }

  const fileName = localStorage.getItem("fileName");

  const [question, setQuestion] = useState("");
  const [markingCriteria, setMarkingCriteria] = useState("");
  const [markingWeightage, setMarkingWeightage] = useState("");
  const [scoringDetails, setScoringDetails] = useState("");

  const goToResult = async () => {
    setCheck(true)
    // console.log("Question/Task:", question);
    // console.log("Marking Criteria:", markingCriteria);
    // console.log("Marking Weightage:", markingWeightage);
    // console.log("Scoring Details:", scoringDetails);

    const user = await supabase.auth.getUser();
    console.log("user", user?.data?.user?.id);

    const query =
      "Question/Task: " +
      question +
      ". " +
      "Marking Criteria: " +
      markingCriteria +
      ". " +
      "Marking Weightage: " +
      markingWeightage +
      ". " +
      "Scoring Details: " +
      scoringDetails +
      ".";

    console.log("query: ", query);

    // Make POST request to the /fetch_result endpoint
    axios
      .post("http://localhost:5000/fetch_result", {
        query: query,
        userId: user?.data?.user?.id, // Replace with the actual user ID
        document: fileName, // Replace with the actual document ID or uploaded file
      })
      .then(async (response) => {
        console.log("Response from server:", response.data);
        localStorage.setItem("output", JSON.stringify(response.data.output.text));
        setOut(response.data.output.text);
        // Do something with the response if needed
        // For example, redirect to the result page

        history.push('/result');
        // window.location.replace("/result");
      })
      .catch((error) => {
        console.error("Error fetching result:", error);
        // Handle errors if necessary
      });
    // window.location.replace("/result");
  };

  return (
    <div className="font-inter flex flex-col bg-background min-h-screen h-full w-full min-w-screen">
      <div>
        {
          check &&(<div className="absolute top-0">

          <LoadingScreen/>
          </div>)
        }
      </div>
      <div>
        <img onClick={goToHome} className="ml-7" src={Logo} />
      </div>
      <div className="flex justify-center text-3xl mt-5 font-bold">
        Marks Scheme
      </div>
      <div className="flex justify-between mt-8">
        <div></div>
        <div></div>

        <div className="font-semibold ml-10">
          Please specify the following details regarding the marking scheme.
        </div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className="w-full flex flex-col space-y-6 mt-11">
        <div className="flex w-full items-center">
          <div className="w-[18vw] "></div>
          <div className="w-[13vw] font-semibold">Questions/task:</div>
          <div className="w-[63vw]">
            <input
              placeholder="Enter Question"
              className="border bg-background border-Gray5 py-3 pl-5 rounded-md w-full"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>
        </div>
        <div className="flex w-full items-center">
          <div className="w-[18vw] "></div>
          <div className="w-[13vw] font-semibold">Marking Criteria:</div>
          <div className="w-[63vw]">
            <input
              placeholder="Enter Criteria"
              className="border bg-background border-Gray5 py-3 pl-5 rounded-md w-full"
              value={markingCriteria}
              onChange={(e) => setMarkingCriteria(e.target.value)}
            />
          </div>
        </div>

        <div className="flex w-full items-center">
          <div className="w-[18vw] "></div>
          <div className="w-[13vw] font-semibold">Marking Weightage:</div>
          <div className="w-[63vw]">
            <input
              placeholder="Enter Weightage"
              className="border bg-background border-Gray5 py-3 pl-5 rounded-md w-full"
              value={markingWeightage}
              onChange={(e) => setMarkingWeightage(e.target.value)}
            />
          </div>
        </div>
        <div className="flex w-full items-center">
          <div className="w-[18vw] "></div>
          <div className="w-[13vw] font-semibold">Scoring Details:</div>
          <div className="w-[63vw]">
            <input
              placeholder="Enter Scoring Details"
              className="border bg-background border-Gray5 py-3 pl-5 rounded-md w-full"
              value={scoringDetails}
              onChange={(e) => setScoringDetails(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-around mt-16">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <button
          onClick={goToResult}
          className="bg-Blue1 text-white py-3 px-6 rounded-md ml-30"
        >
          Continue
        </button>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
