// portfolio-ai.js - Enhanced Portfolio AI with Greeting Support
class PortfolioAI {
    constructor() {
        this.qaData = [
            {
                question: "who is jackson",
                answers: [
                    "Jackson is a Computer Science student and AI/ML enthusiast passionate about building intelligent systems.",
                    "He's a Computer Science student with deep interest in artificial intelligence and machine learning.",
                    "Jackson is a tech enthusiast studying Computer Science with focus on AI and machine learning."
                ]
            },
            {
                question: "where does jackson study",
                answers: [
                    "Jackson studies Computer Science at Kabale University in Uganda.",
                    "He's pursuing his degree at Kabale University in Uganda.",
                    "Kabale University in Uganda is where Jackson is studying Computer Science."
                ]
            },
            {
                question: "what programming languages does jackson know",
                answers: [
                    "Jackson is skilled in Python, JavaScript, PHP, HTML, and C programming languages.",
                    "His programming expertise includes Python, JavaScript, PHP, HTML, and C.",
                    "He works with multiple languages: Python for AI, JavaScript for web, PHP for backend, HTML for structure, and C for system programming."
                ]
            },
            {
                question: "what projects has jackson worked on",
                answers: [
                    "Jackson has developed AI trading bots, educational assistants, and rental management systems.",
                    "His project portfolio includes AI trading bots, educational assistant tools, and comprehensive rental management systems.",
                    "Notable projects include AI-powered trading algorithms, educational support systems, and automated rental property management solutions."
                ]
            },
            {
                question: "what is jacksons current ai research about",
                answers: [
                    "He's collaborating with multiple universities to build AI models that process large-scale data efficiently.",
                    "His current research focuses on developing efficient AI models for large-scale data processing in collaboration with various universities.",
                    "Jackson is working on AI research involving large-scale data processing, collaborating with university partners."
                ]
            },
            {
                question: "what are jacksons goals",
                answers: [
                    "He aims to build intelligent systems that solve real-world problems in education and finance.",
                    "Jackson's goal is to develop AI solutions that address real challenges in education and financial sectors.",
                    "His primary objective is creating intelligent systems to transform education and finance through AI."
                ]
            },
            {
                question: "how can i contact jackson",
                answers: [
                    "You can reach him via email or through his portfolio website's contact form.",
                    "Contact Jackson through email or use the contact form on his portfolio website.",
                    "Get in touch with Jackson via email or the contact form available on his portfolio site."
                ]
            },
            {
                question: "what kind of ai projects interest jackson",
                answers: [
                    "He's particularly interested in natural language processing, computer vision, and intelligent automation.",
                    "Jackson is fascinated by NLP, computer vision applications, and intelligent automation systems.",
                    "His AI interests include natural language processing, computer vision technologies, and smart automation solutions."
                ]
            },
            {
                question: "does jackson work with other universities",
                answers: [
                    "Yes, he collaborates with other universities in Uganda on large-scale AI research projects.",
                    "Absolutely! Jackson works with multiple Ugandan universities on significant AI research initiatives.",
                    "He actively collaborates with various universities across Uganda for large-scale AI research projects."
                ]
            }
        ];

        // Enhanced suggestions
        this.suggestions = [
            "What programming languages does Jackson know?",
            "Tell me about Jackson's projects",
            "Where does Jackson study?",
            "What is Jackson's AI research about?",
            "How can I contact Jackson?",
            "What are Jackson's goals?",
            "What kind of AI projects interest Jackson?",
            "Does Jackson work with other universities?"
        ];

        // Contextual suggestions
        this.contextualSuggestions = {
            'programming': [
                "What frameworks does Jackson use?",
                "Does Jackson know database technologies?",
                "What is Jackson's favorite programming language?"
            ],
            'projects': [
                "What technologies were used in these projects?",
                "Are these projects open source?",
                "How long did these projects take to complete?"
            ],
            'education': [
                "What is Jackson's GPA?",
                "When does Jackson graduate?",
                "What courses is Jackson taking?"
            ],
            'research': [
                "Which universities does Jackson collaborate with?",
                "What is the focus of the AI research?",
                "What programming languages are used in the research?"
            ]
        };

        // Enhanced fallback responses
        this.fallbackResponses = [
            "I'm not sure about that specific question. Would you like to know about Jackson's skills, projects, or education?",
            "That's an interesting question! I can tell you about Jackson's AI projects, programming skills, or research collaborations.",
            "I don't have information about that. Try asking about Jackson's technical skills, university projects, or AI research.",
            "Hmm, I'm not familiar with that topic. Maybe ask about Jackson's programming languages, projects, or education background?"
        ];

        // Engagement phrases
        this.engagementPhrases = [
            "Great question! ",
            "I'd be happy to tell you about that! ",
            "That's an interesting topic! ",
            "Sure thing! ",
            "Excellent question! ",
            "I'm glad you asked! "
        ];

        // Follow-up questions
        this.followUpQuestions = [
            "\n\nIs there anything else you'd like to know?",
            "\n\nWhat else interests you about Jackson's work?",
            "\n\nWould you like to know more about any specific area?",
            "\n\nFeel free to ask more about Jackson's skills or projects!"
        ];

        // Synonyms for better matching
        this.synonyms = {
            'programming': ['coding', 'development', 'software', 'languages', 'tech'],
            'projects': ['work', 'portfolio', 'applications', 'developments', 'creations'],
            'education': ['studies', 'school', 'university', 'college', 'learning'],
            'contact': ['reach', 'email', 'get in touch', 'connect', 'message'],
            'research': ['study', 'investigation', 'exploration', 'analysis'],
            'skills': ['abilities', 'expertise', 'capabilities', 'knowledge']
        };

        // Add greeting patterns and responses
        this.greetingPatterns = [
            /^(hi|hello|hey|greetings|howdy|hi there|hello there)/i,
            /^good (morning|afternoon|evening)/i,
            /^what's up|sup|yo/i
        ];

        this.greetingResponses = [
            "Hello! 👋 I'm Jackson's portfolio assistant. How can I help you today?",
            "Hi there! 😊 I'm here to tell you all about Jackson's skills and projects. What would you like to know?",
            "Hey! Great to see you! I'm Jackson's AI assistant. Ask me anything about his background, skills, or projects!",
            "Greetings! 🎉 I'm excited to share information about Jackson's portfolio. What would you like to learn about?",
            "Hello! Ready to explore Jackson's portfolio? I can tell you about his education, skills, projects, and more!"
        ];

        this.followUpGreetings = [
            "How can I assist you with Jackson's portfolio today?",
            "What would you like to know about Jackson's background or projects?",
            "Feel free to ask me anything about Jackson's skills, education, or AI research!",
            "I'm here to help you learn about Jackson. What interests you most?",
            "What aspect of Jackson's portfolio would you like to explore?"
        ];

        // Add farewell patterns and responses
        this.farewellPatterns = [
            /^(bye|goodbye|see ya|see you|farewell|cya)/i,
            /^(thanks|thank you|thx|ty)/i,
            /^(exit|quit|stop|end)/i
        ];

        this.farewellResponses = [
            "Goodbye! 👋 Thanks for chatting about Jackson's portfolio. Feel free to return anytime!",
            "Thanks for stopping by! 🎉 I hope you learned something interesting about Jackson's work.",
            "See you later! 😊 Don't hesitate to come back if you have more questions about Jackson!",
            "Thank you for the conversation! 🙏 Best of luck with your exploration of Jackson's portfolio!",
            "Farewell! 🌟 It was great helping you learn about Jackson's skills and projects!"
        ];

        this.howAreYouResponses = [
            "I'm doing great! 😊 I'm always excited to talk about Jackson's amazing portfolio. What would you like to know about him?",
            "I'm functioning perfectly! 🤖 Ready to share information about Jackson's skills and projects. How can I help you?",
            "I'm excellent! 💫 Chatting about Jackson's portfolio always puts me in a good mood. What would you like to explore?",
            "I'm doing wonderful! 🌟 I love helping people discover Jackson's talents and achievements. What interests you most?",
            "I'm fantastic! 🚀 Ready to dive into Jackson's portfolio with you. What would you like to learn about today?"
        ];

        // Conversation history
        this.conversationHistory = [];
        
        console.log("🚀 Enhanced Portfolio AI initialized with greeting support");
    }

    // Enhanced text preprocessing with synonyms
    preprocessText(text) {
        let processed = text.toLowerCase().replace(/[^\w\s]/g, '');
        
        // Replace synonyms with base words
        for (const [baseWord, synonymsList] of Object.entries(this.synonyms)) {
            synonymsList.forEach(synonym => {
                const regex = new RegExp(`\\b${synonym}\\b`, 'g');
                processed = processed.replace(regex, baseWord);
            });
        }
        
        return processed.split(/\s+/).filter(word => word.length > 0);
    }

    // Calculate similarity between query and question
    calculateSimilarity(query, question) {
        const queryWords = new Set(this.preprocessText(query));
        const questionWords = new Set(this.preprocessText(question));
        
        if (queryWords.size === 0 || questionWords.size === 0) {
            return 0;
        }
        
        const intersection = new Set([...queryWords].filter(x => questionWords.has(x)));
        const union = new Set([...queryWords, ...questionWords]);
        
        return intersection.size / union.size;
    }

    // Find best match with multiple strategies
    findBestMatch(query, threshold = 0.4) {
        const cleanInput = query.toLowerCase().trim();
        
        // 1. Exact match
        for (let qa of this.qaData) {
            if (cleanInput === qa.question.toLowerCase()) {
                console.log("Exact match found:", qa.question);
                return qa;
            }
        }

        // 2. Partial match
        for (let qa of this.qaData) {
            if (cleanInput.includes(qa.question) || qa.question.includes(cleanInput)) {
                console.log("Partial match found:", qa.question);
                return qa;
            }
        }

        // 3. Similarity matching
        let bestMatch = null;
        let bestScore = 0;

        for (let qa of this.qaData) {
            const score = this.calculateSimilarity(query, qa.question);
            if (score > bestScore) {
                bestScore = score;
                bestMatch = qa;
            }
        }

        console.log("Similarity match score:", bestScore);
        return bestScore >= threshold ? bestMatch : null;
    }

    // Add greeting detection method
    detectGreeting(input) {
        const cleanInput = input.toLowerCase().trim();
        
        // Check for greetings
        for (let pattern of this.greetingPatterns) {
            if (pattern.test(cleanInput)) {
                return 'greeting';
            }
        }
        
        // Check for farewells
        for (let pattern of this.farewellPatterns) {
            if (pattern.test(cleanInput)) {
                return 'farewell';
            }
        }
        
        // Check for "how are you" type questions
        if (cleanInput.includes('how are you') || 
            cleanInput.includes('how do you do') ||
            cleanInput.includes("what's up") ||
            cleanInput.includes('sup')) {
            return 'how_are_you';
        }
        
        return null;
    }

    // Add greeting response method
    getGreetingResponse(type, input) {
        if (type === 'greeting') {
            const greeting = this.greetingResponses[Math.floor(Math.random() * this.greetingResponses.length)];
            const followUp = this.followUpGreetings[Math.floor(Math.random() * this.followUpGreetings.length)];
            return `${greeting}\n\n${followUp}`;
        }
        
        if (type === 'farewell') {
            return this.farewellResponses[Math.floor(Math.random() * this.farewellResponses.length)];
        }
        
        if (type === 'how_are_you') {
            return this.howAreYouResponses[Math.floor(Math.random() * this.howAreYouResponses.length)];
        }
        
        return null;
    }

    // Detect tone of the input
    detectTone(input) {
        const positiveWords = ['amazing', 'great', 'awesome', 'impressive', 'cool', 'excellent', 'fantastic'];
        const negativeWords = ['bad', 'terrible', 'awful', 'boring', 'weak', 'poor', 'disappointing'];
        
        const words = input.toLowerCase().split(' ');
        
        if (words.some(word => positiveWords.includes(word))) return 'positive';
        if (words.some(word => negativeWords.includes(word))) return 'negative';
        
        return 'neutral';
    }

    // Get contextual suggestions based on last question
    getContextualSuggestions() {
        if (this.conversationHistory.length < 2) return this.suggestions;
        
        const lastBotMessage = this.conversationHistory
            .filter(msg => msg.type === 'bot')
            .slice(-1)[0];
            
        if (!lastBotMessage) return this.suggestions;

        const lastResponse = lastBotMessage.content.toLowerCase();
        
        for (const [topic, suggestions] of Object.entries(this.contextualSuggestions)) {
            if (lastResponse.includes(topic)) {
                return suggestions;
            }
        }
        
        return this.suggestions;
    }

    // Main response function
    getResponse(userInput) {
        console.log("User asked:", userInput);
        
        if (!userInput.trim()) {
            return "Please ask me something about Jackson's portfolio!";
        }

        // Add to conversation history
        this.conversationHistory.push({ type: 'user', content: userInput });
        
        // Keep history manageable
        if (this.conversationHistory.length > 20) {
            this.conversationHistory = this.conversationHistory.slice(-10);
        }

        let response;
        let success = true;

        // Check for greetings and farewells first
        const interactionType = this.detectGreeting(userInput);
        if (interactionType) {
            response = this.getGreetingResponse(interactionType, userInput);
            if (response) {
                this.conversationHistory.push({ type: 'bot', content: response });
                return response;
            }
        }

        // Find best match
        const match = this.findBestMatch(userInput);
        
        if (match) {
            // Select random variation from answers array
            const randomAnswer = match.answers[Math.floor(Math.random() * match.answers.length)];
            response = randomAnswer;
        } else {
            // Use fallback
            const randomIndex = Math.floor(Math.random() * this.fallbackResponses.length);
            response = this.fallbackResponses[randomIndex];
            success = false;
        }

        // Add engagement and personality (skip for greetings since they already have personality)
        if (!interactionType) {
            const tone = this.detectTone(userInput);
            const engagement = this.engagementPhrases[Math.floor(Math.random() * this.engagementPhrases.length)];
            const followUp = this.followUpQuestions[Math.floor(Math.random() * this.followUpQuestions.length)];

            // Apply tone-based adjustments
            if (tone === 'positive') {
                response = "😊 " + engagement + response + followUp;
            } else if (tone === 'negative') {
                response = "Let me clarify that " + response.toLowerCase() + " I hope this helps!";
            } else {
                response = engagement + response + followUp;
            }
        }

        // Add to conversation history
        this.conversationHistory.push({ type: 'bot', content: response });

        console.log("AI response:", response);
        return response;
    }

    getSuggestions() {
        return this.getContextualSuggestions();
    }

    // Clear conversation history
    clearHistory() {
        this.conversationHistory = [];
    }
}

// Create global instance
const portfolioAI = new PortfolioAI();