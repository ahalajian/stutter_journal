from openai import OpenAI
import os

api_key = os.getenv("OPENAI_API_KEY")

def generate_story(words, tones=["neutral"]):
    sentence_count = min(6, len(words))
    
    prompt = f"""
    You are a creative sentence generator.
    
    Write a short story using the words: {', '.join(words)}. 
    Keep the tone {', '.join(tones)}.
    Use very short, simple sentences. Avoid long or complex phrasing.
    Around {sentence_count} sentences.
    """

    client = OpenAI()
    
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        temperature=1,
        max_tokens=150,
        messages=[
            {"role": "developer", 
             "content": "You generate fun, vivid, sentences or short stories with control over tone and word usage. Your stories use short, simple sentences and avoid run-ons."},
            {"role": "user", "content": prompt}
        ]
    )
    return response.choices[0].message.content