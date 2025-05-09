// Scripts spécifiques aux pages secondaires
document.addEventListener('DOMContentLoaded', function() {
    // ==========================================
    // GÉNÉRAL
    // ==========================================
    
    // Ajustement spécifique de l'espacement pour les pages légales
    function adjustLegalSpacing() {
        const footer = document.querySelector('footer');
        const socialLinks = document.querySelector('.social-links');
        const legalContainer = document.querySelector('.legal-container');
        
        if (footer && socialLinks) {
            const footerHeight = footer.offsetHeight;
            const socialHeight = socialLinks.offsetHeight;
            
            document.body.style.paddingBottom = footerHeight + socialHeight + 'px';
            socialLinks.style.bottom = footerHeight + 'px';
        }
        
        // Ajustement supplémentaire pour le conteneur légal
        if (legalContainer) {
            const windowHeight = window.innerHeight;
            const headerHeight = document.getElementById('headerBanner').offsetHeight;
            const footerHeight = document.querySelector('footer').offsetHeight;
            const socialHeight = document.querySelector('.social-links').offsetHeight;
            const contentHeight = legalContainer.offsetHeight;
            
            if (contentHeight > (windowHeight - headerHeight - footerHeight - socialHeight - 100)) {
                legalContainer.style.marginBottom = '6rem';
            }
        }
    }

    // ==========================================
    // PAGE ACTUS
    // ==========================================
    
    function initActusPage() {
        // Gestion des cartes d'actualités
        const articleCards = document.querySelectorAll('.article-card');
        
        if (articleCards.length > 0) {
            // 1. Préchargement des images
            articleCards.forEach(card => {
                const imgDiv = card.querySelector('.card-image');
                if (imgDiv) {
                    const imgUrl = imgDiv.style.backgroundImage
                        .replace('url("', '')
                        .replace('")', '');
                    
                    // Préchargement
                    const img = new Image();
                    img.src = imgUrl;
                }
            });
            
            // 2. Effet de parallaxe au survol (desktop seulement)
            if (window.innerWidth > 768) {
                articleCards.forEach(card => {
                    card.addEventListener('mousemove', function(e) {
                        const img = this.querySelector('.card-image');
                        if (!img) return;
                        
                        const rect = this.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        const centerX = this.offsetWidth / 2;
                        const centerY = this.offsetHeight / 2;
                        const posX = centerX - x;
                        const posY = centerY - y;
                        
                        img.style.transform = `scale(1.05) translate(${posX/20}px, ${posY/20}px)`;
                    });
                    
                    card.addEventListener('mouseleave', function() {
                        const img = this.querySelector('.card-image');
                        if (img) {
                            img.style.transform = 'scale(1.05)';
                        }
                    });
                });
            }
            
            // 3. Gestion du clic sur les cartes
            articleCards.forEach(card => {
                card.addEventListener('click', function(e) {
                    if (this.getAttribute('href').startsWith('#')) {
                        e.preventDefault();
                        const targetId = this.getAttribute('href').substring(1);
                        
                        // Masquer toutes les sections
                        document.querySelectorAll('.legal-container').forEach(section => {
                            section.style.display = 'none';
                        });
                        
                        // Afficher la section cible
                        const targetSection = document.getElementById(targetId);
                        if (targetSection) {
                            targetSection.style.display = 'block';
                            targetSection.scrollIntoView({ behavior: 'smooth' });
                        }
                    }
                });
            });
        }
    }

    // ==========================================
    // INITIALISATION
    // ==========================================
    
    // Initialisation des fonctions
    adjustLegalSpacing();
    initActusPage();
    
    // Ré-exécution lors du redimensionnement
    window.addEventListener('resize', function() {
        adjustLegalSpacing();
        
        // Réinitialiser les effets de parallaxe si on passe en mode mobile
        if (window.innerWidth <= 768) {
            document.querySelectorAll('.card-image').forEach(img => {
                img.style.transform = 'scale(1)';
            });
        }
    });
});
