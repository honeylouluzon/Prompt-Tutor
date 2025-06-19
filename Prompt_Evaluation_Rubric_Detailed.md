# 🧠 Prompt Evaluation Framework (Layer 1–4 Detailed Rubric)

This framework evaluates prompts based on **four distinct layers**, each addressing a different aspect of quality, depth, and alignment with language model capabilities. Each scoring level (1–5) includes specific guiding criteria and examples to reduce ambiguity and improve fairness.

---

## 📘 Overview of the Layers

| Layer | Name | Purpose |
|-------|------|---------|
| 1 | Structural Soundness | Evaluates how well the prompt is constructed in terms of roles, format, and instruction clarity |
| 2 | Cognitive Complexity | Assesses how challenging the prompt is to process or understand, based on mental effort |
| 3 | Knowledge Stretch | Measures how far the prompt pushes the model beyond its typical scope or knowledge boundary |
| 4 | Intent Specificity & Depth | Distinguishes between detailed, useful prompts and those that are long but inefficient or misaligned |

---

## 🧱 Layer 1: Structural Soundness

### 1.1 Role Clarity

| Score | Description | Guiding Questions | Examples |
|-------|-------------|-------------------|----------|
| 5 | Expert-level role with task-relevant background | Does it specify a high-skill role with real-world context? | “You are a Senior Data Engineer at Google.” |
| 4 | Defined professional or functional role | Is there a clearly useful role definition? | “Act as a software tester.” |
| 3 | General but helpful role | Is the role stated but generic? | “Be an assistant.” |
| 2 | Implicit role or confusing | Does the role seem vague or not directly stated? | “Can you help me?” |
| 1 | No role defined | Is the model left without a point of view? | “What is this?” |

### 1.2 Instruction Format

| Score | Description | Guiding Questions | Examples |
|-------|-------------|-------------------|----------|
| 5 | Multi-step, logically ordered | Are the steps well sequenced? | “First summarize, then critique, and finally compare.” |
| 4 | Clearly stated single-step task | Is the task explicitly described? | “Summarize the text.” |
| 3 | Partial or semi-logical instruction | Is it understandable but lacks structure? | “Tell me what this means and your thoughts.” |
| 2 | Vague or run-on instruction | Are there mixed or confusing phrases? | “I need you to read this and also fix it maybe later.” |
| 1 | No recognizable instruction | Is the task unclear or missing? | “Talk about this.” |

### 1.3 Output Expectation

| Score | Description | Guiding Questions | Examples |
|-------|-------------|-------------------|----------|
| 5 | Explicit format, style, and length | Are you told how to present the response? | “Write a bullet list with 5 items.” |
| 4 | Format or style is hinted | Is there at least a format cue? | “Give an overview as a table.” |
| 3 | Informal or inferred format | Is format expected but not stated? | “Tell me about it briefly.” |
| 2 | General request without format | Is it just asking for something? | “Explain this.” |
| 1 | Ambiguous or no output hint | Do you know what kind of output is needed? | “So what do you think?” |

---

## 🧠 Layer 2: Cognitive Complexity

### 2.1 Conceptual Difficulty

| Score | Description | Guiding Questions | Examples |
|-------|-------------|-------------------|----------|
| 5 | Advanced academic or abstract theory | Does it require domain expertise? | “Explain string theory implications.” |
| 4 | University-level content | Is the topic moderately advanced? | “Describe entropy in thermodynamics.” |
| 3 | High school-level complexity | Is it challenging but common? | “What causes rain?” |
| 2 | Basic knowledge recall | Can it be answered from general memory? | “Define a dog.” |
| 1 | Extremely simple, trivial | Is it too basic for any cognitive load? | “What is 1+1?” |

### 2.2 Question Structure Complexity

| Score | Description | Guiding Questions | Examples |
|-------|-------------|-------------------|----------|
| 5 | Multi-layered with conditional branches and nested clauses | Does it contain sub-questions or require task juggling? | “Compare and contrast three ethical theories applied to AI deployment in war and peace scenarios.” |
| 4 | Structured compound questions | Are there multiple parts but cohesive? | “Summarize this and suggest improvements.” |
| 3 | Medium complexity, single domain | Is it just one solid question or instruction? | “Describe mitosis.” |
| 2 | Slightly verbose or loosely constructed | Are parts repeated or vague? | “Could you maybe try to kind of list out or talk about memory?” |
| 1 | Simple declarative request | Is it a clear, basic instruction? | “Translate this sentence.” |

### 2.3 Domain Cross-Referencing

| Score | Description | Guiding Questions | Examples |
|-------|-------------|-------------------|----------|
| 5 | Multiple knowledge domains (e.g. math + ethics + history) | Does it integrate fields that require conceptual bridging? | “Apply Buddhist ethics to climate science policymaking.” |
| 4 | Two major intersecting domains | Are you combining clear but different areas? | “Use AI models to explain Renaissance art evolution.” |
| 3 | One domain with real-world context | Does it connect knowledge to practical examples? | “Explain economic inflation in terms of grocery pricing.” |
| 2 | Purely single-topic focus | Is it academic but narrow? | “What is the Pythagorean Theorem?” |
| 1 | Minimal domain need | Is it answerable without domain context? | “Define sun.” |

---

## 🌐 Layer 3: Knowledge Stretch

### 3.1 Familiarity (3.1.1)

| Score | Description | Guiding Questions | Examples |
|-------|-------------|-------------------|----------|
| 5 | Obscure or emerging topic | Would a typical LLM be trained on this? | “Describe the economic system of Trobriand Islanders.” |
| 4 | Less-common academic niche | Is this taught in specialist courses? | “What is Grover’s Algorithm?” |
| 3 | Mainstream academic or cultural topic | Is it frequently discussed in open sources? | “Explain climate change causes.” |
| 2 | General public knowledge | Is it well-known and recent? | “Who is the President of the US?” |
| 1 | Universal or intuitive concept | Could a 5-year-old ask this? | “What is water?” |

### 3.2 Speculativeness (3.2.1)

| Score | Description | Guiding Questions | Examples |
|-------|-------------|-------------------|----------|
| 5 | Fully hypothetical/futuristic | Is it speculative or imaginative? | “What if AI governed nations?” |
| 4 | Scenario-based projection | Does it propose an alternate scenario? | “If Tesla never existed, what would change?” |
| 3 | Conditional or uncertain reality | Does it include an if/then clause? | “If gravity was stronger, how would it affect life?” |
| 2 | Predictable or modelable outcomes | Is it likely but with minimal variance? | “If it rains, will crops grow?” |
| 1 | No speculation, just fact | Is it a historical or direct query? | “Why did WWII start?” |

### 3.3 Reasoning Beyond Training

| Score | Description | Guiding Questions | Examples |
|-------|-------------|-------------------|----------|
| 5 | Requires novel synthesis or invention | Does the model need to combine unfamiliar or creative logic beyond its training? | “Propose a new ethical framework for AI emotions based on tribal belief systems.” |
| 4 | Requires expert-level insight or reinterpretation | Is the question pushing the model to derive insights not explicitly seen in data? | “How would Einstein's theories apply to interdimensional travel?” |
| 3 | Requires deep but supported reasoning | Is it complex but likely contained in training data? | “What are the long-term risks of AI in education?” |
| 2 | Moderate reasoning, no external connection | Is reasoning limited to well-taught or highly visible ideas? | “Why is the sky blue?” |
| 1 | No reasoning required | Is the answer factual recall or lookup? | “What is the capital of France?” |

---

## 🎯 Layer 4: Intent Specificity & Depth

### 4.1 Intent Clarity

| Score | Description | Guiding Questions | Examples |
|-------|-------------|-------------------|----------|
| 5 | Clear, outcome-driven task | Is the purpose and result obvious? | “Summarize this article for 10-year-olds.” |
| 4 | Specific but generic goal | Does it aim for a valid result? | “Help me understand this issue.” |
| 3 | General curiosity | Is the request exploratory? | “Tell me about science.” |
| 2 | Ambiguous purpose | Is the reason unclear? | “What is this thing?” |
| 1 | No clear goal | Is the prompt too vague to act on? | “Can you do something cool?” |

### 4.2 Justification & Depth

| Score | Description | Guiding Questions | Examples |
|-------|-------------|-------------------|----------|
| 5 | Requests rationale, assumptions, implications | Does the prompt ask “why,” “how,” or “what if” in addition to “what”? | “Explain how this policy will affect three stakeholder groups and justify why it matters.” |
| 4 | Asks for explanation or extended reasoning | Is the task asking more than just listing? | “Explain why this event occurred.” |
| 3 | Some probing but no explicit demand for reasoning | Is depth implied but not required? | “Give me an analysis.” |
| 2 | Lists or facts with shallow depth | Are you just asking for output without reasons? | “Name five benefits of sleep.” |
| 1 | No depth intended | Is the prompt answerable by a bullet point or yes/no? | “Is the sun hot?” |

### 4.3 Efficiency & Optimization

| Score | Description | Guiding Questions | Examples |
|-------|-------------|-------------------|----------|
| 5 | Highly optimized prompt with minimal tokens and no loss of clarity | Does it use tokens well with precision? | “Summarize this as a 3-point executive brief.” |
| 4 | Well-written and slightly verbose but useful | Is some redundancy present but still adds clarity? | “Please break down this topic and give pros/cons.” |
| 3 | Verbose with some filler | Could the task be rephrased to save tokens? | “I would appreciate it if you could kindly explain…” |
| 2 | Excessive detail without much value | Are you overdescribing without need? | “This is just a bit of a random topic I’d like to know maybe more about if possible…” |
| 1 | Highly wasteful or incoherent | Is it over-explaining, off-topic, or unclear? | Long prompt that gives vague, irrelevant, or conflicting details. |

---

## ✅ Final Notes

- **Each layer is independently scored** from 1–5.
- **Total prompt score** = Sum or weighted average depending on use case.
- **Ideal use**: Prompt engineering training, LLM benchmarking, self-improvement.
- **Avoid misuse**: Do not gamify length or verbosity. Precision + clarity = best quality.