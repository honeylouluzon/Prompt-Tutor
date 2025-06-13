// js/promptEvaluator.js

const PromptEvaluator = {
    config: {
        apiEndpoint: '',
        apiKey: '',
        model: ''
    },

    criteriaWeights: {
        Chatbot: {
            Clarity: 0.2,
            Specificity: 0.2,
            Structure: 0.2,
            Completeness: 0.2,
            ComplexityManagement: 0.1,
            InstructionEmphasis: 0.1
        },
        Coding: {
            Clarity: 0.2,
            Specificity: 0.2,
            Structure: 0.2,
            Completeness: 0.2,
            CorrectnessConstraints: 0.2
        },
        Image: {
            Clarity: 0.2,
            Specificity: 0.3,
            Structure: 0.1,
            Creativity: 0.3,
            ComplexityManagement: 0.1
        },
        Research: {
            Clarity: 0.2,
            Specificity: 0.2,
            Structure: 0.2,
            Completeness: 0.2,
            BestPractices: 0.2
        }
    },

    async evaluate(prompt, type, modelType) {
        // Get model configuration
        const modelConfig = ModelManager.modelConfigs[modelType];
        if (!modelConfig) {
            throw new Error(`Invalid model type: ${modelType}`);
        }

        // If in simulation mode, use local evaluation
        if (ModelManager.isSimulationMode(modelType)) {
            return this.simulateEvaluation(prompt, type);
        }

        // Get API key for the selected model
        const apiKey = await ModelManager.getApiKey(modelType);
        if (!apiKey) {
            throw new Error(`API key not found for model: ${modelType}`);
        }

        // Update config with model-specific settings
        this.config.apiEndpoint = modelConfig.apiEndpoint;
        this.config.apiKey = apiKey;
        this.config.model = modelConfig.models?.[0] || modelType;

        return await this.performEvaluation(prompt, type);
    },

    async performEvaluation(prompt, type) {
        const criteria = EvaluationCriteria.criteria;
        const result = await this.callAPI(prompt, type);
        
        // Process the result and calculate scores
        const scores = {
            core: {},
            useCase: {}
        };

        // Calculate core criteria scores
        Object.keys(criteria.core).forEach(criterion => {
            scores.core[criterion] = result.criteria[criterion] || 0;
        });

        // Calculate use-case specific scores
        const useCaseCriteria = criteria.useCase[type.toLowerCase()];
        Object.keys(useCaseCriteria).forEach(criterion => {
            scores.useCase[criterion] = result.criteria[criterion] || 0;
        });

        // Generate knowledge graph data
        const graphData = {
            topics: result.topics || [],
            entities: result.entities || [],
            styles: result.styles || []
        };

        // Update knowledge graph
        this.updateKnowledgeGraph(graphData, prompt, type);

        return {
            prompt,
            type,
            scores,
            totalScore: result.score,
            suggestions: result.suggestions,
            improvedPrompt: result.improvedPrompt,
            graphData
        };
    },

    updateKnowledgeGraph(graphData, prompt, type) {
        // Add nodes for topics
        graphData.topics.forEach(topic => {
            GraphVisualizer.addNode({
                id: `topic-${topic}`,
                type: 'topic',
                label: topic
            });
        });

        // Add nodes for entities
        graphData.entities.forEach(entity => {
            GraphVisualizer.addNode({
                id: `entity-${entity}`,
                type: 'entity',
                label: entity
            });
        });

        // Add prompt node
        const promptNode = {
            id: `prompt-${Date.now()}`,
            type: 'prompt',
            label: prompt.substring(0, 30) + '...',
            properties: { type, fullText: prompt }
        };
        GraphVisualizer.addNode(promptNode);

        // Add edges
        graphData.topics.forEach(topic => {
            GraphVisualizer.addEdge(promptNode.id, `topic-${topic}`, 'contains');
        });

        graphData.entities.forEach(entity => {
            GraphVisualizer.addEdge(promptNode.id, `entity-${entity}`, 'mentions');
        });
    },

    simulateEvaluation(prompt, type) {
        // Simulate API response for models in simulation mode
        const simulatedScore = Math.floor(Math.random() * 40) + 60; // Score between 60-100
        const criteria = {
            Clarity: Math.floor(Math.random() * 2) + 3,
            Specificity: Math.floor(Math.random() * 2) + 3,
            Structure: Math.floor(Math.random() * 2) + 3,
            Completeness: Math.floor(Math.random() * 2) + 3,
            ComplexityManagement: Math.floor(Math.random() * 2) + 3
        };

        return {
            prompt,
            type,
            scores: {
                core: criteria,
                useCase: {}
            },
            totalScore: simulatedScore,
            suggestions: [
                "Consider adding more specific details",
                "Try structuring the prompt with clear sections",
                "Include examples where applicable"
            ],
            improvedPrompt: this.generateImprovedPrompt(prompt, type, criteria),
            graphData: {
                topics: ["simulation", type.toLowerCase()],
                entities: ["prompt", "evaluation"],
                styles: ["basic"]
            }
        };
    }
};