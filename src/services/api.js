export async function generateUniverses(userData, count = 5) {
  const interests = Array.isArray(userData.interests)
    ? userData.interests.join(', ')
    : userData.interests || 'Not specified';

  const prompt = `You are OtherYou, an AI multiverse storyteller.

Generate ${count} alternate life paths for a person using the provided information.

These universes should be believable, surprising, emotionally engaging, and diverse.
Avoid fantasy powers or unrealistic outcomes.
Each universe should feel like a plausible consequence of different choices.

Person details:
- Name: ${userData.name}
- Current role: ${userData.currentRole}
- Age range: ${userData.ageRange}
- Interests: ${interests}
- Current city: ${userData.currentCity || 'Not specified'}
- Dream job: ${userData.dreamJob || 'Not specified'}
- Skills: ${userData.skills || 'Not specified'}
- Biggest goal: ${userData.biggestGoal || 'Not specified'}

Return ONLY valid JSON.

Format:
{
  "universes": [
    {
      "universe_id": "",
      "title": "",
      "career": "",
      "location": "",
      "achievement": "",
      "life_event": "",
      "regret": "",
      "unexpected_fact": "",
      "personality_shift": "",
      "decision_point": "",
      "butterfly_effect": ["", "", "", ""],
      "similarity_score": 0,
      "timeline": ["", "", "", ""]
    }
  ]
}

Rules:
- Generate exactly ${count} universes.
- Make each universe significantly different.
- Keep responses concise.
- Focus on career, lifestyle, relationships, and personal growth.
- Include both positive and bittersweet elements.
- Timelines should contain four milestones.
- decision_point: The single moment that changed everything in that universe.
- butterfly_effect: Show how one small choice led to a chain of events (4 steps).
- similarity_score: A number between 15 and 95 representing how similar the universe is to their current life.
- Return JSON only. No markdown, no explanations.`;

  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate universes');
  }

  const data = await response.json();
  return data;
}
