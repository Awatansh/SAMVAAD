# Samvaad - IIIT NR Chatbot

## Overview
Samvaad is an AI-powered chatbot designed to assist students of IIIT Naya Raipur by answering queries related to academic and administrative topics. The chatbot leverages Natural Language Processing (NLP) and Machine Learning (ML) techniques to provide relevant and accurate responses to user queries. It supports both text-based and voice-based interactions, making information retrieval more accessible and interactive.

## Features
- **NLP-driven query handling**: ***Predefined intents*** to understand and respond to student queries.
- **Speech-to-Text & Text-to-Speech**: Voice-based interactions.
- **Scalability**: Supports ***easy addition of new intents and responses*** for future expansion.
- **Web Interface**: Built with ***Flask*** and ***TailwindCSS*** for a lightweight and user-friendly interface.
- **Persistent Storage**: Stores trained model weights and dataset for efficient inference.

## Tech Stack
- **Backend**: Python, Flask, PyTorch, NLTK
- **Frontend**: HTML, CSS (TailwindCSS), JavaScript
- **Machine Learning**: NLP-based intent classification
- **Data Handling**: JSON-based dataset for training
- **Speech Processing**: SpeechRecognition alternate form of input

## Directory Structure
```
awatansh-samvaad/
├── README.md
├── LICENSE
├── SAMVAAD-BOT/
│   ├── app.py                # Flask backend
│   ├── chat.py               # Core chatbot logic
│   ├── data4.pth             # Trained model weights
│   ├── dataset1.json         # Intent dataset
│   ├── model.py              # Neural network definition
│   ├── nltk_utils.py         # NLP preprocessing utilities
│   ├── numbertag.py          # Numerical tagging for entities
│   ├── package-lock.json     # Node.js dependencies
│   ├── package.json          # Frontend dependencies
│   ├── tailwind.config.js    # TailwindCSS configuration
│   ├── train.py              # Model training script
│   ├── .gitignore            # Ignore unnecessary files
│   ├── static/
│   │   ├── app.js            # Frontend JavaScript
│   │   ├── styles.css        # TailwindCSS styles
│   │   └── images/
│   │       ├── acad.HEIC     # Sample image
│   │       └── faculty/      # Faculty-related images
│   └── templates/
│       └── website.html      # Web UI template
└── results/
    └── data4.pth             # Backup model weights
```

## Installation & Setup
### Prerequisites
- Python 3.8+
- pip (Python package manager)
- Node.js (for frontend assets if modifications are needed)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/awatansh-samvaad.git
   cd awatansh-samvaad/SAMVAAD-BOT
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Train the chatbot model (if needed):
   ```bash
   python train.py
   ```
4. Run the Flask server:
   ```bash
   python app.py
   ```
5. Open `http://localhost:5000` in your browser to interact with the chatbot.

## Usage
- Users can type or speak their queries into the chatbot interface.
- The chatbot will process input using NLP techniques and return relevant responses.
- If the question is outside predefined intents, the bot gracefully handles it.

## License
This project is licensed under the [GNU General Public License v3.0](LICENSE).

## Contributors
- Awatansh & Team

---
Feel free to contribute or suggest improvements via pull requests!

