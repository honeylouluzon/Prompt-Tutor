// js/achievementManager.js

const AchievementManager = {
    achievements: {
        quality: {
            clarityMaster: {
                id: 'clarity-master',
                name: 'Clarity Master',
                description: 'Achieve perfect clarity scores on 5 prompts',
                icon: '🎯',
                requirement: {
                    type: 'score',
                    criterion: 'Clarity',
                    threshold: 5,
                    count: 5
                }
            },
            specificityChampion: {
                id: 'specificity-champion',
                name: 'Specificity Champion',
                description: 'Create highly specific prompts consistently',
                icon: '🎪',
                requirement: {
                    type: 'score',
                    criterion: 'Specificity',
                    threshold: 4.5,
                    count: 3
                }
            }
        },
        useCase: {
            chatbotExpert: {
                id: 'chatbot-expert',
                name: 'Chatbot Expert',
                description: 'Master chatbot prompt creation',
                icon: '🤖',
                requirement: {
                    type: 'useCase',
                    category: 'Chatbot',
                    threshold: 90,
                    count: 5
                }
            },
            codeMaster: {
                id: 'code-master',
                name: 'Code Master',
                description: 'Excel at coding prompt creation',
                icon: '👨‍💻',
                requirement: {
                    type: 'useCase',
                    category: 'Coding',
                    threshold: 90,
                    count: 5
                }
            }
        },
        milestone: {
            perfectScore: {
                id: 'perfect-score',
                name: 'Perfect Score',
                description: 'Achieve a 100% score on any prompt',
                icon: '🏆',
                requirement: {
                    type: 'score',
                    threshold: 100,
                    count: 1
                }
            },
            promptMaster: {
                id: 'prompt-master',
                name: 'Prompt Master',
                description: 'Submit 50 prompts',
                icon: '👑',
                requirement: {
                    type: 'count',
                    threshold: 50
                }
            }
        }
    },

    checkAchievements(evaluation, history) {
        const newAchievements = [];
        const unlockedAchievements = DataManager.loadUnlockedAchievements();

        // Check each achievement category
        Object.values(this.achievements).forEach(category => {
            Object.values(category).forEach(achievement => {
                if (!unlockedAchievements.includes(achievement.id) && 
                    this.meetsRequirement(achievement, evaluation, history)) {
                    newAchievements.push(achievement);
                    unlockedAchievements.push(achievement.id);
                }
            });
        });

        if (newAchievements.length > 0) {
            DataManager.saveUnlockedAchievements(unlockedAchievements);
        }

        return newAchievements;
    },

    meetsRequirement(achievement, evaluation, history) {
        const req = achievement.requirement;

        switch (req.type) {
            case 'score':
                if (req.criterion) {
                    // Check specific criterion scores
                    const relevantScores = history.filter(entry => 
                        entry.scores.core[req.criterion] >= req.threshold
                    );
                    return relevantScores.length >= req.count;
                } else {
                    // Check total scores
                    const highScores = history.filter(entry => 
                        entry.totalScore >= req.threshold
                    );
                    return highScores.length >= req.count;
                }

            case 'useCase':
                const useCasePrompts = history.filter(entry => 
                    entry.type === req.category && 
                    entry.totalScore >= req.threshold
                );
                return useCasePrompts.length >= req.count;

            case 'count':
                return history.length >= req.threshold;

            default:
                return false;
        }
    }
};