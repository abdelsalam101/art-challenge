# 🎨 The Art Connoisseur’s Challenge

A **React + Tailwind** quiz app that takes you on a **Renaissance-inspired journey through art history**.
Test your artistic wisdom, explore famous masterpieces, and track your progress — all with elegant design and persistent storage. 🖼️

## ✨ Features

* 🧠 20 multiple-choice art questions
* 🖌️ Beautiful Renaissance-themed interface
* 💾 Auto-save progress with **localStorage**
* 🔁 Restart quiz anytime
* 📊 Live score and progress tracking
* 🌐 Uses the **Open Trivia Database** API (with offline fallback)

## ⚡ Setup

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser 🌐

## 🗂️ Tech Stack

* ⚛️ **React + Vite**
* 🎨 **Tailwind CSS**
* 🧙‍♂️ **Custom Hooks** (`useQuiz`)
* 💾m **LocalStorage** for persistence
* 🌍 **Open Trivia DB API**

## 🧱 Folder Structure

```
src/
 ├─ components/
 │   ├─ Header.jsx
 │   ├─ QuestionCard.jsx
 │   ├─ ScoreBox.jsx
 │   └─ ChoiceButton.jsx
 ├─ hooks/
 │   └─ useQuiz.js
 ├─ data/
 │   └─ fallbackQuestions.js
 ├─ utils/
 │   └─ helpers.js
 ├─ App.jsx
 └─ main.jsx
```

## 🌐 Live Demo

Check out the app online: [The Art Connoisseur’s Challenge](https://art-challenge.vercel.app/) 🚀

## 💡 Inspiration

> “Art is never finished, only abandoned.”
> — *Leonardo da Vinci*
