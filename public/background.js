// background.js - Service Worker Otimizado MV3

// 1. Instalação
chrome.runtime.onInstalled.addListener(() => {
    console.log("CRM Suite: Service Worker Ativo.");
});

// 2. Função genérica para requisições (Evita erros de CORS no Content Script)
async function proxyFetch(url, options = {}) {
    try {
        const response = await fetch(url, options);
        const text = await response.text();
        try {
            return { success: true, data: JSON.parse(text) };
        } catch (e) {
            // Se não for JSON, retornamos o texto puro
            return { success: true, data: text };
        }
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// 3. Listener de Mensagens Centralizado
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    
    // A. Requisições de Rede (Proxy Fetch)
    if (request.action === "proxy_fetch") {
        proxyFetch(request.url, request.options).then(sendResponse);
        return true; // Mantém o canal aberto para resposta assíncrona
    }

    // B. Verificação de status
    if (request.action === "check_status") {
        sendResponse({ status: "active" });
        return false;
    }

    // C. Fechamento de guias (Gestão segura)
    if (request.action === "cerrar_pestana" && sender.tab) {
        chrome.tabs.remove(sender.tab.id)
            .then(() => console.log(`Guia ${sender.tab.id} fechada.`))
            .catch(err => console.error("Erro ao fechar a guia:", err));
        sendResponse({ result: "closed" });
        return false;
    }

    // 🔥 D. Notificador Nativo (Direto ao Windows)
    if (request.action === "notificar") {
        chrome.notifications.create({
            type: 'basic',
            iconUrl: 'icon.png', 
            title: request.titulo || '🚨 ALERTA URGENTE',
            message: request.mensaje || '',
            priority: 2,
            requireInteraction: true // MAGIA: O alerta não desaparece sozinho, obriga o clique
        });
        sendResponse({ result: "notified" });
        return false;
    }

    // 🔥 E. REMOVER MUDO FORÇADO (NOVA ARMA ANTI-TRAPAÇAS)
    if (request.action === "unmute_tab" && sender.tab) {
        chrome.tabs.update(sender.tab.id, { muted: false })
            .catch(err => console.error("Erro ao remover o mudo:", err));
        sendResponse({ result: "unmuted" });
        return false;
    }
});