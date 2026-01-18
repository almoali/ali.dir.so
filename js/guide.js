document.addEventListener('DOMContentLoaded', () => {
    // --- State ---
    const API_URL = 'http://localhost:3000/api';
    let currentUser = null;
    let authToken = localStorage.getItem('ads_token');

    // --- DOM Elements ---
    // --- DOM Elements ---
    const sidebar = document.querySelector('.sidebar');
    const authBtnSidebar = document.getElementById('auth-btn');

    // Header Buttons
    const headerLoginBtn = document.getElementById('header-login-btn');
    const headerSignupBtn = document.getElementById('header-signup-btn');

    const sidebarUserCard = document.getElementById('sidebar-user-card');
    const sidebarUsername = document.getElementById('sidebar-username');
    const userInitial = document.getElementById('user-initial');
    const historyList = document.getElementById('history-list');

    const authModal = document.getElementById('auth-modal');
    const closeModal = document.querySelector('.close-modal');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const chatMessages = document.getElementById('chat-messages');

    // --- Initialization ---
    checkAuthStatus();

    // --- Event Listeners ---

    // Sidebar Auth Button (Log In / Log Out)
    if (authBtnSidebar) {
        authBtnSidebar.addEventListener('click', () => {
            if (currentUser) logout();
            else openModal('login');
        });
    }

    // Header Login
    if (headerLoginBtn) {
        headerLoginBtn.addEventListener('click', () => {
            // If logged in, this btn might act as Log Out (or be hidden)
            if (currentUser) logout();
            else openModal('login');
        });
    }

    // Header Signup
    if (headerSignupBtn) {
        headerSignupBtn.addEventListener('click', () => {
            openModal('signup');
        });
    }

    closeModal.addEventListener('click', () => {
        authModal.classList.add('hidden');
    });

    // Tab Switching
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));

            btn.classList.add('active');
            document.getElementById(`${btn.dataset.tab}-form`).classList.add('active');
        });
    });

    // Forms
    loginForm.addEventListener('submit', handleLogin);
    signupForm.addEventListener('submit', handleSignup);

    // Chat
    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // --- Auth Functions --- //

    function openModal(initialTab = 'login') {
        authModal.classList.remove('hidden');

        // Switch to requested tab
        tabBtns.forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));

        const btn = document.querySelector(`.tab-btn[data-tab="${initialTab}"]`);
        const form = document.getElementById(`${initialTab}-form`);

        if (btn) btn.classList.add('active');
        if (form) form.classList.add('active');
    }

    async function handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const errorMsg = document.getElementById('login-error');

        try {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || 'Login failed');

            authSuccess(data);
        } catch (err) {
            showError(errorMsg, err.message);
        }
    }

    async function handleSignup(e) {
        e.preventDefault();
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const confirm = document.getElementById('signup-confirm').value;
        const errorMsg = document.getElementById('signup-error');

        if (password !== confirm) {
            showError(errorMsg, "Passwords do not match");
            return;
        }

        try {
            const res = await fetch(`${API_URL}/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, name })
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || 'Signup failed');

            authSuccess(data);
        } catch (err) {
            showError(errorMsg, err.message);
        }
    }

    function authSuccess(data) {
        authToken = data.token;
        localStorage.setItem('ads_token', authToken);
        if (data.user && data.user.name) {
            localStorage.setItem('ads_user_name', data.user.name);
        }
        authModal.classList.add('hidden');
        checkAuthStatus(); // Refresh state
        loadHistory();
    }

    function logout() {
        authToken = null;
        currentUser = null;
        localStorage.removeItem('ads_token');
        localStorage.removeItem('ads_user_name');

        chatMessages.innerHTML = `
            <div class="message bot-message welcome-msg">
                <div class="message-content">
                    <h3>Assalamu Alaikum!</h3>
                    <p>Please log in to start chatting.</p>
                </div>
            </div>`;

        checkAuthStatus();
    }

    function checkAuthStatus() {
        if (authToken) {
            const savedName = localStorage.getItem('ads_user_name') || 'Friend';
            currentUser = { loggedIn: true, name: savedName };

            // Sidebar State
            if (authBtnSidebar) authBtnSidebar.innerHTML = '<i class="fas fa-sign-out-alt"></i> Log Out';

            // Header State
            if (headerLoginBtn) headerLoginBtn.textContent = 'Log Out';
            if (headerSignupBtn) headerSignupBtn.style.display = 'none';

            sidebarUserCard.classList.remove('hidden');
            sidebarUsername.textContent = savedName;
            userInitial.textContent = savedName.charAt(0).toUpperCase();

            userInput.disabled = false;
            sendBtn.disabled = false;
            userInput.placeholder = "Ask a question about Islam...";

            if (chatMessages.children.length <= 1) loadHistory();

            // Fetch fresh profile data to replace "Friend"
            fetchUserProfile();
        } else {
            currentUser = null;
            if (authBtnSidebar) authBtnSidebar.innerHTML = '<i class="fas fa-sign-in-alt"></i> Log In';

            // Header State
            if (headerLoginBtn) headerLoginBtn.textContent = 'Log In';
            if (headerSignupBtn) headerSignupBtn.style.display = 'block';

            sidebarUserCard.classList.add('hidden');

            userInput.disabled = true;
            sendBtn.disabled = true;
            userInput.placeholder = "Please log in to chat";
        }
    }

    async function loadHistory() {
        if (!authToken) return;
        try {
            const res = await fetch(`${API_URL}/history`, {
                headers: { 'Authorization': `Bearer ${authToken}` }
            });
            if (res.ok) {
                const data = await res.json();
                if (data.history.length > 0) {
                    chatMessages.innerHTML = ''; // Clear welcome msg

                    // Add "History Start" separator
                    const separator = document.createElement('div');
                    separator.style.textAlign = 'center';
                    separator.style.margin = '2rem 0';
                    separator.style.color = 'var(--text-secondary)';
                    separator.style.fontSize = '0.8rem';
                    separator.textContent = '— Previous Conversation Output —';
                    chatMessages.appendChild(separator);

                    data.history.forEach(msg => {
                        addMessage(msg.content, msg.role === 'user' ? 'user' : 'bot');
                    });

                    // Add "New Session" separator
                    const newSession = document.createElement('div');
                    newSession.style.textAlign = 'center';
                    newSession.style.margin = '2rem 0';
                    newSession.style.color = 'var(--accent)';
                    newSession.style.fontSize = '0.8rem';
                    newSession.textContent = '— Today —';
                    chatMessages.appendChild(newSession);
                }
            }
        } catch (err) { console.error(err); }
    }

    function showError(element, message) {
        element.textContent = message;
        element.classList.remove('hidden');
    }

    // --- Profile Fetching ---
    async function fetchUserProfile() {
        if (!authToken) return;

        try {
            const res = await fetch(`${API_URL}/auth/me`, {
                headers: { 'Authorization': `Bearer ${authToken}` }
            });

            if (res.ok) {
                const data = await res.json();
                if (data.user && data.user.name) {
                    // Update LocalStorage
                    localStorage.setItem('ads_user_name', data.user.name);

                    // Update UI immediately if we are logged in
                    if (currentUser) {
                        currentUser.name = data.user.name;
                        const sidebarUsername = document.getElementById('sidebar-username');
                        const userInitial = document.getElementById('user-initial');

                        if (sidebarUsername) sidebarUsername.textContent = data.user.name;
                        if (userInitial) userInitial.textContent = data.user.name.charAt(0).toUpperCase();
                    }
                }
            } else if (res.status === 401) {
                // Token invalid
                logout();
            }
        } catch (err) {
            console.error("Failed to fetch user profile:", err);
        }
    }

    // --- Chat Functions --- //

    async function sendMessage() {
        const text = userInput.value.trim();
        if (!text || !currentUser) return;

        // Add User Message
        addMessage(text, 'user');
        userInput.value = '';

        // Show loading indicator
        const loadingId = addMessage("Thinking...", 'bot', true);

        try {
            const res = await fetch(`${API_URL}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify({ message: text })
            });

            if (!res.ok) {
                if (res.status === 401) {
                    logout();
                    throw new Error("Session expired. Please log in again.");
                }
                const errData = await res.json();
                throw new Error(errData.error || "Server error");
            }

            const data = await res.json();

            // Remove loading
            removeMessage(loadingId);

            // Add Bot Message
            addMessage(data.reply, 'bot');

        } catch (err) {
            removeMessage(loadingId);
            addMessage(`Error: ${err.message}`, 'bot');
        }
    }

    function addMessage(text, sender, isLoading = false) {
        const div = document.createElement('div');
        div.classList.add('message', `${sender}-message`);
        if (isLoading) div.id = `msg-${Date.now()}`;

        const formattedText = text.replace(/\n/g, '<br>');

        div.innerHTML = `
            <div class="message-content">
                ${formattedText}
            </div>
        `;

        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return div.id;
    }

    function removeMessage(id) {
        if (!id) return;
        const el = document.getElementById(id);
        if (el) el.remove();
    }

});
