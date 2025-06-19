# Prompt Tutor – Multi-Model Prompt Evaluation and Interactive Prompting Guide

## Overview

Prompt Tutor is a powerful tool designed to help users create, improve, and evaluate prompts across various AI models. It supports advanced scoring mechanisms, detailed feedback, and interactive learning to master the art of crafting effective prompts.

**[Live Preview](https://htmlpreview.github.io/?https://github.com/honeylouluzon/Prompt-Tutor/blob/main/index.html)**  
**[GitHub Page](https://honeylouluzon.github.io/Prompt-Tutor/)**

---

## Features

### 1. Multi-Model Support

Prompt Tutor supports a wide variety of AI models, enabling users to explore prompt performance across different systems and use cases.

#### 🔧 Key Functional Features:

- **API Key Management**: For cloud-hosted models like OpenAI, Claude, and DeepSeek, users are prompted to enter their API keys. These keys are securely stored in the browser’s local storage.

- **Stateless Mode** *(for local models or keyless APIs)*: Models such as Llama and Mistral (self-hosted or open-source variants) do not require API keys. They can be used directly if configured through the system’s backend.

- **Simulation Mode (Fallback Logic)**: If a model is unavailable (e.g., due to API limits or offline conditions), Prompt Tutor uses predefined logic or template responses built into the system. These static responses simulate LLM behavior and follow the app's evaluation structure—ideal for offline use, demos, or testing scenarios without a live model.

- **Real-Time Model Switching**: Switch between different models on the fly with dynamic backend configuration, enabling live comparison and iterative refinement.

#### 🧠 Supported AI Models and Their Use Cases:

- **OpenAI (GPT-4, GPT-3.5)** – Versatile general-purpose AI, excellent for structured prompting and creative generation.
- **Claude (Anthropic)** – Focuses on safety, alignment, and reasoning for high-trust conversations.
- **Llama (Meta AI)** – Lightweight open models ideal for local deployment or experimentation.
- **DeepSeek** – Research-focused models optimized for analytical and retrieval-heavy tasks.
- **Mistral** – Compact, fast models designed for efficient inference with high-quality output.
- **Gemini (Google)** – Advanced conversational platform with strong integration capabilities.
- **Perplexity AI** – Specialized in summarization and question answering using real-time search.
- **Other/Custom Models** – Fully extendable via API configuration (e.g., Cohere, Falcon, Aleph Alpha).

---

### 2. Comprehensive Prompt Evaluation

Prompt Tutor integrates a robust **[Integrated Prompt & Response Evaluation Rubric Tools](#integrated-prompt-&-response-evaluation-rubric-tools)** that follows a structured methodology outlined in the [Review Process Guide](./Review%20Process.readme.md). This system provides a consistent, transparent, and scalable approach to analyzing and scoring prompt quality across various use cases.

#### 🔍 Supported Prompt Types:
- **Chatbot** – Instruction-based dialogue design
- **Coding** – Task-focused programming prompts and constraints
- **Image Generation** – Descriptive and creative visual language
- **Research** – Deep analytical and domain-specific queries

#### 📊 Criteria-Based Scoring:
Prompt evaluation is guided by a multi-layer rubric with specific scoring logic and subcriteria:

- **Core Evaluation Criteria** *(from the integrated rubric)*:
  - **Clarity** – Unambiguity and interpretability of the prompt
  - **Specificity** – Precision of task definition
  - **Structure** – Logical and functional arrangement
  - **Completeness** – Adequacy of context and constraints
  - **Complexity Management** – Handling of multi-faceted or layered questions

- **Use Case–Specific Criteria**:
  - **Chatbot** – Instructional clarity and dialogue tone
  - **Coding** – Precision in logic, correctness, and constraint handling
  - **Image Generation** – Creativity, vividness, and visual prompt strength
  - **Research** – Use of best practices, reliability, and scope definition

#### 💡 Feedback & Suggestions:
- Detailed score breakdown aligned with the rubric layers
- Context-aware improvement tips
- Auto-generated refined prompt examples
- Guiding questions and references from the rubric to support prompt improvement

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

## Integrated Prompt & Response Evaluation Rubric Tools

### Overview

To ensure high-quality and consistent coaching or benchmarking scenarios, **Prompt Tutor** incorporates **two complementary evaluation tools**:

- 🧾 **Prompt Evaluation Rubric** – Evaluates prompt construction across structure, depth, and difficulty.
- 🧾 **LLM Response Evaluation Rubric** – Assesses the quality and effectiveness of model-generated responses.

Both are designed to support **manual review**, **LLM-assisted feedback**, and **automated evaluation workflows**.

---

### 🔍 Prompt Evaluation Rubric

This rubric assesses **prompt quality** using a 4-layer framework:

| Layer | Name                         | Purpose                                                                 |
|-------|------------------------------|-------------------------------------------------------------------------|
| 1     | Structural Soundness         | Role clarity, task formatting, and output expectations                  |
| 2     | Cognitive Complexity         | Mental effort and cross-domain reasoning                                |
| 3     | Knowledge Stretch            | Extent to which prompts challenge model boundaries                      |
| 4     | Intent Specificity & Depth   | Precision of instructions and goal clarity                              |

Each layer includes:

- 📌 Clear definitions
- ❓ Guiding questions
- 💡 Real-world examples
- 📏 Scoring from 1–5

### 📁 Prompt Rubric File

Stored in [Prompt_Evaluation_Rubric_Detailed.md](./Prompt_Evaluation_Rubric_Detailed.md) and includes:

- Full breakdown of Layers 1–4
- Scoring descriptions with examples
- Reviewer guidance for each level

---

### 📊 LLM Response Evaluation Rubric

This new rubric scores **model-generated responses** based on output-level quality:

| Dimension              | Focus Area                                  |
|------------------------|---------------------------------------------|
| 1. Factual Accuracy    | Verifiability, correctness, and logic       |
| 2. Instructional Alignment | Adherence to the original prompt/task     |
| 3. Coherence & Structure | Clarity, format, and logical organization |
| 4. Insight & Usefulness | Reasoning depth, novelty, actionable value |
| 5. Tone & Style        | Appropriateness and engagement              |

Each response is rated from **1 (poor)** to **5 (excellent)** per category and includes:

- 🔎 Guiding questions per dimension
- 🧠 Examples for calibration
- 🛠️ Use cases: response validation, feedback cycles, reviewer training

### 📁 Response Rubric File

Stored in [LLM_Response_Evaluation_Rubric.md](./LLM_Response_Evaluation_Rubric.md) and includes:

- Full dimension-based scoring system
- Reviewer calibration guidelines
- Output benchmarking support

---

### 🔄 How They Integrate in the Review Process

The rubrics work together within the [Review Process.readme.md](./Review%20Process.readme.md), used across multiple phases:

| Review Phase           | Prompt Rubric Use                      | Response Rubric Use                            |
|------------------------|----------------------------------------|------------------------------------------------|
| Pre-Review Analysis    | Evaluate prompt structure & clarity    | —                                              |
| Detailed Review        | Analyze intent, complexity, depth      | Score outputs for accuracy, value, structure   |
| Feedback Generation    | Suggest prompt improvements            | Offer response-specific feedback & enhancements|
| Reviewer Training      | Calibrate prompt design best practices | Align evaluation consistency for responses     |

---

### 🧠 Review Automation and Scoring

- **Manual Scoring Interfaces** – Rubrics used by human reviewers
- **LLM-Assisted Review** – Responses and prompts evaluated via scoring APIs
- **Evaluation Templates** – Both rubrics support reviewer consistency and leaderboard systems

---

By combining prompt and output rubrics, **Prompt Tutor** provides a **complete, explainable, and consistent evaluation framework** for prompt engineering, AI coaching, and system benchmarking.

## Future Roadmap
- **Enhanced Analytics:** Introduce detailed insights and visualizations to track user improvement.
- **Collaborative Features:** Enable team-based prompt reviews and evaluations.
- **Benchmarking Expansion:** Incorporate datasets like Humanity's Last Exam (HLE) for advanced evaluation. Model difficulty benchmark using Humanity’s Last Exam (HLE). Scoring bias detection through layer transparency.
- **Additional Model Integrations:** Expand support for emerging AI models and platforms.

---
