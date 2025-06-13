// js/tutorialManager.js

const TutorialManager = {
    currentModule: 0,
    modules: [
        {
            id: 1,
            title: "Introduction to Prompting",
            sections: [
                {
                    title: "What are prompts?",
                    content: "Prompts are instructions given to AI models to generate specific outputs.",
                    exercise: {
                        task: "Write a simple prompt asking for a weather forecast.",
                        example: "Please provide a weather forecast for New York City for tomorrow.",
                        criteria: ["Clarity", "Specificity"]
                    }
                },
                {
                    title: "Understanding AI Model Behavior",
                    content: "Learn how different AI models interpret and respond to prompts.",
                    exercise: {
                        task: "Compare responses from different AI models.",
                        example: "Generate three different versions of the same prompt for different models.",
                        criteria: ["Model Understanding", "Adaptation"]
                    }
                }
            ]
        },
        {
            id: 2,
            title: "Fundamentals of Effective Prompts",
            sections: [
                {
                    title: "Writing Clear and Concise Prompts",
                    content: "Learn the principles of clarity and conciseness in prompt writing.",
                    exercise: {
                        task: "Rewrite a verbose prompt to be more concise.",
                        example: "Original: 'I would like you to help me create a detailed list of items that I need to pack for my upcoming vacation to a beach destination where I will be staying for approximately one week.'\nImproved: 'Create a packing list for a one-week beach vacation.'",
                        criteria: ["Clarity", "Conciseness"]
                    }
                }
            ]
        },
        // Add more modules here
    ],

    async startTutorial() {
        this.currentModule = 0;
        return this.getModuleContent(0);
    },

    async getModuleContent(moduleIndex) {
        if (moduleIndex >= this.modules.length) {
            return null;
        }
        return this.modules[moduleIndex];
    },

    async evaluateExercise(moduleId, sectionIndex, submission) {
        const module = this.modules.find(m => m.id === moduleId);
        if (!module || !module.sections[sectionIndex]) {
            throw new Error('Invalid module or section');
        }

        const exercise = module.sections[sectionIndex].exercise;
        const evaluation = await PromptEvaluator.evaluate(
            submission,
            'Tutorial',
            ModelManager.MODELS.OPENAI
        );

        // Check if user meets the exercise criteria
        const passed = exercise.criteria.every(criterion => 
            evaluation.scores.core[criterion] >= 4
        );

        return {
            passed,
            score: evaluation.totalScore,
            feedback: evaluation.suggestions,
            improvedVersion: evaluation.improvedPrompt
        };
    },

    async unlockAchievement(moduleId) {
        const achievement = {
            id: `tutorial-${moduleId}`,
            type: 'tutorial',
            timestamp: new Date().toISOString()
        };
        
        const achievements = DataManager.loadUnlockedAchievements();
        if (!achievements.find(a => a.id === achievement.id)) {
            achievements.push(achievement);
            DataManager.saveUnlockedAchievements(achievements);
            return true;
        }
        return false;
    },

    getProgress() {
        const achievements = DataManager.loadUnlockedAchievements();
        const tutorialAchievements = achievements.filter(a => a.type === 'tutorial');
        return {
            completedModules: tutorialAchievements.length,
            totalModules: this.modules.length,
            percentage: (tutorialAchievements.length / this.modules.length) * 100
        };
    }
};