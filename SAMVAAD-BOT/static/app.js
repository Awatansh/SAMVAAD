












function startVoiceInput() {
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.lang = 'en-US';
        recognition.start();

        recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript;
            document.querySelector('.chatbox__footer input').value = transcript;
        };

        recognition.onerror = function(event) {
            console.error('Speech recognition error:', event.error);
            alert('Speech recognition failed. Please try again.');
        };
    } else {
        alert('Speech recognition not supported in this browser.');
    }
}



function isPhotoLink(message) {
    const imageKeywords = ['jpg', 'jpeg', 'png', 'gif'];
    const lowercasedMessage = message.toLowerCase();
    return imageKeywords.some(keyword => lowercasedMessage.includes(keyword));
}

function isRegularLink(message) {
    return message.startsWith('http');
}

function createClickableLink(message) {
    return `<a href="${message}" target="_blank">${message}</a>`;
}

function startSpeechToText() {
    var recognition = new webkitSpeechRecognition() || SpeechRecognition();
    
    recognition.lang = 'en-US';

    recognition.onresult = function (event) {
        var result = event.results[0][0].transcript;
        var messageInput = document.querySelector('.chatbox__footer input');
        messageInput.value = result;

        document.querySelector('.chatbox__send--footer').click();
    };

    recognition.start();
}

class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatContainer: document.querySelector('.chatbox__container'),
            sendButton: document.querySelector('.send__button'),
            messageInput: document.querySelector('.chatbox__footer input'),
            messagesDiv: document.querySelector('.chatbox__messages')
        };

        this.state = false;
        this.message = [];
    }

    setupEventListeners() {
        const { openButton, chatContainer, sendButton, messageInput } = this.args;

        openButton.addEventListener('click', () => {
            chatContainer.classList.toggle('hidden');
        });

        sendButton.addEventListener('click', () => this.onSendButton(chatContainer));

        messageInput.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                this.onSendButton(chatContainer);
            }
        });
    }

    toggleState(chatbox) {
        this.state = !this.state;

        if (this.state) {
            chatbox.classList.add('chatbox--active');
        } else {
            chatbox.classList.remove('chatbox--active');
        }
    }

    onSendButton(chatbox) {
        const { messageInput, messagesDiv } = this.args;
        let text1 = messageInput.value.trim();

        if (text1 === '') {
            return;
        }

        let msg1 = { name: 'User', message: text1 };
        this.message.push(msg1);

        fetch('/predict', {
            method: 'POST',
            body: JSON.stringify({ message: text1 }),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(r => r.json())
        .then(r => {
            let msg2 = { name: 'Samvaad', message: r.answer };
            this.message.push(msg2);
            this.updateChatText(chatbox);
            messageInput.value = '';
        })
        .catch((error) => {
            console.error('Error:', error);
            this.updateChatText(chatbox);
            messageInput.value = '';
        });
    }

    updateChatText(chatbox) {
        const chatMessagesContainer = chatbox.querySelector('.chatbox__messages');
        
        chatMessagesContainer.innerHTML = '';
    
        const linkRegex = /(https?:\/\/[^\s]+)/g;
        
        
        this.message.forEach(function (item) {
            const isOperator = item.name === 'Samvaad';
    
            const messageElement = document.createElement('div');
    
            messageElement.classList.add('chat-message');
            
            messageElement.classList.add(
                'messages__item',
                isOperator ? 'messages__item--operator' : 'messages__item--visitor'
            );
    
            let processedText = item.message;
    
            if (isPhotoLink(processedText)) {
                const [photoUrl, description] = processedText.split('\n');
                processedText = `
                    <img class="chatbox__image" src="${photoUrl}" alt="Facility Photo">
                    <p>${description}</p>
                `;
            } else {
                processedText = processedText.replace(linkRegex, '<a href="$1" target="_blank">$1</a>');
            }
    
            
            messageElement.innerHTML = `
                <strong>${item.name}:</strong> 
                <span>${processedText}</span>
            `;

    
            chatMessagesContainer.appendChild(messageElement);
        });
    
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    }
    
    

    display() {
        this.setupEventListeners();
    }
}

const chatbox = new Chatbox();
chatbox.display();
