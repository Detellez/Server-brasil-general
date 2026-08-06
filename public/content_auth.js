(function() {
    'use strict';

    function inyectarBloqueo() {
        if (document.getElementById('caja-negra-bloqueo')) return;

        // Overlay base (Pantalla Completa Real)
        const overlay = document.createElement('div');
        overlay.id = 'caja-negra-bloqueo';
        Object.assign(overlay.style, {
            position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh',
            backgroundColor: '#0f172a', 
            zIndex: '2147483647', display: 'flex', flexDirection: 'column',
            justifyContent: 'center', alignItems: 'center',
            fontFamily: "'Segoe UI', Roboto, sans-serif", boxSizing: 'border-box',
            margin: '0', padding: '20px', overflow: 'hidden', textAlign: 'center'
        });

        overlay.innerHTML = `
            <div style="background: rgba(0,0,0,0.6); padding: 50px 40px; border-radius: 16px; border: 2px solid #ef4444; box-shadow: 0 15px 35px rgba(0,0,0,0.8); max-width: 600px; width: 100%;">
                <div style="font-size: 65px; animation: pulse 2s infinite; margin-bottom: 25px;">⚠️</div>
                <h1 style="color: #ef4444; margin: 0 0 15px 0; font-weight: 900; text-transform: uppercase; font-size: 32px; letter-spacing: 2px;">
                    Atualização Necessária
                </h1>
                <p style="color: #cbd5e1; margin: 0 0 35px 0; font-size: 20px; line-height: 1.5;">
                    Para continuar, entre em contato com o Michael.
                </p>
                
                <a href="https://t.me/michaellinke" target="_blank" 
                   style="display: inline-flex; align-items: center; justify-content: center; background: #0088cc; color: white; text-decoration: none; padding: 18px 40px; border-radius: 10px; font-weight: 900; font-size: 22px; text-transform: uppercase; letter-spacing: 1px; transition: background 0.3s; box-shadow: 0 6px 15px rgba(0, 136, 204, 0.4); margin-bottom: 25px; width: 100%; box-sizing: border-box;"
                   onmouseover="this.style.background='#0077b3';"
                   onmouseout="this.style.background='#0088cc';">
                   📲 Enviar mensagem pelo Telegram
                </a>

                <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 10px; border: 1px dashed #475569;">
                    <p style="color: #94a3b8; margin: 0 0 10px 0; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">
                        Link de contato:
                    </p>
                    <a href="https://t.me/michaellinke" target="_blank" style="color: #38bdf8; font-size: 18px; font-weight: bold; text-decoration: none; word-break: break-all; display: inline-block;">
                        https://t.me/michaellinke
                    </a>
                </div>
            </div>
        `;

        const style = document.createElement('style');
        style.innerHTML = `@keyframes pulse { 0% { opacity: 1; transform: scale(1); } 50% { opacity: 0.6; transform: scale(1.15); } 100% { opacity: 1; transform: scale(1); } }`;
        document.head.appendChild(style);

        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden'; 
        document.documentElement.appendChild(overlay);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inyectarBloqueo);
    } else {
        inyectarBloqueo();
    }

    const observer = new MutationObserver(() => {
        if (!document.getElementById('caja-negra-bloqueo')) inyectarBloqueo();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });

})();
