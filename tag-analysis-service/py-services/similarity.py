from flask import jsonify

def process_similarity_request(data, compute_similarity):
    user_interests = data.get('userInterests', [])
    event_tags = data.get('eventTags', [])

    if not user_interests or not event_tags:
        return jsonify({"error": "Please provide user interests and event tags."}), 400

    similarity_score = compute_similarity(user_interests, event_tags)
    return jsonify({"similarity": similarity_score}), 200