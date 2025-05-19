// Main Application Module
document.addEventListener('DOMContentLoaded', () => {
    // --- OpenAI API Key Management ---
    function getStoredApiKey() {
        return localStorage.getItem('PRT_OpenAI_API_Key');
    }
    function setStoredApiKey(key) {
        localStorage.setItem('PRT_OpenAI_API_Key', key);
    }
    function clearStoredApiKey() {
        localStorage.removeItem('PRT_OpenAI_API_Key');
    }

    function askForApiKey(force = false) {
        let apiKey = getStoredApiKey();
        if (!apiKey || force) {
            apiKey = window.prompt(
                'Enter your OpenAI API key to enable real prompt reviews. Leave blank to use simulation mode.\n\n' +
                'WARNING: Your key is stored in your browser localStorage. Do not use a sensitive or production key.'
            );
            if (apiKey && apiKey.trim().length > 0) {
                setStoredApiKey(apiKey.trim());
                PromptEvaluator.init(apiKey.trim());
                UIRenderer.showNotification('OpenAI API key set. Real reviews enabled.', 3000);
            } else {
                clearStoredApiKey();
                PromptEvaluator.init(); // simulation mode
                UIRenderer.showNotification('Simulation mode enabled. No API key set.', 3000);
            }
        } else {
            PromptEvaluator.init(apiKey);
        }
    }

    // Add a button to nav for re-entering/clearing API key
    const nav = document.querySelector('header nav');
    if (nav && !document.getElementById('setApiKeyBtn')) {
        const btn = document.createElement('button');
        btn.id = 'setApiKeyBtn';
        btn.textContent = 'Set/Clear OpenAI API Key';
        btn.style.marginLeft = '1rem';
        btn.onclick = () => {
            clearStoredApiKey();
            askForApiKey(true);
        };
        nav.appendChild(btn);
    }

    // Ask for API key on first load (but only if not already stored)
    askForApiKey();

    // Initialize modules
    DataManager.init();
    KnowledgeGraph.init();
    BadgeManager.init();
    PromptEvaluator.init();

    // Set up event listeners
    setupEventListeners();

    // Show home section by default
    UIRenderer.showSection('homeSection');

    // --- Local Storage for User Contact and Continent ---
    const contact = localStorage.getItem('userContact');
    const continent = localStorage.getItem('userContinent');
    const username = localStorage.getItem('username');
    if (contact) {
        const contactInput = document.getElementById('userContact');
        if (contactInput) contactInput.value = contact;
    }
    if (continent) {
        const continentSelect = document.getElementById('userContinent');
        if (continentSelect) continentSelect.value = continent;
    }
    if (username) {
        const usernameInput = document.getElementById('username');
        if (usernameInput) usernameInput.value = username;
    }

    // Save on input/change
    const contactInput = document.getElementById('userContact');
    if (contactInput) {
        contactInput.addEventListener('input', function() {
            localStorage.setItem('userContact', this.value);
        });
    }
    const continentSelect = document.getElementById('userContinent');
    if (continentSelect) {
        continentSelect.addEventListener('change', function() {
            localStorage.setItem('userContinent', this.value);
        });
    }
    const usernameInput = document.getElementById('username');
    if (usernameInput) {
        usernameInput.addEventListener('input', function() {
            localStorage.setItem('username', this.value);
        });
    }
});

// Set up all event listeners
function setupEventListeners() {
    // Navigation
    document.getElementById('navHome').addEventListener('click', () => UIRenderer.showSection('homeSection'));
    document.getElementById('navLeaderboard').addEventListener('click', () => UIRenderer.showSection('leaderboardSection'));
    document.getElementById('navAchievements').addEventListener('click', () => {
        updateAchievements();
        UIRenderer.showSection('achievementsSection');
    });

    // Form submission
    const form = document.getElementById('promptForm');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await handlePromptSubmission();
        });
    }

    // Copy improved prompt button
    const copyBtn = document.getElementById('copyImprovedBtn');
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const improvedPrompt = document.getElementById('improvedPromptDisplay').textContent;
            UIRenderer.copyToClipboard(improvedPrompt);
        });
    }

    // Download improved prompt button
    const downloadBtn = document.getElementById('downloadImprovedBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            const improvedPrompt = document.getElementById('improvedPromptDisplay').textContent;
            UIRenderer.downloadFile(improvedPrompt, 'improved_prompt.txt');
        });
    }

    // New prompt button
    const newPromptBtn = document.getElementById('newPromptBtn');
    if (newPromptBtn) {
        newPromptBtn.addEventListener('click', () => UIRenderer.showSection('homeSection'));
    }

    // Back buttons
    const backFromLeaderboard = document.getElementById('backFromLeaderboard');
    if (backFromLeaderboard) {
        backFromLeaderboard.addEventListener('click', () => UIRenderer.showSection('reviewSection'));
    }

    const backFromAchievements = document.getElementById('backFromAchievements');
    if (backFromAchievements) {
        backFromAchievements.addEventListener('click', () => UIRenderer.showSection('reviewSection'));
    }

    // Leaderboard filters
    const filterGlobal = document.getElementById('filterGlobal');
    const filterRegional = document.getElementById('filterRegional');
    if (filterGlobal && filterRegional) {
        filterGlobal.addEventListener('click', () => {
            filterGlobal.classList.add('active');
            filterRegional.classList.remove('active');
            updateLeaderboard('global');
        });
        filterRegional.addEventListener('click', () => {
            filterRegional.classList.add('active');
            filterGlobal.classList.remove('active');
            updateLeaderboard('regional');
        });
    }

    // Add for toAchievementsBtn if it exists
    const toAchievementsBtn = document.getElementById('toAchievementsBtn');
    if (toAchievementsBtn) {
        toAchievementsBtn.addEventListener('click', () => {
            updateAchievements();
            UIRenderer.showSection('achievementsSection');
        });
    }
}

// --- Prompt History Logic ---
function savePromptToHistory(promptData) {
    const key = 'PRT_PromptHistory';
    let history = JSON.parse(localStorage.getItem(key)) || [];
    history.push({
        ...promptData,
        timestamp: Date.now()
    });
    localStorage.setItem(key, JSON.stringify(history));
}

function loadPromptHistory() {
    const key = 'PRT_PromptHistory';
    return JSON.parse(localStorage.getItem(key)) || [];
}

function showPromptHistoryModal() {
    let history = loadPromptHistory();
    if (history.length === 0) {
        alert('No previous prompts found.');
        return;
    }
    // Create modal
    let modal = document.createElement('div');
    modal.id = 'promptHistoryModal';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.background = 'rgba(0,0,0,0.5)';
    modal.style.zIndex = '2000';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';

    let content = document.createElement('div');
    content.style.background = 'white';
    content.style.padding = '2rem';
    content.style.borderRadius = '8px';
    content.style.maxWidth = '600px';
    content.style.maxHeight = '80vh';
    content.style.overflowY = 'auto';

    let closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close';
    closeBtn.style.float = 'right';
    closeBtn.onclick = () => document.body.removeChild(modal);
    content.appendChild(closeBtn);

    let title = document.createElement('h3');
    title.textContent = 'Previous Prompts';
    content.appendChild(title);

    let list = document.createElement('ul');
    list.style.listStyle = 'none';
    list.style.padding = '0';
    history.slice().reverse().forEach((item, idx) => {
        let li = document.createElement('li');
        li.style.marginBottom = '1rem';
        let btn = document.createElement('button');
        btn.textContent = `${new Date(item.timestamp).toLocaleString()} | ${item.type} | ${item.prompt.slice(0, 40)}...`;
        btn.style.width = '100%';
        btn.style.textAlign = 'left';
        btn.onclick = () => {
            // Prefill form
            document.getElementById('promptInput').value = item.prompt;
            document.getElementById('promptType').value = item.type;
            if (item.username) document.getElementById('username').value = item.username;
            if (item.contact) document.getElementById('userContact').value = item.contact;
            if (item.continent) document.getElementById('userContinent').value = item.continent;
            document.body.removeChild(modal);
        };
        li.appendChild(btn);
        list.appendChild(li);
    });
    content.appendChild(list);
    modal.appendChild(content);
    document.body.appendChild(modal);
}

// Add button to open prompt history
window.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...
    const form = document.getElementById('prompt-form');
    if (form && !document.getElementById('showPromptHistoryBtn')) {
        let btn = document.createElement('button');
        btn.type = 'button';
        btn.id = 'showPromptHistoryBtn';
        btn.textContent = 'Show Previous Prompts';
        btn.style.marginBottom = '1rem';
        btn.onclick = showPromptHistoryModal;
        form.insertBefore(btn, form.firstChild);
    }
});

// Modify handlePromptSubmission to save prompt to history
async function handlePromptSubmission() {
    try {
        console.log('[Prompt Review] Form submitted.');
        // Get form data
        const formData = UIRenderer.getFormData();
        console.log('[Prompt Review] Form data:', formData);
        if (!formData.prompt || !formData.type) {
            UIRenderer.showNotification('Please fill in all fields', 3000);
            console.log('[Prompt Review] Validation failed: missing fields.');
            return;
        }

        // Save prompt to history
        console.log('[Prompt Review] Saving prompt to history...');
        DataManager.addHistoryEntry({
            prompt: formData.prompt,
            type: formData.type,
            username: formData.username,
            contact: formData.contact,
            continent: formData.continent
        });

        // Show loading state
        UIRenderer.setLoading(true);
        console.log('[Prompt Review] Loading state set. Calling reviewPrompt...');

        // Review the prompt
        let result;
        try {
            result = await PromptEvaluator.reviewPrompt(
                formData.prompt,
                formData.type
            );
            console.log('[Prompt Review] Review result:', result);
        } catch (err) {
            console.error('[Prompt Review] Error during reviewPrompt:', err);
            throw err;
        }

        // Process the result
        console.log('[Prompt Review] Processing review result...');
        await processReviewResult(result);

        // Show the review section
        UIRenderer.showSection('reviewSection');
        UIRenderer.showPromptResult(result);
        console.log('[Prompt Review] Review section displayed.');

    } catch (error) {
        console.error('Error:', error);
        UIRenderer.showNotification('An error occurred. Please try again.', 3000);
    } finally {
        UIRenderer.setLoading(false);
        console.log('[Prompt Review] Loading state cleared.');
    }
}

// Process review result
async function processReviewResult(result) {
    try {
        // Save to history with all required fields
        console.log('[Prompt Review] Adding review result to history...');
        const historyEntry = {
            ...result,
            timestamp: Date.now(),
            styles: result.styleFeatures || [], // Ensure styles array exists
            criteria: result.criteria || {}, // Ensure criteria object exists
            score: result.score || 0 // Ensure score exists
        };
        DataManager.addHistoryEntry(historyEntry);
        
        // Get updated history for badge checking
        const history = DataManager.loadHistory();
        if (!Array.isArray(history)) {
            console.error('[Prompt Review] History is not an array:', history);
            return;
        }

        // Update knowledge graph
        console.log('[Prompt Review] Updating knowledge graph...');
        KnowledgeGraph.processReviewResult(result);

        // Check for new badges
        console.log('[Prompt Review] Checking for new badges...');
        const newBadges = BadgeManager.checkBadges(history);
        if (newBadges.length > 0) {
            newBadges.forEach(badge => {
                UIRenderer.showNotification(
                    `🏆 New Badge Earned: ${badge.name}!`,
                    5000
                );
                console.log(`[Prompt Review] New badge earned: ${badge.name}`);
            });
        }

        // Update leaderboard
        console.log('[Prompt Review] Updating leaderboard...');
        updateLeaderboard();

        // Update achievements
        console.log('[Prompt Review] Updating achievements...');
        updateAchievements();
    } catch (error) {
        console.error('[Prompt Review] Error processing review result:', error);
        throw error;
    }
}

// Update leaderboard
function updateLeaderboard(filter = 'global') {
    const history = DataManager.loadHistory();
    const leaderboard = DataManager.loadLeaderboardData();
    UIRenderer.updateLeaderboardView(leaderboard, filter);
}

// Update achievements
function updateAchievements() {
    const history = DataManager.loadHistory();
    const userProfile = DataManager.loadProfile();
    // const badges = DataManager.loadBadges(); // No longer needed

    // Update profile display
    UIRenderer.updateProfileDisplay({
        ...userProfile,
        totalPrompts: history.length,
        averageScore: history.reduce((total, entry) => total + entry.score, 0) /
            Math.max(1, history.length)
    });

    // Update badges display (no arguments)
    UIRenderer.updateBadgesDisplay();
}

// Export data
function exportData() {
    const data = {
        userProfile: DataManager.loadProfile(),
        history: DataManager.loadHistory(),
        leaderboard: DataManager.loadLeaderboardData(),
        badges: DataManager.loadBadges(),
        knowledgeGraph: DataManager.loadKnowledgeGraph()
    };

    const content = JSON.stringify(data, null, 2);
    UIRenderer.downloadFile(content, 'prompt-tutor-data.json');
}

// Import data
function importData(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            DataManager.saveProfile(data.userProfile);
            // For history, leaderboard, badges, knowledgeGraph, use DataManager's methods if available
            localStorage.setItem(DataManager.STORAGE_KEYS.HISTORY, JSON.stringify(data.history));
            localStorage.setItem(DataManager.STORAGE_KEYS.LEADERBOARD, JSON.stringify(data.leaderboard));
            localStorage.setItem(DataManager.STORAGE_KEYS.BADGES, JSON.stringify(data.badges));
            localStorage.setItem(DataManager.STORAGE_KEYS.KNOWLEDGE_GRAPH, JSON.stringify(data.knowledgeGraph));

            // Reinitialize modules
            KnowledgeGraph.init();
            updateLeaderboard();
            updateAchievements();

            UIRenderer.showNotification('Data imported successfully!', 3000);
        } catch (error) {
            console.error('Import error:', error);
            UIRenderer.showNotification('Error importing data', 3000);
        }
    };
    reader.readAsText(file);
}

// Reset all data
function resetAllData() {
    if (confirm('Are you sure you want to reset all data? This cannot be undone.')) {
        DataManager.resetAll();
        KnowledgeGraph.init();
        updateLeaderboard();
        updateAchievements();
        UIRenderer.showNotification('All data has been reset', 3000);
    }
}

// Add global handler for clickable suggestions
window.handleSuggestionClick = async function(suggestion, lastResult) {
    console.log('Suggestion clicked:', suggestion); // Debug log
    if (typeof UIRenderer !== 'undefined' && UIRenderer.showNotification) {
        UIRenderer.showNotification('Applying suggestion: ' + suggestion, 2000);
    } else {
        alert('Applying suggestion: ' + suggestion);
    }
    // Emphasize the suggestion in the improved prompt
    const improvedPrompt = lastResult.improvedPrompt || lastResult.prompt || '';
    // Append the suggestion as a new instruction (with clear separation)
    const newPrompt = improvedPrompt.trim() + '\n\n[Emphasize]: ' + suggestion;

    // Fill the prompt input with the new prompt
    const promptInput = document.getElementById('promptText');
    if (promptInput) promptInput.value = newPrompt;

    // Keep the same type, username, contact, continent
    if (document.getElementById('promptType')) {
        document.getElementById('promptType').value = lastResult.type;
    }
    if (document.getElementById('username')) {
        document.getElementById('username').value = lastResult.username || '';
    }
    if (document.getElementById('userContact')) {
        document.getElementById('userContact').value = lastResult.contact || '';
    }
    if (document.getElementById('userContinent')) {
        document.getElementById('userContinent').value = lastResult.continent || '';
    }

    // Auto-submit the form for review
    const form = document.getElementById('promptForm');
    if (form) {
        await handlePromptSubmission();
    }
};
