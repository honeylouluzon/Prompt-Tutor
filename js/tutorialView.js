// js/tutorialView.js

const TutorialView = {
    init() {
        this.container = document.getElementById('tutorialsSection');
        this.moduleList = document.getElementById('tutorialTopics');
        this.bindEvents();
        this.renderModuleList();
    },

    bindEvents() {
        document.getElementById('startTutorialBtn').addEventListener('click', () => {
            this.startTutorial();
        });

        this.moduleList.addEventListener('click', (e) => {
            if (e.target.tagName === 'LI') {
                const moduleId = parseInt(e.target.dataset.moduleId);
                this.showModule(moduleId);
            }
        });
    },

    async renderModuleList() {
        const progress = TutorialManager.getProgress();
        const modules = TutorialManager.modules;
        
        this.moduleList.innerHTML = modules.map((module, index) => `
            <li data-module-id="${module.id}" class="${index <= progress.completedModules ? 'available' : 'locked'}">
                <div class="module-header">
                    <span class="module-title">${module.title}</span>
                    ${index < progress.completedModules ? '<span class="completion-badge">✓</span>' : ''}
                </div>
                <div class="module-progress">
                    <div class="progress-bar" style="width: ${
                        index < progress.completedModules ? '100' : 
                        index === progress.completedModules ? '50' : '0'
                    }%"></div>
                </div>
            </li>
        `).join('');
    },

    async showModule(moduleId) {
        const module = await TutorialManager.getModuleContent(moduleId);
        if (!module) return;

        this.container.innerHTML = `
            <h2>${module.title}</h2>
            <div class="module-sections">
                ${module.sections.map((section, index) => `
                    <div class="section">
                        <h3>${section.title}</h3>
                        <div class="content">${section.content}</div>
                        ${this.renderExercise(section.exercise, moduleId, index)}
                    </div>
                `).join('')}
            </div>
            <div class="module-navigation">
                ${moduleId > 0 ? `
                    <button class="prev-module">Previous Module</button>
                ` : ''}
                ${moduleId < TutorialManager.modules.length - 1 ? `
                    <button class="next-module">Next Module</button>
                ` : ''}
            </div>
        `;

        this.bindModuleEvents(moduleId);
    },

    renderExercise(exercise, moduleId, sectionIndex) {
        return `
            <div class="exercise" data-module="${moduleId}" data-section="${sectionIndex}">
                <h4>Practice Exercise</h4>
                <p class="task">${exercise.task}</p>
                <div class="example">
                    <strong>Example:</strong>
                    <pre>${exercise.example}</pre>
                </div>
                <textarea class="exercise-input" placeholder="Write your answer here..."></textarea>
                <button class="submit-exercise">Submit</button>
                <div class="exercise-feedback hidden"></div>
            </div>
        `;
    },

    bindModuleEvents(moduleId) {
        const container = this.container;

        container.querySelectorAll('.submit-exercise').forEach(button => {
            button.addEventListener('click', async (e) => {
                const exercise = e.target.closest('.exercise');
                const input = exercise.querySelector('.exercise-input').value;
                const sectionIndex = parseInt(exercise.dataset.section);

                const result = await TutorialManager.evaluateExercise(
                    moduleId,
                    sectionIndex,
                    input
                );

                this.showExerciseFeedback(exercise, result);
            });
        });

        container.querySelector('.next-module')?.addEventListener('click', () => {
            this.showModule(moduleId + 1);
        });

        container.querySelector('.prev-module')?.addEventListener('click', () => {
            this.showModule(moduleId - 1);
        });
    },

    showExerciseFeedback(exerciseElement, result) {
        const feedbackDiv = exerciseElement.querySelector('.exercise-feedback');
        feedbackDiv.innerHTML = `
            <div class="feedback-content ${result.passed ? 'success' : 'needs-improvement'}">
                <h4>${result.passed ? 'Great job!' : 'Keep practicing!'}</h4>
                <p>Score: ${result.score}/100</p>
                <ul class="feedback-list">
                    ${result.feedback.map(f => `<li>${f}</li>`).join('')}
                </ul>
                ${result.improvedVersion ? `
                    <div class="improved-version">
                        <h5>Suggested Improvement:</h5>
                        <pre>${result.improvedVersion}</pre>
                    </div>
                ` : ''}
            </div>
        `;
        feedbackDiv.classList.remove('hidden');
    }
};