from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from chat import get_response

from gtts import gTTS
import os
import uuid



def generate_tts_url(text):
    """
    Generate TTS audio file and return its URL
    """
    filename = f"tts_{uuid.uuid4()}.mp3"
    filepath = os.path.join('static', 'tts', filename)
    
    os.makedirs(os.path.join('static', 'tts'), exist_ok=True)
    
    tts = gTTS(text=text, lang='en')
    tts.save(filepath)
    
    return f"/static/tts/{filename}"

app = Flask(__name__)
CORS(app)

@app.route("/")
def index_get():
    return render_template("website.html")

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        message = data.get("message")
        tts_flag = data.get("tts", False)

        if not message:
            raise ValueError("Invalid or missing 'message' in the request JSON.")

        response = {"answer": get_response(message)}

        if tts_flag:
            tts_url = generate_tts_url(response["answer"])
            response["tts_url"] = tts_url

        return jsonify(response)

    except Exception as e:
        error_message = {"error": str(e)}
        return jsonify(error_message), 400
        
if __name__ == "__main__":
    app.run(debug=True)
