document.addEventListener('DOMContentLoaded', () => {
  const yearNode = document.getElementById('currentYear');
  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }

  const form = document.getElementById('quoteForm');
  const status = form?.querySelector('.status-message');

  if (form && status) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const name = formData.get('name')?.toString().trim() || 'there';
      const email = formData.get('email')?.toString().trim() || 'Not provided';
      const phone = formData.get('phone')?.toString().trim() || 'Not provided';
      const message = formData.get('message')?.toString().trim() || 'No project details provided';
      const whatsappMessage = [
        'Hello ADPRO GH LTD, I would like to request a quote.',
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Project details: ${message}`
      ].join('\n');
      const whatsappUrl = `https://wa.me/233598556314?text=${encodeURIComponent(whatsappMessage)}`;

      status.textContent = `Thanks, ${name}! Opening WhatsApp now.`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      form.reset();
    });
  }

  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filterValue = button.dataset.filter;

      filterButtons.forEach((btn) => btn.classList.toggle('active', btn === button));

      portfolioCards.forEach((card) => {
        const match = filterValue === 'all' || card.dataset.category === filterValue;
        card.classList.toggle('is-hidden', !match);
      });
    });
  });

  document.querySelectorAll('.expand-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const card = button.closest('.portfolio-card');
      if (!card) return;
      card.classList.toggle('active');
      const icon = button.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-plus');
        icon.classList.toggle('fa-minus');
      }
    });
  });

  // ==========================================
  // PORTFOLIO 10-IMAGE ROTATION POOLS (SEPARATE PER CARD)
  // ==========================================
  const cardImagePools = [
    // Card 1: Brand Identity Campaign (Branding folder)
    [
      'assets/branding/cb (1).jpeg', 'assets/branding/cb (6).jpeg', 'assets/branding/cb (10).jpeg', 
      'assets/branding/cb (9).jpeg', 'assets/branding/cb (18).jpeg', 'assets/branding/cb (26).jpeg', 
      'assets/branding/cb (29).jpeg', 'assets/branding/cb (27).jpeg', 'assets/branding/cb (28).jpeg', 'assets/branding/cb (6).jpeg'
    ],
    
    // Card 2: Event Brand Experience (Signage folder)
    [
      'assets/signage/s (1).jpeg', 'assets/signage/s (2).jpeg', 'assets/signage/s (3).jpeg', 
      'assets/signage/s (4).jpeg', 'assets/signage/s (5).jpeg', 'assets/signage/s (6).jpeg', 
      'assets/signage/s (7).jpeg', 'assets/signage/s (8).jpeg', 'assets/signage/s (9).jpeg', 'assets/signage/s (10).jpeg'
    ],
    
    // Card 3: POSM (POSM folder)
    [
      'assets/posm/po (1).jpeg', 'assets/posm/po (2).jpeg', 'assets/posm/po (3).jpeg', 
      'assets/posm/po (4).jpeg', 'assets/posm/po (5).jpeg', 'assets/posm/po (6).jpeg', 
      'assets/posm/po (7).jpeg', 'assets/posm/po (8).jpeg', 'assets/posm/po (9).jpeg', 'assets/posm/po (10).jpeg'
    ],
    
    // Card 4: Corporate Branding (Branding folder)
    [
      'assets/branding/cb (20).jpeg', 'assets/branding/cb (21).jpeg', 'assets/branding/cb (22).jpeg', 
      'assets/branding/cb (23).jpeg', 'assets/branding/cb (24).jpeg', 'assets/branding/cb (25).jpeg', 
      'assets/branding/cb (24).jpeg', 'assets/branding/cb (20).jpeg', 'assets/branding/cb (19).jpeg', 'assets/branding/cb (25).jpeg'
    ],
    
    // Card 5: Large Format Prints (Printing folder)
    [
      'assets/printing/1 (27).jpeg', 'assets/printing/1 (18).jpeg', 'assets/printing/1 (19).jpeg', 
      'assets/printing/1 (22).jpeg', 'assets/printing/1 (23).jpeg', 'assets/printing/1 (94).jpeg', 
      'assets/printing/1 (27).jpeg', 'assets/printing/1 (29).jpeg', 'assets/printing/1 (30).jpeg', 'assets/printing/1 (16).jpeg'
    ],
    
    // Card 6: Commercial Printing (Stationery folder)
    [
      'assets/stationery/a.webp', 'assets/stationery/c.webp', 'assets/stationery/d.webp', 
      'assets/stationery/b.webp', 'assets/stationery/f.webp', 'assets/stationery/d.webp', 
      'assets/stationery/j.webp', 'assets/stationery/i.webp', 'assets/stationery/e.webp', 'assets/stationery/g.webp'
    ],
    
    // Card 7: Signage Installation (Installation folder)
    [
      'assets/installation/ins (2).jpeg', 'assets/installation/ins (6).jpeg', 'assets/installation/ins (3).jpeg', 
      'assets/installation/ins (10).jpeg', 'assets/installation/ins (4).jpeg', 'assets/installation/ins (5).jpeg', 
      'assets/installation/ins (7).jpeg', 'assets/installation/ins (8).jpeg', 'assets/installation/ins (9).jpeg', 'assets/installation/ins (1).jpeg'
    ],
    
    // Card 8: Billboard Campaigns / Cloth (Cloth folder)
    [
      'assets/cloth/1 (48).jpeg', 'assets/cloth/1 (52).jpeg', 'assets/cloth/1 (84).jpeg', 
      'assets/cloth/1 (89).jpeg', 'assets/cloth/1 (91).jpeg', 'assets/cloth/1 (90).jpeg', 
      'assets/cloth/1 (92).jpeg', 'assets/cloth/1 (97).jpeg', 'assets/cloth/1 (99).jpeg', 'assets/cloth/1 (85).jpeg'
    ],
    
    // Card 9: Billboard Campaigns (Billboards folder)
    [
      'assets/billboards/b (1).jpeg', 'assets/billboards/b (2).jpeg', 'assets/billboards/b (3).jpeg', 
      'assets/billboards/b (4).jpeg', 'assets/billboards/b (5).jpeg', 'assets/billboards/b (6).jpeg', 
      'assets/billboards/b (7).jpeg', 'assets/billboards/b (0.1).jpeg', 'assets/billboards/b (0.5).jpeg', 'assets/billboards/b (1).jpeg'
    ]
  ];

  portfolioCards.forEach((card, index) => {
    const imgElement = card.querySelector('.portfolio-visual img');
    const imagePool = cardImagePools[index];
    if (imgElement && imagePool && imagePool.length > 0) {
      let imgIndex = 0;
      setInterval(() => {
        imgIndex = (imgIndex + 1) % imagePool.length;
        imgElement.style.opacity = '0';
        setTimeout(() => {
          imgElement.src = imagePool[imgIndex];
          imgElement.style.opacity = '1';
        }, 300);
      }, 10000); // Changes every 10 seconds independently per card
    }
  });

  // Testimonials Carousel
  const carouselTrack = document.getElementById('carouselTrack');
  const carouselPrevBtn = document.getElementById('prevBtn');
  const carouselNextBtn = document.getElementById('nextBtn');
  const carouselDots = document.getElementById('carouselDots');
  
  if (carouselTrack) {
    const quoteBlocks = carouselTrack.querySelectorAll('.quote-block');

    if (quoteBlocks.length > 0) {
      let currentIndex = 0;
      const totalSlides = quoteBlocks.length;

      if (carouselDots) {
        for (let i = 0; i < totalSlides; i++) {
          const dot = document.createElement('button');
          dot.classList.add('carousel-dot');
          if (i === 0) dot.classList.add('active');
          dot.dataset.index = i;
          dot.setAttribute('aria-label', `Go to review ${i + 1}`);
          dot.addEventListener('click', () => goToSlide(i));
          carouselDots.appendChild(dot);
        }
      }

      const updateCarousel = () => {
        const offset = -currentIndex * 100;
        carouselTrack.style.transform = `translateX(${offset}%)`;

        document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
          dot.classList.toggle('active', index === currentIndex);
        });
      };

      const nextSlide = () => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
      };

      const prevSlide = () => {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
      };

      const goToSlide = (index) => {
        currentIndex = index;
        updateCarousel();
      };

      carouselNextBtn?.addEventListener('click', nextSlide);
      carouselPrevBtn?.addEventListener('click', prevSlide);

      let autoAdvanceInterval = setInterval(nextSlide, 10000);

      carouselTrack.addEventListener('mouseenter', () => {
        clearInterval(autoAdvanceInterval);
      });

      carouselTrack.addEventListener('mouseleave', () => {
        autoAdvanceInterval = setInterval(nextSlide, 6000);
      });

      updateCarousel();
    }
  }
});