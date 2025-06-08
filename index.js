// Initialize Particles.js
document.addEventListener('DOMContentLoaded', function() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('starfield', {
            "particles": {
                "number": {
                    "value": 200,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 2,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": false
                },
                "move": {
                    "enable": true,
                    "speed": 1,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "bubble"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "bubble": {
                        "distance": 100,
                        "size": 6,
                        "duration": 2,
                        "opacity": 0.8,
                        "speed": 3
                    },
                    "push": {
                        "particles_nb": 4
                    }
                }
            },
            "retina_detect": true
        });
    }

    // Initialize GSAP animations
    gsap.from(".logo", {
        duration: 1.5,
        y: -50,
        opacity: 0,
        ease: "back.out(1.7)"
    });

    gsap.from(".search-container", {
        duration: 1,
        y: 50,
        opacity: 0,
        delay: 0.5,
        ease: "power2.out"
    });

    // Sample hotel data
    const sampleHotels = [
        {
            id: 1,
            name: "Orion Space Resort",
            location: "Alpha Centauri",
            description: "Experience zero-gravity luxury in our orbital suite with panoramic views of the Milky Way.",
            price: 1200,
            rating: 4.9,
            image: "https://source.unsplash.com/random/600x400/?luxury-hotel,space"
        },
        {
            id: 2,
            name: "Neptune Underwater Dome",
            location: "Neptune's Ocean",
            description: "Sleep beneath the waves of Neptune's exotic oceans in our pressurized transparent domes.",
            price: 2500,
            rating: 4.8,
            image: "https://source.unsplash.com/random/600x400/?underwater,hotel"
        },
        {
            id: 3,
            name: "Lunar Grand Hotel",
            location: "Moon Base Alpha",
            description: "Earth's moon offers spectacular views of our home planet from your private lunar terrace.",
            price: 800,
            rating: 4.7,
            image: "https://source.unsplash.com/random/600x400/?moon,hotel"
        },
        {
            id: 4,
            name: "Mars Red Dunes Resort",
            location: "Olympus Mons, Mars",
            description: "The tallest volcano in the solar system is your backdrop at this luxury Martian retreat.",
            price: 1500,
            rating: 4.9,
            image: "https://source.unsplash.com/random/600x400/?mars,hotel"
        },
        {
            id: 5,
            name: "Venus Cloud City",
            location: "Upper Atmosphere, Venus",
            description: "Float among the sulfuric acid clouds in our anti-gravity floating suites.",
            price: 3000,
            rating: 5.0,
            image: "https://source.unsplash.com/random/600x400/?clouds,hotel"
        },
        {
            id: 6,
            name: "Jupiter Sky Lounge",
            location: "Great Red Spot, Jupiter",
            description: "Witness the solar system's largest storm from the safety of our reinforced observation decks.",
            price: 5000,
            rating: 4.8,
            image: "https://source.unsplash.com/random/600x400/?jupiter,hotel"
        }
    ];

    // Render sample hotels
    renderHotels(sampleHotels);

    // Modal functionality
    const bookingModal = document.getElementById('booking-modal');
    const modalClose = document.querySelector('.modal-close');
    const bookButtons = document.querySelectorAll('.book-btn');

    // Sample booking functionality
    bookButtons.forEach(button => {
        button.addEventListener('click', function() {
            const hotelId = this.getAttribute('data-hotel-id');
            const hotel = sampleHotels.find(h => h.id == hotelId);
            openBookingModal(hotel);
        });
    });

    modalClose.addEventListener('click', closeBookingModal);

    // Close modal when clicking outside
    bookingModal.addEventListener('click', function(e) {
        if (e.target === bookingModal) {
            closeBookingModal();
        }
    });

    // Payment method selection
    const paymentMethods = document.querySelectorAll('.payment-method');
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            paymentMethods.forEach(m => m.classList.remove('active'));
            this.classList.add('active');
            updatePaymentForm(this.getAttribute('data-method'));
        });
    });

    // Search functionality
    const searchBtn = document.getElementById('search-btn');
    searchBtn.addEventListener('click', function() {
        const destination = document.getElementById('destination').value;
        const checkIn = document.getElementById('check-in').value;
        const checkOut = document.getElementById('check-out').value;
        const guests = document.getElementById('guests').value;

        // In a real app, this would fetch from an API
        // For demo, we'll just filter our sample data
        const filteredHotels = sampleHotels.filter(hotel => {
            return (!destination || hotel.location.toLowerCase().includes(destination.toLowerCase())) &&
                   (!checkIn || !checkOut || true) && // Skip date validation for demo
                   (!guests || true); // Skip guest validation for demo
        });

        renderHotels(filteredHotels);
        
        // Animate the results
        gsap.from(".hotel-card", {
            duration: 0.8,
            y: 50,
            opacity: 0,
            stagger: 0.1,
            ease: "power2.out"
        });
    });

    // Login/Register buttons (demo functionality)
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document