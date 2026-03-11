// portfolio-ai.js - Jackson's AI Assistant (Rule-Based Version)
class PortfolioAI {
    constructor() {
        this.qaData = [
            {
                question: "who is jackson",
                answers: [
                    "Jackson is a Computer Science student at Kabale University passionate about building innovative digital solutions in Software Development, AI, and FinTech.",
                    "He is a developer and technology enthusiast who enjoys solving real-world problems through code and experimenting with new tech like AI assistants and trading automation."
                ]
            },
            {
                question: "where does jackson study",
                answers: [
                    "Jackson studies Computer Science at Kabale University in Uganda.",
                    "He is currently a student at Kabale University pursuing a degree in Computer Science."
                ]
            },
            {
                question: "programming languages",
                answers: [
                    "Jackson is skilled in Python, JavaScript, PHP, SQL, HTML/CSS, and C.",
                    "His technical stack includes Python, JavaScript, PHP, C, and various web technologies."
                ]
            },
            {
                question: "projects",
                answers: [
                    "Jackson has worked on several impressive projects: **AXON** (AI Voice Assistant for Linux), **THRESHO** (Web3 Wallet), **NUTRIAGENT** (AI Nutritionist), **DT DECO HUB**, **SEMESTER MARKS PORTAL**, and **CRIB HUNT**.",
                    "His portfolio features **AXON** (an AI voice assistant built in Python), **THRESHO**, **NUTRIAGENT**, **DT DECO HUB**, and systems for student academic tracking."
                ]
            },
            {
                question: "skills",
                answers: [
                    "Jackson's expertise spans UI/UX Design, Web Development, Mobile Design, and AI/ML development.",
                    "He specializes in Natural Language Processing, Machine Learning, and Full-Stack development."
                ]
            },
            {
                question: "contact",
                answers: [
                    "You can reach Jackson via the contact form on this website or through his social links.",
                    "Contact him through the email info provided in the footer or the contact section."
                ]
            },
            {
                question: "ai research",
                answers: [
                    "Jackson focuses on developing high-performance AI models for architectural data and smart systems.",
                    "His research focus is on Natural Language Processing and making machine learning models more intuitive and efficient."
                ]
            }
        ];

        this.suggestions = [
            "What programming languages does Jackson know?",
            "Tell me about Jackson's projects",
            "Where does Jackson study?",
            "What is Jackson's AI research about?",
            "How can I contact Jackson?",
            "What kind of AI projects interest Jackson?"
        ];

        this.fallbackResponses = [
            "I'm not sure I understand that. Could you ask about Jackson's projects, skills, or education?",
            "That's outside my current knowledge base. Try asking about Jackson's AI research or his technical skills!",
            "I'm Jackson's professional assistant. I can tell you all about his work in AI and Web3 if you'd like!"
        ];
    }

    getResponse(query) {
        if (!query.trim()) return "Please ask me something!";
        
        const cleanQuery = query.toLowerCase().trim();

        // Simple keyword matching
        for (let qa of this.qaData) {
            const keywords = qa.question.split(' ');
            if (keywords.some(word => cleanQuery.includes(word)) || cleanQuery.includes(qa.question)) {
                return qa.answers[Math.floor(Math.random() * qa.answers.length)];
            }
        }

        return this.fallbackResponses[Math.floor(Math.random() * this.fallbackResponses.length)];
    }

    getSuggestions() {
        return this.suggestions;
    }
}

// Global instance
const portfolioAI = new PortfolioAI();