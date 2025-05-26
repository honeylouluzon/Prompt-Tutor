# Prompt Tutor – Model Selection & API Key Handling

## New Feature: Multi-Model Support

Prompt Tutor now supports selecting different AI models for prompt evaluation:
- **OpenAI (GPT-4, GPT-3.5, etc.)**
- **Llama (Meta AI, local/hosted)**
- **DeepSeek**
- **Mistral**
- **Other/Custom**

**[Live Preview](https://honeylouluzon.github.io/Prompt-Tutor/)**

### How it Works
- On first load or when changing model, users are prompted to select the AI model.
- Only models that require an API key (OpenAI, DeepSeek, Other) will prompt for a key. Llama and Mistral default to simulation mode unless further integration is added.
- Model choice and API key are stored in localStorage for session persistence.
- The backend endpoint and model name are set automatically based on the selected model.

### UI/UX
- The API key dialog now includes model selection.
- Notifications clarify which mode is active (real or simulation).

### Technical Notes
- `PromptEvaluator.init(apiKey, model)` now accepts both parameters and sets endpoint/model defaults.
- `main.js` manages model selection and API key prompts.

---

**This update enables future extensibility for more models and local/hosted LLMs.**
