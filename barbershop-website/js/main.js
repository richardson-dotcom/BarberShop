// DOM Elements
const yearEl = document.getElementById("year");
const mobileMenu = document.getElementById("mobileMenu");

const menuBtn = document.getElementById("menuBtn");
const ctaBtn = document.getElementById("ctaBtn");
const callBtn = document.getElementById("callBtn");

const phoneLink = document.getElementById("phoneLink");

const heading = document.getElementById("heroHeading");

const featureGrid = document.getElementById("featureGrid");

const nav = document.getElementById("nav");

// Modal Elements
const serviceModal = document.getElementById("serviceModal");
const serviceModalOverlay = document.getElementById("serviceModalOverlay");
const serviceModalClose = document.getElementById("serviceModalClose");
const serviceModalTitle = document.getElementById("serviceModalTitle");
const serviceModalPrice = document.getElementById("serviceModalPrice");
const serviceModalList = document.getElementById("serviceModalList");



// Functions
// Updating Footer Year
const setCurrentYear = () => {
    const now = new Date();
    yearEl.textContent = now.getFullYear();
};
setCurrentYear();

// Navlinks
const navLinks = [
    {
        label: "Home",
        href: "#hero"
    },
    {
        label: "Services",
        href: "#features"
    },
    {
        label: "Book",
        href: "#cta"
    },
    {
        label: "Contact",
        href: "#footer"
    }
];

// Function that renders links to nav tag and mobileNav tag
const renderNavigation = () => {

    try{
    // desktop Nav
    if (!nav) {
        throw new Error("Navigation Element is missing");
    }

    if (!mobileMenu) {
        throw new Error("Mobile Menu is missing");
    }

    if(nav) {
        const navHTML = navLinks.map(link => {
            return `<a href="${link.href}" class="nav-link">${link.label}</a>`;
        }).join("");
        nav.innerHTML = navHTML;
    };

    // mobile Nav
    if(mobileMenu) {
        const mobileHTML = navLinks.map(link => {
            return `<a href="${link.href}" class="mobile-link">${link.label}</a>`;
        }).join("");
        mobileMenu.innerHTML = mobileHTML;
    };
    } catch (error) {
        console.log(error);
        if(mobileMenu){
            mobileMenu.innerHTML = `<p>Navigation could not be loaded </p>`
        }
    }
}
renderNavigation();


// Services (An array of objects)
const services =  [
    {
        id: 1,
        title:"Classic Haircuts", 
        description: "Timeless Cuts w/ Modern Precision-Tailoring to your style", 
        image: "assets/images/feature-1.jpg",
        alt: "Classic Haircut",
        price: 25,
        popular: true,
        details: [
            "Consultation with your barber before the cut begins.",
            "Hair sectioning and shape-up based on your preferred stye",
            "Professional clippers, trimmers, and shears used for precision",
            "Neckline cleanup and finishing touches included",
            "Light styling product applied for a clean final look"
        ]
    },
    {
        id: 2,
        title: "Beard Trims", 
        description: "Shape, Line-up, and Refine your beard", 
        image: "assets/images/feature-2.jpg",
        alt: "Bread Trim",
        price: 15,
        popular: true,
        details: [
            "Beard assessment and shaping based on face structure",
            "Line-Up around cheeks, jawline, and neckline",
            "Conditioning beard product may be applied for softness",
            "Final symmetry check for a polished finish"
        ]
    },
    {
        id: 3,
        title:"Straight Razor Shave", 
        description: "Hot Towel, Smooth Shave, and classic barbershop experience", 
        image: "assets/images/feature-3.jpg",
        alt: "Straight Razor Shave",
        price: 30,
        popular: true,
        details: [
            "Hot towel prep to soften facial hair and open pores",
            "Premium shaving cream or lather applied to protect the skin",
            "Straight razor shave performed with careful detailing",
            "Second hot towel may be used for comfort and cleanup",
            "Aftershave or soothing skin product applied after shave"
        ]
    },
    {
        id: 4,
        title: "Fade & Style",
        description: "A clean fade with finishing detail for a sharp, modern look",
        image: "assets/images/feature-2.jpg",
        alt: "Fade Haircut",
        price: 35,
        popular: false,
        details: [
            "Style consultation before clipper work begins",
            "Fade blended to your preferred level and finish",
            "Detailing around temples, neckline, and beard area if needed",
            "Scissors and clipper-over-comb may be used for texture",
            "Styling product added to complete the final look"
        ]
    },
    {
        id: 5,
        title: "Kids Cut",
        description: "Clean, comfortable haircut service for younger clients",
        image: "assets/images/feature-1.jpg",
        alt: "Kids haircut",
        price: 20,
        popular: false,
        details: [
            "Simple consultation with child and parent if needed",
            "Age-appropriate haircut with comfort in mind",
            "Careful clipper and scissor work for a clean finish",
            "Light cleanup around the neckline and ears",
            "Styled neatly before leaving the chair"
        ]
    },
    {
        id: 6,
        title: "Head Shave",
        description: "Smooth head shave with classic barbershop treatment",
        image: "assets/images/feature-3.jpg",
        alt: "Head Shave",
        price: 28,
        popular: true,
        details: [
            "Scalp prep with warm towel treatment",
            "Protective shave product applied before razor work",
            "Close shave performed for a smooth finish",
            "Scalp cleaned and checked for even consistency",
            "Moisturizing scalp product applied after the shave"
        ]
    }
];

// Function that renders our features to the features grid (using map() method)
const renderFeatures = () => {
    
    if(!featureGrid) {return};

    const cardsHTML = services.map((service) => {
        let badgeHTML = "";

        if(service.popular) {
            badgeHTML = `<p class="service-badge">Popular Choice</p>`
        } else {
            badgeHTML = `<p class="service-badge alt-badge">Barber Favorite</p>`
        }

        return `
            <article class="feature-card">
                <img
                    src="${service.image}"
                    alt="${service.alt}"
                    class="feature-img"
                />

                <h3 class="feature-title">${service.title}</h3>
                <p class="feature-text">${service.description}</p>

                ${badgeHTML}

                <p class="service-price"${service.price}</p>
                <div class="service-actions">
                    <button
                        class="service-details-btn"
                        type="button"
                        data-service-id="${service.id}"
                    >
                        View Details
                    </button>
                </div>
            </article>
        `;

    }).join(""); // using join() method to output it to the featureGrid
    featureGrid.innerHTML = cardsHTML
};
renderFeatures();

// Toggle Mobile Menu (Open/Close)
let isMenuOpen = false;
const toggleMobileMenu = () => {
    if(!mobileMenu) return;

    if(isMenuOpen === false) {
        mobileMenu.classList.add("is-open");
        isMenuOpen = true;
    } else {
        mobileMenu.classList.remove("is-open");
        isMenuOpen = false;
    };
};

// Closing Mobile Menu when Link is clicked
const closedMobileMenu = () => {
    if(!mobileMenu) return;
    mobileMenu.classList.remove("is-open");
    isMenuOpen = false;
};

const updateHeadingText = (newText) => {
    if(!heading) return;
    heading.textContent = newText;
};

// Creating openServiceModal()
const openServiceModal = (serviceId) => {
    if (
        !serviceModal ||
        !serviceModalTitle ||
        !serviceModalPrice ||
        !serviceModalList
    ) {
        return;
    }

    const selectedService = services.find((service) => {
        return service.id === Number(serviceId);
    });

    if (!selectedService) return;

    serviceModalTitle.textContent = selectedService.title;
    serviceModalPrice.textContent = `$${selectedService.price}`

    serviceModalList.innerHTML = selectedService.details.map((detail) => {
        return `<li>${detail}</li>`;
    }).join("");

    serviceModal.classList.add("is-open");
    serviceModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
};

// Creating closeServiceModal()
const closeServiceModal = () => {
    if (!serviceModal) return;

    serviceModal.classList.remove("is-open");
    document.body.style.overflow = "";
};




// Event Listeners
// Hamburger Menu Toggle
if(menuBtn) {
    menuBtn.addEventListener("click", () => toggleMobileMenu());
};

// close mobile menu when a mobile link is clicked
if(mobileMenu) {
    mobileMenu.addEventListener("click", (event) => {
        // if they clicked an <a> tag, close the menu
        if(event.target.tagName === "A") {
            closedMobileMenu();
        };
    });
};

// CTA Button: "Book Now"
if(ctaBtn) {
    ctaBtn.addEventListener("click", () => {
        updateHeadingText("Booking coming next");
    });
};

// Call Button: "Call Us"
if(callBtn) {
    callBtn.addEventListener("click", () => {
        if(phoneLink) {
            updateHeadingText("Call us at (555) 123-4567");
        } else {
            updateHeadingText("Call Feature is coming soon!");
        };
    });
};

// Adding Event Delegation to the Feature Grid
if (featureGrid) {
    featureGrid.addEventListener("click", (event) => {
        const clickedButton = event.target.closest(".service-details-btn");

        if (!clickedButton) return;

        const serviceId = clickedButton.dataset.serviceId;

        openServiceModal(serviceId);
    });
};


// Add Modal Closing Events
if (serviceModalClose) {
 serviceModalClose.addEventListener("click", closeServiceModal);
}
if (serviceModalOverlay) {
 serviceModalOverlay.addEventListener("click", closeServiceModal);
}
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeServiceModal();
    }
});