const express = require("express");
const Question = require("../models/Question");
const User = require("../models/User");
const MockTest = require("../models/MockTest");
const router = express.Router();

router.post("/mock-test/submit", async (req, res) => {
  const { email, answers } = req.body;

  if (!email || !answers) {
    return res.status(400).json({ message: "Email and answers are required." });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    const questionIds = Object.keys(answers);
    const alreadyAnswered = questionIds.filter((id) =>
      user.answeredQuestions.includes(id)
    );

    if (alreadyAnswered.length > 0) {
      return res.status(400).json({
        message: "Some questions have already been answered.",
        alreadyAnswered,
      });
    }
    let score = 0;
    const questions = await Question.find({ _id: { $in: questionIds } });

    questions.forEach((question) => {
      if (answers[question._id] === question.correctAnswer) {
        score += 1;
      }
    });

    user.answeredQuestions.push(...questionIds);
    await user.save();

    const mockTest = new MockTest({
      user: user._id,
      questions: questionIds,
      score,
    });
    await mockTest.save();

    res
      .status(201)
      .json({ message: "Mock test submitted successfully.", score });
  } catch (err) {
    console.error("Error submitting mock test:", err);
    res.status(500).json({ message: "Server error." });
  }
});

router.get("/mock-test/questions", async (req, res) => {
  const { email, questionLimit = 5} = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const unansweredQuestions = await Question.find({
      _id: { $nin: user.answeredQuestions },
    }).limit(Number(questionLimit));

    res.status(200).json(unansweredQuestions);
  } catch (err) {
    console.error("Error fetching questions:", err);
    res.status(500).json({ message: "Server error." });
  }
});
router.get("/mock-test/history", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const mockTests = await MockTest.find({ user: user._id }).populate("questions");
    res.status(200).json(mockTests);
  } catch (err) {
    console.error("Error fetching mock test history:", err);
    res.status(500).json({ message: "Server error." });
  }
});
module.exports = router;
