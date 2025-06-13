// js/modelConfigUI.js

const ModelConfigUI = {
    init() {
        this.bindEvents();
        this.updateModelConfigDisplay();
    },

    bindEvents() {
        document.getElementById('configureModelBtn').addEventListener('click', () => {
            this.showConfigModal();
        });

        document.getElementById('modelType').addEventListener('change', (e) => {
            this.updateModelOptions(e.target.value);
        });
    },

    showConfigModal() {
        const modalHtml = `
            <div id="modelConfigModal" class="modal">
                <div class="modal-content">
                    <h2>Configure AI Model</h2>
                    <div class="model-config-form">
                        ${this.renderModelConfig()}
                    </div>
                    <div class="modal-actions">
                        <button id="saveModelConfig" class="btn primary">Save Configuration</button>
                        <button id="cancelModelConfig" class="btn secondary">Cancel</button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHtml);
        this.bindModalEvents();
    },

    renderModelConfig() {
        const selectedModel = document.getElementById('modelType').value;
        const modelConfig = ModelManager.modelConfigs[selectedModel];

        if (!modelConfig) {
            return '<p>Please select a model first.</p>';
        }

        let html = `
            <div class="config-section">
                <h3>${selectedModel.toUpperCase()}</h3>
                ${modelConfig.requiresKey ? `
                    <div class="form-group">
                        <label for="apiKey">API Key:</label>
                        <input type="password" id="apiKey" placeholder="Enter your API key" />
                        <p class="help-text">Your API key will be stored securely in your browser.</p>
                    </div>
                ` : `
                    <p class="simulation-notice">This model runs in simulation mode. No API key required.</p>
                `}
                ${modelConfig.models ? `
                    <div class="form-group">
                        <label for="modelVersion">Model Version:</label>
                        <select id="modelVersion">
                            ${modelConfig.models.map(model => `
                                <option value="${model}">${model}</option>
                            `).join('')}
                        </select>
                    </div>
                ` : ''}
            </div>
        `;

        return html;
    },

    bindModalEvents() {
        const modal = document.getElementById('modelConfigModal');

        document.getElementById('saveModelConfig').addEventListener('click', async () => {
            await this.saveConfiguration();
            modal.remove();
        });

        document.getElementById('cancelModelConfig').addEventListener('click', () => {
            modal.remove();
        });

        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    },

    async saveConfiguration() {
        const selectedModel = document.getElementById('modelType').value;
        const apiKeyInput = document.getElementById('apiKey');
        const modelVersion = document.getElementById('modelVersion');

        if (apiKeyInput && apiKeyInput.value) {
            await ModelManager.setApiKey(selectedModel, apiKeyInput.value);
        }

        if (modelVersion) {
            localStorage.setItem(`${selectedModel}_version`, modelVersion.value);
        }

        UIRenderer.showNotification('Model configuration saved successfully!', 3000);
        this.updateModelConfigDisplay();
    },

    updateModelConfigDisplay() {
        const configBtn = document.getElementById('configureModelBtn');
        const selectedModel = document.getElementById('modelType').value;

        if (!selectedModel) return;

        const modelConfig = ModelManager.modelConfigs[selectedModel];
        const hasApiKey = modelConfig.requiresKey ? 
            Boolean(localStorage.getItem(`${selectedModel}_api_key`)) : 
            true;

        configBtn.classList.toggle('configured', hasApiKey);
        configBtn.innerHTML = hasApiKey ? 
            `<span class="config-status">✓</span> Configured` : 
            'Configure Model';
    },

    updateModelOptions(selectedModel) {
        const modelConfig = ModelManager.modelConfigs[selectedModel];
        if (!modelConfig) return;

        this.updateModelConfigDisplay();
    }
};

// Add corresponding CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .modal-content {
        background: white;
        padding: 2rem;
        border-radius: var(--border-radius);
        max-width: 500px;
        width: 90%;
    }

    .config-section {
        margin: 1rem 0;
    }

    .form-group {
        margin: 1rem 0;
    }

    .help-text {
        font-size: 0.9rem;
        color: #666;
        margin-top: 0.5rem;
    }

    .simulation-notice {
        background: #e8f4ff;
        padding: 1rem;
        border-radius: var(--border-radius);
        margin: 1rem 0;
    }

    .config-status {
        color: #00c853;
        margin-right: 0.5rem;
    }

    .configured {
        background: #00c853;
    }

    .modal-actions {
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
        margin-top: 2rem;
    }
`;

document.head.appendChild(styleSheet);
