import './style.css'
import { menuData } from './data.js'

document.addEventListener('DOMContentLoaded', () => {
  renderMenu();
  setupMobileNav();
  setupCarousel();
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
      // Prevent default behavior just in case
      e.preventDefault();

      const isActive = categorySection.classList.contains('active');

      // 1. Close all other sections immediately
      document.querySelectorAll('.menu-category').forEach(el => {
        if (el !== categorySection) {
          el.classList.remove('active');
        }
      });

      if (!isActive) {
        // 2. Open the clicked section
        categorySection.classList.add('active');

        // 3. Scroll logic with a slight delay to allow layout to settle
        requestAnimationFrame(() => {
            const headerOffset = 100; // Height of fixed header + buffer
            const elementPosition = categorySection.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
      } else {
        // If clicking an already open section, just close it
        categorySection.classList.remove('active');
      }
    });

    menuContainer.appendChild(categorySection);
  });
}
