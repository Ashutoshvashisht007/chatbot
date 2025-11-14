// Placeholder service wrapper for Gemini API.
// Replace the URL, headers, and payload with your official Gemini API usage.
// Example function returns a simulated response after a short delay when no real API is set.

// export async function generateAIReply(prompt, abortSignal) {
//   const USE_REAL_API = false; // set true and configure below to use real Gemini endpoint

//   if (USE_REAL_API) {
//     const API_ENDPOINT = "https://api.gemini.example/v1/generate"; // replace
//     const API_KEY = process.env.REACT_APP_GEMINI_KEY;
//     const body = { prompt };
//     const res = await fetch(API_ENDPOINT, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${API_KEY}`
//       },
//       body: JSON.stringify(body),
//       signal: abortSignal
//     });
//     const json = await res.json();
//     // adapt to response shape
//     return json.output || json.text || "";
//   } else {
//     // Mocked reply (useful for local dev)
//     await new Promise(r => setTimeout(r, 900 + Math.random() * 700));
//     return `Simulated AI reply to: "${prompt.slice(0, 120)}"`;
//   }
// }

export default function geminiService() {
  return {
    sendMessage: async (message) => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const responses = [
        "That's an interesting point! Let me elaborate on that...",
        "I understand what you're asking. Here's my perspective...",
        "Great question! Based on my knowledge...",
        "I'd be happy to help you with that. Here's what I think...",
        "That's a thoughtful observation. Let me share some insights..."
      ];
      return responses[Math.floor(Math.random() * responses.length)] + " " + message.split(' ').reverse().slice(0, 5).join(' ');
    }
  }
}