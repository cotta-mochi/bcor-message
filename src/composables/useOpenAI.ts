const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY
const API_URL = 'https://api.openai.com/v1/chat/completions'
export const fetchMessage = async () => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: 'ビーコルの広報としてブースターに今日のひとことをお願いします',
        },
      ],
      temperature: 0.7,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`OpenAI APIエラー: ${response.status} - ${errorText}`)
  }
  const data = await response.json()
  return data.choices[0].message.content
}
