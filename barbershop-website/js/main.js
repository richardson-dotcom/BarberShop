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
    console.log("Render Navigation is being called");

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
        title:"Classic Haircuts", 
        text: "Timeless Cuts w/ Modern Precision-Tailoring to your style", 
        image: "assets/images/feature-1.jpg"
    },
    {
        title:"Beard Trims", 
        text: "Shape, Line-up, and Refine your beard", 
        image: "assets/images/feature-2.jpg"
    },
    {
        title:"Straight Razor Shave", 
        text: "Hot Towel, Smooth Shave, and classic barbershop experience", 
        image: "assets/images/feature-3.jpg"
    }
];

// Function that renders our features to the features grid (using map() method)
const renderFeatures = () => {
    
    if(!featureGrid) {return};

    const cardsHTML = services.map((service) => {
        return `
        <article class="feature-card">
            <img src = "${service.image}" alt="${service.title}" class="feature-img" />
            <h3 class="feature-title">${service.title}</h3>
            <p class="feature-text">${service.text}</p>
          </article>
        `
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