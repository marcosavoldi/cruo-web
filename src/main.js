import './style.css'
import { menuData } from './data.js'

document.addEventListener('DOMContentLoaded', () => {
  renderMenu();
  setupMobileNav();
  setupCarousel();
  setupCookieConsent();
});

function setupCarousel() {
  const slides = document.querySelectorAll('.carousel-slide');
  if (slides.length === 0) return;

  let currentSlide = 0;
  const slideInterval = 3000; // 3 seconds

  setInterval(() => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }, slideInterval);
}

function setupMobileNav() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const links = document.querySelectorAll('.nav-links a');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

function renderMenu() {
  const menuContainer = document.getElementById('menu-container');
  
  // Iterate over each category in the order defined in data.js
  // Iterate over each category in the order defined in data.js
  Object.keys(menuData).forEach(category => {
    const items = menuData[category];
    
    // Create Category Section
    const categorySection = document.createElement('div');
    categorySection.className = 'menu-category';
    
    // Header for Accordion
    const categoryHeader = document.createElement('div');
    categoryHeader.className = 'category-header';
    
    const categoryTitle = document.createElement('h3');
    categoryTitle.textContent = category;
    
    // Chevron Icon
    const icon = document.createElement('div');
    icon.className = 'accordion-icon';
    icon.innerHTML = `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;
    
    categoryHeader.appendChild(categoryTitle);
    categoryHeader.appendChild(icon);
    
    categorySection.appendChild(categoryHeader);
    
    // Grid for items (Hidden by default via CSS)
    const itemsGrid = document.createElement('div');
    itemsGrid.className = 'menu-grid';

    if (category === 'HAMBURGER') {
      const catDesc = document.createElement('p');
      catDesc.className = 'category-description';
      catDesc.textContent = 'tutti i nostri hamburger sono serviti con patate rustiche';
      itemsGrid.appendChild(catDesc);
    }
    
    items.forEach(item => {
      const itemCard = document.createElement('div');
      itemCard.className = 'menu-item';
      
      const header = document.createElement('div');
      header.className = 'item-header';
      
      const name = document.createElement('span');
      name.className = 'item-name';
      name.textContent = item.name;
      
      const price = document.createElement('span');
      price.className = 'item-price';
      // Format price if it's a number, otherwise just show string (e.g. "+2")
      price.textContent = typeof item.price === 'number' ? `€ ${item.price.toFixed(2)}` : `€ ${item.price}`;
      
      header.appendChild(name);
      header.appendChild(price);
      
      itemCard.appendChild(header);
      
      if (item.ingredients) {
        const desc = document.createElement('p');
        desc.className = 'item-desc';
        desc.textContent = item.ingredients;
        itemCard.appendChild(desc);
      }
      
      itemsGrid.appendChild(itemCard);
    });
    
    categorySection.appendChild(itemsGrid);

    // Accordion Toggle Logic
    categoryHeader.addEventListener('click', (e) => {
      e.preventDefault();
      const isActive = categorySection.classList.contains('active');

      if (!isActive) {
        // OPTIMIZED UX: Instant switch
        
        // 1. Instantly close others (no animation) to prevent layout drift
        document.querySelectorAll('.menu-category.active').forEach(activeEl => {
           // Disable transition temporarily
           const grid = activeEl.querySelector('.menu-grid');
           grid.style.transition = 'none';
           activeEl.classList.remove('active');
           
           // Force reflow
           void grid.offsetHeight; 
           
           // Restore transition (optional, but good for future re-opening)
           setTimeout(() => {
               grid.style.transition = '';
           }, 50);
        });

        // 2. Open clicked section (with animation)
        categorySection.classList.add('active');

        // 3. Scroll IMMEDIATELY to the known top position
        // Since previous items closed instantly, the layout is stable at the top
        const headerOffset = 100;
        const elementPosition = categorySection.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth' /* Smooth scroll to target */
        });
      } else {
        // Just closing the current one - standard behavior
        categorySection.classList.remove('active');
      }
    });

    menuContainer.appendChild(categorySection);
  });
}

document.addEventListener('DOMContentLoaded', () => {
    // Other inits are at top of file, but we can init here too or move it up.
    // Actually the top of file has:
    /*
    document.addEventListener('DOMContentLoaded', () => {
      renderMenu();
      setupMobileNav();
      setupCarousel();
    });
    */
   // I should add setupCookieConsent() to the existing listener or just call it here if valid?
   // Better to add it to the top listener.
});

/* --- GDPR / Cookie Consent Logic --- */
function setupCookieConsent() {
  const cookieBanner = document.getElementById('cookie-banner');
  const btnAccept = document.getElementById('btn-accept-cookies');
  const btnRefuse = document.getElementById('btn-refuse-cookies');
  const btnAcceptMap = document.getElementById('btn-accept-map');
  
  // Modals
  const cookieModal = document.getElementById('cookie-modal');
  const privacyModal = document.getElementById('privacy-modal');
  const openCookieBtn = document.getElementById('open-cookie-policy-banner');
  const openPrivacyBtn = document.getElementById('open-privacy-footer');
  const closeButtons = document.querySelectorAll('.close-modal');

  // Check Link in Banner
  if (openCookieBtn) {
    openCookieBtn.addEventListener('click', (e) => {
      e.preventDefault();
      cookieModal.style.display = 'block';
    });
  }

  // Check Link in Footer
  if (openPrivacyBtn) {
    openPrivacyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      privacyModal.style.display = 'block';
    });
  }

  // Close Modals
  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      cookieModal.style.display = 'none';
      privacyModal.style.display = 'none';
    });
  });

  // Close when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === cookieModal) cookieModal.style.display = 'none';
    if (e.target === privacyModal) privacyModal.style.display = 'none';
  });

  // Social Buttons
  const socialButtons = document.querySelector('.social-floating');

  // Helper to toggle social buttons force-hiding
  const toggleSocial = (show) => {
    if (!socialButtons) return;
    if (show) {
      socialButtons.style.setProperty('display', 'flex', 'important');
    } else {
      socialButtons.style.setProperty('display', 'none', 'important');
    }
  };

  // Check Local Storage
  const consent = localStorage.getItem('cruo_consent');

  if (consent === 'true') {
    loadGoogleMap();
    toggleSocial(true);
  } else {
    toggleSocial(false); // Hide social initially
    
    // Simplification: Always show banner if consent is null.
    if (consent === null) {
      cookieBanner.style.display = 'block';
    } else {
        // If explicitly refused ('false'), we show social buttons
        toggleSocial(true);
    }
  }

  // Accept Logic
  btnAccept.addEventListener('click', () => {
    localStorage.setItem('cruo_consent', 'true');
    cookieBanner.style.display = 'none';
    toggleSocial(true);
    loadGoogleMap();
  });

  // Refuse Logic
  btnRefuse.addEventListener('click', () => {
    localStorage.setItem('cruo_consent', 'false');
    cookieBanner.style.display = 'none';
    toggleSocial(true);
  });

  // Accept from Map Placeholder
  if (btnAcceptMap) {
    btnAcceptMap.addEventListener('click', () => {
      localStorage.setItem('cruo_consent', 'true');
      cookieBanner.style.display = 'none'; // precise logic: if banner was still open
      toggleSocial(true);
      loadGoogleMap();
    });
  }
}

function loadGoogleMap() {
  const iframe = document.getElementById('google-map');
  const placeholder = document.getElementById('map-placeholder');
  
  if (iframe && iframe.dataset.src) {
    iframe.src = iframe.dataset.src;
    // Hide placeholder
    if (placeholder) {
      placeholder.style.display = 'none';
    }
  }
}

