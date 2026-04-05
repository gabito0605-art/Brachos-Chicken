// Archivo: EON.js (Publicidad Independiente para Bracho's Chicken)

(function() {
    // 1. Configuración de imágenes 
    const imagenesBanners = ['./dphg1.gif', './dphg2.gif', './dph3.gif', ];
    const imagenesContenido = ['./dp.gif', './dp2.gif', './dp3.gif'];

    // --- FUNCIÓN BANNER FIJO ---
    function gestionarBannerFijo() {
        const container = document.getElementById('banner-container');
        const img = document.getElementById('banner-img');
        const closeBtn = document.getElementById('close-banner');

        if (container && img) {
            // Probabilidad del 80%
            if (Math.random() <= 0.8) {
                const randomIndex = Math.floor(Math.random() * imagenesBanners.length);
                img.src = imagenesBanners[randomIndex];
                container.style.display = 'block';
                container.style.opacity = "1"; // Aseguramos opacidad inicial
            }

            if (closeBtn) {
                closeBtn.onclick = (e) => {
                    e.preventDefault();
                    container.style.display = 'none';
                };
            }
        }
    }

    // --- FUNCIÓN BANNER ESTÁTICO ---
    function gestionarBannerContenido() {
        const container = document.getElementById('p-container');
        const img = document.getElementById('p-img');
        const closeBtn = document.getElementById('close-p');

        if (container && img) {
            // Probabilidad del 78%
            if (Math.random() <= 0.78) {
                const randomIndex = Math.floor(Math.random() * imagenesContenido.length);
                img.src = imagenesContenido[randomIndex];
                // Usamos inline-block para que la X no se salga si el div es muy ancho
                container.style.display = 'inline-block'; 
            }

            if (closeBtn) {
                closeBtn.onclick = (e) => {
                    e.preventDefault();
                    container.style.display = 'none';
                };
            }
        }
    }

    // --- LÓGICA DE SCROLL (Banner Fijo) ---
    let scrollActivado = false;
    window.addEventListener('scroll', () => {
        const container = document.getElementById('banner-container');
        // Si el banner está visible y aún no hemos activado el desvanecimiento
        if (container && container.style.display === 'block' && !scrollActivado) {
            scrollActivado = true;
            
            // Espera 2.3 segundos después del primer scroll para empezar a desvanecer
            setTimeout(() => {
                container.style.transition = "opacity 2s ease";
                container.style.opacity = "0";
                
                // Después de la transición (3.1s), lo ocultamos del todo
                setTimeout(() => { 
                    container.style.display = 'none'; 
                }, 3100);
            }, 2300);
        }
    });

    // --- INICIALIZACIÓN ---
    const cargarPublicidad = () => {
        console.log("EON.js: Intentando cargar banners...");
        gestionarBannerFijo();
        gestionarBannerContenido();
    };

    // Ejecución segura según el estado del documento
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', cargarPublicidad);
    } else {
        cargarPublicidad();
    }

})();