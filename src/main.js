import './style.css'
import { menuData } from './data.js'

document.addEventListener('DOMContentLoaded', () => {
  renderMenu();
  setupMobileNav();
});

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
  Object.keys(menuData).forEach(category => {
    const items = menuData[category];
    
    // Create Category Section
    const categorySection = document.createElement('div');
    categorySection.className = 'menu-category';
    
    const categoryTitle = document.createElement('h3');
    categoryTitle.textContent = category;
    categorySection.appendChild(categoryTitle);
    
    // Grid for items
    const itemsGrid = document.createElement('div');
    itemsGrid.className = 'menu-grid';
    
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
    menuContainer.appendChild(categorySection);
  });
}
