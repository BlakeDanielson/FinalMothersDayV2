from openai import OpenAI
import base64
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Initialize OpenAI client with API key from environment variable
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise ValueError("OPENAI_API_KEY not found in .env file or environment variables.")
client = OpenAI(api_key=api_key)

prompt = """
A children's book drawing of a veterinarian using a stethoscope to 
listen to the heartbeat of a baby otter.
"""

# Request b64_json format to get the image data directly
result = client.images.generate(
    model="gpt-image-1", # Assuming this is an alias for a DALL-E model
    prompt=prompt,
    n=1,
    size="1024x1024" # DALL-E 3 typically requires specific sizes like 1024x1024
)

image_base64 = result.data[0].b64_json
image_bytes = base64.b64decode(image_base64)

# Save the image to a file
with open("otter.png", "wb") as f:
    f.write(image_bytes)

print("Image 'otter.png' saved successfully.")