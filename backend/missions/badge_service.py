import json 

import os 

  

from openai import OpenAI 

  

  

def generate_badge(mission): 

    api_key = os.getenv("OPENAI_API_KEY") 

    if not api_key: 

        raise RuntimeError("OPENAI_API_KEY is not configured.") 

  

    client = OpenAI(api_key=api_key) 

  

    prompt = f""" 

Create a concise fictional K9 training mission badge concept. 

  

Mission title: {mission.title} 

Mission type: {mission.mission_type} 

Location: {mission.location} 

Objective: {mission.objective} 

  

Return ONLY valid JSON with exactly these string fields: 

badge_name 

badge_motto 

badge_colors 

badge_symbols 

  

badge_colors should be a comma-separated list of 2 to 4 hex colors. 

badge_symbols should be a short comma-separated list. 

""".strip() 

  

    response = client.responses.create( 

        model=os.getenv("OPENAI_MODEL", "gpt-5.6"), 

        input=prompt, 

    ) 

  

    raw = response.output_text.strip() 

  

    if raw.startswith("```"): 

        raw = raw.strip("`") 

        if raw.startswith("json"): 

            raw = raw[4:].strip() 

  

    data = json.loads(raw) 

  

    required = { 

        "badge_name", 

        "badge_motto", 

        "badge_colors", 

        "badge_symbols", 

    } 

  

    if not required.issubset(data): 

        raise RuntimeError("AI response is missing badge fields.") 

  

    return { 

        key: str(data[key]) 

        for key in required 

    } 