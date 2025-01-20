"use client";

import Image from "next/image";
import testData from "./test.json";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { useSession } from "next-auth/react";
import { useCurrentUser } from "~/hooks/use-current-user";
import { updateTest } from "~/actions/profile";

type Selection = {
  most: string | null;
  least: string | null;
};

const DiscTest = () => {
  const user = useCurrentUser();

  const router = useRouter();
  const { data: session } = useSession();
  const [selections, setSelections] = useState<Selection[]>(
    testData.questions.map(() => ({
      most: null,
      least: null,
    })),
  );

  const [isComplete, setIsComplete] = useState(false);
  const [mostAnsweredLetter, setMostAnsweredLetter] = useState<string | null>(
    null,
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const totalQuestions = testData.questions.length;

  const handleSelect = (
    questionIndex: number,
    type: "most" | "least",
    value: string,
  ) => {
    const newSelections = [...selections];

    if (!newSelections[questionIndex]) {
      newSelections[questionIndex] = { most: null, least: null };
    }

    const questionSelection = newSelections[questionIndex];

    if (!questionSelection) return;

    if (type === "most") {
      if (questionSelection.least !== value) {
        questionSelection.most = value;
      } else {
        questionSelection.least = null;
        questionSelection.most = value;
      }
    } else if (type === "least") {
      if (questionSelection.most !== value) {
        questionSelection.least = value;
      } else {
        questionSelection.most = null;
        questionSelection.least = value;
      }
    }

    setSelections(newSelections);
  };

  useEffect(() => {
    const calculateResults = () => {
      const letterCount: { D: number; I: number; S: number; C: number } = {
        D: 0,
        I: 0,
        S: 0,
        C: 0,
      };

      selections.forEach((selection, index) => {
        const question = testData.questions[index];

        if (question) {
          if (selection.most) {
            const mostLetter = question.options.find(
              (option) => option.text === selection.most,
            )?.letter;
            if (mostLetter) {
              letterCount[mostLetter as "D" | "I" | "S" | "C"]++;
            }
          }

          if (selection.least) {
            const leastLetter = question.options.find(
              (option) => option.text === selection.least,
            )?.letter;
            if (leastLetter) {
              letterCount[leastLetter as "D" | "I" | "S" | "C"]--;
            }
          }
        }
      });

      const mostSelected = Object.entries(letterCount).reduce(
        (max, [letter, count]) => (count > max.count ? { letter, count } : max),
        { letter: "", count: -Infinity },
      );

      setMostAnsweredLetter(mostSelected.letter);
    };

    if (selections.every((selection) => selection.most && selection.least)) {
      calculateResults();
      setIsComplete(true);
    }
  }, [selections]);

  const handleFinishTest = async () => {
    if (typeof window !== "undefined" && mostAnsweredLetter) {
      // setting the test result in the localStorage
      localStorage.setItem("discTestResult", mostAnsweredLetter);
      router.push(
        `/disc/job-roles/disc-test/results?mostAnsweredLetter=${mostAnsweredLetter}`,
      );
    }
    if (user) {
      await updateTest(mostAnsweredLetter, user?.id);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const isNextDisabled = currentQuestionIndex === testData.questions.length - 1;
  const isPreviousDisabled = currentQuestionIndex === 0;

  return (
    <main className="w-full">
      {/* <section className="hero">
        <Image
          src="/images/disc-about-page.svg"
          alt="Hero image"
          fill
          style={{ objectFit: "cover" }}
        />
      </section> */}
      <section className="mt-6 flex flex-col items-center">
        <h1 className="m-10 text-center text-2xl font-semibold text-violet md:text-4xl">
          DISC Personality Test
        </h1>
        {/* <p className="w-1/2 text-center">
          Select the statement that best describes how you naturally behave
          in&nbsp;a work setting and feels <strong>MOST</strong> true for you,
          as&nbsp;well as&nbsp;the statement that feels <strong>LEAST </strong>
          like you or&nbsp;doesn&rsquo;t apply as&nbsp;much.
        </p> */}
      </section>
      <div className="flex w-full flex-col items-center">
        <div className="mb-8 w-full rounded-xl border border-alto p-5 lg:w-1/2">
          <h2 className="text-xl font-semibold">
            {testData.questions[currentQuestionIndex]?.question}
          </h2>
          <div className="mt-4">
            <h3 className="text-lg">
              Which statement describes you most and least?
            </h3>
            <div className="mt-4 space-y-4">
              {testData.questions[currentQuestionIndex]?.options?.map(
                (option, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-xl border border-alto py-9 pl-5 md:py-5"
                    style={{ height: "60px" }}
                  >
                    <span className="h-fit py-8">{option.text}</span>
                    <div className="flex h-full items-center">
                      {/* Most Radio Button */}
                      <RadioGroup.Root
                        className="flex items-center"
                        defaultValue={
                          selections[currentQuestionIndex]?.most ?? undefined
                        }
                        aria-label="Most selection"
                        onValueChange={(value) =>
                          handleSelect(currentQuestionIndex, "most", value)
                        }
                      >
                        <RadioGroup.Item
                          className="RadioGroupItem thumbs-up"
                          value={option.text}
                          id={`q${currentQuestionIndex}-most-${i}`}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "60px",
                            height: "60px",
                            border: "1px solid #D9D9D9",
                            borderRadius: "12px 0 0 12px",
                            backgroundColor:
                              selections[currentQuestionIndex]?.most ===
                              option.text
                                ? "#55D718"
                                : "white",
                            cursor: "pointer",
                            transition: "background-color 0.3s ease",
                          }}
                        >
                          <img
                            src="/icons/thumbs-up.svg"
                            alt="Thumbs Up"
                            style={{
                              width: "30px",
                              height: "30px",
                            }}
                          />
                        </RadioGroup.Item>
                      </RadioGroup.Root>
                      {/* Least Radio Button */}
                      <RadioGroup.Root
                        className="flex items-center"
                        defaultValue={
                          selections[currentQuestionIndex]?.least ?? undefined
                        }
                        aria-label="Least selection"
                        onValueChange={(value) =>
                          handleSelect(currentQuestionIndex, "least", value)
                        }
                      >
                        <RadioGroup.Item
                          className="RadioGroupItem thumbs-down"
                          value={option.text}
                          id={`q${currentQuestionIndex}-least-${i}`}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "60px",
                            height: "60px",
                            border: "1px solid #D9D9D9",
                            borderRadius: "0 12px 12px 0",
                            backgroundColor:
                              selections[currentQuestionIndex]?.least ===
                              option.text
                                ? "#D92530"
                                : "white",
                            cursor: "pointer",
                            transition: "background-color 0.3s ease",
                          }}
                        >
                          <img
                            src="/icons/thumbs-down.svg"
                            alt="Thumbs Down"
                            style={{
                              width: "30px",
                              height: "30px",
                            }}
                          />
                        </RadioGroup.Item>
                      </RadioGroup.Root>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="w-1/2">
          <div className="flex flex-col items-center justify-between">
            <span className="mb-3">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>
            <div className="h-2 w-full rounded-full bg-gray-200">
              <div
                className="h-2 rounded-full bg-violet"
                style={{
                  width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex w-1/2 justify-between">
          <button
            className={`rounded-lg bg-tree-poppy px-5 py-2 text-violet hover:bg-flush-orange ${
              isPreviousDisabled ? "cursor-not-allowed bg-gray-400" : ""
            }`}
            disabled={isPreviousDisabled}
            onClick={handlePrev}
          >
            Previous
          </button>
          <button
            className={`rounded-lg bg-tree-poppy px-5 py-2 text-violet hover:bg-flush-orange ${
              isNextDisabled ? "cursor-not-allowed bg-gray-400" : ""
            }`}
            disabled={isNextDisabled}
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>

      <section className="mt-8 flex justify-center">
        {isComplete ? (
          <button
            onClick={handleFinishTest}
            className="rounded-lg border border-alto bg-tree-poppy px-14 py-5 text-xl font-semibold hover:bg-flush-orange"
          >
            Finish Test
          </button>
        ) : (
          <button
            disabled
            className="cursor-not-allowed rounded-lg border border-alto bg-gray-300 px-14 py-5 text-xl font-semibold text-gray-500"
          >
            Answer All Questions to Finish
          </button>
        )}
      </section>
    </main>
  );
};

export default DiscTest;
