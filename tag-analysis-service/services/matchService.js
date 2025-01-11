const natural = require("natural");

const computeTFIDF = (terms, documents) => {
  const tfidf = new natural.TfIdf();
  documents.forEach((doc) => tfidf.addDocument(doc));

  const termVector = terms.map((term) => tfidf.tfidf(term, 0));
  return termVector;
};

const cosineSimilarity = (vecA, vecB) => {
  const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  return magnitudeA && magnitudeB ? dotProduct / (magnitudeA * magnitudeB) : 0;
};

const matchEvent = (userInterests, eventTags, threshold = 0.7) => {
  const userVector = computeTFIDF(userInterests, [userInterests.join(" "), eventTags.join(" ")]);
  const eventVector = computeTFIDF(eventTags, [userInterests.join(" "), eventTags.join(" ")]);

  const similarity = cosineSimilarity(userVector, eventVector);
  const isMatch = similarity >= threshold;

  return { similarity, isMatch };
};

module.exports = { matchEvent };
