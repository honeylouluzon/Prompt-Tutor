// Tutorial Manager Module
const TutorialManager = {
    topics: [
        "Introduction to Prompting",
        "Fundamentals of Effective Prompts",
        "Advanced Prompting Techniques",
        "Use Case Tutorials",
        "Interactive Practice",
        "Mastery and Certification"
    ],

    startTutorial() {
        const tutorialList = document.getElementById('tutorialTopics');
        tutorialList.innerHTML = this.topics.map(topic => `<li>${topic}</li>`).join('');
        UIRenderer.showSection('tutorialsSection');
    },

    completeTopic(topicIndex) {
        if (this.topics[topicIndex]) {
            alert(`You have completed: ${this.topics[topicIndex]}`);
        }
    }
};

// Event Listener for Tutorial Start
document.getElementById('startTutorialBtn').addEventListener('click', () => {
    TutorialManager.startTutorial();
});