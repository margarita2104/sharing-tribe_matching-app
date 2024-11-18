"use client";

import Image from "next/image";
import testData from "./test.json";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Selection = {
  most: string | null;
  least: string | null;
};

const DiscTest = () => {
  const router = useRouter();

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

  const handleFinishTest = () => {
    if (typeof window !== "undefined" && mostAnsweredLetter) {
      router.push(
        `/disc/about/job-roles/disc-test/results?mostAnsweredLetter=${mostAnsweredLetter}`,
      );
    }
  };

  return (
    <main>
      <section className="hero">
        <Image
          src="/images/disc-about-page.svg"
          alt="Hero image"
          fill
          style={{ objectFit: "cover" }}
        />
      </section>
      <section className="flex flex-col items-center">
        <h1 className="mb-6 text-4xl font-semibold text-violet">
          DISC Personality Test
        </h1>
      </section>
      <section className="flex flex-col items-center space-y-8">
        {testData.questions.map((question, index) => (
          <div key={index} className="mb-8 w-1/2">
            <h2 className="text-xl font-semibold">{question.question}</h2>
            <div className="mt-4">
              <h3 className="text-lg">
                Which statement describes you most and least?
              </h3>
              <div className="mt-4 space-y-4">
                {question.options.map((option, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span>{option.text}</span>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id={`q${index}-most-${i}`}
                          name={`q${index}-most`}
                          value={option.text}
                          checked={selections[index]?.most === option.text}
                          onChange={() =>
                            handleSelect(index, "most", option.text)
                          }
                        />
                        <label htmlFor={`q${index}-most-${i}`} className="ml-2">
                          Most
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id={`q${index}-least-${i}`}
                          name={`q${index}-least`}
                          value={option.text}
                          checked={selections[index]?.least === option.text}
                          onChange={() =>
                            handleSelect(index, "least", option.text)
                          }
                        />
                        <label
                          htmlFor={`q${index}-least-${i}`}
                          className="ml-2"
                        >
                          Least
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>
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
