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
        this.suggestionChips = document.getElementById('suggestionChips');
        this.suggestionsContent = document.getElementById('suggestionsContent');
        
    // Start minimized so the chat is hidden on page load until the user presses +
    this.isMinimized = true;
        this.suggestionsExpanded = false; // Always start collapsed
        this.init();
    }
    
    init() {
        this.setInitialTime();
        this.loadSuggestions();
        this.bindEvents();
        // Apply initial minimized state so the widget is hidden until user opens it
        if (this.isMinimized) {
            this.widget.classList.add('minimized');
            if (this.chatToggle) {
                this.chatToggle.setAttribute('aria-expanded', 'false');
            }
        } else {
            // ensure expanded state matches UI
            this.widget.classList.remove('minimized');
            if (this.chatToggle) {
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
    
    // Removed loadQuickActions
    
    loadSuggestions() {
        const suggestions = portfolioAI.getSuggestions();
        if (!suggestions || suggestions.length === 0) {
            this.suggestionsContent.style.display = 'none';
            return;
        }
        
        this.suggestionsContent.style.display = 'block';
        this.suggestionChips.innerHTML = '';
        
        suggestions.forEach(suggestion => {
             const chip = document.createElement('div');
             chip.className = 'suggestion-chip';
             chip.textContent = suggestion;
             chip.addEventListener('click', () => {
                 this.userInput.value = suggestion;
                 this.sendMessage();
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
        // Suggestions are now always visible and scrollable in modern layout
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
        
        // REMOVED: Auto-expand on input focus
        // REMOVED: Auto-collapse on typing
        // REMOVED: Auto-expand after bot response
    }
    
    sendMessage() {
        const message = this.userInput.value.trim();
        if (!message) return;
        
        this.addMessage(message, 'user');
        this.userInput.value = '';
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Simulate a short delay for the rule-based response
        setTimeout(() => {
            const response = portfolioAI.getResponse(message);
            this.hideTypingIndicator();
            this.addMessage(response, 'bot');
            
            // Auto-hide suggestions after bot responds
            if (this.suggestionsContent) {
                this.suggestionsContent.style.display = 'none';
            }
        }, 800);
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
            this.chatToggle && this.chatToggle.setAttribute('aria-expanded', 'false');
        } else {
            this.widget.classList.remove('minimized');
            this.chatToggle && this.chatToggle.setAttribute('aria-expanded', 'true');
            this.userInput && this.userInput.focus();
            this.scrollToBottom();
        }
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    new EnhancedChatInterface();
    // Mobile nav (hamburger) toggle
    const hamburger = document.getElementById('hamburger');
    const header = document.querySelector('header');
    const mainNav = document.getElementById('mainNav');
    if (hamburger && header && mainNav) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = header.classList.toggle('nav-open');
            hamburger.setAttribute('aria-expanded', String(isOpen));
        });

        // Close nav when clicking a link
        mainNav.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                header.classList.remove('nav-open');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });

        // Close nav on outside click
        document.addEventListener('click', (ev) => {
            if (!header.contains(ev.target)) {
                header.classList.remove('nav-open');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    }
});