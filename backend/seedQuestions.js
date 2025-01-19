const mongoose = require("mongoose");
const Question = require("./models/Question"); 
require('dotenv').config(); 

async function seedQuestions() {
  const questions = [
    {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Rome"],
      correctAnswer: "Paris",
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Venus"],
      correctAnswer: "Mars",
    },
    {
      question: "Who wrote 'Hamlet'?",
      options: ["Charles Dickens", "J.K. Rowling", "William Shakespeare", "Mark Twain"],
      correctAnswer: "William Shakespeare",
    },
    {
      question: "What is the chemical symbol for water?",
      options: ["O2", "H2O", "CO2", "NaCl"],
      correctAnswer: "H2O",
    },
    {
      question: "How many continents are there on Earth?",
      options: ["5", "6", "7", "8"],
      correctAnswer: "7",
    },
    {
      question: "What is the largest mammal in the world?",
      options: ["Elephant", "Blue Whale", "Great White Shark", "Giraffe"],
      correctAnswer: "Blue Whale",
    },
    {
      question: "Which is the smallest prime number?",
      options: ["1", "2", "3", "5"],
      correctAnswer: "2",
    },
    {
      question: "What is the boiling point of water at sea level?",
      options: ["50°C", "100°C", "150°C", "200°C"],
      correctAnswer: "100°C",
    },
    {
      question: "Which gas do plants primarily use for photosynthesis?",
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
      correctAnswer: "Carbon Dioxide",
    },
    {
      question: "Who painted the Mona Lisa?",
      options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
      correctAnswer: "Leonardo da Vinci",
    },
  ];
  const mongoURI =process.env.MONGODB_URI;
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Question.insertMany(questions);
    console.log("Sample questions added to the database!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding questions:", error);
  }
}

seedQuestions();
