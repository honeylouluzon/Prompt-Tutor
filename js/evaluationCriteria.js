// js/evaluationCriteria.js

const EvaluationCriteria = {
    criteria: {
        core: {
            clarity: {
                weight: 0.2,
                description: "How clear and unambiguous is the prompt?"
            },
            specificity: {
                weight: 0.2,
                description: "How specific and detailed is the prompt?"
            },
            structure: {
                weight: 0.2,
                description: "How well-organized and logically structured is the prompt?"
            },
            completeness: {
                weight: 0.2,
                description: "How complete is the prompt in covering all necessary aspects?"
            },
            complexityManagement: {
                weight: 0.2,
                description: "How well does the prompt handle complexity and edge cases?"
            }
        },
        
        useCase: {
            chatbot: {
                instructionEmphasis: {
                    weight: 1.0,
                    description: "How well does the prompt emphasize key instructions?"
                }
            },
            coding: {
                correctnessConstraints: {
                    weight: 1.0,
                    description: "How well does the prompt specify correctness requirements?"
                }
            },
            image: {
                creativity: {
                    weight: 1.0,
                    description: "How well does the prompt encourage creative interpretation?"
                }
            },
            research: {
                bestPractices: {
                    weight: 1.0,
                    description: "How well does the prompt follow research best practices?"
                }
            }
        }
    },

    evaluatePrompt(prompt, type, model) {
        const scores = {
            core: this.evaluateCoreCriteria(prompt),
            useCase: this.evaluateUseCaseCriteria(prompt, type)
        };

        return {
            scores,
            totalScore: this.calculateTotalScore(scores),
            feedback: this.generateFeedback(scores, type),
            suggestions: this.generateSuggestions(scores, type)
        };
    },

    evaluateCoreCriteria(prompt) {
        // Implementation for core criteria evaluation
        let scores = {};
        Object.keys(this.criteria.core).forEach(criterion => {
            scores[criterion] = this.evaluateSingleCriterion(prompt, criterion);
        });
        return scores;
    },

    evaluateUseCaseCriteria(prompt, type) {
        // Implementation for use-case specific criteria
        const useCaseCriteria = this.criteria.useCase[type.toLowerCase()];
        let scores = {};
        Object.keys(useCaseCriteria).forEach(criterion => {
            scores[criterion] = this.evaluateSingleCriterion(prompt, criterion);
        });
        return scores;
    },

    evaluateSingleCriterion(prompt, criterion) {
        // Implementation for single criterion evaluation
        // This would contain the actual logic for evaluating each criterion
        // Returns a score between 0 and 5
        return 0; // Placeholder
    },

    calculateTotalScore(scores) {
        // Calculate weighted average of all scores
        let totalScore = 0;
        let totalWeight = 0;

        // Calculate core criteria scores
        Object.entries(scores.core).forEach(([criterion, score]) => {
            const weight = this.criteria.core[criterion].weight;
            totalScore += score * weight;
            totalWeight += weight;
        });

        // Calculate use-case specific scores
        Object.entries(scores.useCase).forEach(([criterion, score]) => {
            const weight = 1.0; // Use-case criteria have equal weights
            totalScore += score * weight;
            totalWeight += weight;
        });

        return (totalScore / totalWeight) * 20; // Convert to 0-100 scale
    },

    generateFeedback(scores, type) {
        // Generate detailed feedback based on scores
        let feedback = [];
        
        // Core criteria feedback
        Object.entries(scores.core).forEach(([criterion, score]) => {
            feedback.push({
                criterion,
                score,
                message: this.getFeedbackMessage(criterion, score)
            });
        });

        // Use-case specific feedback
        Object.entries(scores.useCase).forEach(([criterion, score]) => {
            feedback.push({
                criterion,
                score,
                message: this.getFeedbackMessage(criterion, score)
            });
        });

        return feedback;
    },

    generateSuggestions(scores, type) {
        // Generate improvement suggestions based on scores
        let suggestions = [];
        
        // Add suggestions for low-scoring criteria
        Object.entries(scores.core).forEach(([criterion, score]) => {
            if (score < 4) {
                suggestions.push(this.getSuggestion(criterion));
            }
        });

        return suggestions;
    },

    getFeedbackMessage(criterion, score) {
        // Return appropriate feedback message based on criterion and score
        return "Placeholder feedback message"; // Implement actual feedback logic
    },

    getSuggestion(criterion) {
        // Return improvement suggestion for given criterion
        return "Placeholder suggestion"; // Implement actual suggestion logic
    }
};