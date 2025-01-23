mongodb database for quiz 
use quizapp
db.questions.insertMany([
  { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], correctAnswer: "4" },
  { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], correctAnswer: "Paris" },
  { question: "What is 5 * 3?", options: ["15", "20", "25", "30"], correctAnswer: "15" },
  { question: "What is the largest planet?", options: ["Earth", "Mars", "Jupiter", "Saturn"], correctAnswer: "Jupiter" },
  { question: "Who wrote 'Hamlet'?", options: ["Shakespeare", "Dickens", "Hemingway", "Tolkien"], correctAnswer: "Shakespeare" },
  { question: "What is the speed of light?", options: ["300,000 km/s", "150,000 km/s", "400,000 km/s", "200,000 km/s"], correctAnswer: "300,000 km/s" },
  { question: "Which is the smallest country?", options: ["Vatican City", "Monaco", "Liechtenstein", "Malta"], correctAnswer: "Vatican City" },
  { question: "What is the boiling point of water?", options: ["90°C", "100°C", "120°C", "80°C"], correctAnswer: "100°C" },
  { question: "Who discovered gravity?", options: ["Einstein", "Newton", "Galileo", "Tesla"], correctAnswer: "Newton" },
  { question: "What is the tallest mountain?", options: ["K2", "Everest", "Kilimanjaro", "Denali"], correctAnswer: "Everest" }
]);
