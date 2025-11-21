const header = document.querySelector('.site-header');
const reveals = document.querySelectorAll('.reveal');
const tabButtons = document.querySelectorAll('.tab');
const scheduleContent = document.querySelector('#schedule-content');
const slider = document.querySelector('#quote-slider');
const sliderText = slider.querySelector('.quote-text');
const sliderCite = slider.querySelector('cite');
const sliderButtons = slider.querySelectorAll('.slider-btn');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelectorAll('#primary-nav a');

const scheduleData = {
  monday: [
    { time: '6:00a', class: 'Thermal Engine HIIT', coach: 'Jax' },
    { time: '8:00a', class: 'Foundry Strength', coach: 'Rae' },
    { time: '12:00p', class: 'Mobility Forge', coach: 'Siah' },
    { time: '6:00p', class: 'Performance Lab', coach: 'Guest' }
  ],
  tuesday: [
    { time: '7:00a', class: 'Velocity Sprint Prep', coach: 'Jax' },
    { time: '9:00a', class: 'Olympic Cycle', coach: 'Rae' },
    { time: '5:00p', class: 'Hybrid Conditioning', coach: 'Rae' }
  ],
  wednesday: [
    { time: '6:30a', class: 'Mobility Blueprint', coach: 'Siah' },
    { time: '10:00a', class: 'Neuromech Strength', coach: 'Rae' },
    { time: '7:00p', class: 'Forge Conditioning', coach: 'Jax' }
  ],
  thursday: [
    { time: '5:30a', class: 'Thermal Engine HIIT', coach: 'Jax' },
    { time: '8:30a', class: 'Strength Accretion', coach: 'Rae' },
    { time: '6:30p', class: 'Mobility Forge', coach: 'Siah' }
  ],
  friday: [
    { time: '6:00a', class: 'Velocity Sprint Prep', coach: 'Jax' },
    { time: '9:00a', class: 'Olympic Cycle', coach: 'Rae' },
    { time: '5:00p', class: 'Systems Reset', coach: 'Siah' }
  ]
};

const testimonials = [
  {
    quote:
      'Since joining ForgeFit, my perspective on training has completely shifted. The environment forces you to level up.',
    cite: 'Alex R. — Member since 2022'
  },
  {
    quote: 'ForgeFit is equal parts cathedral and laboratory. Every session feels engineered for progress.',
    cite: 'Morgan L. — Performance Architect'
  },
  {
    quote: 'The coaching staff blends science with intuition. It is luxury with teeth.',
    cite: 'Dana K. — APEX Member'
  }
];

let testimonialIndex = 0;

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2
  }
);

revealElements();
setupHeaderScroll();
setupTabs();
setupTestimonials();
setCurrentYear();
setupMobileNav();

function revealElements() {
  reveals.forEach(el => observer.observe(el));
}

function setupHeaderScroll() {
  const hero = document.querySelector('#hero');
  const heroHeight = hero.offsetHeight - 80;

  window.addEventListener('scroll', () => {
    if (window.scrollY > heroHeight) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

function setupTabs() {
  const activateTab = day => {
    tabButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.day === day));
    renderSchedule(day);
  };

  tabButtons.forEach(button => {
    button.addEventListener('click', () => activateTab(button.dataset.day));
  });

  activateTab('monday');
}

function renderSchedule(day) {
  const items = scheduleData[day] || [];
  scheduleContent.innerHTML = items
    .map(
      ({ time, class: className, coach }) => `
        <div class="schedule-row" role="row">
          <div>${time}</div>
          <div>${className}</div>
          <div>${coach}</div>
        </div>
      `
    )
    .join('');
}

function setupTestimonials() {
  const renderTestimonial = index => {
    const testimonial = testimonials[index];
    sliderText.textContent = testimonial.quote;
    sliderCite.textContent = testimonial.cite;
  };

  sliderButtons.forEach(button => {
    button.addEventListener('click', () => {
      testimonialIndex =
        button.dataset.direction === 'next'
          ? (testimonialIndex + 1) % testimonials.length
          : (testimonialIndex - 1 + testimonials.length) % testimonials.length;
      renderTestimonial(testimonialIndex);
    });
  });

  renderTestimonial(testimonialIndex);
}

function setCurrentYear() {
  const yearEl = document.querySelector('#year');
  yearEl.textContent = new Date().getFullYear();
}

function setupMobileNav() {
  if (!menuToggle) return;

  const toggleNav = () => {
    const isOpen = header.classList.toggle('nav-open');
    document.body.classList.toggle('no-scroll', isOpen);
    menuToggle.setAttribute('aria-expanded', isOpen);
  };

  menuToggle.addEventListener('click', toggleNav);

  navLinks.forEach(link =>
    link.addEventListener('click', () => {
      if (!header.classList.contains('nav-open')) return;
      header.classList.remove('nav-open');
      document.body.classList.remove('no-scroll');
      menuToggle.setAttribute('aria-expanded', 'false');
    })
  );
}
