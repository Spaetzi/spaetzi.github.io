// Gestion du bandeau d'annonce
document.addEventListener('DOMContentLoaded', function() {
    // ... votre code existant ...

    // Vérifier si l'utilisateur a déjà fermé le bandeau
    if (!localStorage.getItem('announcementClosed')) {
        const announcementBanner = document.getElementById('announcementBanner');
        announcementBanner.style.display = 'flex';
        
        // Ajuster le padding-top du body
        const announcementHeight = announcementBanner.offsetHeight;
        document.body.style.paddingTop = (180 + announcementHeight) + 'px';
        
        // Gestion du mode réduit
        const header = document.getElementById('headerBanner');
        if (header.classList.contains('shrink')) {
            document.body.classList.add('shrink-header');
        }
    }

    // Fermer le bandeau
    const closeButton = document.getElementById('closeAnnouncement');
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            const announcementBanner = document.getElementById('announcementBanner');
            announcementBanner.style.display = 'none';
            localStorage.setItem('announcementClosed', 'true');
            
            // Réajuster le padding-top du body
            document.body.style.paddingTop = '180px';
            
            // Si en mode réduit
            const header = document.getElementById('headerBanner');
            if (header.classList.contains('shrink')) {
                document.body.style.paddingTop = '130px';
            }
        });
    }
});

// Gestion des ancres légales
document.addEventListener('DOMContentLoaded', function() {
    // Ajustement automatique de l'espacement
    function adjustSpacing() {
        const footerHeight = document.querySelector('footer').offsetHeight;
        document.body.style.paddingBottom = footerHeight + 'px';
        // Supprimez la ligne qui positionne .social-links
    }

    // Effet de rétrécissement du header au scroll
    window.addEventListener('scroll', function() {
        const header = document.getElementById('headerBanner');
        const scrollPosition = window.scrollY || window.pageYOffset;
        
        if (scrollPosition > 50) {
            header.classList.add('shrink');
            document.body.classList.add('shrink-header');
        } else {
            header.classList.remove('shrink');
            document.body.classList.remove('shrink-header');
        }
    });

    // Initialisation
    adjustSpacing();
    window.dispatchEvent(new Event('scroll'));
    window.addEventListener('resize', adjustSpacing);
});

document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    hamburgerBtn.addEventListener('click', function() {
        // Basculer l'état du menu
        mobileMenu.classList.toggle('active');
        // Animation hamburger
        this.classList.toggle('active');
    });
    
    // Fermer le menu quand on clique à l'extérieur
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.header-banner') && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            hamburgerBtn.classList.remove('active');
        }
    });
});
