// functions/gemini.js

export async function onRequest(context) {
  const { request, env } = context;
  const { prompt } = await request.json();

  const apiKey = env.GEMINI_API_KEY;

  const res = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-goog-api-key": apiKey
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      })
    }
  );

  const result = await res.json();

  return new Response(JSON.stringify(result), {
    headers: { "Content-Type": "application/json" }
  });
}
