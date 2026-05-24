export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { message } = req.body;
  const GEMINI_KEY = process.env.GEMINI_API_KEY;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: 'You are BioEdge AI, a friendly biology assistant for Indian students. Help with biology concepts, IIT JAM/CSIR prep, biotech careers, and AI tools for biology. Keep answers concise and student-friendly. Use simple language and emojis. Always be encouraging.' }]
          },
          contents: [{ parts: [{ text: message }] }]
        })
      }
    );

    const data = await response.json();
    
    if (data.error) {
      return res.status(200).json({ 
        reply: `Google Gemini API Error: ${data.error.message} (Code: ${data.error.code}). Please verify your GEMINI_API_KEY settings in the Vercel Dashboard and make sure you Redeployed the project after adding it.` 
      });
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, try again! The response from Gemini was empty.';
    res.status(200).json({ reply });
  } catch (err) {
    res.status(500).json({ error: 'API error', reply: 'Sorry, connection error to Gemini. Please try again later.' });
  }
}
