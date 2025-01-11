from matchService import match_event, compute_similarity

user_interests = ["Artificial Intelligence", "Machine Learning", "Data Science", "music", "sports", "engineering", "IT"]
event_tags = ["AI Conference", "Big Data", "Deep Learning Workshop"]

# Test the matching function
result = compute_similarity(user_interests, event_tags)
print("Matching Result:", result)
