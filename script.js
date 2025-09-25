// Modern JavaScript for enhanced user experience
document.addEventListener('DOMContentLoaded', function() {
    // Add scrolled class to header on scroll
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize chatbot after DOM is loaded
    initializeChatbot();
});

// Initialize chatbot functionality
function initializeChatbot() {
    const chatbotInput = document.getElementById('chatbot-input-field');
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });

        // Focus input when chatbot opens
        const chatbotButton = document.querySelector('.chatbot-button');
        if (chatbotButton) {
            chatbotButton.addEventListener('click', () => {
                setTimeout(() => {
                    const container = document.getElementById('chatbot-container');
                    if (container && container.classList.contains('active')) {
                        chatbotInput.focus();
                    }
                }, 300);
            });
        }
    }
}

// Mobile menu toggle (for future mobile menu implementation)
const createMobileMenu = () => {
    const navbar = document.querySelector('.navbar');
    const mobileToggle = document.createElement('button');
    mobileToggle.className = 'mobile-toggle';
    mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';

    // Insert mobile toggle before navbar
    navbar.parentNode.insertBefore(mobileToggle, navbar);

    mobileToggle.addEventListener('click', () => {
        navbar.classList.toggle('mobile-active');
        const icon = mobileToggle.querySelector('i');
        if (navbar.classList.contains('mobile-active')) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    });
};

// Form submission handler - Envio para WhatsApp
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.hero-form form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            // Simple validation
            const requiredFields = ['nome', 'email', 'telefone', 'servico'];
            let isValid = true;

            requiredFields.forEach(field => {
                const input = document.getElementById(field);
                if (!data[field] || data[field].trim() === '') {
                    input.style.borderColor = '#e74c3c';
                    isValid = false;
                } else {
                    input.style.borderColor = '#e0e0e0';
                }
            });

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const emailInput = document.getElementById('email');
            if (data.email && !emailRegex.test(data.email)) {
                emailInput.style.borderColor = '#e74c3c';
                isValid = false;
            }

            if (isValid) {
                // Show loading state
                const button = this.querySelector('.btn');
                const originalText = button.textContent;
                button.textContent = 'Enviando...';
                button.disabled = true;

                // Create WhatsApp message
                const whatsappMessage = createWhatsAppMessage(data);

                // Send to WhatsApp
                sendToWhatsApp(whatsappMessage);

                // Reset form after a delay
                setTimeout(() => {
                    alert('Redirecionando para WhatsApp...');
                    this.reset();
                    button.textContent = originalText;
                    button.disabled = false;
                }, 1000);
            } else {
                alert('Por favor, preencha todos os campos obrigatórios corretamente.');
            }
        });
    }
});

// Function to create WhatsApp message from form data
function createWhatsAppMessage(data) {
    let message = `*📋 NOVA SOLICITAÇÃO DE CONSULTA*\n\n`;
    message += `👤 *Nome:* ${data.nome}\n`;
    message += `📧 *E-mail:* ${data.email}\n`;
    message += `📱 *Telefone:* ${data.telefone}\n`;

    if (data.empresa && data.empresa.trim()) {
        message += `🏢 *Empresa:* ${data.empresa}\n`;
    }

    message += `⚖️ *Serviço de Interesse:* ${data.servico}\n`;

    if (data.mensagem && data.mensagem.trim()) {
        message += `💬 *Mensagem:* ${data.mensagem}\n`;
    }

    message += `\n📅 *Data:* ${new Date().toLocaleDateString('pt-BR')}\n`;
    message += `🕐 *Horário:* ${new Date().toLocaleTimeString('pt-BR')}`;

    return message;
}

// Function to send message to WhatsApp
function sendToWhatsApp(message) {
    const whatsappNumber = '5519998630306'; // WhatsApp number from the website
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Open WhatsApp in new tab
    window.open(whatsappURL, '_blank');
}

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards and benefit items
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .benefit-item, .contact-item');

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Initialize mobile menu for smaller screens
    if (window.innerWidth <= 768) {
        createMobileMenu();
    }

    // Add resize listener for mobile menu
    window.addEventListener('resize', () => {
        const existingToggle = document.querySelector('.mobile-toggle');
        if (window.innerWidth <= 768 && !existingToggle) {
            createMobileMenu();
        } else if (window.innerWidth > 768 && existingToggle) {
            existingToggle.remove();
            document.querySelector('.navbar').classList.remove('mobile-active');
        }
    });
});


// Add hover effects to service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.borderTopColor = '#e74c3c';
    });

    card.addEventListener('mouseleave', function() {
        this.style.borderTopColor = '#3498db';
    });
});


// Chatbot functionality
function toggleChatbot() {
    const container = document.getElementById('chatbot-container');
    container.classList.toggle('active');
}

function handleChatInput(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

async function sendMessage() {
    const inputField = document.getElementById('chatbot-input-field');
    const message = inputField.value.trim();

    if (!message) return;

    // Disable input while processing
    inputField.disabled = true;
    const sendButton = inputField.nextElementSibling;
    sendButton.disabled = true;

    // Add user message
    addMessage(message, 'user');
    inputField.value = '';

    // Show typing indicator
    showTypingIndicator();

    // Get bot response (async)
    try {
        const botResponse = await getBotResponse(message);
        hideTypingIndicator();
        addMessage(botResponse, 'bot');
    } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
        hideTypingIndicator();
        addMessage('Desculpe, houve um erro. Tente novamente em instantes.', 'bot');
    } finally {
        // Re-enable input
        inputField.disabled = false;
        sendButton.disabled = false;
        inputField.focus();
    }
}

function addMessage(text, sender) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;

    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';

    // Handle line breaks and formatting
    const formattedText = text.replace(/\n/g, '<br>');
    messageContent.innerHTML = formattedText;

    messageDiv.appendChild(messageContent);
    messagesContainer.appendChild(messageDiv);

    // Smooth scroll to bottom
    setTimeout(() => {
        messagesContainer.scrollTo({
            top: messagesContainer.scrollHeight,
            behavior: 'smooth'
        });
    }, 100);
}

// Chatbot with Advanced AI Integration
const CHATBOT_CONFIG = {
    // Configuração da IA (substitua pela sua chave real)
    OPENAI_API_KEY: 'sk-YOUR_OPENAI_KEY_HERE', // Substitua pela sua chave
    OPENAI_API_URL: 'https://api.openai.com/v1/chat/completions',
    USE_AI: false, // Mude para true quando tiver a chave da OpenAI

    // Context do escritório para IA - SISTEMA RIGOROSO ANTI-DESVIO
    SYSTEM_CONTEXT: `Você é Clara, assistente virtual EXCLUSIVAMENTE do escritório de advocacia trabalhista Martins Palmeira e Bergamo.

⚖️ FOCO OBRIGATÓRIO: APENAS DIREITO TRABALHISTA EMPRESARIAL

INFORMAÇÕES DO ESCRITÓRIO:
- Especialização: EXCLUSIVAMENTE Direito Trabalhista Empresarial
- Localização: Swiss Park Office - Av. Antonio Artioli, 570, Sala 108, Campinas-SP
- WhatsApp: (19) 99863-0306
- Email: contato@martinspalmeiraebergamo.com.br
- Horário: Seg-Sex: 9h-18h + Plantão WhatsApp 24h
- Experiência: 15+ anos, 500+ processos trabalhistas, 200+ empresas

SERVIÇOS ESPECIALIZADOS:
1. Defesa de Reclamações Trabalhistas (audiências, recursos, acordos)
2. Consultoria Trabalhista Empresarial (contratos, políticas, compliance)
3. Prevenção de Passivos Trabalhistas (auditoria, due diligence)

REGRAS RÍGIDAS - NUNCA VIOLE:
🚨 RESPONDA APENAS sobre: direito do trabalho, CLT, processos trabalhistas, relações trabalhistas, contratos de trabalho, demissões, direitos trabalhistas, passivos trabalhistas, Justiça do Trabalho
🚨 JAMAIS responda sobre: direito civil, criminal, família, consumidor, tributário, administrativo, outros tipos de direito
🚨 Se perguntarem sobre outros assuntos: "Sou especializada exclusivamente em direito trabalhista empresarial. Para outras questões jurídicas, recomendo contatar um escritório generalista. Posso ajudá-lo com questões trabalhistas?"
🚨 Não forneça consultoria específica - sempre direcione para consulta
🚨 Seja técnica mas acessível
🚨 Máximo 3 frases por resposta
🚨 Sempre ofereça contato: WhatsApp (19) 99863-0306`
};

// SISTEMA DE VALIDAÇÃO MELHORADO - MAIS FLEXÍVEL PARA SAUDAÇÕES E DÚVIDAS
function isLaborLawTopic(message) {
    const laborKeywords = [
        // Termos diretos de direito trabalhista
        'trabalhista', 'trabalho', 'clt', 'empregado', 'empregador', 'funcionário', 'colaborador',
        'demissão', 'demitir', 'rescisão', 'aviso prévio', 'fgts', 'inss', 'décimo terceiro',
        'férias', 'salário', 'hora extra', 'adicional', 'insalubridade', 'periculosidade',
        'reclamatória', 'processo trabalhista', 'justiça do trabalho', 'audiência',
        'acordo trabalhista', 'passivo trabalhista', 'auditoria trabalhista',
        'contrato de trabalho', 'carteira assinada', 'registro', 'ponto eletrônico',
        'folha de pagamento', 'benefícios', 'vale transporte', 'vale refeição',
        'estabilidade', 'gestante', 'acidente trabalho', 'sindicato', 'convenção coletiva',
        // Termos do escritório
        'martins palmeira', 'bergamo', 'advocacia', 'advogado', 'escritório',
        'consulta', 'serviços', 'contrato', 'whatsapp', 'telefone', 'contato'
    ];

    const nonLaborKeywords = [
        // Direito Civil - APENAS termos muito específicos
        'divórcio', 'separação conjugal', 'pensão alimentícia', 'guarda filhos', 'inventário', 'herança',
        'usucapião', 'locação residencial', 'compra e venda imóvel',
        // Direito Criminal - APENAS crimes específicos
        'homicídio', 'roubo', 'furto', 'tráfico', 'prisão', 'delegacia', 'boletim ocorrência',
        // Direito do Consumidor - APENAS termos específicos
        'procon', 'produto defeituoso', 'devolução produto',
        // Direito Tributário - APENAS impostos específicos
        'imposto de renda', 'receita federal',
        // Trânsito - APENAS multas
        'multa trânsito', 'cnh', 'detran'
    ];

    const messageLower = message.toLowerCase().trim();

    // SAUDAÇÕES E PERGUNTAS GERAIS - SEMPRE ACEITAR
    const basicGreetings = /^(ol[aá]|oi|hello|hey|e a[ií]|blz|tudo bem|bom dia|boa tarde|boa noite)[\s\!]*$/i.test(messageLower);
    const basicQuestions = /\b(como|onde|quando|quanto|que|qual|quem|por que|porque|o que|ajuda|ajudar|info|informa[çc][ãa]o|dúvida|d[uú]vida|pergunta)\b/i.test(messageLower);
    const serviceQuestions = /\b(servi[çc]os?|atua[çc][ãa]o|especialidade|fazem|trabalham|oferecem|atendimento)\b/i.test(messageLower);
    const contactQuestions = /\b(contato|telefone|whatsapp|falar|ligar|email|endere[çc]o|localiza[çc][ãa]o|fica)\b/i.test(messageLower);

    // Se é saudação básica ou pergunta geral, sempre aceitar
    if (basicGreetings || basicQuestions || serviceQuestions || contactQuestions) {
        return true;
    }

    // Se contém palavras explicitamente proibidas, rejeitar
    const hasNonLaborKeywords = nonLaborKeywords.some(keyword =>
        messageLower.includes(keyword)
    );

    if (hasNonLaborKeywords) return false;

    // Se contém palavras trabalhistas específicas, aceitar
    const hasLaborKeywords = laborKeywords.some(keyword =>
        messageLower.includes(keyword)
    );

    if (hasLaborKeywords) return true;

    // Para mensagens muito curtas (até 3 palavras), aceitar (provavelmente saudações)
    if (messageLower.split(' ').length <= 3) return true;

    // Para outras mensagens, aceitar por padrão (serão redirecionadas se necessário)
    return true;
}

// Função principal para obter resposta do bot - SIMPLIFICADA E SEGURA
async function getBotResponse(userMessage) {
    try {
        console.log('Mensagem recebida:', userMessage);

        // Pequeno delay para simular digitação
        await new Promise(resolve => setTimeout(resolve, 300));

        // SEMPRE usar respostas locais (mais seguro)
        const response = getBotResponseLocal(userMessage);

        console.log('Resposta gerada:', response);
        return response;

    } catch (error) {
        console.error('Erro no chatbot:', error);
        // Resposta de erro mais amigável
        return 'Oi! Tive um probleminha técnico, mas estou aqui para ajudar! Pode repetir sua pergunta ou entrar em contato pelo WhatsApp (19) 99863-0306.';
    }
}

// Integração com OpenAI GPT
async function getBotResponseAI(userMessage) {
    try {
        const response = await fetch(CHATBOT_CONFIG.OPENAI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${CHATBOT_CONFIG.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: CHATBOT_CONFIG.SYSTEM_CONTEXT
                    },
                    {
                        role: "user",
                        content: userMessage
                    }
                ],
                max_tokens: 200,
                temperature: 0.7,
                presence_penalty: 0.1,
                frequency_penalty: 0.1
            })
        });

        if (!response.ok) {
            throw new Error('Erro na API da OpenAI');
        }

        const data = await response.json();
        return data.choices[0].message.content.trim();
    } catch (error) {
        console.error('Erro na OpenAI:', error);
        return getBotResponseLocal(userMessage); // Fallback para respostas locais
    }
}

// VERSÃO NOVA E SIMPLIFICADA - GARANTIA DE FUNCIONAMENTO
function getBotResponseLocal(userMessage) {
    const message = userMessage.toLowerCase().trim();
    console.log('Processando mensagem:', message);

    // Saudações - PRIMEIRA PRIORIDADE
    if (message.includes('ola') || message.includes('olá') || message.includes('oi') ||
        message.includes('bom dia') || message.includes('boa tarde') || message.includes('boa noite') ||
        message.includes('hello') || message.includes('hey')) {
        const greetings = [
            'Olá! Sou Clara, assistente do escritório Martins Palmeira e Bergamo. Como posso ajudá-lo com questões trabalhistas?',
            'Oi! Somos especialistas em direito trabalhista. Pode me contar sua dúvida que vou orientá-lo!',
            'Olá! Tem alguma dúvida trabalhista? Estou aqui para ajudar com direitos do trabalho e processos.',
            'Oi! Sou Clara do escritório trabalhista Martins Palmeira e Bergamo. Como posso ajudá-lo hoje?'
        ];
        return greetings[Math.floor(Math.random() * greetings.length)];
    }

    // Perguntas sobre saber/conhecer/dúvidas
    if (message.includes('gostaria de saber') || message.includes('quero saber') ||
        message.includes('duvida') || message.includes('dúvida') || message.includes('pergunta') ||
        message.includes('me tire') || message.includes('esclareça') || message.includes('explique')) {
        return 'Claro! Estou aqui para esclarecer dúvidas sobre direito trabalhista. Pode perguntar sobre processos, direitos do trabalho, demissões, ou nossos serviços. O que você gostaria de saber?';
    }

    // Perguntas sobre ajuda
    if (message.includes('ajuda') || message.includes('ajudar') || message.includes('me ajude') ||
        message.includes('preciso de') || message.includes('como você') || message.includes('pode')) {
        return 'Claro! Posso ajudá-lo com questões trabalhistas: processos, direitos do trabalho, demissões, consultoria empresarial. Qual sua dúvida específica?';
    }

    // Serviços
    if (message.includes('serviço') || message.includes('fazem') || message.includes('trabalham') ||
        message.includes('especialidade') || message.includes('oferecem')) {
        return 'Nossos serviços trabalhistas:\n\n🛡️ DEFESA em processos trabalhistas\n📋 CONSULTORIA para empresas\n⚖️ PREVENÇÃO de problemas trabalhistas\n\nSobre qual você quer saber mais?';
    }

    // Contato
    if (message.includes('contato') || message.includes('telefone') || message.includes('whatsapp') ||
        message.includes('email') || message.includes('falar') || message.includes('ligar')) {
        return 'Entre em contato conosco:\n📱 WhatsApp: (19) 99863-0306\n📧 Email: contato@martinspalmeiraebergamo.com.br\n🕐 Seg-Sex: 9h-18h + Plantão 24h\n📍 Campinas-SP';
    }

    // Localização
    if (message.includes('onde') || message.includes('endereço') || message.includes('localização') ||
        message.includes('fica') || message.includes('campinas')) {
        return 'Nosso escritório fica em Campinas-SP:\n📍 Swiss Park Office\n📍 Av. Antonio Artioli, 570\n📍 Edifício Locarno - Sala 108\n🅿️ Estacionamento próprio';
    }

    // Horários
    if (message.includes('horário') || message.includes('que horas') || message.includes('funciona') ||
        message.includes('aberto') || message.includes('atende')) {
        return 'Nosso horário: Segunda a Sexta das 9h às 18h, mas temos plantão 24h pelo WhatsApp (19) 99863-0306 para emergências trabalhistas!';
    }

    // Preços
    if (message.includes('preço') || message.includes('valor') || message.includes('quanto') ||
        message.includes('custo') || message.includes('honorário') || message.includes('cobram')) {
        return 'Nossos valores variam conforme a complexidade do caso. Oferecemos consulta inicial para avaliação e orçamento personalizado. Entre em contato pelo WhatsApp (19) 99863-0306!';
    }

    // Agradecimentos
    if (message.includes('obrigad') || message.includes('valeu') || message.includes('agradeço') ||
        message.includes('muito bom') || message.includes('ótimo') || message.includes('perfeito')) {
        return 'Fico feliz em ajudar! Tem mais alguma dúvida sobre direito trabalhista? Estou aqui para orientá-lo!';
    }

    // Resposta padrão para qualquer outra mensagem
    return 'Entendi sua pergunta! Para uma orientação específica sobre sua situação trabalhista, recomendo falar diretamente com nossos advogados pelo WhatsApp (19) 99863-0306. Assim podemos analisar seu caso detalhadamente!';
}

// Função auxiliar para respostas aleatórias - COM VALIDAÇÃO
function getRandomResponse(responses) {
    if (!responses || !Array.isArray(responses) || responses.length === 0) {
        console.error('Erro: Array de respostas inválido', responses);
        return 'Olá! Como posso ajudá-lo com questões trabalhistas?';
    }

    const randomIndex = Math.floor(Math.random() * responses.length);
    const selectedResponse = responses[randomIndex];
    console.log('Resposta selecionada:', selectedResponse);
    return selectedResponse;
}

// Indicadores visuais melhorados
function showTypingIndicator() {
    // Remove indicador existente se houver
    hideTypingIndicator();

    const messagesContainer = document.getElementById('chatbot-messages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing-indicator';
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = `
        <div class="message-content">
            <span class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </span>
            Clara está digitando...
        </div>
    `;
    messagesContainer.appendChild(typingDiv);

    // Smooth scroll
    setTimeout(() => {
        messagesContainer.scrollTo({
            top: messagesContainer.scrollHeight,
            behavior: 'smooth'
        });
    }, 100);
}

function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}