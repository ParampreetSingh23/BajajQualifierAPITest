import { Router } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const router = Router();
const EMAIL = "parampreet1088.be23@chitkara.edu.in";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


const fibonacciSeries = (n) => {
  const res = [0, 1];
  for (let i = 2; i < n; i++) res.push(res[i - 1] + res[i - 2]);
  return res.slice(0, n);
};

const isPrime = (num) => {
  if (num < 2) return false;
  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) return false;
  }
  return true;
};

const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
const lcm = (a, b) => (a * b) / gcd(a, b);

const getAIAnswer = async (question) => {
  try {

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `Answer the following question in exactly ONE WORD only. No punctuation. No explanation. Question: ${question}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();

  
    return text.replace(/[^\w]/g, '').split(/\s+/)[0];
  } catch (error) {
    console.error("AI Error:", error.message);

    return "Error"; 
  }
};

router.post("/bfhl", async (req, res) => {
  try {
    const body = req.body;
    const keys = Object.keys(body);

    if (keys.length !== 1) {
      return res.status(400).json({ is_success: false });
    }

    const key = keys[0];
    let output;

    switch (key) {
      case "fibonacci":
        output = fibonacciSeries(body.fibonacci);
        break;

      case "prime":
        output = body.prime.filter(isPrime);
        break;

      case "lcm":
        output = body.lcm.reduce((a, b) => lcm(a, b));
        break;

      case "hcf":
        output = body.hcf.reduce((a, b) => gcd(a, b));
        break;

      case "AI":
        output = await getAIAnswer(body.AI); 
        break;

      default:
        return res.status(400).json({ is_success: false });
    }

    res.status(200).json({
      is_success: true,
      official_email: EMAIL,
      data: output
    });

  } catch (err) {
    res.status(500).json({
      is_success: false,
      message: "Internal error"
    });
  }
});

export default router;
