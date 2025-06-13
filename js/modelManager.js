// js/modelManager.js

const ModelManager = {
    MODELS: {
        OPENAI: 'openai',
        CLAUDE: 'claude',
        LLAMA: 'llama',
        DEEPSEEK: 'deepseek',
        MISTRAL: 'mistral',
        GEMINI: 'gemini',
        PERPLEXITY: 'perplexity'
    },

    modelConfigs: {
        openai: {
            requiresKey: true,
            apiEndpoint: 'https://api.openai.com/v1/chat/completions',
            models: ['gpt-4', 'gpt-3.5-turbo']
        },
        claude: {
            requiresKey: true,
            apiEndpoint: 'https://api.anthropic.com/v1/messages',
            models: ['claude-2', 'claude-instant']
        },
        llama: {
            requiresKey: false,
            simulationMode: true
        },
        deepseek: {
            requiresKey: true,
            apiEndpoint: 'https://api.deepseek.com/v1/chat/completions'
        },
        mistral: {
            requiresKey: false,
            simulationMode: true
        },
        gemini: {
            requiresKey: true,
            apiEndpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro'
        },
        perplexity: {
            requiresKey: true,
            apiEndpoint: 'https://api.perplexity.ai/chat/completions'
        }
    },

    // Store API keys in localStorage with encryption
    async setApiKey(model, key) {
        if (!this.modelConfigs[model]?.requiresKey) {
            throw new Error(`Model ${model} does not require an API key`);
        }
        const encryptedKey = await this.encryptApiKey(key);
        localStorage.setItem(`${model}_api_key`, encryptedKey);
    },

    async getApiKey(model) {
        const encryptedKey = localStorage.getItem(`${model}_api_key`);
        if (!encryptedKey) return null;
        return await this.decryptApiKey(encryptedKey);
    },

    // Simple encryption/decryption (should be replaced with more secure method in production)
    async encryptApiKey(key) {
        // Implementation of encryption
        return btoa(key); // Basic encoding for example
    },

    async decryptApiKey(encryptedKey) {
        // Implementation of decryption
        return atob(encryptedKey); // Basic decoding for example
    },

    // Check if model is in simulation mode
    isSimulationMode(model) {
        return this.modelConfigs[model]?.simulationMode || false;
    },

    // Get available models for a specific provider
    getAvailableModels(provider) {
        return this.modelConfigs[provider]?.models || [];
    },

    // Clear API key for a specific model
    clearApiKey(model) {
        localStorage.removeItem(`${model}_api_key`);
    },

    // Clear all stored API keys
    clearAllApiKeys() {
        Object.keys(this.modelConfigs).forEach(model => {
            this.clearApiKey(model);
        });
    }
};