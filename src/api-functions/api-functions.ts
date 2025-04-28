/**
 *
 * @param quizAnswers localStorage.stringify("desired-answer-set")
 * @returns Promise<string> of chatgpt response
 */
export async function promptChatGpt(quizAnswers: string[]): Promise<string> {
  const formattedQuizAnswers = quizAnswers.join("\n");

  const response = await fetch(
    "https://career-helpi-backend.vercel.app/api/chatgpt",
    {
      method: "POST",
      body: JSON.stringify({ message: formattedQuizAnswers }),
      headers: { "Content-Type": "application/json" },
    },
  );

  const data = await response.json();
  return data.response;
}

//THIS BELOW IS AN EXAMPLE OF HOW YOU COULD CALL THIS FUNCTION FROM THE TSX

/*

const handleClick = async () => {
  const storedAnswers = localStorage.getItem("quizAnswers");
  const quizAnswers: string[] = storedAnswers ? JSON.parse(storedAnswers) : [];

  if (quizAnswers.length === 0) {
    console.error("No quiz answers found!");
    return;
  }

  try {
    const gptResponse = await promptChatGpt(quizAnswers);
    setResponse(gptResponse);
  } catch (error) {
    console.error("Error prompting ChatGPT:", error);
  }
};

*/
