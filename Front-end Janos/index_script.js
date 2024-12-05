// Menu Toggle for Mobile Navigation
document.addEventListener("DOMContentLoaded", () => {

    // Function to handle scroll-based animations
    function handleScrollAnimations() {
        const imageBoxes = document.querySelectorAll('.image-box');
        const textBoxes = document.querySelectorAll('.text-box');
        const lineBars = document.querySelectorAll('.line-bar');
        const windowHeight = window.innerHeight;

        imageBoxes.forEach((imageBox, index) => {
            const imageBoxPosition = imageBox.getBoundingClientRect().top;
            const textBoxPosition = textBoxes[index].getBoundingClientRect().top;
            const lineBar = lineBars[index];

            if (imageBoxPosition < windowHeight - 100) {
                imageBox.classList.add('sticky');
                lineBar.classList.add('sticky');
            }

            if (textBoxPosition < windowHeight - 100) {
                textBoxes[index].classList.add('sticky');
            }
        });
    }

    // Trigger animations on scroll
    window.addEventListener('scroll', handleScrollAnimations);

    // Trigger animations on page load
    document.addEventListener('DOMContentLoaded', handleScrollAnimations);


    //Intersection Observer for Animations on Scroll
    const sections = [
        {
            header: document.getElementById('services-header-1'),
            lineLeft: document.getElementById('line-left-1'),
            lineRight: document.getElementById('line-right-1')
        },
        {
            header: document.getElementById('services-header-2'),
            lineLeft: document.getElementById('line-left-2'),
            lineRight: document.getElementById('line-right-2')
        },
        {
            header: document.getElementById('services-header-3'),
            lineLeft: document.getElementById('line-left-3'),
            lineRight: document.getElementById('line-right-3')
        }
    ];

    sections.forEach(section => {
        if (!section.header || !section.lineLeft || !section.lineRight) {
            console.error("Missing elements in one of the sections.");
            return;
        }

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    section.lineLeft.classList.add('animate-line-left');
                    section.lineRight.classList.add('animate-line-right');
                    obs.disconnect(); // Trigger animation once
                }
            });
        }, { threshold: 0.5 });

        observer.observe(section.header);
    });

    // Function to animate elements when visible
    window.addEventListener("DOMContentLoaded", () => {
        const textBlocks = document.querySelectorAll(".text-block");
    
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const block = entry.target;
    
                    // Apply the 'visible' class to animate
                    block.classList.add("visible");
    
                    // Stop observing after the animation is applied
                    observer.unobserve(block);
                }
            });
        }, { 
            threshold: 0.5 // Trigger when 50% of the element is visible
        });
    
        // Observe all text blocks
        textBlocks.forEach(block => observer.observe(block));
    });
    





    const animatedSection = document.getElementById("animated-section");
    if (animatedSection) {
        const observer = new IntersectionObserver(animateVisible, { threshold: 0.1 });
        observer.observe(animatedSection);
    }

    // Slider Functionality
    let currentIndex = 0;
    let slidesToShow = getSlidesToShow(); 
    const originalSlideCount = 24;
    const slider = document.getElementById('slider');
    const autoSlideDelay = 1000;
    let autoSlideInterval, userInteractionTimeout;


    function getSlidesToShow() {
        if (window.innerWidth <= 765) return 1; // Mobile view
        if (window.innerWidth <= 768) return 2; // Tablet view
        return 3; // Default: PC view
    }

    function updateSlidePosition() {
        const offset = -(currentIndex * 100) / slidesToShow;
        slider.style.transform = `translateX(${offset}%)`;
    }

    function nextSlide() {
        resetAutoSlide();
        currentIndex++;
        updateSlidePosition();

        if (currentIndex === originalSlideCount) {
            setTimeout(() => {
                slider.style.transition = 'none';
                currentIndex = 0;
                updateSlidePosition();
                setTimeout(() => slider.style.transition = 'transform 0.5s ease', 50);
            }, 500);
        }
    }

    function prevSlide() {
        resetAutoSlide();
        if (currentIndex === 0) {
            slider.style.transition = 'none';
            currentIndex = originalSlideCount;
            updateSlidePosition();
            setTimeout(() => {
                slider.style.transition = 'transform 0.5s ease';
                currentIndex--;
                updateSlidePosition();
            }, 50);
        } else {
            currentIndex--;
            updateSlidePosition();
        }
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, autoSlideDelay);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        clearTimeout(userInteractionTimeout);
        userInteractionTimeout = setTimeout(startAutoSlide, 3000); // Restart auto-slide after 3 seconds
    }

    // Attach functions to window object to make them accessible via inline onclick
    window.nextSlide = nextSlide;
    window.prevSlide = prevSlide;

    // Start auto-slide on page load
    startAutoSlide();


});
