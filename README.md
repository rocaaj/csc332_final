# 🏋️ Workout Timer App

A full-stack web app that lets users create, save, and run customizable workout routines with timed work/rest intervals — and an optional **shake-to-skip** feature for mobile users.

## 🚀 Features

- User registration & login
- Create and save workouts with multiple exercises
- Set durations for work, rest, and sets
- Shake device to skip or move to next exercise (mobile)
- Responsive design for mobile and desktop
- MongoDB database for user and workout storage

---

## 🧰 Tech Stack

### Frontend (client/)
- React
- JavaScript (ES6+)
- HTML5/CSS3
- Web APIs (DeviceMotion, Orientation)

### Backend (server/)
- Node.js
- Express.js
- MongoDB + Mongoose
- Passport.js for authentication
- bcrypt for password hashing
- Helmet & Morgan for security/logging
- dotenv for environment configuration

---

## 🤝 Authors

- **Backend:** Anthony Roca ([GitHub @rocaaj](https://github.com/rocaaj))
- **Frontend:** Dario Santiago-Lopez ([GitHub @DarioSantiago](https://github.com/DarioSantiago))

## 🙏 Acknowledgments

- Built as part of the CSC 332/632: Mobile & Pervasive Computing course at Wake Forest University.
- Special thanks to **ChatGPT by OpenAI** for coding assistance, architecture brainstorming, and documentation guidance throughout the project.

---

## 📦 Getting Started

### Prerequisites
- Node.js & npm
- mongodb-community@6.0

### Clone the repo

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### Run the web-app
- Open two different terminals
- Frontend
```bash
cd client
npm start
```
- Backend
```bash
cd server
brew services start mongodb/brew/mongodb-community@6.0
npm start
```
- Enjoy your workout!