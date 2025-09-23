export function displayDialogue(text, onDisplayEnd, isDesktop = false) {
  const dialogueUI = document.getElementById("textbox-container");
  const dialogue = document.getElementById("dialogue");

  // Show completely blank popup first - ensure no text is visible
  dialogueUI.style.display = "block";
  dialogue.innerHTML = "";
  dialogue.textContent = "";
  
  // Add desktop-mode class to remove white background for desktop interface
  const textbox = document.getElementById("textbox");
  if (isDesktop) {
    textbox.classList.add("desktop-mode");
  } else {
    textbox.classList.remove("desktop-mode");
  }
  
  // Store the interval reference globally so we can clear it later
  let intervalRef;
  
  if (isDesktop) {
    // Tab system state
    const tabs = [
      { id: 'profile', name: 'Profile' },
      { id: 'experiences', name: 'Experiences' },
      { id: 'projects', name: 'Projects' },
      { id: 'skills', name: 'Skills' },
      { id: 'resume', name: 'Resume' },
      { id: 'contact', name: 'Contact' }
    ];
    let activeTab = 'profile';

    // Function to render the browser interface
    function renderBrowser() {
      const addressBarUrl = `niima://portfolio/${activeTab}`;
      const activeTabName = tabs.find(tab => tab.id === activeTab).name;
      let contentText;
      if (activeTab === 'profile') {
        contentText = `
          <div style="display: flex; gap: 20px; padding: 10px; font-family: monospace;">
            <!-- Left Side: Profile Picture + Info -->
            <div style="flex: 0 0 150px; text-align: center;">
              <div style="width: 80px; height: 80px; border: 3px solid #8B4513; border-radius: 8px; overflow: hidden; margin: 0 auto 10px auto;">
                <img src="pfp.jpg" alt="Profile Picture" style="width: 100%; height: 100%; object-fit: cover;" />
              </div>
              <h3 style="margin: 0; color: #8B4513; font-size: 1rem;">Bettaoui Niima</h3>
              <p style="margin: 5px 0; color: #8B4513; font-size: 0.7rem; line-height: 1.2;">Étudiant en Master Ingénierie du Développement Logiciel et Décisionnel à l'Université Mohammed V de Rabat</p>
            </div>
            
            <!-- Thick Divider -->
            <div style="width: 4px; background: #8B4513; margin: 0 10px;"></div>
            
            <!-- Right Side: About + Contact -->
            <div style="flex: 1;">
              <div style="margin-bottom: 15px;">
                <p style="margin: 0; color: #8B4513; font-size: 0.8rem; line-height: 1.4; text-align: left;">
                  Passionnée par l'ingénierie logicielle, motivée et rigoureuse, je suis à la recherche d'un stage de fin d'études (PFE) à partir de février 2026, afin d'intégrer une entreprise innovante et de contribuer activement à des projets concrets et à fort impact.
                </p>
              </div>
              
              <!-- Contact Links -->
              <div style="display: flex; flex-direction: column; gap: 8px;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <img src="gmail.png" alt="Gmail" style="width: 20px; height: 20px;" />
                  <a href="mailto:bettaouiniima18@gmail.com" style="text-decoration: none; color: #8B4513; font-size: 0.8rem;">Email: bettaouiniima18@gmail.com</a>
                </div>
                <div style="display: flex; align-items: center; gap: 8px;">
                  <img src="linkedin.png" alt="LinkedIn" style="width: 20px; height: 20px;" />
                  <a href="https://www.linkedin.com/in/niimabettaoui/" target="_blank" style="text-decoration: underline; color: #8B4513; font-size: 0.8rem;">LinkedIn: niimabettaoui</a>
                </div>
                <div style="display: flex; align-items: center; gap: 8px;">
                  <img src="github.png" alt="GitHub" style="width: 20px; height: 20px;" />
                  <a href="https://github.com/Niima22" target="_blank" style="text-decoration: underline; color: #8B4513; font-size: 0.8rem;">GitHub: Niima22</a>
                </div>
              </div>
            </div>
          </div>
        `;
      } else if (activeTab === 'experiences') {
        // === Experiences content (dynamic cards) ===
        // 1) Define cards data (add more objects to this array for new cards)
        const experiences = [
          {
            logo: 'Orange.png',
            company: 'Orange Digital Center',
            role: "Stage fin d'année - Software Engineer",
            place: 'Rabat - Juillet/Septembre 2025',
            techIcons: [
              'tecnologies-icons/java.png',
              'tecnologies-icons/springboot.png',
              'tecnologies-icons/react.png',
              'tecnologies-icons/postgresql.png',
              'tecnologies-icons/docker.png',
              'tecnologies-icons/aws.png',
            ],
            mission: "Conception et Déploiement d'une Solution Numérique Innovante dédiée au Suivi Maternité et Postnatal.",
            bullets: [
              "Développement d'un écosystème avec Spring Boot et conception d'APIs REST robustes.",
              "CI/CD : automatisation des builds, exécution des tests et contrôle qualité avant mise en production.",
              "Déploiement conteneurisé avec Docker sur AWS",
              "Agile (Scrum) : participation aux cérémonies (Daily, Planning, Review, Rétrospective)"
            ]
          },
          {
            // === CARD 2 as requested ===
            logo: 'work.png',
            company: 'Préfecture de Chichaoua',
            role: "Stage fin d'année - Software Engineer",
            place: 'Chichaoua - Avril – Juin 2023',
            // replace React by Angular and remove AWS here:
            techIcons: [
              'tecnologies-icons/java.png',
              'tecnologies-icons/springboot.png',
              'tecnologies-icons/angular.png',
              'tecnologies-icons/postgresql.png', // use one DB icon (ok if MySQL or PostgreSQL)
              'tecnologies-icons/docker.png'
            ],
            mission: "Développement d'une application web de gestion du transport scolaire dans les régions rurales de Chichaoua.",
            bullets: [
              "Mise en place d'une architecture microservices avec Spring Boot (découpage fonctionnel, contrats REST, tolérance aux pannes).",
              "Intégration avec la base de données MySQL (modélisation, JPA/Hibernate, scripts de migration).",
              "Sécurisation des services avec Spring Security et OAuth2 (rôles/permissions, politiques d'accès).",
              "Conteneurisation des applications avec Docker (images, Compose, variables d'environnement).",
              "Participation au cadre Agile/Scrum : Sprint Planning, Daily stand-ups et Rétrospectives."
            ]
          }
        ];

        // 2) Build cards HTML from data
        const cardsHtml = experiences.map((exp) => `
          <div class="exp-card" style="min-width: 100%; padding: 16px; box-sizing: border-box;">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 10px;">
              <img src="${exp.logo}" alt="Company Logo" style="width: 40px; height: 40px; border: 2px solid #8B4513; border-radius: 4px;" />
              <div>
                <h3 style="margin: 0; color: #8B4513; font-size: 0.9rem; line-height: 1.2; font-weight: bold;">${exp.company}</h3>
                <p style="margin: 2px 0; color: #8B4513; font-size: 0.8rem;">${exp.role}</p>
                <p style="margin: 2px 0; color: #8B4513; font-size: 0.8rem;">${exp.place}</p>
              </div>
            </div>
            <div style="margin: 8px 0; color: #8B4513; font-size: 0.7rem; line-height: 1.2;">
              <div style="display: flex; gap: 6px; margin-bottom: 8px; flex-wrap: wrap; align-items: center;">
                ${exp.techIcons.map(src => `<img src="${src}" alt="" style="width: 24px; height: 24px;" />`).join('')}
              </div>
              <p style="margin: 3px 0 8px 0; font-weight: bold;">${exp.mission}</p>
              <ul style="margin: 3px 0; padding-left: 12px; font-size: 0.75rem; line-height: 1.2; list-style-type: disc; list-style-position: outside;">
                ${exp.bullets.map(b => `<li style="margin-bottom: 2px;">${b}</li>`).join('')}
              </ul>
            </div>
          </div>
        `).join('');

        // 3) Compose the full experiences UI
        contentText = `
          <div style="padding: 5px; font-family: monospace;">
            <div style="position: relative; max-width: 100%; margin: 0 auto;">
              <div id="exp-prev" style="position: absolute; left: 5px; top: 50%; transform: translateY(-50%); width: 24px; height: 24px; background: #E9967A; border: 2px solid #8B4513; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 10; font-size: 0.8rem; color: white;" role="button" aria-label="Previous">◀</div>
              <div id="exp-next" style="position: absolute; right: 5px; top: 50%; transform: translateY(-50%); width: 24px; height: 24px; background: #E9967A; border: 2px solid #8B4513; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 10; font-size: 0.8rem; color: white;" role="button" aria-label="Next">▶</div>

              <!-- Fixed-height viewport (ONLY style change allowed: height=240px) -->
              <div id="exp-viewport" style="height: 240px; overflow: hidden; position: relative; margin: 0 35px; border: 2px solid #8B4513; border-radius: 8px; background: #FFFACD;">
                <div id="exp-cards" style="display: flex; transition: transform 0.3s ease; height: 100%;">${cardsHtml}</div>
              </div>
            </div>

            <!-- Dynamic dots -->
            <div id="exp-dots" style="display: flex; justify-content: center; gap: 8px; margin-top: 15px;"></div>
          </div>
        `;
      } else {
        contentText = `
          <div style="height: 100%; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; color: #8B4513;">
            This is ${activeTabName} tab.
          </div>
        `;
      }

      dialogue.innerHTML = `
        <div style="border: 2px solid #8B4513; border-radius: 8px; background: #FFB6C1; padding: 0; margin: 0; font-family: monospace; font-size: 0.8rem;">
          <div style="background: #FFB6C1; border-bottom: 2px solid #8B4513; padding: 8px; position: relative;">
            <div style="display: flex; gap: 4px; margin-bottom: 8px; align-items: center; justify-content: space-between;">
              <div style="display: flex; gap: 4px;">
                ${tabs.map(tab => `
                  <div id="tab-${tab.id}" class="tab" style="background: ${activeTab === tab.id ? '#E9967A' : '#FFCCCB'}; border: 2px solid #8B4513; border-bottom: none; padding: 4px 8px; border-radius: 4px 4px 0 0; position: relative; z-index: 1; margin-left: -2px; cursor: pointer; width: 85px; min-width: 85px; max-width: 85px; text-align: center; box-sizing: border-box; flex-shrink: 0;">${tab.name}</div>
                `).join('')}
              </div>
              <div id="desktop-close-x" style="background: #FF6B6B; border: 2px solid #8B4513; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-weight: bold; color: white;">X</div>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <div style="display: flex; gap: 4px;">
                <div style="width: 20px; height: 20px; border: 2px solid #8B4513; border-radius: 50%; background: #FFCCCB; display: flex; align-items: center; justify-content: center;">←</div>
                <div style="width: 20px; height: 20px; border: 2px solid #8B4513; border-radius: 50%; background: #FFCCCB; display: flex; align-items: center; justify-content: center;">→</div>
                <div style="width: 20px; height: 20px; border: 2px solid #8B4513; border-radius: 50%; background: #FFCCCB; display: flex; align-items: center; justify-content: center;">↻</div>
              </div>
              <div style="flex: 1; background: #FFFFE0; border: 2px solid #8B4513; padding: 4px; display: flex; align-items: center;">
                <div style="width: 16px; height: 16px; border: 2px solid #8B4513; background: #FFFFE0; margin-right: 4px; display: flex; align-items: center; justify-content: center;">🔍</div>
                <span id="address-bar" style="flex: 1;">${addressBarUrl}</span>
              </div>
            </div>
          </div>
          <div style="background: #FFFFE0; border: 2px solid #8B4513; border-top: none; height: 300px; padding: 16px; position: relative; overflow: hidden;">
            <div id="content-area" style="margin-bottom: 16px;">
              ${contentText}
            </div>
          </div>
        </div>
      `;
    }

    // Function to add event listeners after rendering
    function addEventListeners() {
      const desktopCloseX = document.getElementById("desktop-close-x");
      if (desktopCloseX) {
        desktopCloseX.addEventListener("click", onCloseBtnClick);
      }

      // Add tab click listeners
      tabs.forEach(tab => {
        const tabElement = document.getElementById(`tab-${tab.id}`);
        if (tabElement) {
          tabElement.addEventListener("click", (e) => {
            e.preventDefault();
            activeTab = tab.id;
            renderBrowser();
            addEventListeners(); // Re-add listeners after re-render
            if (activeTab === 'experiences') initExperienceCarousel();
          });
        }
      });
    }

    function initExperienceCarousel() {
      const viewport = document.getElementById('exp-viewport');
      const track    = document.getElementById('exp-cards');
      const prevBtn  = document.getElementById('exp-prev');
      const nextBtn  = document.getElementById('exp-next');
      const dotsWrap = document.getElementById('exp-dots');
      if (!viewport || !track || !dotsWrap) return;

      const cards = Array.from(track.children);
      let current = 0;
      let isDragging = false;
      let startX = 0;
      let deltaX = 0;

      // Dots
      dotsWrap.innerHTML = cards.map((_, i) =>
        `<button type="button" class="exp-dot${i===0?' active':''}" aria-label="Go to slide ${i+1}"
          style="width:10px;height:10px;border-radius:50%;border:2px solid #8B4513;background:${i===0?'#8B4513':'#FFCCCB'};cursor:pointer;padding:0;"></button>`
      ).join('');
      const dots = Array.from(dotsWrap.querySelectorAll('.exp-dot'));

      function snap() {
        track.style.transition = 'transform 0.3s ease';
        track.style.transform = `translateX(-${current * 100}%)`;
        dots.forEach((d, i) => {
          d.style.background = i === current ? '#8B4513' : '#FFCCCB';
          d.style.border = i === current ? 'none' : '2px solid #8B4513';
        });
      }

      function to(index) {
        current = Math.max(0, Math.min(cards.length - 1, index));
        snap();
      }

      // Arrows
      prevBtn?.addEventListener('click', () => to(current - 1));
      nextBtn?.addEventListener('click', () => to(current + 1));

      // Dots
      dots.forEach((dot, i) => dot.addEventListener('click', () => to(i)));

      // Drag / Swipe
      function onDown(clientX) {
        isDragging = true;
        startX = clientX;
        deltaX = 0;
        track.style.transition = 'none';
      }
      function onMove(clientX) {
        if (!isDragging) return;
        deltaX = clientX - startX;
        const w = viewport.clientWidth || 1;
        const pct = (-current * 100) + (deltaX / w) * 100;
        track.style.transform = `translateX(${pct}%)`;
      }
      function onUp() {
        if (!isDragging) return;
       isDragging = false;
        const w = viewport.clientWidth || 1;
        const threshold = Math.min(80, w * 0.2); // 20% or 80px
        if (Math.abs(deltaX) > threshold) {
          to(current + (deltaX < 0 ? 1 : -1));
        } else {
          snap();
        }
      }

      // Pointer + touch events
      viewport.addEventListener('mousedown', e => onDown(e.clientX));
      window.addEventListener('mousemove', e => onMove(e.clientX));
      window.addEventListener('mouseup', onUp);

      viewport.addEventListener('touchstart', e => onDown(e.touches[0].clientX), { passive: true });
      window.addEventListener('touchmove',  e => onMove(e.touches[0].clientX),   { passive: true });
      window.addEventListener('touchend',   onUp,                                 { passive: true });

      snap();
    }

    // Initial render and add listeners
    renderBrowser();
    setTimeout(addEventListeners, 0);
    if (activeTab === 'experiences') setTimeout(initExperienceCarousel, 0);
    
  } else {
    // Add content immediately with typewriter effect
    let index = 0;
    let currentText = "";
    intervalRef = setInterval(() => {
      if (index < text.length) {
        currentText += text[index];
        dialogue.innerHTML = currentText;
        index++;
        return;
      }

      clearInterval(intervalRef);
    }, 1);
  }

  const closeBtn = document.getElementById("close");

  function onCloseBtnClick() {
    onDisplayEnd();
    dialogueUI.style.display = "none";
    dialogue.innerHTML = "";
    // Remove desktop-mode class when closing
    const textbox = document.getElementById("textbox");
    textbox.classList.remove("desktop-mode");
    if (intervalRef) {
      clearInterval(intervalRef);
    }
    closeBtn.removeEventListener("click", onCloseBtnClick);
    // Remove desktop close X event listener if it exists
    const desktopCloseX = document.getElementById("desktop-close-x");
    if (desktopCloseX) {
      desktopCloseX.removeEventListener("click", onCloseBtnClick);
    }
  }

  // Only add event listener to original close button if not desktop
  if (!isDesktop) {
    closeBtn.addEventListener("click", onCloseBtnClick);
  } else {
    // Hide the original close button for desktop
    closeBtn.style.display = "none";
  }

  addEventListener("keypress", (key) => {
    if (key.code === "Enter") {
      onCloseBtnClick();
    }
  });

  addEventListener("keydown", (key) => {
    if (key.code === "Escape") {
      onCloseBtnClick();
    }
    
    // Tab navigation for desktop popup
    if (isDesktop && (key.code === "ArrowLeft" || key.code === "ArrowRight")) {
      const tabs = [
        { id: 'profile', name: 'Profile' },
        { id: 'experiences', name: 'Experiences' },
        { id: 'projects', name: 'Projects' },
        { id: 'skills', name: 'Skills' },
        { id: 'resume', name: 'Resume' },
        { id: 'contact', name: 'Contact' }
      ];
      
      const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
      let newIndex;
      
      if (key.code === "ArrowLeft") {
        newIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
      } else {
        newIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
      }
      
      activeTab = tabs[newIndex].id;
      renderBrowser();
      setTimeout(addEventListeners, 0);
      if (activeTab === 'experiences') initExperienceCarousel();
    }
  });
}

export function setCamScale(k) {
  const resizeFactor = k.width() / k.height();
  if (resizeFactor < 1) {
    k.camScale(k.vec2(1));
  } else {
    k.camScale(k.vec2(1.5));
  }
}

