// Data Manager Module
const DataManager = {
    // Storage keys
    STORAGE_KEYS: {
        USER_PROFILE: 'PRT_UserProfile',
        HISTORY: 'PRT_History',
        LEADERBOARD: 'PRT_Leaderboard',
        BADGES: 'PRT_Badges',
        KNOWLEDGE_GRAPH: 'PRT_KnowledgeGraph',
        CSV: 'PRT_CSV'
    },

    // Initialize storage if empty
    init() {
        Object.values(this.STORAGE_KEYS).forEach(key => {
            if (!localStorage.getItem(key)) {
                switch (key) {
                    case this.STORAGE_KEYS.USER_PROFILE:
                        localStorage.setItem(key, JSON.stringify({}));
                        break;
                    case this.STORAGE_KEYS.HISTORY:
                        localStorage.setItem(key, JSON.stringify([]));
                        break;
                    case this.STORAGE_KEYS.LEADERBOARD:
                        localStorage.setItem(key, JSON.stringify([]));
                        break;
                    case this.STORAGE_KEYS.BADGES:
                        localStorage.setItem(key, JSON.stringify({}));
                        break;
                    case this.STORAGE_KEYS.KNOWLEDGE_GRAPH:
                        localStorage.setItem(key, JSON.stringify({
                            topics: {},
                            entities: {},
                            styles: {},
                            associations: []
                        }));
                        break;
                    case this.STORAGE_KEYS.CSV:
                        localStorage.setItem(key, 'Timestamp,Username,Continent,PromptType,Score,PromptSnippet\n');
                        break;
                }
            }
        });
    },

    // History Methods
    loadHistory() {
        try {
            const history = JSON.parse(localStorage.getItem(this.STORAGE_KEYS.HISTORY));
            return Array.isArray(history) ? history : [];
        } catch (error) {
            console.error('Error loading history:', error);
            return [];
        }
    },

    addHistoryEntry(entry) {
        try {
            const history = this.loadHistory();
            
            // Validate required fields
            if (!entry || typeof entry !== 'object') {
                throw new Error('Invalid history entry: must be an object');
            }
            
            // Ensure required fields exist
            const validatedEntry = {
                ...entry,
                timestamp: entry.timestamp || Date.now(),
                score: typeof entry.score === 'number' ? entry.score : 0,
                criteria: entry.criteria || {},
                styles: Array.isArray(entry.styles) ? entry.styles : [],
                type: entry.type || 'Unknown',
                prompt: entry.prompt || ''
            };

            history.push(validatedEntry);
            localStorage.setItem(this.STORAGE_KEYS.HISTORY, JSON.stringify(history));

            // Also update CSV log
            this.appendToCSV(validatedEntry);
        } catch (error) {
            console.error('Error adding history entry:', error);
            throw error;
        }
    },

    appendToCSV(entry) {
        try {
            const csv = localStorage.getItem(this.STORAGE_KEYS.CSV) || 'Timestamp,Username,Continent,PromptType,Score,PromptSnippet\n';
            const timestamp = new Date(entry.timestamp).toISOString();
            const username = entry.username || 'Anonymous';
            const continent = entry.continent || 'Unknown';
            const promptType = entry.type || 'Unknown';
            const score = entry.score || 0;
            const promptSnippet = (entry.prompt || '').substring(0, 100).replace(/,/g, ';'); // Truncate and escape commas

            const newRow = `${timestamp},${username},${continent},${promptType},${score},"${promptSnippet}"\n`;
            localStorage.setItem(this.STORAGE_KEYS.CSV, csv + newRow);
        } catch (error) {
            console.error('Error appending to CSV:', error);
        }
    },

    // User Profile Methods
    loadProfile() {
        try {
            return JSON.parse(localStorage.getItem(this.STORAGE_KEYS.USER_PROFILE)) || {};
        } catch (error) {
            console.error('Error loading profile:', error);
            return {};
        }
    },

    saveProfile(profile) {
        try {
            localStorage.setItem(this.STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
        } catch (error) {
            console.error('Error saving profile:', error);
            throw error;
        }
    },

    // Leaderboard Methods
    loadLeaderboardData() {
        try {
            return JSON.parse(localStorage.getItem(this.STORAGE_KEYS.LEADERBOARD)) || [];
        } catch (error) {
            console.error('Error loading leaderboard:', error);
            return [];
        }
    },

    saveLeaderboardData(data) {
        try {
            localStorage.setItem(this.STORAGE_KEYS.LEADERBOARD, JSON.stringify(data));
        } catch (error) {
            console.error('Error saving leaderboard:', error);
            throw error;
        }
    },

    // Badge Methods
    loadBadges() {
        try {
            return JSON.parse(localStorage.getItem(this.STORAGE_KEYS.BADGES)) || {};
        } catch (error) {
            console.error('Error loading badges:', error);
            return {};
        }
    },

    saveBadges(badges) {
        try {
            localStorage.setItem(this.STORAGE_KEYS.BADGES, JSON.stringify(badges));
        } catch (error) {
            console.error('Error saving badges:', error);
            throw error;
        }
    },

    // Knowledge Graph Methods
    loadKnowledgeGraph() {
        try {
            return JSON.parse(localStorage.getItem(this.STORAGE_KEYS.KNOWLEDGE_GRAPH)) || {
                topics: {},
                entities: {},
                styles: {},
                associations: []
            };
        } catch (error) {
            console.error('Error loading knowledge graph:', error);
            return {
                topics: {},
                entities: {},
                styles: {},
                associations: []
            };
        }
    },

    saveKnowledgeGraph(graph) {
        try {
            localStorage.setItem(this.STORAGE_KEYS.KNOWLEDGE_GRAPH, JSON.stringify(graph));
        } catch (error) {
            console.error('Error saving knowledge graph:', error);
            throw error;
        }
    },

    // Reset Methods
    resetAll() {
        try {
            Object.values(this.STORAGE_KEYS).forEach(key => {
                localStorage.removeItem(key);
            });
            this.init();
        } catch (error) {
            console.error('Error resetting data:', error);
            throw error;
        }
    }
};

// Initialize storage on load
DataManager.init();
