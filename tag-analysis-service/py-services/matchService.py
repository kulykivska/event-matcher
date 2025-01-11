from sentence_transformers import SentenceTransformer, util
import numpy as np

# Loading a model to convert texts to vectors
model = SentenceTransformer('all-MiniLM-L6-v2')

def compute_similarity(user_interests, event_tags):
    # Converting user interests and event tags into vectors
    user_embeddings = model.encode(user_interests, convert_to_tensor=True)
    event_embeddings = model.encode(event_tags, convert_to_tensor=True)

    # Calculate the similarity between all pairs of vectors
    cosine_scores = util.pytorch_cos_sim(user_embeddings, event_embeddings)

    # Move tensor to CPU before converting to NumPy
    max_similarity = np.max(cosine_scores.cpu().numpy())
    return max_similarity


def match_event(user_interests, event_tags, threshold=0.7):
    similarity = compute_similarity(user_interests, event_tags)
    is_match = similarity >= threshold
    return {"similarity": similarity, "isMatch": is_match}
