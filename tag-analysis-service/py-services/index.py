from flask import Flask, request, jsonify
from flask_cors import CORS
from matchService import match_event

app = Flask(__name__)
CORS(app)  # To allow requests from other domains

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.json
    user_interests = data.get('userInterests', [])
    event_tags = data.get('eventTags', [])
    
    if not user_interests or not event_tags:
        return jsonify({"error": "userInterests and eventTags are required"}), 400

    result = match_event(user_interests, event_tags)
    return jsonify(result)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
