document.addEventListener('DOMContentLoaded', function() {
    const terminalContents = [
        {
            elementId: 'terminal-1',
            text: `
                <p><span class="prompt">C:\\Users\\Developer></span> get-skills --section Dev</p>
                <p>Fetching development skills...</p>
                <br>
                <p><strong>Key Skills:</strong></p>
                <ul>
                    <li>Developing Computer Vision models using PyTorch and TensorFlow.</li>
                    <li>Building Deep Learning models for various AI applications.</li>
                    <li>Desktop Application Development using Python, C#, and C++.</li>
                </ul>
                <p><strong>Experience:</strong></p>
                <ul>
                    <li>Lead Developer & Project Manager for the Imayar initiative and Tissue AI software suite.</li>
                    <li>AI & Deep Learning Developer at Gonabad University of Medical Sciences.</li>
                    <li>Medical data & image analysis using OpenCV and proprietary tools.</li>
                </ul>
                <p><span class="prompt">C:\\Users\\Developer></span><span class="cursor">_</span></p>
            `
        },
        {
            elementId: 'terminal-2',
            text: `
                <p><span class="prompt">root@kali:~$</span> ./show_security_profile.sh</p>
                <p>Running security profile script...</p>
                <br>
                <p><strong>Core Competencies:</strong></p>
                <ul>
                    <li>Independent Developer of ethical hacking & penetration testing tools.</li>
                    <li>Security Lead for the Tissue AI software and Imayar project.</li>
                    <li>Penetration testing leveraging Reverse Engineering (C++/Assembly) and Social Engineering tactics.</li>
                </ul>
                <p><strong>Published Open-Source Tools on GitHub:</strong></p>
                <ul>
                    <li>Rapid IP Scanner</li>
                    <li>Proxy Scanner Utility</li>
                </ul>
                <p><strong>Security-Focused Languages:</strong> Python, C#, C++, Assembly, JavaScript, PHP</p>
                <p><span class="prompt">root@kali:~$</span><span class="cursor">_</span></p>
            `
        }
    ];

    function typeWriter(element, content, callback) {
        element.innerHTML = content;
        if (callback) {
            callback();
        }
    }

    const terminal1 = document.getElementById('terminal-1');
    const terminal2 = document.getElementById('terminal-2');
    terminal1.innerHTML = '';
    terminal2.innerHTML = '';

    setTimeout(() => {
        typeWriter(terminal1, terminalContents[0].text, () => {
            setTimeout(() => {
                typeWriter(terminal2, terminalContents[1].text);
            }, 500);
        });
    }, 500);

    const windows = document.querySelectorAll('.window');
    windows.forEach(window => {
        window.classList.add('closed');
        makeDraggable(window);
        setupWindowControls(window);
        window.style.visibility = 'visible';
    });

    setupTaskbarIcons();
    setupAuroraCanvas();
    setupAnimatedFavicon();
});

function setupAnimatedFavicon() {
        const favicon = document.getElementById('dynamic-favicon');
        const icons = ['favicon-1.svg', 'favicon-2.svg', 'favicon-3.svg'];
        let currentIndex = 0;

        setInterval(() => {
            currentIndex = (currentIndex + 1) % icons.length;
            favicon.href = icons[currentIndex];
        }, 700);
}


function makeDraggable(windowElement) {
    const titleBar = windowElement.querySelector('.title-bar');
    let offsetX, offsetY;
    
    function onMouseDown(e) {
        e.preventDefault();

        document.querySelectorAll('.window').forEach(win => {
            win.style.zIndex = parseInt(win.style.zIndex) - 10 < 10 ? 11 : parseInt(win.style.zIndex) - 10;
        });
        windowElement.style.zIndex = 20;
        
        const event = e.touches ? e.touches[0] : e;
        offsetX = event.clientX - windowElement.offsetLeft;
        offsetY = event.clientY - windowElement.offsetTop;
        
        document.addEventListener('mousemove', dragWindow);
        document.addEventListener('mouseup', stopDragging);
        document.addEventListener('touchmove', dragWindow, { passive: false });
        document.addEventListener('touchend', stopDragging);
    }

    titleBar.addEventListener('mousedown', onMouseDown);
    titleBar.addEventListener('touchstart', onMouseDown);

    function dragWindow(e) {
        e.preventDefault();
        const event = e.touches ? e.touches[0] : e;
        let newX = event.clientX - offsetX;
        let newY = event.clientY - offsetY;
        windowElement.style.top = newY + 'px';
        windowElement.style.left = newX + 'px';
    }

    function stopDragging() {
        document.removeEventListener('mousemove', dragWindow);
        document.removeEventListener('mouseup', stopDragging);
        document.removeEventListener('touchmove', dragWindow);
        document.removeEventListener('touchend', stopDragging);
    }
}

function setupWindowControls(windowElement) {
    const closeButton = windowElement.querySelector('.win-close, .linux-close');
    const windowId = windowElement.id.includes('1') ? 'win' : 'kali';
    const taskbarIcon = document.getElementById(`task-icon-${windowId}`);

    if (closeButton) {
        closeButton.addEventListener('click', (e) => {
            e.stopPropagation();
            windowElement.classList.add('closed');
            taskbarIcon.classList.remove('active');
        });
    }
}

function setupTaskbarIcons() {
    const taskIconWin = document.getElementById('task-icon-win');
    const taskIconKali = document.getElementById('task-icon-kali');
    const window1 = document.getElementById('window-1');
    const window2 = document.getElementById('window-2');

    function toggleWindow(windowEl, taskIcon) {
        if (windowEl.classList.contains('closed')) {
            windowEl.classList.remove('closed');
            taskIcon.classList.add('active');
            
            document.querySelectorAll('.window').forEach(win => {
                if (!win.classList.contains('closed')) {
                    win.style.zIndex = parseInt(win.style.zIndex) - 10 < 10 ? 11 : parseInt(win.style.zIndex) - 10;
                }
            });
            windowEl.style.zIndex = 20;

        } else {
             windowEl.classList.add('closed');
             taskIcon.classList.remove('active');
        }
    }

    taskIconWin.addEventListener('click', () => toggleWindow(window1, taskIconWin));
    taskIconKali.addEventListener('click', () => toggleWindow(window2, taskIconKali));
}


function setupAuroraCanvas() {
    const canvas = document.getElementById('aurora-canvas');
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let mouse = { x: width / 2, y: height / 2 };

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    
    document.addEventListener('touchmove', (e) => {
        if(e.touches.length > 0){
            mouse.x = e.touches[0].clientX;
            mouse.y = e.touches[0].clientY;
        }
    });

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.life = Math.random() * 500;
            this.maxLife = this.life;
            this.color = `hsla(${Math.random() * 60 + 120}, 70%, 50%, 0)`;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.life--;
            
            const opacity = Math.max(0, Math.sin(Math.PI * (this.life / this.maxLife)));
            this.color = `hsla(${Math.random() * 60 + 120}, 70%, 50%, ${opacity * 0.5})`;

            if (this.life <= 0) {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.life = Math.random() * 500;
                this.maxLife = this.life;
            }
        }
    }

    const particles = Array.from({ length: 100 }, () => new Particle());

    function animate() {
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = 'rgba(13, 13, 13, 0.1)';
        ctx.fillRect(0, 0, width, height);

        particles.forEach(p => {
            p.update();
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        });

        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        const radius = 120;
        const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, radius);
        gradient.addColorStop(0, 'rgba(0,0,0,1)');
        gradient.addColorStop(0.5, 'rgba(0,0,0,0.95)');
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = gradient;
        ctx.arc(mouse.x, mouse.y, radius, 0, Math.PI * 2);
        ctx.fill();
        
        requestAnimationFrame(animate);
    }

    
    animate();
}