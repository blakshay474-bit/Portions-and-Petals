// ===== PRELOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelector('.preloader').classList.add('hidden');
  }, 1500);
});

// ===== NAVBAR SCROLL =====
const navbar = document.querySelector('.navbar');
const backToTop = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  backToTop.classList.toggle('visible', window.scrollY > 600);
});

// ===== HAMBURGER MENU =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('active');
});

// ===== BACK TO TOP =====
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== PRODUCT FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    productCards.forEach((card, i) => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      if (match) {
        setTimeout(() => {
          card.style.display = 'block';
          requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        }, i * 50);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => { card.style.display = 'none'; }, 300);
      }
    });
  });
});

// ===== CART FUNCTIONALITY =====
let cartCount = 0;
const cartCountEl = document.querySelector('.cart-count');

document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    cartCount++;
    cartCountEl.textContent = cartCount;
    const button = e.target;
    button.textContent = '✓ Added!';
    button.style.background = 'linear-gradient(135deg, #b5c5a3, #8aab6f)';
    setTimeout(() => {
      button.textContent = 'Add to Cart';
      button.style.background = '';
    }, 1500);
  });
});

// ===== WISHLIST =====
document.querySelectorAll('.wishlist-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.classList.toggle('active');
    btn.innerHTML = btn.classList.contains('active') ? '❤️' : '🤍';
  });
});

// ===== QUICK VIEW MODAL =====
const modal = document.querySelector('.modal-overlay');
const modalClose = document.querySelector('.modal-close');
const modalTitle = document.getElementById('modal-title');
const modalBrand = document.getElementById('modal-brand');
const modalPrice = document.getElementById('modal-price');
const modalDesc = document.getElementById('modal-desc');

document.querySelectorAll('.quickview-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.product-card');
    modalTitle.textContent = card.querySelector('h4').textContent;
    modalBrand.textContent = card.querySelector('.brand').textContent;
    modalPrice.textContent = card.querySelector('.current').textContent;
    modalDesc.textContent = 'A premium beauty essential crafted with the finest ingredients for a luxurious experience.';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// ===== SEARCH =====
const searchOverlay = document.querySelector('.search-overlay');
const searchBtn = document.querySelector('.search-btn');
const searchClose = document.querySelector('.search-close');
const searchInput = document.querySelector('.search-box input');

searchBtn.addEventListener('click', () => {
  searchOverlay.classList.add('active');
  searchInput.focus();
  document.body.style.overflow = 'hidden';
});

searchClose.addEventListener('click', () => {
  searchOverlay.classList.remove('active');
  document.body.style.overflow = '';
});

searchInput.addEventListener('input', (e) => {
  const val = e.target.value.toLowerCase();
  productCards.forEach(card => {
    const name = card.querySelector('h4').textContent.toLowerCase();
    const brand = card.querySelector('.brand').textContent.toLowerCase();
    card.style.display = (name.includes(val) || brand.includes(val)) ? 'block' : 'none';
  });
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.category-card, .product-card, .feature-item, .testimonial-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ===== COUNTER ANIMATION =====
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  let current = 0;
  const step = target / 60;
  const interval = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(interval);
    }
    el.textContent = Math.floor(current) + suffix;
  }, 25);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

// ===== TESTIMONIAL SLIDER =====
let currentSlide = 0;
const slider = document.querySelector('.testimonials-slider');
const slides = document.querySelectorAll('.testimonial-card');
const totalSlides = slides.length;

function autoSlide() {
  if (window.innerWidth <= 768) {
    currentSlide = (currentSlide + 1) % totalSlides;
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    slider.style.transition = 'transform 0.5s ease';
  }
}
setInterval(autoSlide, 4000);

// ===== NEWSLETTER FORM =====
document.querySelector('.newsletter-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const input = e.target.querySelector('input');
  const btn = e.target.querySelector('button');
  if (input.value.includes('@')) {
    btn.textContent = '✓ Subscribed!';
    btn.style.background = '#b5c5a3';
    input.value = '';
    setTimeout(() => {
      btn.textContent = 'Subscribe';
      btn.style.background = '';
    }, 2500);
  }
});

// ===== SMOOTH SCROLL FOR NAV =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      navLinks.classList.remove('active');
    }
  });
});

// ===== PETAL PARTICLES =====
function createPetal() {
  const petal = document.createElement('div');
  petal.style.cssText = `
    position: fixed; z-index: 0; pointer-events: none;
    width: ${8 + Math.random() * 12}px; height: ${8 + Math.random() * 12}px;
    background: ${['#f2d7d5','#c9a0a0','#e8d5b7','#e8d5e8','#fce4ec'][Math.floor(Math.random() * 5)]};
    border-radius: 50% 0 50% 0; opacity: ${0.3 + Math.random() * 0.4};
    top: -20px; left: ${Math.random() * 100}vw;
    transform: rotate(${Math.random() * 360}deg);
  `;
  document.body.appendChild(petal);
  const duration = 6000 + Math.random() * 6000;
  const drift = (Math.random() - 0.5) * 200;
  petal.animate([
    { transform: `translateY(0) translateX(0) rotate(0deg)`, opacity: 0.5 },
    { transform: `translateY(100vh) translateX(${drift}px) rotate(360deg)`, opacity: 0 }
  ], { duration, easing: 'linear' });
  setTimeout(() => petal.remove(), duration);
}
setInterval(createPetal, 600);

// ===== VOICEFLOW CHATBOT INTEGRATION =====
// The chatbot is initialized in index.html, but we can interact with it here
window.addEventListener('voiceflow:ready', () => {
  console.log('Voiceflow Chatbot is ready');
  // You can add custom logic here, e.g., opening the chat on a specific button click
});

function openChat() {
  if (window.voiceflow && window.voiceflow.chat) {
    window.voiceflow.chat.open();
  }
}
