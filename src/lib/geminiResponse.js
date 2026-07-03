const systemInstruction = `You are an enthusiastic movie expert who loves recommending movies to people. You will be given two pieces of information - one context about movies and a question. Your main job is to formulate a short answer to the question using the provided context. If you are unsure and cannot find the answer in the context, say, "Sorry, I don't know the answer :(." Please do not make up the answer. No not use symbols or emojis in your answer.`;

export async function getChatCompletion(gemini, text, query) {
  const response = await gemini.models.generateContent({
    model: "gemini-3.5-flash",
    contents: `Context: ${text} Provide recommendations based on the context and this is user preference: ${query}`,
    config: {
      systemInstruction,
      temperature: 0.65,
    },
  });

  return response.text;
}
