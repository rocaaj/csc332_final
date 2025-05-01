Project Background

This is a continuation of the csc332_proj3 (https://github.com/rocaaj/csc332_proj3). This new repository builds upon that foundation for the next phase of AWS-native deployment.

🏋️ Workout Timer App

A full-stack web app that lets users create, save, and run customizable workout routines with timed work/rest intervals — and an optional shake-to-skip feature for mobile users.

🚀 Features

User registration & login

Create and save workouts with multiple exercises

Set durations for work, rest, and sets

Shake device to skip or move to next exercise (mobile)

Responsive design for mobile and desktop

MongoDB database for user and workout storage

🧰 Tech Stack

Frontend (client/)

React

JavaScript (ES6+)

HTML5/CSS3

Web APIs (DeviceMotion, Orientation)

Backend (server/)

Node.js

Express.js

MongoDB + Mongoose

Passport.js for authentication

bcrypt for password hashing

Helmet & Morgan for security/logging

dotenv for environment configuration

🤝 Authors

Backend: Anthony Roca (GitHub @rocaaj)

Frontend: Dario Santiago-Lopez (GitHub @DarioSantiago)

🙏 Acknowledgments

Built as part of the CSC 332/632: Mobile & Pervasive Computing course at Wake Forest University.

Special thanks to ChatGPT by OpenAI for coding assistance, architecture brainstorming, and documentation guidance throughout the project.

📦 Getting Started

Prerequisites

Node.js & npm

mongodb-community@6.0

Clone the repo

git clone https://github.com/<your-org>/workout-app.git
cd workout-app

Run the web-app

Open two terminals:

Frontend

cd client
npm install
npm start

Backend

cd server
brew services start mongodb/brew/mongodb-community@6.0
npm install
npm start

☁️ Deployment & Setup

Follow these tutorial-style steps to get your app up and running on AWS Elastic Beanstalk (Docker-based backend) and connect your frontend.

1. Pull the Latest Code

git clone https://github.com/<your-org>/workout-app.git
cd workout-app
git pull

All changes are already pushed to the remote repo.

2. AWS & EB CLI Setup

Configure the AWS CLI and install the Elastic Beanstalk CLI:

aws configure  # enter your Access Key, Secret Key, region, and output format

python -m pip install --upgrade --user awsebcli
# Add the EB CLI path to your PATH environment variable (e.g. ~/.local/bin or Windows equivalent)

3. Create a .ebignore in the Backend

Inside the server/ directory, create an .ebignore file to exclude unnecessary files from deployment:

cat << 'EOF' > server/.ebignore
node_modules/
.env
*.log
*.tmp
.elasticbeanstalk/
.git/
.gitignore
EOF

4. Dockerize the Backend

Ensure you have a Dockerfile in server/ similar to:

# Use Node.js 18
FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["node", "server.js"]

5. Deploy the Backend to Elastic Beanstalk

Initialize EB for Docker (run once):

cd server
eb init workout-backend --platform docker --region us-east-1

Create a new environment:

eb create workout-docker-env --cname workout-docker-env --single

Target the environment:

eb use workout-docker-env

Set environment variables:

eb setenv \
  MONGO_URI="<your-mongodb-connection-uri>" \
  SESSION_SECRET="<your-session-secret>"

Deploy:

eb deploy --staged

Check status and open:

eb status   # Health: Green, Status: Ready
eb open     # Opens the backend URL

6. Update Frontend to Point at the Live API

In client/src/utils/api.js, set the base URL:

export const API_BASE = 'https://workout-docker-env.us-east-1.elasticbeanstalk.com';

Prefix all fetch requests with API_BASE (e.g., ${API_BASE}/api/workouts).

Run the frontend locally to confirm connectivity:

cd client
npm install
npm start

Visit http://localhost:3000 and verify it communicates with the AWS backend.

7. (Optional) Deploy Frontend to S3 & CloudFront

After confirming everything works locally, build and deploy your frontend:

cd client
npm run build
# Deploy `build/` to an S3 bucket and configure CloudFront for CDN.

📄 License

This project is licensed under the MIT License. See the LICENSE file for details.
