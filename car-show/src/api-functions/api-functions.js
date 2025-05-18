/**
 *
 * @param {string[]} quizQuestions - Array of quiz questions
 * @param {string[]} quizAnswers - Array of quiz answers
 * @returns {Promise<string>} ChatGPT response
 */
export async function promptChatGpt(quizQuestions, quizAnswers) {
  const contextualQA = quizQuestions
    .map((question, index) => `Q${index + 1}: ${question}\nA:${quizAnswers[index]}`)
    .join("\n\n");

  const prompt = `You are a career advisor. 
  Based on my responses, suggest 3 career paths that would suit me.

  Use this exact format for each suggestion:
  - Top Pick: [Career Name] (only for the first suggestion)
  - Career: [Career Name] ((include industry or field in parentheses if helpful)
  - A short explanation of why it fits (2-3 sentences)
  - The skills or qualities it aligns with
  - Next Steps: (Optional) [Action user could take to explore this path]

  Make sure each suggestion is clearly separated with a blank line.

  Quiz Responses: ${contextualQA}`;

  const response = await fetch(
    "https://career-helpi-backend.vercel.app/api/chatgpt",
    {
      method: "POST",
      body: JSON.stringify({ message: prompt }),
      headers: { "Content-Type": "application/json" },
    }
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
