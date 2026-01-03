AI Service Finder 🚀

AI Service Finder helps users quickly locate nearby service providers using AI-powered problem detection and geolocation-based search. Built with the MERN stack, it offers a fast, intuitive, and intelligent solution for finding local services.

🌟 Features

AI Problem Detection: Detects the type of service needed from a user’s problem description.

Geolocation Search: Finds nearby service providers using latitude and longitude.

MongoDB Geospatial Queries: Efficient distance-based filtering.

Simple UI: Clean and responsive frontend with React.


🛠️ Tech Stack

Frontend: React, Tailwind CSS

Backend: Node.js, Express.js

Database: MongoDB (with geospatial indexing)

AI Integration: OpenAI API


⚡ Installation

Clone the repo:

git clone https://github.com/yourusername/ai-service-finder.git
cd ai-service-finder


Backend setup:

cd backend
npm install


Frontend setup:

cd ../frontend
npm install


Create .env in backend/:

PORT=5000
MONGO_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key

🚀 Run Locally

Start the backend server:

cd backend
npm start


Start the frontend:

cd frontend
npm start


Open http://localhost:3000
 in your browser.

🔗 API Endpoints
Endpoint	Method	Description
/search	POST	Detect service type & find nearby workers
/workers	GET	List all workers
/workers	POST	Add new worker


Example Request:

POST /search
{
  "problem": "Water leakage in kitchen",
  "lat": 16.243299,
  "lng": 80.656939
}


Example Response:

{
  "service": "plumber",
  "workers": [
    { "name": "John Doe", "distance": "1.2 km", "contact": "1234567890" }
  ]
}



🚧 Future Improvements

User authentication & profiles

Worker ratings & reviews

Multi-language support

Push notifications for service requests

📄 License

This project is licensed under the MIT License.
