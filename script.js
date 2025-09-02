// /public/script.js

const BACKEND_URL = "https://YOUR-DEPLOYMENT.vercel.app"; 

document.getElementById('send-button').addEventListener('click', async () => {
    const promptInput = document.getElementById('prompt-input');
    const prompt = promptInput.value;
    const responseDiv = document.getElementById('ai-response');

    if (!prompt) return;

    responseDiv.textContent = 'Thinking...';

    try {
        const response = await fetch(`${BACKEND_URL}/api`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt }), // matches backend
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        responseDiv.textContent = data.message; // matches backend
    } catch (error) {
        console.error('Error:', error);
        responseDiv.textContent = 'Error: Could not connect to the server.';
    }
});
