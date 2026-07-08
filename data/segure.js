 (function() {
            const threshold = 160; 
        
            const redirectToSafePage = () => {
            window.location.href = "https://pagina-segura.com"; 
            };
        
            const checkDevTools = () => {
            const widthDiff = window.outerWidth - window.innerWidth;
            const heightDiff = window.outerHeight - window.innerHeight;
            
            
            if (widthDiff > threshold || heightDiff > threshold) {
                redirectToSafePage();
            }
            };
        
            window.addEventListener("resize", checkDevTools);
            checkDevTools();
        })();
        
        // Função para entrar em tela cheia
        function entrarEmTelaCheia() {
            const elemento = document.documentElement; // Seleciona o elemento 'html'

            if (elemento.requestFullscreen) {
                elemento.requestFullscreen(); // Para navegadores modernos
            } else if (elemento.mozRequestFullScreen) {
                elemento.mozRequestFullScreen(); // Firefox
            } else if (elemento.webkitRequestFullscreen) {
                elemento.webkitRequestFullscreen(); // Chrome, Safari e Opera
            } else if (elemento.msRequestFullscreen) {
                elemento.msRequestFullscreen(); // IE/Edge
            }
        }

        // Detecta se está em um dispositivo móvel (largura da tela menor que 768px)
        if (window.innerWidth <= 768) {
            window.onload = function() {
                entrarEmTelaCheia(); // Ativa a tela cheia em dispositivos móveis
            }
        }

    



        

        document.addEventListener('keydown', function (e) {
            
            if (e.key === 'F12') {
                e.preventDefault();
            }
        
            if (e.ctrlKey && e.shiftKey && e.key === 'I') {
                e.preventDefault();    
            }
        
            if (e.ctrlKey && e.key === 'u') {
                e.preventDefault();
            }
            });
        
        
            document.addEventListener('contextmenu', function (e) {
            e.preventDefault();
        });

        if (typeof window !== 'undefined') {
            window.addEventListener('contextmenu', (e) => e.preventDefault());
        }
              