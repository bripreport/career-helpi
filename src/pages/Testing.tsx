import { useState } from "react";
import Navbar from "../components/Navbar";

function Testing() {
  const [gptResponse, setGptResponse] = useState<string>("");
  const [userInput, setUserInput] = useState<string>("");
  const [loading, setLoading] = useState(false);

  async function getChatResponse() /*Promise<string>*/ {
    //console.log("start of async");
    setLoading(true);
    const res = await fetch(
      "https://career-helpi-backend.vercel.app/api/chatgpt",
      {
        method: "POST",
        body: JSON.stringify({ message: userInput }),
        headers: { "Content-Type": "application/json" },
      },
    );

    const data = await res.json();
    console.log("response:", data.response);
    setGptResponse(data.response);
    setLoading(false);
    //console.log("end of async");
    //return data.response;
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <Navbar />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          getChatResponse();
        }}
        className="flex flex-col gap-4"
      >
        <textarea
          className="border rounded p-2 resize-none"
          rows={4}
          placeholder="Write your prompt here..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
      {gptResponse && (
        <div className="mt-6 border p-4 rounded bg-gray-100">
          <h2 className="font-bold mb-2">AI Response:</h2>
          <p className="color-white">{gptResponse}</p>
        </div>
      )}
    </div>
  );
}

export default Testing;
