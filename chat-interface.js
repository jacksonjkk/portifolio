// chat-interface.js - Enhanced Chat Interface with Persistent Toggle State
class EnhancedChatInterface {
    constructor() {
        this.widget = document.getElementById('aiChatWidget');
        this.chatBody = document.getElementById('chatBody');
        this.chatMessages = document.getElementById('chatMessages');
        this.userInput = document.getElementById('userInput');
        this.sendButton = document.getElementById('sendButton');
        this.chatToggle = document.getElementById('chatToggle');
        this.suggestionChips = document.getElementById('suggestionChips');
        this.quickActionButtons = document.getElementById('quickActionButtons');
        this.suggestionsContent = document.getElementById('suggestionsContent');
        this.toggleSuggestions = document.getElementById('toggleSuggestions');
        this.suggestionsHeader = document.getElementById('suggestionsHeader');
        
    // Start minimized so the chat is hidden on page load until the user presses +
    this.isMinimized = true;
        this.suggestionsExpanded = false; // Always start collapsed
        this.init();
    }
    
    init() {
        this.setInitialTime();
        this.loadQuickActions();
        this.loadSuggestions();
        this.bindEvents();
        this.updateSuggestionsVisibility(); // Set initial state (collapsed)
        // Apply initial minimized state so the widget is hidden until user opens it
        if (this.isMinimized) {
            this.widget.classList.add('minimized');
            if (this.chatToggle) {
                this.chatToggle.textContent = '+';
                this.chatToggle.setAttribute('aria-expanded', 'false');
            }
        } else {
            // ensure expanded state matches UI
            this.widget.classList.remove('minimized');
            if (this.chatToggle) {
                this.chatToggle.textContent = '−';
                this.chatToggle.setAttribute('aria-expanded', 'true');
            }
            this.userInput && this.userInput.focus();
            this.scrollToBottom();
        }
        console.log("🚀 Enhanced Chat Interface initialized");
    }
    
    setInitialTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        document.getElementById('initialTime').textContent = timeString;
    }
    
    loadQuickActions() {
        const quickActions = [
            { label: "👋 Greet", question: "Hello!" },
            { label: "📧 Contact", question: "How can I contact Jackson?" },
            { label: "💼 Projects", question: "What projects has Jackson worked on?" },
            { label: "🎓 Education", question: "Where does Jackson study?" },
            { label: "🛠 Skills", question: "What programming languages does Jackson know?" },
            { label: "🎯 Goals", question: "What are Jackson's goals?" },
            { label: "🔬 Research", question: "What is Jackson's AI research about?" },
            { label: "🙏 Thanks", question: "Thank you!" }
        ];
        
        this.quickActionButtons.innerHTML = '';
        
        quickActions.forEach(action => {
            const button = document.createElement('button');
            button.className = 'quick-action-btn';
            button.textContent = action.label;
            button.addEventListener('click', () => {
                this.userInput.value = action.question;
                this.sendMessage();
            });
            this.quickActionButtons.appendChild(button);
        });
    }
    
    loadSuggestions() {
        const suggestions = portfolioAI.getSuggestions();
        this.suggestionChips.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const chip = document.createElement('div');
            chip.className = 'suggestion-chip';
            chip.textContent = suggestion;
            chip.addEventListener('click', () => {
                this.userInput.value = suggestion;
                this.sendMessage();
                // Keep suggestions in their current state (don't auto-collapse)
            });
            this.suggestionChips.appendChild(chip);
        });
    }
    
    toggleSuggestionsView() {
        this.suggestionsExpanded = !this.suggestionsExpanded;
        this.updateSuggestionsVisibility();
    }
    
    expandSuggestions() {
        this.suggestionsExpanded = true;
        this.updateSuggestionsVisibility();
    }
    
    collapseSuggestions() {
        this.suggestionsExpanded = false;
        this.updateSuggestionsVisibility();
    }
    
    updateSuggestionsVisibility() {
        if (this.suggestionsExpanded) {
            this.suggestionsContent.classList.add('expanded');
            this.toggleSuggestions.innerHTML = '▲ Hide Suggestions';
        } else {
            this.suggestionsContent.classList.remove('expanded');
            this.toggleSuggestions.innerHTML = '▼ Show Suggestions';
        }
    }
    
    bindEvents() {
        this.sendButton.addEventListener('click', () => this.sendMessage());
        
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
        
        this.chatToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleChat();
        });
        
        this.widget.querySelector('.chat-header').addEventListener('click', (e) => {
            if (e.target !== this.chatToggle) {
                this.toggleChat();
            }
        });
        
        // Toggle suggestions when header or button is clicked
        this.toggleSuggestions.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleSuggestionsView();
        });
        
        this.suggestionsHeader.addEventListener('click', (e) => {
            if (e.target !== this.toggleSuggestions) {
                this.toggleSuggestionsView();
            }
        });
        
        // REMOVED: Auto-expand on input focus
        // REMOVED: Auto-collapse on typing
        // REMOVED: Auto-expand after bot response
    }
    
    sendMessage() {
        const message = this.userInput.value.trim();
        if (!message) return;
        
        this.addMessage(message, 'user');
        this.userInput.value = '';
        
        // DON'T change suggestions state when sending message
        // Keep suggestions in whatever state the user set them to
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Get AI response after short delay
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = portfolioAI.getResponse(message);
            this.addMessage(response, 'bot');
            this.loadSuggestions(); // Refresh suggestions based on context
            
            // DON'T auto-expand suggestions after bot response
            // Let the user decide when to see suggestions
        }, 1200);
    }
    
    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        messageDiv.innerHTML = `
            ${text}
            <div class="message-time">${timeString}</div>
        `;
        
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }
    
    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = `
            AI is thinking
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        this.chatMessages.appendChild(typingDiv);
        this.scrollToBottom();
    }
    
    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
    
    toggleChat() {
        this.isMinimized = !this.isMinimized;
        if (this.isMinimized) {
            this.widget.classList.add('minimized');
            this.chatToggle.textContent = '+';
            this.chatToggle.setAttribute('aria-expanded', 'false');
        } else {
            this.widget.classList.remove('minimized');
            this.chatToggle.textContent = '−';
            this.chatToggle.setAttribute('aria-expanded', 'true');
            this.userInput.focus();
            this.scrollToBottom();
        }
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    new EnhancedChatInterface();
});