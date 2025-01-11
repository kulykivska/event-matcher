import unittest
from flask import Flask, jsonify
from similarity import process_similarity_request

app = Flask(__name__)

def mock_compute_similarity(user_interests, event_tags):
    return 0.85

class TestProcessSimilarity(unittest.TestCase):
    def setUp(self):
        """Create application context before each test"""
        self.app = app
        self.app_context = self.app.app_context()
        self.app_context.push()
        self.client = self.app.test_client()

    def tearDown(self):
        """Pop application context after each test"""
        self.app_context.pop()

    def test_valid_data(self):
        """Test with valid data"""
        test_data = {
            "userInterests": ["AI", "React", "frontend"],
            "eventTags": ["Artificial Intelligence", "React", "conference"]
        }
        with self.app.test_request_context():
            response = process_similarity_request(test_data, mock_compute_similarity)
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.get_json(), {"similarity": 0.85})

    def test_invalid_data(self):
        """Test with invalid data"""
        test_data = {
            "userInterests": [],
            "eventTags": []
        }
        with self.app.test_request_context():
            response = process_similarity_request(test_data, mock_compute_similarity)
            self.assertEqual(response.status_code, 400)
            self.assertEqual(response.get_json(), {"error": "Please provide user interests and event tags."})

if __name__ == '__main__':
    unittest.main()