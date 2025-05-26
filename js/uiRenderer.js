// UI Renderer Module
const UIRenderer = {
    // Section Management
    showSection(sectionId) {
        // Hide all sections
        document.querySelectorAll('main > section').forEach(section => {
            section.style.display = 'none';
        });
        // Show requested section
        const section = document.getElementById(sectionId);
        if (section) {
            section.style.display = 'block';
        }
    },

    // Form Handling
    getFormData() {
        return {
            prompt: document.getElementById('promptText').value,
            type: document.getElementById('promptType').value,
            username: document.getElementById('username').value,
            contact: document.getElementById('userContact').value,
            continent: document.getElementById('userContinent').value
        };
    },

    setFormData(data) {
        if (data.username) document.getElementById('username').value = data.username;
        if (data.contact) document.getElementById('userContact').value = data.contact;
        if (data.continent) document.getElementById('userContinent').value = data.continent;
        if (data.prompt) document.getElementById('promptText').value = data.prompt;
        if (data.type) document.getElementById('promptType').value = data.type;
    },

    // Review Section
    showPromptResult(result) {
        // Show original prompt
        const originalPromptDisplay = document.getElementById('originalPromptDisplay');
        if (originalPromptDisplay) {
            originalPromptDisplay.textContent = result.prompt;
        }

        // Show score
        const scoreDisplay = document.getElementById('scoreDisplay');
        if (scoreDisplay) {
            scoreDisplay.textContent = `Score: ${result.score}/100`;
            scoreDisplay.setAttribute('aria-live', 'polite');
        }

        // Show breakdown
        const breakdownDisplay = document.getElementById('breakdownDisplay');
        if (breakdownDisplay && result.criteria) {
            const breakdownHTML = Object.entries(result.criteria)
                .map(([criterion, rating]) => `
                    <div class="criterion"><strong>${criterion}:</strong> ${rating}/5</div>
                `).join('');
            breakdownDisplay.innerHTML = breakdownHTML;
        }

        // Show suggestions (make clickable)
        const suggestionsList = document.getElementById('suggestionsList');
        if (suggestionsList && result.suggestions) {
            suggestionsList.innerHTML = '';
            result.suggestions.forEach((suggestion, idx) => {
                const li = document.createElement('li');
                li.textContent = suggestion;
                li.className = 'clickable-suggestion';
                li.style.cursor = 'pointer';
                li.title = 'Click to emphasize this suggestion and auto-review';
                li.tabIndex = 0;
                li.setAttribute('aria-label', `Apply suggestion: ${suggestion}`);
                li.onclick = () => {
                    if (typeof window.handleSuggestionClick === 'function') {
                        window.handleSuggestionClick(suggestion, result);
                    }
                };
                li.onkeydown = (e) => {
                    if (e.key === 'Enter' || e.key === ' ') li.onclick();
                };
                suggestionsList.appendChild(li);
            });
        }

        // Show improved prompt
        const improvedPromptDisplay = document.getElementById('improvedPromptDisplay');
        if (improvedPromptDisplay) {
            improvedPromptDisplay.textContent = result.improvedPrompt;
        }

        // Show review section
        this.showSection('reviewSection');
    },

    // Leaderboard Section
    updateLeaderboardView(entries, filter = 'global') {
        const table = document.getElementById('leaderboardTable');
        if (!table) return;
        const tbody = table.querySelector('tbody');
        if (!tbody) return;
        tbody.innerHTML = '';
        let filtered = entries;
        if (filter === 'regional') {
            const userContinent = localStorage.getItem('userContinent');
            filtered = entries.filter(e => e.continent === userContinent);
        }
        filtered.slice(0, 50).forEach((entry, idx) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${idx + 1}</td>
                <td>${entry.username || 'Anonymous'}</td>
                <td>${entry.score}</td>
                <td>${entry.type}</td>
                <td>${entry.continent || '-'}</td>
            `;
            tbody.appendChild(tr);
        });
        // Show user rank if present
        const userRankText = document.getElementById('userRankText');
        if (userRankText) {
            const username = localStorage.getItem('username');
            const userIdx = filtered.findIndex(e => e.username === username);
            if (userIdx >= 0) {
                userRankText.textContent = `Your Rank: ${userIdx + 1}`;
            } else {
                userRankText.textContent = '';
            }
        }
    },

    // Achievements Section
    updateProfileDisplay(profile) {
        const name = document.getElementById('profileName');
        const continent = document.getElementById('profileContinent');
        const contact = document.getElementById('profileContact');
        if (name) name.textContent = profile.username || '-';
        if (continent) continent.textContent = profile.continent || '-';
        if (contact) contact.textContent = profile.contact || '-';
        // Show total prompts and average score if available
        const infoDisplay = document.getElementById('profileInfoDisplay');
        if (infoDisplay && profile.totalPrompts !== undefined) {
            let stats = document.getElementById('profileStats');
            if (!stats) {
                stats = document.createElement('div');
                stats.id = 'profileStats';
                infoDisplay.appendChild(stats);
            }
            stats.innerHTML = `<p>Total Prompts: <b>${profile.totalPrompts}</b></p><p>Average Score: <b>${profile.averageScore.toFixed(1)}</b></p>`;
        }
    },

    updateBadgesDisplay() {
        const container = document.getElementById('badgesContainer');
        if (!container) return;
        const badgeDefinitions = BadgeManager.getBadgeDefinitions();
        const unlocked = DataManager.loadBadges();
        let badgesHTML = '';
        Object.entries(badgeDefinitions).forEach(([id, badge]) => {
            const isUnlocked = unlocked[id];
            badgesHTML += `
                <div class="badge${isUnlocked ? '' : ' locked'}" id="badge_${id}" tabindex="0" aria-label="${badge.name}: ${badge.description}">
                    <span class="badgeIcon">${badge.icon}</span>
                    <span class="badgeName">${badge.name}</span>
                    <span class="badgeDesc">${badge.description}</span>
                </div>
            `;
        });
        container.innerHTML = badgesHTML;
        // Add click handlers for badge progress
        Object.entries(badgeDefinitions).forEach(([id, badge]) => {
            const badgeDiv = document.getElementById(`badge_${id}`);
            if (badgeDiv) {
                badgeDiv.onclick = () => {
                    const history = DataManager.loadHistory();
                    const progress = BadgeManager.getBadgeProgress(id, history);
                    let progressMsg = '';
                    if (progress && typeof progress.current !== 'undefined' && typeof progress.target !== 'undefined') {
                        progressMsg = `Progress: ${progress.current} / ${progress.target}`;
                    } else if (progress && typeof progress === 'object') {
                        progressMsg = JSON.stringify(progress);
                    } else {
                        progressMsg = 'No progress data available.';
                    }
                    UIRenderer.showNotification(`${badge.name}: ${badge.description}\n${progressMsg}`, 5000);
                };
                badgeDiv.onkeydown = (e) => {
                    if (e.key === 'Enter' || e.key === ' ') badgeDiv.onclick();
                };
            }
        });
    },

    // Notification System
    showNotification(message, duration = 3000) {
        const notification = document.getElementById('notification');
        if (!notification) return;

        notification.textContent = message;
        notification.classList.remove('hidden');
        notification.style.display = 'block';

        setTimeout(() => {
            notification.classList.add('hidden');
            notification.style.display = 'none';
        }, duration);
    },

    // Loading State
    setLoading(isLoading) {
        const submitBtn = document.getElementById('submitBtn');
        if (!submitBtn) return;

        if (isLoading) {
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            submitBtn.setAttribute('aria-busy', 'true');
        } else {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            submitBtn.removeAttribute('aria-busy');
        }
    },

    // Copy to Clipboard
    copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            this.showNotification('Copied to clipboard!');
        }).catch(() => {
            this.showNotification('Failed to copy to clipboard');
        });
    },

    // Download File
    downloadFile(content, filename) {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
};
