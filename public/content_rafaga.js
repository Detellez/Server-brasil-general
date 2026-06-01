(function() {
    'use strict';

    // ==========================================
    // 1. CONFIGURACIÓN (6 PAÍSES)
    // ==========================================
    const DOMAIN_CONFIG = [
        { prefix: '+57', country: 'Colômbia', domains: ['co-crm.certislink.com'], digits: 10 },
        { prefix: '+52', country: 'México (Cashimex)', domains: ['mx-crm.certislink.com'], digits: 10 },
        { prefix: '+52', country: 'México (Various)', domains: ['variousplan.com'], digits: 10 },
        { prefix: '+56', country: 'Chile', domains: ['cl-crm.certislink.com'], digits: 9 },
        { prefix: '+51', country: 'Peru', domains: ['pe-crm.certislink.com'], digits: 9 },
        { prefix: '+55', country: 'Brasil', domains: ['crm.creddireto.com'], digits: 11 },
        { prefix: '+54', country: 'Argentina', domains: ['crm.rayodinero.com'], digits: 10 }
    ];

    // 🔥 DOMINIOS PERMITIDOS PARA CORREOS 🔥
    const DOMINIOS_PERMITIDOS = [
        "@gmail.com", "@hotmail.com", "@icloud.com", 
        "@yahoo.com", "@live.com", "@outlook.com"
    ];

    // --- ESTILOS CSS GLOBALES (ACTUALIZADOS A ESTILO TERMINAL) ---
    const inyectarEstilos = () => {
        if (document.getElementById('estilos-rafaga')) return;
        const style = document.createElement('style');
        style.id = 'estilos-rafaga';
        style.innerHTML = `
            #tabla-container-rafaga::-webkit-scrollbar { height: 8px; width: 8px; }
            #tabla-container-rafaga::-webkit-scrollbar-track { background: rgba(0,0,0,0.4); border-radius: 4px; margin: 4px; }
            #tabla-container-rafaga::-webkit-scrollbar-thumb { background: rgba(57, 255, 20, 0.3); border-radius: 4px; }
            #tabla-container-rafaga::-webkit-scrollbar-thumb:hover { background: #39ff14; }
            .fila-rafaga:hover { background-color: rgba(57, 255, 20, 0.15); transition: background-color 0.2s; }
            
            /* 🔥 BOTONES ESTILO TERMINAL 🔥 */
            .btn-rafaga { transition: all 0.2s ease; font-weight: 900; padding: 8px 12px; border-radius: 4px; cursor: pointer; display: flex; align-items: center; gap: 6px; text-transform: uppercase; font-family: 'Courier New', Courier, monospace; letter-spacing: 0.5px; outline: none; background: rgba(0,0,0,0.6); }
            .btn-rafaga:active { transform: scale(0.95) !important; }
            .btn-rafaga:disabled { opacity: 0.5; cursor: wait; border-color: #475569 !important; color: #475569 !important; box-shadow: none !important; text-shadow: none !important; }

            .btn-red { border: 2px solid #ef4444; color: #ef4444; text-shadow: 0 0 5px rgba(239,68,68,0.5); }
            .btn-red:hover:not(:disabled) { background: #ef4444; color: #000; box-shadow: 0 0 10px #ef4444; }
            
            .btn-orange { border: 2px solid #f59e0b; color: #f59e0b; text-shadow: 0 0 5px rgba(245,158,11,0.5); }
            .btn-orange:hover:not(:disabled) { background: #f59e0b; color: #000; box-shadow: 0 0 10px #f59e0b; }
            
            .btn-purple { border: 2px solid #d946ef; color: #d946ef; text-shadow: 0 0 5px rgba(217,70,239,0.5); }
            .btn-purple:hover:not(:disabled) { background: #d946ef; color: #000; box-shadow: 0 0 10px #d946ef; }
            
            .btn-blue { border: 2px solid #0ea5e9; color: #0ea5e9; text-shadow: 0 0 5px rgba(14,165,233,0.5); }
            .btn-blue:hover:not(:disabled) { background: #0ea5e9; color: #000; box-shadow: 0 0 10px #0ea5e9; }
            
            .btn-green { border: 2px solid #39ff14; color: #39ff14; text-shadow: 0 0 5px rgba(57,255,20,0.8); }
            .btn-green:hover:not(:disabled) { background: #39ff14; color: #000; box-shadow: 0 0 10px #39ff14; }
            
            .btn-yellow { border: 2px solid #fbbf24; color: #fbbf24; text-shadow: 0 0 5px rgba(251,191,36,0.5); }
            .btn-yellow:hover:not(:disabled) { background: #fbbf24; color: #000; box-shadow: 0 0 10px #fbbf24; }
            
            /* 🔥 BOTONES DE FILTRO MÚLTIPLE 🔥 */
            .btn-rafaga-toggle { background: rgba(0,0,0,0.5); color: #cbd5e1; border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; padding: 4px 10px; font-size: 11px; font-weight:bold; cursor: pointer; transition: 0.2s; outline:none; font-family: 'Courier New', Courier, monospace; }
            .btn-rafaga-toggle:hover { background: rgba(255,255,255,0.1); }
            .btn-rafaga-toggle.active { background: rgba(14, 165, 233, 0.2); color: #39ff14; border-color: #39ff14; box-shadow: 0 0 8px rgba(57,255,20,0.4); text-shadow: 0 0 5px rgba(57,255,20,0.6); }

            /* 🔥 BOTONES NEÓN PARA FILTRO AVANZADO 🔥 */
            .btn-neon-si, .btn-neon-no { background: rgba(0,0,0,0.5); color: #64748b; border: 1px solid rgba(255,255,255,0.2); opacity: 0.6; transition: 0.3s; }
            .btn-neon-si:hover, .btn-neon-no:hover { opacity: 0.9; background: rgba(255,255,255,0.1); color: #cbd5e1; }
            .btn-neon-si.active { opacity: 1; color: #39ff14 !important; border-color: #39ff14 !important; background: rgba(57, 255, 20, 0.15) !important; box-shadow: 0 0 10px rgba(57, 255, 20, 0.6) !important; text-shadow: 0 0 5px rgba(57, 255, 20, 0.8) !important; }
            .btn-neon-no.active { opacity: 1; color: #ff073a !important; border-color: #ff073a !important; background: rgba(255, 7, 58, 0.15) !important; box-shadow: 0 0 10px rgba(255, 7, 58, 0.6) !important; text-shadow: 0 0 5px rgba(255, 7, 58, 0.8) !important; }

            .switch-mora { position: relative; display: inline-block; width: 34px; height: 18px; margin-right: 6px; }
            .switch-mora input { opacity: 0; width: 0; height: 0; }
            .slider-mora { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(255,255,255,0.2); transition: .4s; border-radius: 34px; border: 1px solid rgba(255,255,255,0.1); }
            .slider-mora:before { position: absolute; content: ""; height: 12px; width: 12px; left: 3px; bottom: 2px; background-color: white; transition: .4s; border-radius: 50%; }
            input:checked + .slider-mora { background-color: rgba(57, 255, 20, 0.2); border-color: #39ff14; box-shadow: 0 0 8px rgba(57,255,20,0.5); }
            input:checked + .slider-mora:before { transform: translateX(14px); background-color: #39ff14; }
            .label-mora { font-size: 11px; font-weight: 800; cursor: pointer; user-select: none; transition: 0.3s; letter-spacing: 0.5px; font-family: 'Courier New', Courier, monospace; }
            
            /* 🔥 SCROLL PARA PANELES PEQUEÑOS (FILTROS) 🔥 */
            .scroll-neon::-webkit-scrollbar { width: 6px; }
            .scroll-neon::-webkit-scrollbar-track { background: rgba(0,0,0,0.4); border-radius: 4px; margin: 2px; }
            .scroll-neon::-webkit-scrollbar-thumb { background: rgba(217, 70, 239, 0.3); border-radius: 4px; }
            .scroll-neon::-webkit-scrollbar-thumb:hover { background: #d946ef; }

            /* 🔥 NUEVOS ESTILOS PARA EDICIÓN DE CORREOS 🔥 */
            .correo-celda { cursor: pointer; padding: 3px 6px; border-radius: 4px; transition: 0.2s; display: inline-block; min-width: 60px; font-weight: bold; }
            .correo-alerta { background-color: rgba(239, 68, 68, 0.2) !important; color: #fca5a5 !important; border: 1px dotted #ef4444; }
            .correo-valido { color: #0ea5e9; }
            .correo-editando { 
                user-select: text !important; 
                -webkit-user-select: text !important; 
                -moz-user-select: text !important;
                -ms-user-select: text !important;
                background-color: rgba(0,0,0,0.8) !important; 
                color: #39ff14 !important; 
                outline: 1px solid #39ff14; 
                box-shadow: 0 0 10px rgba(57,255,20,0.5); 
                cursor: text; 
                font-family: 'Courier New', Courier, monospace;
            }
            
            /* 🔥 ESTILOS PARA TOOLTIP DE PREVISUALIZACIÓN 🔥 */
            #rafaga-tooltip {
                position: fixed;
                pointer-events: none;
                z-index: 2147483647;
                background: rgba(5, 10, 15, 0.95);
                border: 1px solid #39ff14;
                border-radius: 8px;
                padding: 12px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.8), 0 0 15px rgba(57, 255, 20, 0.4);
                backdrop-filter: blur(10px);
                display: none;
                max-width: 320px;
                color: #e2e8f0;
                font-family: 'Courier New', Courier, monospace;
                font-size: 12px;
                word-wrap: break-word;
            }
            #rafaga-tooltip img {
                max-width: 280px;
                max-height: 280px;
                border-radius: 6px;
                display: block;
                margin-bottom: 6px;
                border: 1px solid rgba(57, 255, 20, 0.3);
                background: rgba(0,0,0,0.5);
            }
            .celda-hover-info {
                text-decoration: underline dashed #0ea5e9;
                text-underline-offset: 4px;
                transition: color 0.2s;
            }
            .celda-hover-info:hover {
                color: #38bdf8 !important;
                text-shadow: 0 0 5px rgba(14,165,233,0.8);
            }
        `;
        document.head.appendChild(style);
    };

    // --- UTILS ---
    const obtenerValor = (label) => {
        const el = [...document.querySelectorAll('div.mb-10')].find(div => (div.textContent || "").includes(label));
        if (!el) return '';
        const clone = el.cloneNode(true);
        clone.querySelectorAll('button').forEach(b => b.remove());
        const t = (clone.textContent || "").trim();
        return t.includes(':') ? t.substring(t.indexOf(':') + 1).trim() : '';
    };

    const getCountryInfo = () => {
        const href = window.location.href;
        for (const c of DOMAIN_CONFIG) {
            for (const d of c.domains) {
                if (href.includes(d)) return { prefix: c.prefix, name: c.country, digits: c.digits };
            }
        }
        return { prefix: '', name: 'Desconhecido', digits: 10 };
    };

    const getFechasRelativas = () => {
        const hoy = new Date();
        const formato = (d) => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
        const ayer = new Date(hoy);
        ayer.setDate(ayer.getDate() - 1);
        return { strHoy: formato(hoy), strAyer: formato(ayer) };
    };

    const mostrarAviso = (texto, color = '#39ff14', tipo = 'info', tiempo = 2000) => {
        if (!document.body) return;
        document.querySelectorAll('.addon-aviso-temp').forEach(e => e.remove());
        const div = document.createElement('div');
        div.className = 'addon-aviso-temp';
        let icono = tipo === 'success' ? '[>]' : tipo === 'error' ? '[X]' : tipo === 'warning' ? '[!]' : '[i]';
        if(tipo==='success') color='#39ff14'; if(tipo==='error') color='#ef4444'; if(tipo==='warning') color='#f59e0b';
        
        div.innerHTML = `<span style="font-size:14px; margin-right:8px; font-weight:900;">${icono}</span><span style="font-weight:600; font-size:12px;">${texto}</span>`;
        Object.assign(div.style, {
            position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)', padding: '10px 20px', 
            backgroundColor: 'rgba(5, 10, 15, 0.95)', color: color, borderRadius: '6px', 
            zIndex: 2147483645, border: `1px solid ${color}`, backdropFilter: 'blur(10px)', 
            boxShadow: `0 0 15px ${color}40`, fontFamily: "'Courier New', Courier, monospace", textTransform: 'uppercase'
        });
        document.body.appendChild(div);
        setTimeout(() => div.remove(), tiempo); 
    };

    const mostrarConfirmacionHTML = (titulo, mensaje, textoConfirmar = '[>] ACEITAR', colorConfirmar = '#39ff14') => {
        return new Promise((resolve) => {
            const overlay = document.createElement('div');
            Object.assign(overlay.style, {
                position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: '2147483645',
                display: 'flex', justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(8px)',
                fontFamily: "'Courier New', Courier, monospace"
            });

            const modal = document.createElement('div');
            Object.assign(modal.style, {
                background: 'rgba(5, 10, 15, 0.95)', padding: '25px', borderRadius: '8px', border: `1px solid ${colorConfirmar}`,
                width: '420px', maxWidth: '90%', color: '#e2e8f0', boxShadow: `0 0 35px ${colorConfirmar}40`,
                textAlign: 'center'
            });

            blindarElemento(overlay);

            modal.innerHTML = `
                <div style="color: ${colorConfirmar}; font-size: 22px; margin-bottom: 15px; font-weight: 900; text-shadow: 0 0 10px ${colorConfirmar}80;">${titulo}</div>
                <div style="margin: 0 0 25px 0; font-size: 13px; line-height: 1.5;">${mensaje}</div>
                <div style="display: flex; justify-content: center; gap: 15px;">
                    <button id="btn-modal-cancel" style="padding:10px 20px; background:rgba(0,0,0,0.6); border:2px solid #ef4444; color:#ef4444; cursor:pointer; font-weight:900; font-size:13px; border-radius:4px; font-family:inherit; text-shadow:0 0 5px rgba(239,68,68,0.8); text-transform:uppercase;">[X] CANCELAR</button>
                    <button id="btn-modal-confirm" style="padding:10px 20px; background:rgba(${colorConfirmar === '#39ff14' ? '57,255,20' : '255,255,255'},0.1); border:2px solid ${colorConfirmar}; color:${colorConfirmar}; cursor:pointer; font-weight:900; font-size:13px; border-radius:4px; font-family:inherit; text-shadow:0 0 5px ${colorConfirmar}80; text-transform:uppercase;">${textoConfirmar}</button>
                </div>
            `;

            const btnCancel = modal.querySelector('#btn-modal-cancel');
            const btnConfirm = modal.querySelector('#btn-modal-confirm');
            
            btnCancel.onmouseover = () => { btnCancel.style.background = '#ef4444'; btnCancel.style.color = '#000'; };
            btnCancel.onmouseout = () => { btnCancel.style.background = 'rgba(0,0,0,0.6)'; btnCancel.style.color = '#ef4444'; };
            btnConfirm.onmouseover = () => { btnConfirm.style.background = colorConfirmar; btnConfirm.style.color = '#000'; };
            btnConfirm.onmouseout = () => { btnConfirm.style.background = `rgba(0,0,0,0.6)`; btnConfirm.style.color = colorConfirmar; };

            btnCancel.onclick = () => { overlay.remove(); resolve(false); };
            btnConfirm.onclick = () => { overlay.remove(); resolve(true); };

            overlay.appendChild(modal);
            document.body.appendChild(overlay);
        });
    };

    const blindarElemento = (el) => {
        if (!el) return;
        ['mousedown', 'mouseup', 'click', 'keydown', 'keyup', 'keypress'].forEach(evt => {
            el.addEventListener(evt, (e) => e.stopPropagation());
        });
    };


    // ==========================================
    // 🚀 MOTOR DE EXTRACCIÓN MASIVA VÍA API 
    // ==========================================
    const obtenerTokenAutomatico = () => {
        try {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.startsWith('Admin-Token=')) return decodeURIComponent(cookie.substring('Admin-Token='.length));
            }
            return null;
        } catch (e) { return null; }
    };

    const restaurarBotones = () => {
        const btnExtraer = document.getElementById('btn-extraer-todo');
        if (btnExtraer) { btnExtraer.innerText = '[> EXTRAIR TUDO]'; btnExtraer.disabled = false; }
    };

    // 🔥 API AGENTE UNICO: SIN MODAL MANAGER 🔥
    async function iniciarExtraccionAPI() {
        if (window.location.href.includes('/login')) {
            return mostrarAviso('Faça login no CRM primeiro.', '#ef4444', 'error');
        }

        const inputToken = document.getElementById('input-token-api');
        if (!inputToken) return;

        // 🔥 AUTO-REFRESH DEL TOKEN DESDE LAS COOKIES 🔥
        const tokenFresco = obtenerTokenAutomatico();
        if (tokenFresco) {
            inputToken.value = tokenFresco; // Actualiza el cuadro de texto silenciosamente
        }

        const tokenRaw = inputToken.value.trim();
        if (!tokenRaw) return mostrarAviso('Token não encontrado. Recarregue a página.', '#f59e0b', 'warning');
        
        // Declarado con 'let' para que se pueda auto-actualizar si expira en medio proceso
        let token = decodeURIComponent(tokenRaw);
        const baseUrl = window.location.origin; 
        const countryInfo = getCountryInfo(); 
        const isVariousPlan = baseUrl.includes('variousplan.com');
        
        const btnExtraer = document.getElementById('btn-extraer-todo');

        if (btnExtraer) btnExtraer.disabled = true;

        if (btnExtraer) btnExtraer.innerText = '[> ANALISANDO BASE...]';

        const pageSize = 5000;
        const maxPagesPerRun = 20;
        let todosLosRegistrosBrutos = [];

        mostrarAviso(`Buscando contas em ${countryInfo.name}...`, '#0ea5e9', 'info');

        try {
            // 🔥 FIX: Eliminamos el pre-escaneo obsoleto de 9 etapas. Buscamos directo la lista global del agente en 1 sola petición.
            let page = 1;
            let totalPages = 1;

            while (true) {
                try {
                    const listUrl = `${baseUrl}/api/manage/urge/task/waitUrgeTaskPage?v=${Date.now()}`;
                    const respList = await fetch(listUrl, {
                        method: 'POST',
                        headers: { 'Authentication': token, 'Content-Type': 'application/json', 'Accept': 'application/json' },
                        // Al no enviar 'stageId', el servidor devuelve todas las tareas asignadas al instante
                        body: JSON.stringify({ current: page, size: pageSize })
                    });

                    if (!respList.ok) break; 
                    
                    const jsonList = await respList.json();
                    
                    // 🔥 RECUPERACIÓN EN VUELO SI EL TOKEN EXPIRA EN MEDIO PROCESO 🔥
                    if (jsonList.code === 401 || jsonList.code === 403) {
                        const nuevoTokenRaw = obtenerTokenAutomatico();
                        if (nuevoTokenRaw && decodeURIComponent(nuevoTokenRaw) !== token) {
                            token = decodeURIComponent(nuevoTokenRaw); // Lo actualizamos internamente
                            inputToken.value = nuevoTokenRaw; // Actualizamos el panel visual
                            mostrarAviso('Token expirou. Renovando...', '#d946ef', 'info');
                            continue; // Reintenta esta misma página sin abortar la descarga
                        } else {
                            throw new Error("TokenExpirado");
                        }
                    }
                    
                    if (jsonList.code !== 200 && jsonList.code !== 20000 && jsonList.code !== 0) break;

                    const registros = jsonList?.data?.records || jsonList?.records || [];
                    if (registros.length === 0) break; 
                    if (jsonList?.data?.pages) totalPages = jsonList.data.pages;

                    todosLosRegistrosBrutos.push(...registros);

                    page++;
                    if (page > maxPagesPerRun || page > totalPages) break;
                    await new Promise(r => setTimeout(r, 100)); 
                } catch (e) {
                    if (e.message === "TokenExpirado") throw e; 
                    break; 
                }
            }

            if(todosLosRegistrosBrutos.length === 0) {
                mostrarAviso('A lista global está vazia ou Token expirou', '#f59e0b', 'warning');
                restaurarBotones();
                return;
            }

            // DESCARTANDO DUPLICADOS EN LA BASE CRUDA
            let unicosMap = new Map();
            todosLosRegistrosBrutos.forEach(c => {
                let idPlanBruto = isVariousPlan ? (c.borrowId || c.orderId || "") : (c.repayId || c.orderId || "");
                const idPlanStr = String(idPlanBruto);
                const idPlan = isVariousPlan ? idPlanStr : (idPlanStr.includes('p') ? idPlanStr : 'p' + idPlanStr);
                if (idPlan && !unicosMap.has(idPlan)) unicosMap.set(idPlan, c);
            });
            let registrosAProcesar = Array.from(unicosMap.values());
            
            if(registrosAProcesar.length === 0) {
                mostrarAviso('Nenhum cliente válido encontrado', '#f59e0b', 'warning');
                restaurarBotones();
                return;
            }

            // 🔥 INICIA EXTRACCIÓN TURBO (CHUNKS) 🔥
            if (btnExtraer) btnExtraer.innerText = `[> PROCESSANDO 0 / ${registrosAProcesar.length}...]`;
            let procesadosExitosos = 0;
            const maxDetailCallsPerRun = 6000; 
            let detailCalls = 0;
            
            let todosLosNuevosDatos = []; 
            const TAMANO_PAQUETE = 35; // 🔥 Máxima velocidad de extracción simultánea 

            for (let i = 0; i < registrosAProcesar.length; i += TAMANO_PAQUETE) {
                const paquete = registrosAProcesar.slice(i, i + TAMANO_PAQUETE);
                
                const promesasPaquete = paquete.map(async (c) => {
                    let correo = c.email || "";
                    let telefono = String(c.phone || "");
                    let extension = c.extensionAmount || c.totalExtensionAmount || "";
                    let cargoMora = c.overdueFee || c.penaltyAmount || ""; 
                    let montoPago = c.principal || ""; 
                    let linkDescarga = c.downloadLink || "";
                    let dniUrl = c.idNoUrl || "";
                    let selfUrl = c.livingNessUrl || ""; 

                    if (c.taskId && c.orderId && detailCalls < maxDetailCallsPerRun) {
                        detailCalls++;
                        try {
                            const detUrl = `${baseUrl}/api/manage/urge/task/getTaskInfo/${c.taskId}/${c.orderId}?v=${Date.now()}`;
                            const respDet = await fetch(detUrl, {
                                method: 'GET',
                                headers: { 'Authentication': token, 'Accept': 'application/json' }
                            });
                            
                            if (respDet.ok) {
                                const detJson = await respDet.json();
                                if (detJson.data) {
                                    correo = correo || detJson.data.email || "";
                                    telefono = String(telefono || detJson.data.phone || detJson.data.phonePrefix || "");
                                    
                                    if (isVariousPlan) {
                                        const planList = detJson.data.planList || [];
                                        if (planList.length > 0) {
                                            const planDetail = planList[0];
                                            cargoMora = String(planDetail.overdueFee || planDetail.overdueAmount || cargoMora);
                                            montoPago = String(planDetail.repayContractAmount || planDetail.principal || montoPago);
                                        }
                                    } else {
                                         extension = extension || detJson.data.totalExtensionAmount || "";
                                         cargoMora = String(detJson.data.overdueFee || detJson.data.penaltyAmount || cargoMora);
                                         montoPago = String(detJson.data.principal || montoPago);
                                    }
                                    linkDescarga = detJson.data.downloadLink || linkDescarga;
                                    dniUrl = detJson.data.idNoUrl || dniUrl;
                                    selfUrl = detJson.data.livingNessUrl || selfUrl;
                                }
                            }
                        } catch(e) {}
                    }

                    let idPlanBruto = isVariousPlan ? (c.borrowId || c.orderId || "") : (c.repayId || c.orderId || "");
                    const idPlanStr = String(idPlanBruto);
                    const idPlan = isVariousPlan ? idPlanStr : (idPlanStr.includes('p') ? idPlanStr : 'p' + idPlanStr);

                    const prefixClean = countryInfo.prefix.replace('+', '');
                    const telLimpio = telefono.replace(/[^0-9]/g, '');
                    const telefonoFinal = telLimpio.length >= countryInfo.digits ? (prefixClean + telLimpio.slice(-countryInfo.digits)) : (prefixClean + telLimpio);

                    return {
                        idPlan: idPlan, telefono: telefonoFinal, nombre: c.userName || c.name || "",
                        app: c.appName || "", correo: correo, producto: c.productName || "",
                        monto: String(c.repayAmount || c.totalAmount || ""), importeReinv: String(extension),
                        diasMora: String(c.overdueDay || ""), cargoMora: cargoMora, montoPago: montoPago,
                        fechaConexion: c.openTime ? String(c.openTime).split(' ')[0] : '',
                        isRepay: c.isRepay, cuenta: c.urgeUserName || "Não Atribuído",
                        linkDescarga: linkDescarga, dniUrl: dniUrl, selfUrl: selfUrl
                    };
                });

                const resultadosDelPaquete = await Promise.all(promesasPaquete);
                todosLosNuevosDatos.push(...resultadosDelPaquete);
                
                procesadosExitosos += resultadosDelPaquete.length;
                if (btnExtraer) btnExtraer.innerText = `[> PROCESSANDO ${procesadosExitosos} / ${registrosAProcesar.length}...]`;

                // 🔥 Reducimos el tiempo de inactividad de la red para máxima fluidez
                await new Promise(r => setTimeout(r, 100)); 
            }

            const reporte = guardarMultiplesEnLote(todosLosNuevosDatos);
            
            if (reporte.agregados > 0 && reporte.actualizados > 0) {
                mostrarAviso(`CONCLUÍDO: ${reporte.agregados} NOVOS | ${reporte.actualizados} ATUALIZADOS`, '#39ff14', 'success', 3500);
            } else if (reporte.agregados > 0) {
                mostrarAviso(`SUCESSO: ${reporte.agregados} CLIENTES NOVOS SALVOS.`, '#39ff14', 'success', 3500);
            } else if (reporte.actualizados > 0) {
                mostrarAviso(`BASE ATUALIZADA: ${reporte.actualizados} CLIENTES.`, '#0ea5e9', 'info', 3500);
            } else {
                mostrarAviso(`VARREDURA CONCLUÍDA. NENHUMA ALTERAÇÃO.`, '#9ca3af', 'info', 2500);
            }

        } catch (error) {
            console.error("🔥 Erro no Motor de Extração API:", error);
            mostrarAviso('ERRO DE CONEXÃO OU TOKEN INVÁLIDO.', '#ef4444', 'error');
        } finally {
            restaurarBotones();
        }
    }

    // ==========================================
    // 📊 BASE DE DATOS Y FILTROS MÚLTIPLES
    // ==========================================
    const guardarMultiplesEnLote = (arrayNuevosDatos) => {
        let lote = JSON.parse(localStorage.getItem('LOTE_RAFAGA') || '[]');
        
        let contAgregados = 0;
        let contActualizados = 0;
        
        arrayNuevosDatos.forEach(datos => {
            const indexExistente = lote.findIndex(cliente => cliente.idPlan === datos.idPlan);
            
            if (indexExistente === -1) {
                lote.push(datos);
                contAgregados++;
            } else {
                let correoLocal = lote[indexExistente].correo;
                // 🛡️ FIX: Evitamos que "Sem_Email" bloquee la actualización si aparece un correo real
                if (correoLocal && correoLocal.trim() !== '' && correoLocal !== 'Sem_Email') {
                    datos.correo = correoLocal; 
                }
                
                lote[indexExistente] = datos; 
                contActualizados++;
            }
        });
        
        localStorage.setItem('LOTE_RAFAGA', JSON.stringify(lote)); 
        actualizarPanelFiltroPlus(); 
        actualizarTablaLotes(); 
        
        return { agregados: contAgregados, actualizados: contActualizados };
    };
    
    const togglePanelVisibility = (forzarEstado = null) => {
        let isVisible = localStorage.getItem('PANEL_RAFAGA_VISIBLE') === 'true';
        if (forzarEstado !== null) isVisible = forzarEstado;
        else isVisible = !isVisible;
        localStorage.setItem('PANEL_RAFAGA_VISIBLE', isVisible);
        const panel = document.getElementById('panel-excel-rafaga');
        if (panel) panel.style.display = isVisible ? 'flex' : 'none';
    };

    const obtenerLoteFiltrado = () => {
        let loteRaw = JSON.parse(localStorage.getItem('LOTE_RAFAGA') || '[]');
        
        let unicosMap = new Map();
        loteRaw.forEach(c => {
            if (!unicosMap.has(c.idPlan)) unicosMap.set(c.idPlan, c);
        });
        let loteUnicos = Array.from(unicosMap.values());
        
        const botonesApp = document.querySelectorAll('.btn-app-plus.active');
        const appsSeleccionadas = Array.from(botonesApp).map(b => b.dataset.val);

        const botonesFecha = document.querySelectorAll('.btn-fecha-plus.active');
        const fechasSeleccionadas = Array.from(botonesFecha).map(b => b.dataset.val);

        const botonesMora = document.querySelectorAll('.btn-mora-plus.active');
        const morasSeleccionadas = Array.from(botonesMora).map(b => b.dataset.val);

        const botonesRepay = document.querySelectorAll('.btn-repay-plus.active');
        const repaySeleccionadas = Array.from(botonesRepay).map(b => b.dataset.val);

        let filtrado = loteUnicos.filter(c => {
            let matchApp = appsSeleccionadas.length === 0 || appsSeleccionadas.includes(c.app);
            if (!matchApp) return false; 
            
            let esRepay = String(c.isRepay).toLowerCase() === 'true';
            let txtRepay = esRepay ? 'Sim' : 'Não';
            const dMora = c.diasMora ? String(c.diasMora).trim() : '';

            const tieneFechas = fechasSeleccionadas.length > 0;
            const tieneMoras = morasSeleccionadas.length > 0;
            const tieneRepay = repaySeleccionadas.length > 0;

            if (!tieneFechas && !tieneMoras && !tieneRepay) return true; 

            const coincideFecha = tieneFechas && fechasSeleccionadas.includes(c.fechaConexion);
            const coincideMora = tieneMoras && morasSeleccionadas.includes(dMora);
            const coincideRepay = tieneRepay && repaySeleccionadas.includes(txtRepay);

            return coincideFecha || coincideMora || coincideRepay; 
        });
        filtrado.sort((a, b) => (parseInt(a.diasMora) || 0) - (parseInt(b.diasMora) || 0));
        return filtrado;
    };

    const actualizarPanelFiltroPlus = () => {
        let loteRaw = JSON.parse(localStorage.getItem('LOTE_RAFAGA') || '[]');
        let unicosMap = new Map();
        loteRaw.forEach(c => { if (!unicosMap.has(c.idPlan)) unicosMap.set(c.idPlan, c); });
        let lote = Array.from(unicosMap.values());

        const activeApps = Array.from(document.querySelectorAll('.btn-app-plus.active')).map(b => b.dataset.val);
        const activeFechas = Array.from(document.querySelectorAll('.btn-fecha-plus.active')).map(b => b.dataset.val);
        const activeMoras = Array.from(document.querySelectorAll('.btn-mora-plus.active')).map(b => b.dataset.val);
        const activeRepay = Array.from(document.querySelectorAll('.btn-repay-plus.active')).map(b => b.dataset.val);

        const appsUnicas = [...new Set(lote.map(c => c.app).filter(Boolean))].sort();
        const fechasUnicas = [...new Set(lote.map(c => c.fechaConexion).filter(Boolean))].sort().reverse();
        const morasUnicas = [...new Set(lote.map(c => c.diasMora ? String(c.diasMora).trim() : '').filter(Boolean))].sort((a,b)=>parseInt(a)-parseInt(b));

        const contApps = document.getElementById('plus-apps-container');
        if (contApps) {
            contApps.innerHTML = appsUnicas.map(a => {
                let isActive = activeApps.includes(a) ? 'active' : '';
                return `<button type="button" class="btn-rafaga-toggle btn-app-plus ${isActive}" data-val="${a}">${a}</button>`;
            }).join('');
        }

        const contFechas = document.getElementById('plus-fechas-container');
        if (contFechas) {
            contFechas.innerHTML = fechasUnicas.map(f => {
                let fCorta = f.length > 5 ? f.substring(5) : f;
                let isActive = activeFechas.includes(f) ? 'active' : '';
                return `<button type="button" class="btn-rafaga-toggle btn-fecha-plus ${isActive}" data-val="${f}">${fCorta}</button>`;
            }).join('');
        }

        const contMoras = document.getElementById('plus-moras-container');
        if (contMoras) {
            contMoras.innerHTML = morasUnicas.map(m => {
                let isActive = activeMoras.includes(m) ? 'active' : '';
                return `<button type="button" class="btn-rafaga-toggle btn-mora-plus ${isActive}" data-val="${m}">Dia ${m}</button>`;
            }).join('');
        }

        const contRepay = document.getElementById('plus-repay-container');
        if (contRepay) {
            let hasSi = lote.some(c => String(c.isRepay).toLowerCase() === 'true');
            let hasNo = lote.some(c => String(c.isRepay).toLowerCase() !== 'true');
            let htmlRepay = '';
            
            if (hasSi) {
                let isActive = activeRepay.includes('Sim') ? 'active' : '';
                htmlRepay += `<button type="button" class="btn-rafaga-toggle btn-repay-plus btn-neon-si ${isActive}" data-val="Sim">Clientes: Sim</button>`;
            }
            if (hasNo) {
                let isActive = activeRepay.includes('Não') ? 'active' : '';
                htmlRepay += `<button type="button" class="btn-rafaga-toggle btn-repay-plus btn-neon-no ${isActive}" data-val="Não">Clientes: Não</button>`;
            }
            contRepay.innerHTML = htmlRepay;
        }

        document.querySelectorAll('.btn-rafaga-toggle').forEach(btn => {
            btn.onclick = function() {
                this.classList.toggle('active');
                actualizarTablaLotes();
            };
        });
    };

    const renderizarPanelLotes = () => {
        inyectarEstilos();
        let panel = document.getElementById('panel-excel-rafaga');
        
        if (!panel) {
            panel = document.createElement('div');
            panel.id = 'panel-excel-rafaga';
            
            Object.assign(panel.style, {
                position: 'fixed', top: '10vh', left: '50%', transform: 'translateX(-50%)', 
                width: 'max-content', maxWidth: '96vw', height: 'auto', maxHeight: '80vh', 
                backgroundColor: '#0a0f18', color: '#e2e8f0', borderRadius: '12px', 
                zIndex: 2147483645, boxShadow: '0 15px 40px rgba(0,0,0,0.8)', 
                display: 'none', flexDirection: 'column', border: '1px solid #39ff14', 
                fontFamily: "'Courier New', Courier, monospace",
                
                userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none', msUserSelect: 'none'
            });

            blindarElemento(panel);

            const header = document.createElement('div');
            Object.assign(header.style, {
                padding: '12px 20px', borderBottom: '1px solid rgba(57, 255, 20, 0.3)', display: 'flex', 
                justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold', fontSize: '15px',
                cursor: 'grab', backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: '12px 12px 0 0'
            });
            
            const tokenDetectado = obtenerTokenAutomatico() || "";
            let clicsTitulo = 0;

            const isMacUI = navigator.userAgent.toUpperCase().indexOf('MAC OS') >= 0 || (navigator.userAgentData && navigator.userAgentData.platform === 'macOS');
            const atajoTexto = isMacUI ? '⌘+Shift+Z' : 'Ctrl+Shift+Z';

            header.innerHTML = `
                <div style="display:flex; align-items:center; gap:15px; padding-right: 30px; width: 100%;">
                    <span id="titulo-panel" style="cursor:pointer; white-space:nowrap; user-select:none; color:#39ff14; text-shadow: 0 0 5px #39ff14; font-weight:900; letter-spacing:1px;">[> BANCO DE DADOS]</span>
                    <div style="position:relative; flex-grow:1; max-content; max-width: 400px;">
                        <input type="text" id="input-token-api" value="${tokenDetectado}" readonly 
                               style="width: 100%; background: rgba(0,0,0,0.5); color: #39ff14; border: 1px solid #39ff14; border-radius: 4px; padding: 4px 8px; font-size: 11px; outline: none; font-family: 'Courier New', Courier, monospace; cursor: default; user-select: none;">
                        <div id="escudo-token" style="position:absolute; top:0; left:0; width:100%; height:100%; z-index:10; cursor:default;"></div>
                    </div>
                    <span style="font-size:11px; font-weight:bold; color:#9ca3af; background:rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); padding:2px 6px; border-radius:4px; user-select:none;">${atajoTexto}</span>
                </div>
                <button type="button" id="btn-cerrar-panel" style="background:none; border:none; color:#ef4444; cursor:pointer; font-size:24px; line-height:1; font-weight:bold; text-shadow: 0 0 5px rgba(239,68,68,0.5);">×</button>
            `;

            setTimeout(() => {
                const titulo = document.getElementById('titulo-panel');
                const inputToken = document.getElementById('input-token-api');
                const escudo = document.getElementById('escudo-token');

                if (titulo && inputToken) {
                    const bloquear = (e) => { e.preventDefault(); return false; };
                    inputToken.oncopy = bloquear; inputToken.oncut = bloquear; inputToken.oncontextmenu = bloquear;
                    inputToken.onkeydown = (e) => {
                        if ((e.ctrlKey || e.metaKey) && (e.keyCode === 67 || e.keyCode === 65 || e.keyCode === 88)) {
                            e.preventDefault(); return false;
                        }
                    };
                    titulo.onclick = () => {
                        clicsTitulo++;
                        if (clicsTitulo === 5) {
                            const pass = prompt("🔐 Acesso de Administrador para editar Token:");
                            if (pass === "1234") {
                                inputToken.readOnly = false;
                                inputToken.style.background = "rgba(10,15,30,0.9)";
                                inputToken.style.border = "1px solid #39ff14";
                                inputToken.style.cursor = "text";
                                inputToken.style.userSelect = "text";
                                if(escudo) escudo.style.display = "none"; 
                                mostrarAviso("EDIÇÃO PERMITIDA", "#39ff14", "success");
                            } else {
                                if (pass !== null) mostrarAviso("SENHA INCORRETA", "#ef4444", "error");
                                clicsTitulo = 0;
                            }
                        }
                    };
                }
            }, 100);
            
            let isDragging = false, offsetX, offsetY;
            
            header.onmousedown = (e) => {
                if (e.target.id === 'btn-cerrar-panel' || e.target.id === 'input-token-api') return;
                e.preventDefault(); 
                isDragging = true; 
                header.style.cursor = 'grabbing';
                
                const rect = panel.getBoundingClientRect(); 
                
                panel.style.transform = 'none'; 
                panel.style.left = rect.left + 'px';
                panel.style.top = rect.top + 'px';

                offsetX = e.clientX - rect.left; 
                offsetY = e.clientY - rect.top;
            };
            
            document.addEventListener('mousemove', (e) => {
                if (!isDragging) return;
                panel.style.left = (e.clientX - offsetX) + 'px'; 
                panel.style.top = (e.clientY - offsetY) + 'px';
            }, true);
            
            document.addEventListener('mouseup', () => { 
                isDragging = false; 
                header.style.cursor = 'grab'; 
            }, true);

            const toolbar = document.createElement('div');
            Object.assign(toolbar.style, {
                padding: '8px 20px', borderBottom: '1px solid rgba(57, 255, 20, 0.3)', backgroundColor: 'rgba(0,0,0,0.2)',
                display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap', position: 'relative' 
            });

            toolbar.innerHTML = `
                <button type="button" id="btn-mas-filtro" class="btn-rafaga btn-purple" style="font-size: 11px;">
                    [+] FILTROS AVANÇADOS
                </button>
                
                <div style="width: 1px; height: 20px; background: rgba(255,255,255,0.2); margin: 0 5px;"></div> 
                
                <div style="display:flex; align-items:center; background: rgba(0,0,0,0.4); padding: 4px 10px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.1);">
                    <label class="switch-mora" title="Muestra columnas extra (Link, DNI, Self)">
                        <input type="checkbox" id="check-modo-etc">
                        <span class="slider-mora"></span>
                    </label>
                    <span class="label-mora" id="text-modo-etc" style="margin-right:8px;">SEM ETC</span>
                    
                    <div style="width: 1px; height: 14px; background: rgba(255,255,255,0.2); margin: 0 8px;"></div>

                    <label class="switch-mora" title="Cambia qué datos se extraen de la ficha">
                        <input type="checkbox" id="check-modo-mora">
                        <span class="slider-mora"></span>
                    </label>
                    <span class="label-mora" id="text-modo-mora" style="margin-right:8px;">SEM MORA</span>
                    
                    <div style="width: 1px; height: 14px; background: rgba(255,255,255,0.2); margin: 0 8px;"></div>
                    <span title="Cuenta / Agente de los datos mostrados" style="font-size: 11px; font-weight: bold; color: #0ea5e9; display: flex; align-items: center; gap: 4px; white-space: normal; word-break: break-word; text-transform:uppercase;">
                        [USR] <span id="label-cuentas-extraidas">Vazio</span>
                    </span>
                </div>

                <div id="panel-filtro-plus" style="position: absolute; top: 100%; left: 20px; background: rgba(5, 10, 15, 0.98); border: 1px solid #d946ef; border-radius: 8px; padding: 15px; z-index: 3000; display: none; flex-direction: column; gap: 15px; min-width: 300px; max-width: 400px; box-shadow: 0 10px 30px rgba(217,70,239,0.3);">
                    <div style="display:flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(217,70,239,0.4); padding-bottom: 8px;">
                        <span style="font-weight: 900; color: #d946ef; font-size: 13px; text-transform:uppercase; text-shadow:0 0 5px rgba(217,70,239,0.5);">[🎛️] FILTROS MÚLTIPLOS</span>
                        <span id="btn-cerrar-plus" style="cursor:pointer; color: #ef4444; font-size: 18px; font-weight:bold;">×</span>
                    </div>
                    
                    <div>
                        <label style="font-size: 11px; color: #9ca3af; font-weight:bold; display:block; margin-bottom:5px; text-transform:uppercase;">Aplicativo (Multi):</label>
                        <div id="plus-apps-container" class="scroll-neon" style="display:flex; flex-wrap:wrap; gap:6px; max-height: 90px; overflow-y: auto; align-content: flex-start; padding-right: 4px;"></div>
                    </div>

                    <div>
                        <label style="font-size: 11px; color: #9ca3af; font-weight:bold; display:block; margin-bottom:5px; text-transform:uppercase;">Datas de Conexão (Multi):</label>
                        <div id="plus-fechas-container" class="scroll-neon" style="display:flex; flex-wrap:wrap; gap:6px; max-height: 120px; overflow-y: auto; align-content: flex-start; padding-right: 4px;"></div>
                    </div>

                    <div>
                        <label style="font-size: 11px; color: #9ca3af; font-weight:bold; display:block; margin-bottom:5px; text-transform:uppercase;">Dias de Atraso (Multi):</label>
                        <div id="plus-moras-container" class="scroll-neon" style="display:flex; flex-wrap:wrap; gap:6px; max-height: 120px; overflow-y: auto; align-content: flex-start; padding-right: 4px;"></div>
                    </div>

                    <div>
                        <label style="font-size: 11px; color: #9ca3af; font-weight:bold; display:block; margin-bottom:5px; text-transform:uppercase;">Estado (Multi):</label>
                        <div id="plus-repay-container" class="scroll-neon" style="display:flex; flex-wrap:wrap; gap:6px; max-height: 70px; overflow-y: auto; align-content: flex-start; padding-right: 4px;"></div>
                    </div>
                </div>
            `;
            
            setTimeout(() => {
                const btnMasFiltro = document.getElementById('btn-mas-filtro');
                const panelPlus = document.getElementById('panel-filtro-plus');
                
                if(btnMasFiltro && panelPlus) {
                    btnMasFiltro.onclick = (e) => {
                        e.stopPropagation();
                        if(panelPlus.style.display === 'none') {
                            panelPlus.style.display = 'flex';
                            actualizarPanelFiltroPlus(); 
                        } else {
                            panelPlus.style.display = 'none';
                        }
                    };
                    document.getElementById('btn-cerrar-plus').onclick = (e) => {
                        e.stopPropagation();
                        panelPlus.style.display = 'none';
                    };
                }
            }, 100);

            const tableContainer = document.createElement('div');
            tableContainer.id = 'tabla-container-rafaga';
            Object.assign(tableContainer.style, { padding: '0', overflow: 'auto', flexGrow: '1', minHeight: '100px', fontSize: '12px' });

            // 🔥 Crear contenedor para previsualizaciones (Tooltip) 🔥
            let tooltip = document.getElementById('rafaga-tooltip');
            if (!tooltip) {
                tooltip = document.createElement('div');
                tooltip.id = 'rafaga-tooltip';
                document.body.appendChild(tooltip);
            }

            // Lógica de detección del mouse
            tableContainer.addEventListener('mouseover', (e) => {
                const target = e.target;
                if (target.classList.contains('rafaga-hover-img') || target.classList.contains('rafaga-hover-text')) {
                    const url = target.getAttribute('data-url');
                    if (!url) return;
                    
                    tooltip.style.display = 'block';
                    
                    if (target.classList.contains('rafaga-hover-img')) {
                        let nombreArchivo = url.split('/').pop().split('?')[0];
                        if (nombreArchivo.length > 30) nombreArchivo = nombreArchivo.substring(0, 30) + '...';
                        
                        tooltip.innerHTML = `
                            <img src="${url}" alt="Carregando imagem...">
                            <div style="text-align:center; color:#9ca3af; font-size:10px; margin-top:4px;">[ARQUIVO: ${nombreArchivo}]</div>
                        `;
                    } else {
                        tooltip.innerHTML = `
                            <div style="color:#0ea5e9; font-weight:bold; margin-bottom:6px; border-bottom:1px solid rgba(14,165,233,0.3); padding-bottom:4px; text-shadow:0 0 5px rgba(14,165,233,0.5);">[LINK DE DOWNLOAD]:</div>
                            <div style="word-break: break-all; color:#e2e8f0; line-height:1.4;">${url}</div>
                        `;
                    }
                }
            });

            tableContainer.addEventListener('mousemove', (e) => {
                if (tooltip.style.display === 'block') {
                    // Posicionar cerca del cursor (offset de 15px)
                    let x = e.clientX + 15;
                    let y = e.clientY + 15;
                    
                    // Evitar que se salga de la pantalla (Derecha / Abajo)
                    if (x + 320 > window.innerWidth) x = e.clientX - 335;
                    if (y + 350 > window.innerHeight) y = e.clientY - tooltip.offsetHeight - 15;

                    tooltip.style.left = x + 'px';
                    tooltip.style.top = y + 'px';
                }
            });

            tableContainer.addEventListener('mouseout', (e) => {
                if (e.target.classList.contains('rafaga-hover-img') || e.target.classList.contains('rafaga-hover-text')) {
                    tooltip.style.display = 'none';
                    tooltip.innerHTML = ''; // Limpiar RAM visual
                }
            });

            const footer = document.createElement('div');
            Object.assign(footer.style, {
                padding: '12px 20px', borderTop: '1px solid rgba(57, 255, 20, 0.3)', display: 'flex', justifyContent: 'space-between',
                backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: '0 0 12px 12px', flexWrap: 'wrap', gap: '10px'
            });
            
            footer.innerHTML = `
                <div style="display:flex; align-items:center; gap:8px;">
                    <button type="button" id="btn-limpiar-lote" class="btn-rafaga btn-red" title="Limpar Base">🗑️ LIMPAR</button>
                    <button type="button" id="btn-extraer-todo" class="btn-rafaga btn-green">⚡ EXTRAIR TUDO ⚡</button>
                </div>
                <div style="display:flex; gap:10px;">
                    <button type="button" id="btn-copiar-correos" class="btn-rafaga btn-yellow">📧 E-MAILS</button>
                    <button type="button" id="btn-copiar-lote" class="btn-rafaga btn-blue">📋 COPIAR DADOS</button>
                </div>
            `;

            panel.appendChild(header); panel.appendChild(toolbar); panel.appendChild(tableContainer); panel.appendChild(footer);
            document.body.appendChild(panel);

            document.getElementById('btn-cerrar-panel').onclick = (e) => { 
                e.stopPropagation();
                togglePanelVisibility(false); 
            };

            const checkEtc = document.getElementById('check-modo-etc');
            const textEtc = document.getElementById('text-modo-etc');
            const isEtcActive = localStorage.getItem('RAFAGA_MODO_ETC') === 'true';

            checkEtc.checked = isEtcActive;
            textEtc.innerText = isEtcActive ? 'COM ETC' : 'SEM ETC';
            textEtc.style.color = isEtcActive ? '#d946ef' : '#9ca3af';

            checkEtc.onchange = (e) => {
                const checked = e.target.checked;
                localStorage.setItem('RAFAGA_MODO_ETC', checked);
                textEtc.innerText = checked ? 'COM ETC' : 'SEM ETC';
                textEtc.style.color = checked ? '#d946ef' : '#9ca3af';
                actualizarTablaLotes();
            };

            const checkMora = document.getElementById('check-modo-mora');
            const textMora = document.getElementById('text-modo-mora');
            const isMoraActive = localStorage.getItem('RAFAGA_MODO_MORA') === 'true';

            checkMora.checked = isMoraActive;
            textMora.innerText = isMoraActive ? 'COM MORA' : 'SEM MORA';
            textMora.style.color = isMoraActive ? '#39ff14' : '#9ca3af';

            checkMora.onchange = (e) => {
                const checked = e.target.checked;
                localStorage.setItem('RAFAGA_MODO_MORA', checked);
                textMora.innerText = checked ? 'COM MORA' : 'SEM MORA';
                textMora.style.color = checked ? '#39ff14' : '#9ca3af';
                actualizarTablaLotes();   
            };

            document.getElementById('btn-limpiar-lote').onclick = async (e) => {
                e.stopPropagation();
                const confirmado = await mostrarConfirmacionHTML(
                    '[!] LIMPAR BANCO DE DADOS', 
                    'Tem certeza de que deseja excluir <strong>todos os dados</strong> capturados?<br>Esta ação não pode ser desfeita.',
                    '[X] SIM, EXCLUIR TUDO',
                    '#ef4444' 
                );
                if(confirmado) {
                    localStorage.setItem('LOTE_RAFAGA', '[]');
                    actualizarPanelFiltroPlus();
                    actualizarTablaLotes();
                }
            };
            
            const btnExtraerTodo = document.getElementById('btn-extraer-todo');
            if (btnExtraerTodo) {
                btnExtraerTodo.onclick = async (e) => { 
                    e.preventDefault(); 
                    e.stopPropagation(); 
                    const confirmado = await mostrarConfirmacionHTML(
                        '[?] AVISO DO SISTEMA',
                        'Tem certeza de que está em uma <strong style="color:#39ff14;">conta</strong> gerenciada por agente?',
                        '[>] SIM, CONTINUAR',
                        '#39ff14' 
                    );
                    if(confirmado) {
                        iniciarExtraccionAPI(); 
                    }
                };
            }

             

            document.getElementById('btn-copiar-lote').onclick = (e) => {
                e.stopPropagation();
                let lote = obtenerLoteFiltrado();
                if (lote.length === 0) return mostrarAviso('SEM DADOS', '#f59e0b', 'warning');
                
                const isMoraActive = localStorage.getItem('RAFAGA_MODO_MORA') === 'true';
                const isEtcActive = localStorage.getItem('RAFAGA_MODO_ETC') === 'true';
                let filas = lote.map(c => {
                    let telLimpio = c.telefono ? String(c.telefono).replace('+', '') : '';
                    let dataFila = [ c.idPlan, telLimpio, c.nombre, c.app, c.correo, c.producto, c.monto, c.importeReinv ];
                    if (isMoraActive) {
                        dataFila.push(c.diasMora || '0', c.cargoMora || '0', c.montoPago || '0');
                    }
                    if (isEtcActive) {
                        // Transformamos DNI y SELF en etiquetas <img> si existen
                        let imgDni = c.dniUrl ? `<img src="${c.dniUrl}" style="max-width:200px;border:1px solid #ccc;" />` : '';
                        let imgSelf = c.selfUrl ? `<img src="${c.selfUrl}" style="max-width:200px;border:1px solid #ccc;" />` : '';
                        
                        dataFila.push(c.linkDescarga || '', imgDni, imgSelf);
                    }
                    dataFila.push(c.fechaConexion || ''); 
                    return dataFila.join('\t');
                });

                navigator.clipboard.writeText(filas.join('\n')).then(() => {
                    mostrarAviso(`${lote.length} CLIENTES ÚNICOS COPIADOS!`, '#0ea5e9', 'success');
                });
            };

            document.getElementById('btn-copiar-correos').onclick = (e) => {
                e.stopPropagation();
                let lote = obtenerLoteFiltrado(); 
                let correos = lote.map(c => c.correo).filter(c => c && c.trim() !== ''); 
                if (correos.length === 0) return mostrarAviso('SEM E-MAILS', '#f59e0b', 'warning');
                navigator.clipboard.writeText(correos.join('\n')).then(() => mostrarAviso(`${correos.length} E-MAILS COPIADOS!`, '#fbbf24', 'success'));
            };
        }
        
        panel.style.display = localStorage.getItem('PANEL_RAFAGA_VISIBLE') === 'true' ? 'flex' : 'none';
        actualizarPanelFiltroPlus();
        actualizarTablaLotes();
    };

    const actualizarTablaLotes = () => {
        const container = document.getElementById('tabla-container-rafaga');
        if (!container) return;

        let loteFiltrado = obtenerLoteFiltrado();

        const labelCuentas = document.getElementById('label-cuentas-extraidas');
        if (labelCuentas) {
            let cuentasUnicas = [...new Set(loteFiltrado.map(c => c.cuenta || 'Não Atribuído'))].filter(c => c !== 'Não Atribuído');
            let txtCuentas = cuentasUnicas.length > 0 ? cuentasUnicas.join(', ') : 'Vazio';
            labelCuentas.innerText = txtCuentas;
            labelCuentas.parentElement.title = "Agentes: " + txtCuentas;
        }

        if (loteFiltrado.length === 0) {
            container.innerHTML = '<div style="text-align:center; padding:40px; color:#9ca3af; font-size:13px; font-weight:bold; min-width: 600px; font-family: \'Courier New\', Courier, monospace; text-transform:uppercase;">[!] NÃO HÁ DADOS NA BASE OU CORRESPONDENTES AO FILTRO.</div>';
            const btnCopy = document.getElementById('btn-copiar-lote');
            if(btnCopy) btnCopy.innerText = `[C] COPIAR DADOS`;
            return;
        }

        const isMoraActive = localStorage.getItem('RAFAGA_MODO_MORA') === 'true';
        const isEtcActive = localStorage.getItem('RAFAGA_MODO_ETC') === 'true';
        const { strHoy, strAyer } = getFechasRelativas();

        let html = `
            <table style="width: max-content; min-width: 100%; text-align:left; border-collapse: collapse; white-space: nowrap;">
                <thead style="position: sticky; top: 0; background: #0a0f1e; box-shadow: 0 2px 10px rgba(0,0,0,0.8); z-index: 10;">
                    <tr style="border-bottom: 1px solid rgba(57, 255, 20, 0.3); color: #e2e8f0;">
                        <th style="padding:10px 15px;">ID PLAN</th>
                        <th style="padding:10px 15px;">TELEFONE</th>
                        <th style="padding:10px 15px;">NOME</th>
                        <th style="padding:10px 15px;">APP</th>
                        <th style="padding:10px 15px;">E-MAIL</th>
                        <th style="padding:10px 15px; color:#fbbf24;">PRODUTO</th>
                        <th style="padding:10px 15px;">DÍVIDA</th>
                        <th style="padding:10px 15px;">EXTENSÃO</th>
                        ${isMoraActive ? `
                        <th style="padding:10px 15px;">DIAS</th>
                        <th style="padding:10px 15px;">ENCARGO</th>
                        <th style="padding:10px 15px;">CONTRATO</th>
                        ` : ''}
                        ${isEtcActive ? `
                        <th style="padding:10px 15px; color:#0ea5e9;">LINK</th>
                        <th style="padding:10px 15px; color:#0ea5e9;">DNI</th>
                        <th style="padding:10px 15px; color:#0ea5e9;">SELF</th>
                        ` : ''}
                    </tr>
                </thead>
                <tbody>
        `;

        const cInfo = getCountryInfo();
        const prefLen = cInfo.prefix.replace('+', '').length;

        // 🛡️ FIX: Usamos array mapping para evitar que el navegador se congele al dibujar +1500 filas
        let filasHtml = loteFiltrado.map(c => {
            let colorFecha = '#9ca3af'; 
            
            // 🔥 Variables compactas exclusivas para visualización
            let telVisible = (c.telefono || '').length > prefLen ? c.telefono.substring(prefLen) : c.telefono;
            let nomVisible = (c.nombre || '').length > 22 ? c.nombre.substring(0, 22) + '...' : c.nombre; 
            
            let dateStyleExtra = '';
            if (c.fechaConexion === strHoy) {
                colorFecha = '#39ff14';
                dateStyleExtra = '';
            } else if (c.fechaConexion === strAyer) {
                colorFecha = '#ff6700'; 
                dateStyleExtra = '';
            }

            let correoLimpio = (c.correo || '').toLowerCase().trim();
            let esCorreoValido = DOMINIOS_PERMITIDOS.some(d => correoLimpio.endsWith(d));
            let claseCorreo = esCorreoValido ? 'correo-valido' : 'correo-alerta';
            let txtCorreo = c.correo && c.correo.trim() !== '' ? c.correo : 'SEM_EMAIL';

            let esRepay = String(c.isRepay).toLowerCase() === 'true';
            let txtRepay = esRepay ? 'SIM' : 'NÃO';
            let colorNeon = esRepay ? '#39ff14' : '#ef4444'; 
            let bgNeon = esRepay ? 'rgba(57, 255, 20, 0.1)' : 'rgba(239, 68, 68, 0.1)';
            
            let etiquetaRepay = `
                <div style="margin-top: 4px; user-select: none; pointer-events: none;">
                    <span style="font-size: 10px; font-weight: 800; padding: 2px 6px; border-radius: 4px; background: ${bgNeon}; color: ${colorNeon}; border: 1px solid ${colorNeon}; box-shadow: 0 0 6px rgba(${esRepay ? '57,255,20' : '239,68,68'}, 0.5); letter-spacing: 0.5px; user-select: none; -webkit-user-select: none; -moz-user-select: none;">
                        ${txtRepay}
                    </span>
                </div>
            `;

            html += `
                <tr class="fila-rafaga" style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                    <td class="idplan-celda" style="padding:8px 15px; color:#93c5fd; font-weight:bold; cursor:pointer;" title="Duplo clique para copiar ID">${c.idPlan}</td>
                    <td style="padding:8px 15px; color:#e2e8f0; cursor:help;" title="${c.telefono}">${telVisible}</td>
                    <td style="padding:8px 15px; line-height: 1.2; cursor:help;" title="${c.nombre}">
                        <div>${nomVisible}</div>
                        ${c.fechaConexion ? `<div style="font-size: 10px; color: ${colorFecha}; margin-top: 2px; font-weight: 900; ${dateStyleExtra}">> ${c.fechaConexion}</div>` : ''}
                    </td>
                    <td style="padding:8px 15px; color:#cbd5e1; font-weight:bold;">${c.app}</td>
                    
                    <td style="padding:8px 15px;">
                        <span class="correo-celda ${claseCorreo}" data-idplan="${c.idPlan}" title="Duplo clique para editar">${txtCorreo}</span>
                    </td>

                    <td style="padding:8px 15px; color:#fbbf24; line-height: 1.2;">
                        <div>${c.producto}</div>
                        ${etiquetaRepay}
                    </td>
                    <td style="padding:8px 15px; color:#39ff14; font-weight:bold;">${c.monto}</td>
                    <td style="padding:8px 15px; color:#ef4444;">${c.importeReinv}</td>
                    ${isMoraActive ? `
                    <td style="padding:8px 15px; color:#fbbf24;">${c.diasMora || '-'}</td>
                    <td style="padding:8px 15px; color:#ef4444;">${c.cargoMora || '-'}</td>
                    <td style="padding:8px 15px; color:#39ff14; font-weight:bold;">${c.montoPago || '-'}</td>
                    ` : ''}
                    ${isEtcActive ? `
                    <td class="link-celda" style="padding:8px 15px; color:#0ea5e9; cursor:pointer;" title="Duplo clique para copiar Link">
                        <span class="${c.linkDescarga ? 'celda-hover-info rafaga-hover-text' : ''}" data-url="${c.linkDescarga || ''}">${c.linkDescarga ? String(c.linkDescarga).substring(0,4) : '-'}</span>
                    </td>
                    <td style="padding:8px 15px; color:#0ea5e9; cursor:help;">
                        <span class="${c.dniUrl ? 'celda-hover-info rafaga-hover-img' : ''}" data-url="${c.dniUrl || ''}">${c.dniUrl ? String(c.dniUrl).substring(0,4) : '-'}</span>
                    </td>
                    <td style="padding:8px 15px; color:#0ea5e9; cursor:help;">
                        <span class="${c.selfUrl ? 'celda-hover-info rafaga-hover-img' : ''}" data-url="${c.selfUrl || ''}">${c.selfUrl ? String(c.selfUrl).substring(0,4) : '-'}</span>
                    </td>
                    ` : ''}
                </tr>
            `;
        });

        html += filasHtml.join('') + `</tbody></table>`;
        container.innerHTML = html;
        
        const btnCopy = document.getElementById('btn-copiar-lote');
        if(btnCopy) btnCopy.innerText = `[C] COPIAR DADOS (${loteFiltrado.length})`;

        // 🔥 Evento: Doble clic para copiar ID Plan al portapapeles 🔥
        container.querySelectorAll('.idplan-celda').forEach(celda => {
            celda.addEventListener('dblclick', function(e) {
                e.stopPropagation();
                const textoCopia = this.innerText.trim();
                navigator.clipboard.writeText(textoCopia).then(() => {
                    mostrarAviso(`ID ${textoCopia} COPIADO`, '#0ea5e9', 'info', 1500);
                }).catch(err => console.error("Erro ao copiar: ", err));
            });
        });

        // 🔥 Evento: Doble clic para copiar LINK al portapapeles 🔥
        container.querySelectorAll('.link-celda').forEach(celda => {
            celda.addEventListener('dblclick', function(e) {
                e.stopPropagation();
                const spanDato = this.querySelector('span');
                if (!spanDato) return;
                
                const urlCompleta = spanDato.getAttribute('data-url');
                if (urlCompleta && urlCompleta.trim() !== '') {
                    navigator.clipboard.writeText(urlCompleta).then(() => {
                        mostrarAviso(`LINK COPIADO`, '#0ea5e9', 'success', 1500);
                    }).catch(err => console.error("Erro ao copiar link: ", err));
                }
            });
        });

        container.querySelectorAll('.correo-celda').forEach(celda => {
            celda.addEventListener('dblclick', function(e) {
                e.stopPropagation();
                this.contentEditable = "true";
                this.classList.add("correo-editando");
                
                if (this.innerText.trim() === 'SEM_EMAIL') this.innerText = '';
                
                this.focus();
                document.execCommand('selectAll', false, null);
            });

            const finalizarEdicion = (e) => {
                if (e.type === 'blur' || (e.type === 'keydown' && e.key === 'Enter')) {
                    if (e.key === 'Enter') e.preventDefault();
                    
                    celda.contentEditable = "false";
                    celda.classList.remove("correo-editando");
                    
                    let nuevoCorreo = celda.innerText.trim();
                    if (nuevoCorreo === 'SEM_EMAIL') nuevoCorreo = '';

                    const esValido = DOMINIOS_PERMITIDOS.some(d => nuevoCorreo.toLowerCase().endsWith(d));
                    
                    if (!nuevoCorreo) {
                        celda.innerText = 'SEM_EMAIL';
                        celda.className = 'correo-celda correo-alerta';
                    } else {
                        celda.className = `correo-celda ${esValido ? 'correo-valido' : 'correo-alerta'}`;
                    }

                    const idPlan = celda.getAttribute('data-idplan');
                    let loteRaw = JSON.parse(localStorage.getItem('LOTE_RAFAGA') || '[]');
                    const index = loteRaw.findIndex(item => item.idPlan === idPlan);
                    
                    if (index !== -1 && loteRaw[index].correo !== nuevoCorreo) {
                        loteRaw[index].correo = nuevoCorreo; 
                        localStorage.setItem('LOTE_RAFAGA', JSON.stringify(loteRaw));
                    }
                }
            };

            celda.addEventListener('blur', finalizarEdicion);
            celda.addEventListener('keydown', finalizarEdicion);
        });
    }; 

    window.addEventListener('keydown', (e) => {
        const isMac = navigator.userAgent.toUpperCase().indexOf('MAC OS') >= 0 || (navigator.userAgentData && navigator.userAgentData.platform === 'macOS');
        const modifierKey = isMac ? e.metaKey : e.ctrlKey;
        if (modifierKey && e.shiftKey && e.code === 'KeyZ') {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation(); 
            togglePanelVisibility(); 
        }
    }, true); 

    window.addEventListener('storage', (e) => {
        if (e.key === 'LOTE_RAFAGA') {
            actualizarPanelFiltroPlus();
            actualizarTablaLotes(); 
        }
        if (e.key === 'PANEL_RAFAGA_VISIBLE') {
            const panel = document.getElementById('panel-excel-rafaga');
            if (panel) panel.style.display = e.newValue === 'true' ? 'flex' : 'none';
        }
    });

    new MutationObserver(() => {
        if (location.href !== lastUrl) {
            lastUrl = location.href;
            const isDetail2 = location.href.includes('/detail2');
            const isDetail3 = location.href.includes('/detail3');
            
            if (isDetail2 || isDetail3) {
                const nuevoEstado = isDetail3 ? 'true' : 'false';
                localStorage.setItem('RAFAGA_MODO_MORA', nuevoEstado);
                
                const checkMora = document.getElementById('check-modo-mora');
                const textMora = document.getElementById('text-modo-mora');
                if (checkMora && textMora) {
                    checkMora.checked = (nuevoEstado === 'true');
                    textMora.innerText = checkMora.checked ? 'COM MORA' : 'SEM MORA';
                    textMora.style.color = checkMora.checked ? '#39ff14' : '#9ca3af';
                    actualizarTablaLotes();
                }
            }
        }
    }).observe(document, { subtree: true, childList: true });
    let lastUrl = location.href;

    (async () => {
        // 🔥 MODIFICADO: Ahora el panel inicia OCULTO ('false') por defecto la primera vez
        if (localStorage.getItem('PANEL_RAFAGA_VISIBLE') === null) localStorage.setItem('PANEL_RAFAGA_VISIBLE', 'false');
        if (localStorage.getItem('RAFAGA_MODO_ETC') === null) localStorage.setItem('RAFAGA_MODO_ETC', 'true');
        
        let estadoInicialMora = 'false'; 
        if (window.location.href.includes('/detail3')) estadoInicialMora = 'true';
        else if (window.location.href.includes('/detail2')) estadoInicialMora = 'false';
        else if (localStorage.getItem('RAFAGA_MODO_MORA') !== null) estadoInicialMora = localStorage.getItem('RAFAGA_MODO_MORA');
        
        localStorage.setItem('RAFAGA_MODO_MORA', estadoInicialMora);
        renderizarPanelLotes();
    })();

})();