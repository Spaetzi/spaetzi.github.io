// Scripts spécifiques aux pages secondaires
document.addEventListener('DOMContentLoaded', function() {
    // Ajustement spécifique de l'espacement pour les pages légales
    function adjustLegalSpacing() {
        const footerHeight = document.querySelector('footer').offsetHeight;
        const socialHeight = document.querySelector('.social-links').offsetHeight;
        const legalContainer = document.querySelector('.legal-container');
        
        document.body.style.paddingBottom = footerHeight + socialHeight + 'px';
        document.querySelector('.social-links').style.bottom = footerHeight + 'px';
        
        // Ajustement supplémentaire pour le conteneur légal
        if (legalContainer) {
            const windowHeight = window.innerHeight;
            const headerHeight = document.getElementById('headerBanner').offsetHeight;
            const contentHeight = legalContainer.offsetHeight;
            
            if (contentHeight > (windowHeight - headerHeight - footerHeight - socialHeight - 100)) {
                legalContainer.style.marginBottom = '6rem';
            }
        }
    }

    // Initialisation
    adjustLegalSpacing();
    window.addEventListener('resize', adjustLegalSpacing);
});