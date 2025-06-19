# Prompt Tutor – Multi-Model Prompt Evaluation and Interactive Prompting Guide

## Overview

Prompt Tutor is a powerful tool designed to help users create, improve, and evaluate prompts across various AI models. It supports advanced scoring mechanisms, detailed feedback, and interactive learning to master the art of crafting effective prompts.

**[Live Preview](https://htmlpreview.github.io/?https://github.com/honeylouluzon/Prompt-Tutor/blob/main/index.html)**  
**[GitHub Page](https://honeylouluzon.github.io/Prompt-Tutor/)**

---

## Features

### 1. Multi-Model Support
Prompt Tutor supports a wide variety of AI models, enabling users to leverage the capabilities of different systems to suit their needs.  
**Supported AI Models:**
- **OpenAI**: GPT-4, GPT-3.5, etc.
- **Claude**: Anthropic's Claude models for conversational and reasoning tasks.
- **Llama**: Meta AI's Llama series (local or hosted setups).
- **DeepSeek**: Specialized for nuanced research assistance.
- **Mistral**: Lightweight, high-performance models for efficient inference.
- **Gemini**: Google's advanced conversational AI platform.
- **Perplexity**: AI for question answering and summarization.
- **Other/Custom Models**: Expandable via API configuration for models like Cohere, Falcon, Aleph Alpha, etc.

**Key Features:**
- **API Key Management**: Models requiring API keys (e.g., OpenAI, Claude, DeepSeek) prompt users for keys, securely stored in the browser's local storage.
- **Simulation Mode**: Default mode for models like Llama and Mistral that do not require keys.
- **Real-Time Model Switching**: Seamlessly switch between models with dynamic backend configuration.

---

### 2. Comprehensive Prompt Evaluation
Evaluate and improve prompts with an in-depth scoring and feedback system:
- **Supported Prompt Types:**
  - Chatbot
  - Coding
  - Image Generation
  - Research
- **Criteria-Based Scoring:**
  - **Core Criteria:**
    - Clarity
    - Specificity
    - Structure
    - Completeness
    - Complexity Management
  - **Use Case-Specific Criteria:**
    - **Chatbot:** Instruction Emphasis
    - **Coding:** Correctness & Constraints
    - **Image Generation:** Originality/Creativity
    - **Research:** Use of Best Practices
- **Feedback & Suggestions:**
  - Breakdown of scores for each criterion.
  - Actionable suggestions for improvement.
  - Auto-generated improved prompts.

---

### 3. Interactive OpenAI Prompting Guide

Master the art of creating effective prompts with our **Interactive OpenAI Prompting Guide**, a hands-on course designed to teach users best practices for crafting high-quality prompts tailored to OpenAI models and other AI systems.

#### Key Features:
- **Step-by-Step Tutorials:**
  - Learn prompt fundamentals:
    - Writing clear and specific instructions.
    - Managing complexity and ambiguity.
  - Advanced techniques:
    - Multi-turn conversations and iterative refinement.
    - Leveraging system-level instructions.

- **Interactive Exercises:**
  - Practice creating prompts for real-world use cases such as:
    - Chatbot conversations.
    - Generating code snippets.
    - Summarizing long texts.
    - Creative writing and idea generation.
  - Instant feedback with scoring and tips for refinement.

- **Achievements and Badges:**
  - Earn badges as you complete exercises and demonstrate mastery of prompt-writing skills.

#### Course Outline:
1. **Introduction to Prompting**
   - What are prompts and why are they important?
   - Understanding AI model behavior.
2. **Fundamentals of Effective Prompts**
   - Writing clear and concise prompts.
   - Structuring prompts for specific use cases.
3. **Advanced Prompting Techniques**
   - Managing multi-turn conversations.
   - Using system-level instructions for context setting.
   - Encouraging creativity and out-of-the-box thinking.
4. **Use Case Tutorials**
   - Chatbot: Designing engaging conversational flows.
   - Coding: Writing precise prompts for code generation.
   - Image Generation: Crafting prompts for creative visuals.
   - Research: Creating prompts for deep analytical tasks.
5. **Interactive Practice**
   - Real-world scenarios with instant feedback.
   - Iterative improvement exercises.
6. **Mastery and Certification**
   - Final assessment to test your skills.
   - Earn badges and track progress in your profile.

To access the guide, navigate to the **Tutorials** section in the app and select "OpenAI Prompting Guide."

---

### 4. User Profile & Achievements
- **Customizable Profiles:**
  - Username, contact information (optional), and continent.
- **Achievements System:**
  - Earn badges based on performance, prompt quality, and use case expertise.
  - Examples of badges:
    - **Quality Badges:** Clarity Master, Completeness Champion.
    - **Use Case Badges:** Chatbot Expert, Code Master, Image Artist, Research Scholar.
    - **Milestone Badges:** Perfect Score, First 10 Prompts Submitted.

---

### 5. Leaderboard & Rankings
- **Global Rankings:** Compare scores with users worldwide.
- **Regional Rankings:** Filter rankings by continent for localized competition.
- **Metrics Tracked:**
  - Total score
  - Highest score
  - Average score
  - Improvement rate (based on recent performance trends).

---

### 6. Advanced Knowledge Graph
- **Graph Features:**
  - Tracks topics, entities, and styles associated with prompts.
  - Dynamically visualizes relationships between prompts and their contexts.
- **Use Cases:**
  - Identify trends and gaps in prompts.
  - Highlight connections between concepts for better prompt design.

---

### 7. Data Management & Export
- **History Tracking:**
  - Automatically logs all submitted prompts, scores, and feedback.
- **CSV Export:**
  - Easily export evaluation data for tracking and analysis.
- **Local Storage:**
  - User profile, history, leaderboard, and badges are securely stored in the browser's local storage.

---

### 8. Intuitive UI and UX
- **Responsive Design:**
  - Mobile-friendly interface with clean layouts.
- **Dynamic Section Navigation:**
  - Navigate seamlessly between Home, Review, Leaderboard, and Achievements.
- **Real-Time Notifications:**
  - Inform users of actions like API key updates, evaluation results, or leaderboard updates.

---

### 9. Security & Privacy
- **API Key Handling:**
  - Keys are stored securely in the browser's local storage.
  - Option to clear keys at any time for enhanced privacy.
- **Simulation Mode:**
  - Enables prompt testing without exposing sensitive API keys.

---

## Expanded AI Model Options
Prompt Tutor is designed to adapt to the evolving AI landscape, supporting both existing and emerging models. Here's a non-exhaustive list of supported and expandable models:
- **OpenAI (GPT Series)**: For general-purpose AI tasks.
- **Claude (Anthropic)**: Focused on ethical and explainable AI.
- **Llama (Meta AI)**: Ideal for lightweight and hosted solutions.
- **DeepSeek**: Research-focused AI.
- **Mistral**: For optimized performance in smaller models.
- **Gemini (Google)**: Advanced conversational AI.
- **Perplexity AI**: For precise Q&A and summarization tasks.
- **Other/Custom Models**: Expandable via API configuration for models like Cohere, Falcon, Aleph Alpha, etc.

---

## 📊 Integrated Prompt Evaluation Rubric Tool

### Overview

To enhance prompt review quality and ensure consistency across coaching and benchmarking scenarios, Prompt Tutor incorporates the **Prompt Evaluation Rubric**, a detailed, layered scoring system designed to evaluate prompts based on clarity, structure, difficulty, specificity, and knowledge demand. It supports both **manual review** and **LLM-assisted evaluation**.

### 🔍 Layered Rubric Framework

| Layer | Name                         | Purpose                                                                 |
|-------|------------------------------|-------------------------------------------------------------------------|
| 1     | Structural Soundness         | Assesses role clarity, task formatting, and expected output             |
| 2     | Cognitive Complexity         | Measures mental effort and domain crossing required by the prompt       |
| 3     | Knowledge Stretch            | Evaluates how far the prompt pushes beyond model training               |
| 4     | Intent Specificity & Depth   | Differentiates between token efficiency vs detailed task alignment      |

Each criterion within a layer is scored from **1 (low)** to **5 (high)** and includes:

- 📌 **Clear definitions**
- ❓ **Guiding questions**
- 💡 **Real-world examples**
- 📏 **Scope and limitations for each score**

### 🔄 How It's Used in the Review Process

| Review Phase                | Rubric Usage                                                                 |
|----------------------------|------------------------------------------------------------------------------|
| **Pre-Review Analysis**     | Use Layer 1 to evaluate prompt construction quality                          |
| **Detailed Analysis**       | Use all layers to break down complexity, knowledge push, and intent clarity |
| **Feedback Generation**     | Layer scores guide targeted prompt improvements                             |
| **Improvement Tracking**    | Layer scores trend user progress and effectiveness of revisions             |

### 🧠 Review Automation and Training

- **Manual Scoring Interface**: Reviewers assign scores per layer and document reasoning.
- **LLM Review Mode**: Automatically rate prompts using the rubric via API or embedded LLM logic.
- **Reviewer Calibration**: Train teams using the rubric to align review consistency.
- **Rubric Scoring Template**: Used in user profiles, leaderboard rankings, and feedback reports.

### 📁 Rubric File

The full rubric is stored in [Prompt_Evaluation_Rubric_Detailed.md](./Prompt_Evaluation_Rubric_Detailed.md) and includes:

- All scoring criteria (1–5)
- Guiding questions for each score
- Prompt examples for every rating tier
- Full breakdown of Layers 1–4

## Future Roadmap
- **Enhanced Analytics:** Introduce detailed insights and visualizations to track user improvement.
- **Collaborative Features:** Enable team-based prompt reviews and evaluations.
- **Benchmarking Expansion:** Incorporate datasets like Humanity's Last Exam (HLE) for advanced evaluation. Model difficulty benchmark using Humanity’s Last Exam (HLE). Scoring bias detection through layer transparency.
- **Additional Model Integrations:** Expand support for emerging AI models and platforms.

---