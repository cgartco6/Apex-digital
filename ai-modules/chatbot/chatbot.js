// AI Chatbot module for Apex Digital
class Chatbot {
    constructor() {
        this.name = 'Apex Chatbot';
        this.version = '1.0.0';
        this.initialized = false;
        this.trainingData = [];
    }

    async init() {
        try {
            // Load training data
            await this.loadTrainingData();
            this.initialized = true;
            console.log(`${this.name} initialized successfully`);
        } catch (error) {
            console.error(`Failed to initialize ${this.name}:`, error);
        }
    }

    async loadTrainingData() {
        try {
            const response = await fetch('/ai-modules/chatbot/training-data.json');
            this.trainingData = await response.json();
        } catch (error) {
            console.error('Failed to load training data:', error);
            // Fallback to basic training data
            this.trainingData = [
                {
                    question: "What services do you offer?",
                    answer: "We offer AI chatbots, data dashboards, marketing automation, and security solutions."
                },
                {
                    question: "How much does it cost?",
                    answer: "We have packages starting from R1,499 per month. Please check our pricing page for details."
                }
            ];
        }
    }

    async process(inquiry) {
        if (!this.initialized) {
            await this.init();
        }

        // Find the best matching question
        const bestMatch = this.findBestMatch(inquiry.message);
        
        if (bestMatch) {
            return {
                success: true,
                response: bestMatch.answer,
                confidence: bestMatch.confidence
            };
        } else {
            // Fallback to default response
            return {
                success: true,
                response: "Thank you for your inquiry. Our team will get back to you shortly.",
                confidence: 0
            };
        }
    }

    findBestMatch(message) {
        const words = message.toLowerCase().split(/\s+/);
        let bestMatch = null;
        let highestScore = 0;

        for (const item of this.trainingData) {
            const score = this.calculateSimilarity(words, item.question.toLowerCase().split(/\s+/));
            if (score > highestScore) {
                highestScore = score;
                bestMatch = {
                    answer: item.answer,
                    confidence: score
                };
            }
        }

        // Only return if confidence is above threshold
        return highestScore > 0.3 ? bestMatch : null;
    }

    calculateSimilarity(words1, words2) {
        // Simple similarity calculation based on word overlap
        const commonWords = words1.filter(word => words2.includes(word));
        return commonWords.length / Math.max(words1.length, words2.length);
    }

    async learnFromInteraction(question, answer) {
        // Add new training data
        this.trainingData.push({
            question: question,
            answer: answer
        });

        // In a real implementation, this would save to a database
        console.log('Learned new response:', question, answer);
    }
}

// Register the chatbot module
window.chatbot = new Chatbot();
