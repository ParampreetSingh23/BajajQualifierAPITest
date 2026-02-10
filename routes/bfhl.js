import { Router } from "express";

const router = Router();

const isNumber = (val) => !Number.isNaN(Number(val));

router.post("/bfhl", (req, res) => {
  const payload = req.body;

  if (!payload?.data || !Array.isArray(payload.data)) {
    return res.status(400).json({
      is_success: false,
      message: "Invalid request format"
    });
  }

  const numbers = [];
  const alphabets = [];

  for (const element of payload.data) {
    const value = String(element);

    if (isNumber(value)) {
      numbers.push(value);
    } else if (/^[a-zA-Z]$/.test(value)) {
      alphabets.push(value);
    }
  }

  const lowercase = alphabets.filter(ch => ch === ch.toLowerCase());
  const highest_lowercase_alphabet =
    lowercase.length > 0 ? [lowercase.sort().slice(-1)[0]] : [];

  return res.status(200).json({
    is_success: true,
    user_id: "ParampreetSingh",
    email: "parampreet1088.be23@chitkara.edu.in",
    roll_number: "2310991088",
    numbers,
    alphabets,
    highest_lowercase_alphabet
  });
});

export default router;
