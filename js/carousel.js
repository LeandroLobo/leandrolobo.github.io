document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const nextButton = document.querySelector('.carousel-btn.next');
    const prevButton = document.querySelector('.carousel-btn.prev');
    
    if (!track || !nextButton || !prevButton) return;

    let currentIndex = 0;
    const cards = document.querySelectorAll('.project-card');
    const cardCount = cards.length;
    
    // Configuration
    const gap = 32; // 2rem gap defined in CSS
    
    function getCardsPerView() {
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
    }

    function updateCarousel() {
        const cardsPerView = getCardsPerView();
        const cardWidth = cards[0].offsetWidth;
        const moveAmount = (cardWidth + gap) * currentIndex;
        
        track.style.transform = `translateX(-${moveAmount}px)`;
        
        // Update button states
        prevButton.disabled = currentIndex === 0;
        prevButton.style.opacity = currentIndex === 0 ? '0.5' : '1';
        prevButton.style.cursor = currentIndex === 0 ? 'default' : 'pointer';

        const maxIndex = cardCount - cardsPerView;
        nextButton.disabled = currentIndex >= maxIndex;
        nextButton.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
        nextButton.style.cursor = currentIndex >= maxIndex ? 'default' : 'pointer';
    }

    nextButton.addEventListener('click', () => {
        const cardsPerView = getCardsPerView();
        if (currentIndex < cardCount - cardsPerView) {
            currentIndex++;
            updateCarousel();
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    // Handle resize
    window.addEventListener('resize', () => {
        // Reset to 0 on resize to avoid layout bugs, or recalculate bounds
        currentIndex = 0;
        updateCarousel();
    });

    // Initial call
    updateCarousel();
});
