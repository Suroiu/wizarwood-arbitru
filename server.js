const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAIApi(new Configuration({
    apiKey: "CHEIA_TA_OPENAI"
}));

app.post("/ask", async (req, res) => {
    const question = req.body.question;

    try {
        const response = await openai.createChatCompletion({
            model: "gpt-4",
            messages: [
                { role: "system", content: "Ești un expert în regulile jocului Wizarwood - The Void. Răspunde clar și concis." },
                { role: "user", content: question }
            ]
        });

        res.json({ answer: response.data.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ answer: "Eroare la procesare. Încearcă din nou!" });
    }
});

app.listen(10000, () => console.log("Serverul rulează pe portul 10000"));