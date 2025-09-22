export function displayDialogue(text, onDisplayEnd, isDesktop = false) {
  const dialogueUI = document.getElementById("textbox-container");
  const dialogue = document.getElementById("dialogue");

  // Show completely blank popup first - ensure no text is visible
  dialogueUI.style.display = "block";
  dialogue.innerHTML = "";
  dialogue.textContent = "";
  
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
        contentText = `
          <div style="padding: 5px; font-family: monospace;">
            <!-- Carousel Container -->
            <div style="position: relative; max-width: 100%; margin: 0 auto;">
              <!-- Left Arrow -->
              <div id="exp-prev" style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%); width: 30px; height: 30px; background: #E9967A; border: 2px solid #8B4513; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 10; font-size: 1.2rem; color: white;">◀</div>
              
              <!-- Right Arrow -->
              <div id="exp-next" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); width: 30px; height: 30px; background: #E9967A; border: 2px solid #8B4513; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 10; font-size: 1.2rem; color: white;">▶</div>
              
              <!-- Card Viewport -->
              <div style="height: 200px; overflow: hidden; position: relative; margin: 0 50px; border: 2px solid #8B4513; border-radius: 8px; background: #FFFACD;">
                <!-- Experience Cards Container -->
                <div id="exp-cards" style="display: flex; transition: transform 0.3s ease; height: 100%;">
                  <!-- Experience Card 1 -->
                  <div class="exp-card" style="min-width: 100%; padding: 20px; box-sizing: border-box;">
                    <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
                      <img src="work.png" alt="Company Logo" style="width: 40px; height: 40px; border: 2px solid #8B4513; border-radius: 4px;" />
                      <div>
                        <h3 style="margin: 0; color: #8B4513; font-size: 1rem;">Software Developer Intern</h3>
                        <p style="margin: 2px 0; color: #8B4513; font-size: 0.9rem;">TechCorp Solutions</p>
                        <p style="margin: 2px 0; color: #8B4513; font-size: 0.8rem;">Jan 2024 - Jun 2024</p>
                      </div>
                    </div>
                    <ul style="margin: 10px 0; padding-left: 20px; color: #8B4513; font-size: 0.8rem; line-height: 1.4;">
                      <li>Developed web applications using JavaScript and React</li>
                      <li>Collaborated with senior developers on feature implementation</li>
                      <li>Participated in code reviews and agile development process</li>
                    </ul>
                    <div style="display: flex; gap: 8px; margin-top: 15px; flex-wrap: wrap;">
                      <span style="background: #FFCCCB; border: 1px solid #8B4513; padding: 2px 8px; border-radius: 12px; font-size: 0.7rem; color: #8B4513;">JavaScript</span>
                      <span style="background: #FFCCCB; border: 1px solid #8B4513; padding: 2px 8px; border-radius: 12px; font-size: 0.7rem; color: #8B4513;">React</span>
                      <span style="background: #FFCCCB; border: 1px solid #8B4513; padding: 2px 8px; border-radius: 12px; font-size: 0.7rem; color: #8B4513;">Git</span>
                    </div>
                  </div>
                  
                  <!-- Experience Card 2 -->
                  <div class="exp-card" style="min-width: 100%; padding: 20px; box-sizing: border-box;">
                    <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
                      <img src="work.png" alt="Company Logo" style="width: 40px; height: 40px; border: 2px solid #8B4513; border-radius: 4px;" />
                      <div>
                        <h3 style="margin: 0; color: #8B4513; font-size: 1rem;">Data Analysis Intern</h3>
                        <p style="margin: 2px 0; color: #8B4513; font-size: 0.9rem;">DataFlow Inc</p>
                        <p style="margin: 2px 0; color: #8B4513; font-size: 0.8rem;">Jul 2023 - Dec 2023</p>
                      </div>
                    </div>
                    <ul style="margin: 10px 0; padding-left: 20px; color: #8B4513; font-size: 0.8rem; line-height: 1.4;">
                      <li>Analyzed large datasets using Python and pandas</li>
                      <li>Created visualizations and reports for stakeholders</li>
                      <li>Optimized data processing workflows</li>
                    </ul>
                    <div style="display: flex; gap: 8px; margin-top: 15px; flex-wrap: wrap;">
                      <span style="background: #FFCCCB; border: 1px solid #8B4513; padding: 2px 8px; border-radius: 12px; font-size: 0.7rem; color: #8B4513;">Python</span>
                      <span style="background: #FFCCCB; border: 1px solid #8B4513; padding: 2px 8px; border-radius: 12px; font-size: 0.7rem; color: #8B4513;">Pandas</span>
                      <span style="background: #FFCCCB; border: 1px solid #8B4513; padding: 2px 8px; border-radius: 12px; font-size: 0.7rem; color: #8B4513;">SQL</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Dot Indicators -->
              <div style="display: flex; justify-content: center; gap: 8px; margin-top: 15px;">
                <div class="exp-dot active" style="width: 10px; height: 10px; background: #8B4513; border-radius: 50%; cursor: pointer;"></div>
                <div class="exp-dot" style="width: 10px; height: 10px; background: #FFCCCB; border: 2px solid #8B4513; border-radius: 50%; cursor: pointer;"></div>
              </div>
            </div>
          </div>
        `;
      } else {
        contentText = `This is ${activeTabName} tab.`;
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
          <div style="background: #FFFFE0; border: 2px solid #8B4513; border-top: none; min-height: 200px; padding: 16px; position: relative;">
            <div id="content-area" style="margin-bottom: 16px;">
              ${contentText}
            </div>
            <div style="position: absolute; right: 4px; top: 16px; bottom: 16px; width: 16px; border: 2px solid #8B4513; background: #FFCCCB;">
              <div style="width: 8px; height: 8px; border: 2px solid #8B4513; background: #FFFFE0; margin: 2px auto;">▲</div>
              <div style="flex: 1; background: #FFFFE0; border: 1px solid #8B4513; margin: 4px 2px;"></div>
              <div style="width: 8px; height: 8px; border: 2px solid #8B4513; background: #FFFFE0; margin: 2px auto;">▼</div>
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
          });
        }
      });
    }

    // Initial render and add listeners
    renderBrowser();
    setTimeout(addEventListeners, 0);
    
    // Add experiences carousel functionality
    if (activeTab === 'experiences') {
      setTimeout(() => {
        let currentExpIndex = 0;
        const expCards = document.getElementById('exp-cards');
        const expDots = document.querySelectorAll('.exp-dot');
        const expPrev = document.getElementById('exp-prev');
        const expNext = document.getElementById('exp-next');
        
        function updateExpCarousel() {
          const translateX = -currentExpIndex * 100;
          expCards.style.transform = `translateX(${translateX}%)`;
          
          // Update dots
          expDots.forEach((dot, index) => {
            if (index === currentExpIndex) {
              dot.style.background = '#8B4513';
              dot.style.border = 'none';
            } else {
              dot.style.background = '#FFCCCB';
              dot.style.border = '2px solid #8B4513';
            }
          });
        }
        
        if (expPrev) {
          expPrev.addEventListener('click', () => {
            currentExpIndex = Math.max(0, currentExpIndex - 1);
            updateExpCarousel();
          });
        }
        
        if (expNext) {
          expNext.addEventListener('click', () => {
            currentExpIndex = Math.min(expDots.length - 1, currentExpIndex + 1);
            updateExpCarousel();
          });
        }
        
        // Dot navigation
        expDots.forEach((dot, index) => {
          dot.addEventListener('click', () => {
            currentExpIndex = index;
            updateExpCarousel();
          });
        });
      }, 100);
    }
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
