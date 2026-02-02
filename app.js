// Main Application
class JessesApp {
    constructor() {
        this.currentModule = null;
        this.highContrast = false;
        this.init();
    }

    init() {
        // Event Listeners
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const module = e.target.dataset.module;
                this.loadModule(module);
            });
        });

        document.getElementById('accessibility-btn').addEventListener('click', () => {
            this.toggleHighContrast();
        });

        document.getElementById('back-btn').addEventListener('click', () => {
            this.goBack();
        });
    }

    loadModule(moduleName) {
        const contentArea = document.getElementById('content-area');
        document.getElementById('back-btn').classList.remove('hidden');
        this.currentModule = moduleName;

        switch(moduleName) {
            case 'learning':
                contentArea.innerHTML = this.getLearningModule();
                this.initLearningModule();
                break;
            case 'calming':
                contentArea.innerHTML = this.getCalmingModule();
                this.initCalmingModule();
                break;
            case 'adventures':
                contentArea.innerHTML = this.getAdventuresModule();
                this.initAdventuresModule();
                break;
            case 'hygiene':
                contentArea.innerHTML = this.getHygieneModule();
                this.initHygieneModule();
                break;
            case 'respect':
                contentArea.innerHTML = this.getRespectModule();
                this.initRespectModule();
                break;
        }
    }

    // Learning Module
    getLearningModule() {
        return `
            <div class="activity-screen">
                <h2>📚 Interactive Learning</h2>
                <div class="activity-grid">
                    <div class="activity-card" data-activity="colors">
                        <div class="icon">🎨</div>
                        <h3>Learn Colors</h3>
                        <p>Explore the rainbow!</p>
                    </div>
                    <div class="activity-card" data-activity="shapes">
                        <div class="icon">⭐</div>
                        <h3>Learn Shapes</h3>
                        <p>Find different shapes!</p>
                    </div>
                    <div class="activity-card" data-activity="numbers">
                        <div class="icon">🔢</div>
                        <h3>Learn Numbers</h3>
                        <p>Count with me!</p>
                    </div>
                    <div class="activity-card" data-activity="letters">
                        <div class="icon">🔤</div>
                        <h3>Learn Letters</h3>
                        <p>ABC adventure!</p>
                    </div>
                </div>
            </div>
        `;
    }

    initLearningModule() {
        document.querySelectorAll('.activity-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const activity = e.currentTarget.dataset.activity;
                this.loadLearningActivity(activity);
            });
        });
    }

    loadLearningActivity(activity) {
        const contentArea = document.getElementById('content-area');
        
        switch(activity) {
            case 'colors':
                contentArea.innerHTML = `
                    <div class="activity-screen">
                        <h2>🎨 Learn Colors</h2>
                        <p style="text-align: center; font-size: 1.3rem; margin-bottom: 20px;">
                            Click on each color to hear its name!
                        </p>
                        <div class="activity-grid">
                            ${this.getColorCards()}
                        </div>
                        <div id="color-feedback" style="margin-top: 20px; text-align: center; font-size: 1.5rem;"></div>
                    </div>
                `;
                this.initColorActivity();
                break;
            case 'shapes':
                contentArea.innerHTML = `
                    <div class="activity-screen">
                        <h2>⭐ Learn Shapes</h2>
                        <p style="text-align: center; font-size: 1.3rem; margin-bottom: 20px;">
                            Match the shapes!
                        </p>
                        <div class="activity-grid">
                            ${this.getShapeCards()}
                        </div>
                        <div id="shape-feedback" style="margin-top: 20px; text-align: center; font-size: 1.5rem;"></div>
                    </div>
                `;
                this.initShapeActivity();
                break;
            case 'numbers':
                contentArea.innerHTML = `
                    <div class="activity-screen">
                        <h2>🔢 Learn Numbers</h2>
                        <p style="text-align: center; font-size: 1.3rem; margin-bottom: 20px;">
                            Count the objects!
                        </p>
                        <div id="number-game">
                            ${this.getNumberGame()}
                        </div>
                        <div id="number-feedback" style="margin-top: 20px; text-align: center; font-size: 1.5rem;"></div>
                    </div>
                `;
                this.initNumberActivity();
                break;
            case 'letters':
                contentArea.innerHTML = `
                    <div class="activity-screen">
                        <h2>🔤 Learn Letters</h2>
                        <p style="text-align: center; font-size: 1.3rem; margin-bottom: 20px;">
                            Click on letters to practice!
                        </p>
                        <div class="activity-grid">
                            ${this.getLetterCards()}
                        </div>
                        <div id="letter-feedback" style="margin-top: 20px; text-align: center; font-size: 1.5rem;"></div>
                    </div>
                `;
                this.initLetterActivity();
                break;
        }
    }

    getColorCards() {
        const colors = [
            { name: 'Red', emoji: '🔴', color: '#ff6b6b' },
            { name: 'Blue', emoji: '🔵', color: '#4dabf7' },
            { name: 'Yellow', emoji: '🟡', color: '#ffd43b' },
            { name: 'Green', emoji: '🟢', color: '#51cf66' },
            { name: 'Orange', emoji: '🟠', color: '#ff922b' },
            { name: 'Purple', emoji: '🟣', color: '#9775fa' }
        ];

        return colors.map(c => `
            <div class="activity-card color-card" data-color="${c.name}" style="background: ${c.color};">
                <div class="icon" style="font-size: 4rem;">${c.emoji}</div>
                <h3 style="color: white; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">${c.name}</h3>
            </div>
        `).join('');
    }

    initColorActivity() {
        document.querySelectorAll('.color-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const colorName = e.currentTarget.dataset.color;
                const feedback = document.getElementById('color-feedback');
                feedback.innerHTML = `<div class="success-message">🎉 Great! This is ${colorName}! 🎉</div>`;
                this.speak(colorName);
            });
        });
    }

    getShapeCards() {
        const shapes = [
            { name: 'Circle', emoji: '⚪' },
            { name: 'Square', emoji: '⬜' },
            { name: 'Triangle', emoji: '🔺' },
            { name: 'Star', emoji: '⭐' },
            { name: 'Heart', emoji: '❤️' },
            { name: 'Diamond', emoji: '💎' }
        ];

        return shapes.map(s => `
            <div class="activity-card shape-card" data-shape="${s.name}">
                <div class="icon" style="font-size: 5rem;">${s.emoji}</div>
                <h3>${s.name}</h3>
            </div>
        `).join('');
    }

    initShapeActivity() {
        document.querySelectorAll('.shape-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const shapeName = e.currentTarget.dataset.shape;
                const feedback = document.getElementById('shape-feedback');
                feedback.innerHTML = `<div class="success-message">✨ Excellent! This is a ${shapeName}! ✨</div>`;
                this.speak(shapeName);
            });
        });
    }

    getNumberGame() {
        const number = Math.floor(Math.random() * 5) + 1;
        const emojis = ['🌟', '🎈', '🎨', '🎁', '⭐'];
        const emoji = emojis[Math.floor(Math.random() * emojis.length)];
        
        return `
            <div style="text-align: center;">
                <p style="font-size: 1.5rem; margin-bottom: 20px;">How many ${emoji} do you see?</p>
                <div style="font-size: 4rem; margin: 30px 0;">
                    ${emoji.repeat(number)}
                </div>
                <div class="activity-grid" style="max-width: 500px; margin: 0 auto;">
                    ${[1, 2, 3, 4, 5].map(n => `
                        <div class="interactive-element number-choice" data-number="${n}">
                            ${n}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    initNumberActivity() {
        const correctAnswer = document.querySelectorAll('[style*="font-size: 4rem"]')[0].textContent.trim().length;
        
        document.querySelectorAll('.number-choice').forEach(choice => {
            choice.addEventListener('click', (e) => {
                const selected = parseInt(e.target.dataset.number);
                const feedback = document.getElementById('number-feedback');
                
                if (selected === correctAnswer) {
                    e.target.classList.add('correct');
                    feedback.innerHTML = `<div class="success-message">🎉 Perfect! The answer is ${correctAnswer}! 🎉</div>`;
                    this.speak(`Correct! ${correctAnswer}`);
                    setTimeout(() => {
                        this.loadLearningActivity('numbers');
                    }, 2000);
                } else {
                    e.target.classList.add('incorrect');
                    setTimeout(() => {
                        e.target.classList.remove('incorrect');
                    }, 500);
                }
            });
        });
    }

    getLetterCards() {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        
        return letters.map(letter => `
            <div class="activity-card letter-card" data-letter="${letter}">
                <div class="icon" style="font-size: 3rem; font-weight: bold; color: #667eea;">${letter}</div>
                <h3>${letter}</h3>
            </div>
        `).join('');
    }

    initLetterActivity() {
        document.querySelectorAll('.letter-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const letter = e.currentTarget.dataset.letter;
                const feedback = document.getElementById('letter-feedback');
                feedback.innerHTML = `<div class="success-message">📖 Great! This is the letter ${letter}! 📖</div>`;
                this.speak(`Letter ${letter}`);
            });
        });
    }

    // Calming Module
    getCalmingModule() {
        return `
            <div class="activity-screen">
                <h2>🌈 Calming & Sensory</h2>
                <div class="activity-grid">
                    <div class="activity-card" data-activity="breathing">
                        <div class="icon">🫁</div>
                        <h3>Breathing Exercise</h3>
                        <p>Breathe and relax</p>
                    </div>
                    <div class="activity-card" data-activity="colors">
                        <div class="icon">🌈</div>
                        <h3>Calming Colors</h3>
                        <p>Watch soothing colors</p>
                    </div>
                    <div class="activity-card" data-activity="sounds">
                        <div class="icon">🎵</div>
                        <h3>Peaceful Sounds</h3>
                        <p>Listen to calm music</p>
                    </div>
                    <div class="activity-card" data-activity="patterns">
                        <div class="icon">✨</div>
                        <h3>Relaxing Patterns</h3>
                        <p>Watch flowing patterns</p>
                    </div>
                </div>
            </div>
        `;
    }

    initCalmingModule() {
        document.querySelectorAll('.activity-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const activity = e.currentTarget.dataset.activity;
                this.loadCalmingActivity(activity);
            });
        });
    }

    loadCalmingActivity(activity) {
        const contentArea = document.getElementById('content-area');
        
        switch(activity) {
            case 'breathing':
                contentArea.innerHTML = `
                    <div class="activity-screen" style="text-align: center;">
                        <h2>🫁 Breathing Exercise</h2>
                        <p style="font-size: 1.3rem; margin: 20px 0;">Follow the circle with your breath</p>
                        <div class="breathing-circle"></div>
                        <div class="breathing-text" id="breathing-text">Breathe In...</div>
                        <p style="font-size: 1.2rem; margin-top: 30px; color: #666;">
                            Inhale when the circle grows<br>
                            Exhale when the circle shrinks
                        </p>
                    </div>
                `;
                this.startBreathingExercise();
                break;
            case 'colors':
                contentArea.innerHTML = `
                    <div class="activity-screen" style="text-align: center;">
                        <h2>🌈 Calming Colors</h2>
                        <div id="color-canvas" style="width: 100%; height: 400px; border-radius: 15px; margin: 20px 0;"></div>
                        <button class="interactive-element" onclick="app.changeColor()">Change Color</button>
                    </div>
                `;
                this.startColorTherapy();
                break;
            case 'sounds':
                contentArea.innerHTML = `
                    <div class="activity-screen" style="text-align: center;">
                        <h2>🎵 Peaceful Sounds</h2>
                        <p style="font-size: 1.3rem; margin: 20px 0;">Choose a calming sound</p>
                        <div class="activity-grid" style="max-width: 600px; margin: 0 auto;">
                            <div class="activity-card" onclick="app.playSound('ocean')">
                                <div class="icon">🌊</div>
                                <h3>Ocean Waves</h3>
                            </div>
                            <div class="activity-card" onclick="app.playSound('rain')">
                                <div class="icon">🌧️</div>
                                <h3>Gentle Rain</h3>
                            </div>
                            <div class="activity-card" onclick="app.playSound('birds')">
                                <div class="icon">🐦</div>
                                <h3>Birds Singing</h3>
                            </div>
                            <div class="activity-card" onclick="app.playSound('wind')">
                                <div class="icon">🍃</div>
                                <h3>Soft Wind</h3>
                            </div>
                        </div>
                        <p style="margin-top: 20px; font-size: 1.2rem; color: #667eea;">Close your eyes and imagine...</p>
                    </div>
                `;
                break;
            case 'patterns':
                contentArea.innerHTML = `
                    <div class="activity-screen" style="text-align: center;">
                        <h2>✨ Relaxing Patterns</h2>
                        <canvas id="pattern-canvas" width="600" height="400" style="max-width: 100%; border-radius: 15px; margin: 20px 0; background: white;"></canvas>
                        <button class="interactive-element" onclick="app.changePattern()">New Pattern</button>
                    </div>
                `;
                this.startPatternAnimation();
                break;
        }
    }

    startBreathingExercise() {
        let phase = 0;
        const text = document.getElementById('breathing-text');
        
        setInterval(() => {
            phase = (phase + 1) % 4;
            switch(phase) {
                case 0:
                    text.textContent = 'Breathe In...';
                    break;
                case 1:
                    text.textContent = 'Hold...';
                    break;
                case 2:
                    text.textContent = 'Breathe Out...';
                    break;
                case 3:
                    text.textContent = 'Hold...';
                    break;
            }
        }, 2000);
    }

    startColorTherapy() {
        const canvas = document.getElementById('color-canvas');
        this.currentColorIndex = 0;
        this.calmingColors = [
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
            'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
            'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
            'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)'
        ];
        this.changeColor();
    }

    changeColor() {
        const canvas = document.getElementById('color-canvas');
        if (canvas) {
            canvas.style.background = this.calmingColors[this.currentColorIndex];
            canvas.style.transition = 'background 2s ease';
            this.currentColorIndex = (this.currentColorIndex + 1) % this.calmingColors.length;
        }
    }

    playSound(soundType) {
        const soundMessages = {
            ocean: '🌊 Listen to the peaceful ocean waves...',
            rain: '🌧️ Hear the gentle rain falling...',
            birds: '🐦 Enjoy the birds singing in nature...',
            wind: '🍃 Feel the soft wind blowing...'
        };
        
        alert(soundMessages[soundType] + '\n\nImagine yourself in this peaceful place.');
    }

    startPatternAnimation() {
        const canvas = document.getElementById('pattern-canvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        let time = 0;
        
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = 0; i < 50; i++) {
                const x = (i * 30 + time) % canvas.width;
                const y = Math.sin(i + time / 50) * 100 + canvas.height / 2;
                const size = Math.sin(time / 20 + i) * 10 + 15;
                
                ctx.fillStyle = `hsl(${(i * 20 + time) % 360}, 70%, 60%)`;
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fill();
            }
            
            time += 0.5;
            requestAnimationFrame(animate);
        };
        
        animate();
    }

    changePattern() {
        this.startPatternAnimation();
    }

    // Adventures Module
    getAdventuresModule() {
        return `
            <div class="activity-screen">
                <h2>🎒 Adventures</h2>
                <div class="activity-grid">
                    <div class="activity-card" data-story="forest">
                        <div class="icon">🌳</div>
                        <h3>Forest Adventure</h3>
                        <p>Explore the magical forest</p>
                    </div>
                    <div class="activity-card" data-story="ocean">
                        <div class="icon">🌊</div>
                        <h3>Ocean Journey</h3>
                        <p>Dive into the deep sea</p>
                    </div>
                    <div class="activity-card" data-story="space">
                        <div class="icon">🚀</div>
                        <h3>Space Quest</h3>
                        <p>Travel to the stars</p>
                    </div>
                    <div class="activity-card" data-story="garden">
                        <div class="icon">🌺</div>
                        <h3>Garden Discovery</h3>
                        <p>Find beautiful flowers</p>
                    </div>
                </div>
            </div>
        `;
    }

    initAdventuresModule() {
        document.querySelectorAll('.activity-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const story = e.currentTarget.dataset.story;
                this.loadStory(story);
            });
        });
    }

    loadStory(storyType) {
        const stories = {
            forest: {
                title: '🌳 Forest Adventure',
                text: 'You walk into a beautiful forest. The trees are tall and green. You hear birds singing.',
                choices: [
                    { text: 'Follow the path', result: 'You find a friendly rabbit! 🐰' },
                    { text: 'Look at the flowers', result: 'You discover beautiful butterflies! 🦋' }
                ]
            },
            ocean: {
                title: '🌊 Ocean Journey',
                text: 'You dive into the clear blue ocean. Colorful fish swim around you.',
                choices: [
                    { text: 'Swim deeper', result: 'You meet a friendly dolphin! 🐬' },
                    { text: 'Explore the coral', result: 'You find a treasure chest! 💎' }
                ]
            },
            space: {
                title: '🚀 Space Quest',
                text: 'Your rocket launches into space! You see stars and planets all around.',
                choices: [
                    { text: 'Visit the moon', result: 'You bounce on the moon! 🌙' },
                    { text: 'Explore Mars', result: 'You discover alien friends! 👽' }
                ]
            },
            garden: {
                title: '🌺 Garden Discovery',
                text: 'You enter a magical garden full of colorful flowers and buzzing bees.',
                choices: [
                    { text: 'Smell the roses', result: 'They smell wonderful! 🌹' },
                    { text: 'Follow the bee', result: 'You find a honey tree! 🍯' }
                ]
            }
        };

        const story = stories[storyType];
        const contentArea = document.getElementById('content-area');
        
        contentArea.innerHTML = `
            <div class="activity-screen">
                <h2>${story.title}</h2>
                <div class="step-container">
                    <p style="font-size: 1.4rem; text-align: center; margin: 20px 0; line-height: 1.6;">
                        ${story.text}
                    </p>
                    <div style="text-align: center; font-size: 3rem; margin: 30px 0;">
                        ${this.getStoryEmoji(storyType)}
                    </div>
                    <p style="font-size: 1.3rem; text-align: center; margin: 20px 0; color: #667eea; font-weight: bold;">
                        What would you like to do?
                    </p>
                    <div style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;">
                        ${story.choices.map((choice, index) => `
                            <button class="interactive-element" onclick="app.showStoryResult('${choice.result}')">
                                ${choice.text}
                            </button>
                        `).join('')}
                    </div>
                    <div id="story-result" style="margin-top: 30px; text-align: center;"></div>
                </div>
            </div>
        `;
    }

    getStoryEmoji(storyType) {
        const emojis = {
            forest: '🌳🌲🦋🐰🌸',
            ocean: '🌊🐠🐬🐙🦈',
            space: '🚀⭐🌙🪐👽',
            garden: '🌺🌻🐝🦋🌹'
        };
        return emojis[storyType] || '✨';
    }

    showStoryResult(result) {
        const resultDiv = document.getElementById('story-result');
        resultDiv.innerHTML = `
            <div class="success-message" style="font-size: 1.5rem;">
                ${result}<br><br>
                🎉 Great choice! 🎉
            </div>
        `;
        this.speak(result);
    }

    // Hygiene Module
    getHygieneModule() {
        return `
            <div class="activity-screen">
                <h2>🧼 Hygiene Practices</h2>
                <div class="activity-grid">
                    <div class="activity-card" data-routine="handwashing">
                        <div class="icon">🧼</div>
                        <h3>Washing Hands</h3>
                        <p>Learn to wash hands properly</p>
                    </div>
                    <div class="activity-card" data-routine="brushing">
                        <div class="icon">🪥</div>
                        <h3>Brushing Teeth</h3>
                        <p>Keep your teeth clean</p>
                    </div>
                    <div class="activity-card" data-routine="bathing">
                        <div class="icon">🛁</div>
                        <h3>Taking a Bath</h3>
                        <p>Stay clean and fresh</p>
                    </div>
                    <div class="activity-card" data-routine="routine">
                        <div class="icon">📅</div>
                        <h3>Daily Routine</h3>
                        <p>Morning and bedtime</p>
                    </div>
                </div>
            </div>
        `;
    }

    initHygieneModule() {
        document.querySelectorAll('.activity-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const routine = e.currentTarget.dataset.routine;
                this.loadHygieneRoutine(routine);
            });
        });
    }

    loadHygieneRoutine(routineType) {
        const routines = {
            handwashing: {
                title: '🧼 How to Wash Your Hands',
                steps: [
                    { icon: '💧', text: 'Turn on the water', detail: 'Use warm water' },
                    { icon: '🧼', text: 'Put soap on your hands', detail: 'Rub it around' },
                    { icon: '👏', text: 'Rub your hands together', detail: 'For 20 seconds' },
                    { icon: '💦', text: 'Rinse with water', detail: 'Wash all the soap away' },
                    { icon: '🤲', text: 'Dry your hands', detail: 'Use a clean towel' }
                ]
            },
            brushing: {
                title: '🪥 How to Brush Your Teeth',
                steps: [
                    { icon: '🪥', text: 'Get your toothbrush', detail: 'And toothpaste' },
                    { icon: '💧', text: 'Wet the toothbrush', detail: 'With a little water' },
                    { icon: '🦷', text: 'Put toothpaste on brush', detail: 'Just a pea-sized amount' },
                    { icon: '⭕', text: 'Brush in circles', detail: 'Gently on all teeth' },
                    { icon: '💦', text: 'Rinse and spit', detail: 'Clean your mouth' }
                ]
            },
            bathing: {
                title: '🛁 How to Take a Bath',
                steps: [
                    { icon: '🚿', text: 'Fill the tub with water', detail: 'Not too hot, not too cold' },
                    { icon: '🧼', text: 'Get your soap and washcloth', detail: 'Be prepared' },
                    { icon: '💦', text: 'Wash your body', detail: 'Start from top to bottom' },
                    { icon: '🧴', text: 'Wash your hair', detail: 'Use shampoo gently' },
                    { icon: '🏊', text: 'Rinse off', detail: 'Remove all soap' },
                    { icon: '🧺', text: 'Dry with a towel', detail: 'Put on clean clothes' }
                ]
            },
            routine: {
                title: '📅 Daily Routine',
                steps: [
                    { icon: '🌅', text: 'Wake up', detail: 'Start your day fresh' },
                    { icon: '🪥', text: 'Brush teeth', detail: 'Morning cleaning' },
                    { icon: '🧼', text: 'Wash face and hands', detail: 'Feel refreshed' },
                    { icon: '👕', text: 'Get dressed', detail: 'Choose comfortable clothes' },
                    { icon: '🌙', text: 'Before bed routine', detail: 'Brush, wash, and rest' }
                ]
            }
        };

        const routine = routines[routineType];
        const contentArea = document.getElementById('content-area');
        
        contentArea.innerHTML = `
            <div class="activity-screen">
                <h2>${routine.title}</h2>
                <div class="step-container">
                    ${routine.steps.map((step, index) => `
                        <div class="step">
                            <div class="step-number">${index + 1}</div>
                            <div class="step-icon">${step.icon}</div>
                            <div class="step-content">
                                <h3>${step.text}</h3>
                                <p style="color: #666; font-size: 1.1rem;">${step.detail}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div style="text-align: center; margin-top: 30px;">
                    <div class="success-message">
                        ⭐ Great job learning! Practice every day! ⭐
                    </div>
                </div>
            </div>
        `;
    }

    // Respect Module
    getRespectModule() {
        return `
            <div class="activity-screen">
                <h2>💖 Respect & Appreciation</h2>
                <div class="activity-grid">
                    <div class="activity-card" data-activity="emotions">
                        <div class="icon">😊</div>
                        <h3>Understanding Emotions</h3>
                        <p>Learn about feelings</p>
                    </div>
                    <div class="activity-card" data-activity="kindness">
                        <div class="icon">🤝</div>
                        <h3>Acts of Kindness</h3>
                        <p>Be kind to others</p>
                    </div>
                    <div class="activity-card" data-activity="sharing">
                        <div class="icon">🎁</div>
                        <h3>Sharing & Caring</h3>
                        <p>Share with friends</p>
                    </div>
                    <div class="activity-card" data-activity="gratitude">
                        <div class="icon">🙏</div>
                        <h3>Saying Thank You</h3>
                        <p>Show appreciation</p>
                    </div>
                </div>
            </div>
        `;
    }

    initRespectModule() {
        document.querySelectorAll('.activity-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const activity = e.currentTarget.dataset.activity;
                this.loadRespectActivity(activity);
            });
        });
    }

    loadRespectActivity(activity) {
        const contentArea = document.getElementById('content-area');
        
        switch(activity) {
            case 'emotions':
                contentArea.innerHTML = `
                    <div class="activity-screen">
                        <h2>😊 Understanding Emotions</h2>
                        <p style="text-align: center; font-size: 1.3rem; margin: 20px 0;">
                            Click on each emotion to learn about feelings!
                        </p>
                        <div class="activity-grid">
                            ${this.getEmotionCards()}
                        </div>
                        <div id="emotion-feedback" style="margin-top: 20px; text-align: center;"></div>
                    </div>
                `;
                this.initEmotionActivity();
                break;
            case 'kindness':
                contentArea.innerHTML = `
                    <div class="activity-screen">
                        <h2>🤝 Acts of Kindness</h2>
                        <div class="step-container">
                            <p style="font-size: 1.3rem; text-align: center; margin-bottom: 30px;">
                                Here are wonderful ways to be kind:
                            </p>
                            ${this.getKindnessExamples()}
                        </div>
                    </div>
                `;
                break;
            case 'sharing':
                contentArea.innerHTML = `
                    <div class="activity-screen">
                        <h2>🎁 Sharing & Caring</h2>
                        <div class="step-container">
                            <p style="font-size: 1.4rem; text-align: center; margin: 20px 0; line-height: 1.6;">
                                Your friend wants to play with your toy. What do you do?
                            </p>
                            <div style="text-align: center; font-size: 4rem; margin: 30px 0;">🧸</div>
                            <div style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;">
                                <button class="interactive-element" onclick="app.showSharingResult('share')">
                                    Share the toy 🤝
                                </button>
                                <button class="interactive-element" onclick="app.showSharingResult('take-turns')">
                                    Take turns ⏰
                                </button>
                            </div>
                            <div id="sharing-result" style="margin-top: 30px;"></div>
                        </div>
                    </div>
                `;
                break;
            case 'gratitude':
                contentArea.innerHTML = `
                    <div class="activity-screen">
                        <h2>🙏 Saying Thank You</h2>
                        <div class="step-container">
                            <p style="font-size: 1.3rem; text-align: center; margin-bottom: 30px;">
                                It's important to say thank you! Here's when:
                            </p>
                            ${this.getGratitudeExamples()}
                            <div style="text-align: center; margin-top: 30px;">
                                <div class="success-message">
                                    💖 Remember to say "Thank you!" every day! 💖
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                break;
        }
    }

    getEmotionCards() {
        const emotions = [
            { name: 'Happy', emoji: '😊', description: 'When you feel joyful and smile!' },
            { name: 'Sad', emoji: '😢', description: 'When you feel down and might cry' },
            { name: 'Excited', emoji: '🤗', description: 'When you\'re looking forward to something!' },
            { name: 'Calm', emoji: '😌', description: 'When you feel peaceful and relaxed' },
            { name: 'Surprised', emoji: '😲', description: 'When something unexpected happens!' },
            { name: 'Loved', emoji: '🥰', description: 'When you feel cared for and special' }
        ];

        return emotions.map(e => `
            <div class="activity-card emotion-card" data-emotion="${e.name}" data-description="${e.description}">
                <div class="icon" style="font-size: 4rem;">${e.emoji}</div>
                <h3>${e.name}</h3>
            </div>
        `).join('');
    }

    initEmotionActivity() {
        document.querySelectorAll('.emotion-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const emotion = e.currentTarget.dataset.emotion;
                const description = e.currentTarget.dataset.description;
                const feedback = document.getElementById('emotion-feedback');
                feedback.innerHTML = `
                    <div class="success-message">
                        <strong>${emotion}</strong><br>
                        ${description}
                    </div>
                `;
                this.speak(`${emotion}. ${description}`);
            });
        });
    }

    getKindnessExamples() {
        const examples = [
            { icon: '😊', text: 'Smile at someone', detail: 'It brightens their day!' },
            { icon: '🤝', text: 'Help a friend', detail: 'Lend a helping hand' },
            { icon: '💬', text: 'Say nice things', detail: 'Use kind words' },
            { icon: '🎁', text: 'Share your things', detail: 'Sharing is caring' },
            { icon: '🫂', text: 'Give a hug', detail: 'Show you care (with permission)' }
        ];

        return examples.map((example, index) => `
            <div class="step">
                <div class="step-number">${index + 1}</div>
                <div class="step-icon">${example.icon}</div>
                <div class="step-content">
                    <h3>${example.text}</h3>
                    <p style="color: #666; font-size: 1.1rem;">${example.detail}</p>
                </div>
            </div>
        `).join('');
    }

    showSharingResult(choice) {
        const results = {
            'share': '🌟 Wonderful! Sharing makes everyone happy! 🌟',
            'take-turns': '⭐ Great idea! Taking turns is fair and kind! ⭐'
        };
        
        const resultDiv = document.getElementById('sharing-result');
        resultDiv.innerHTML = `<div class="success-message">${results[choice]}</div>`;
        this.speak(results[choice]);
    }

    getGratitudeExamples() {
        const examples = [
            { icon: '🎁', text: 'When someone gives you a gift', detail: 'Say "Thank you for the gift!"' },
            { icon: '🤝', text: 'When someone helps you', detail: 'Say "Thank you for helping me!"' },
            { icon: '🍽️', text: 'After eating a meal', detail: 'Say "Thank you for the food!"' },
            { icon: '💝', text: 'When someone is kind', detail: 'Say "Thank you for being nice!"' },
            { icon: '👨‍👩‍👧', text: 'To your family every day', detail: 'Say "Thank you for loving me!"' }
        ];

        return examples.map((example, index) => `
            <div class="step">
                <div class="step-number">${index + 1}</div>
                <div class="step-icon">${example.icon}</div>
                <div class="step-content">
                    <h3>${example.text}</h3>
                    <p style="color: #666; font-size: 1.1rem;">${example.detail}</p>
                </div>
            </div>
        `).join('');
    }

    // Utility Functions
    toggleHighContrast() {
        this.highContrast = !this.highContrast;
        document.body.classList.toggle('high-contrast');
    }

    goBack() {
        const contentArea = document.getElementById('content-area');
        
        if (this.currentModule) {
            // Go back to module menu
            contentArea.innerHTML = '';
            this.loadModule(this.currentModule);
        } else {
            // Go back to main menu
            contentArea.innerHTML = `
                <div class="welcome-screen">
                    <h2>Welcome! 👋</h2>
                    <p>Choose an activity to begin your adventure!</p>
                    <div class="welcome-animations">
                        <span class="star">⭐</span>
                        <span class="star">✨</span>
                        <span class="star">🌟</span>
                    </div>
                </div>
            `;
            document.getElementById('back-btn').classList.add('hidden');
        }
    }

    speak(text) {
        // Text-to-speech functionality
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.8;
            utterance.pitch = 1.1;
            window.speechSynthesis.speak(utterance);
        }
    }
}

// Initialize app when DOM is loaded
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new JessesApp();
});
