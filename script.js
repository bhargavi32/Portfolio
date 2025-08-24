// Simple and clean JavaScript for portfolio functionality

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing portfolio...');
    
    // Initialize resume functionality
    initializeResume();
    
    // Initialize other functionality
    initializeNavigation();
    initializeAnimations();
    
    console.log('Portfolio initialized successfully!');
});

// Resume functionality - COMPLETELY REBUILT
function initializeResume() {
    console.log('Initializing resume functionality...');
    
    // Get resume elements
    const downloadBtn = document.getElementById('download-resume-main');
    const previewBtn = document.getElementById('view-resume');
    const modal = document.getElementById('resume-modal');
    const closeBtn = document.getElementById('resume-close');
    
    console.log('Download button found:', !!downloadBtn);
    console.log('Preview button found:', !!previewBtn);
    console.log('Modal found:', !!modal);
    console.log('Close button found:', !!closeBtn);
    
    // Download functionality - REBUILT
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Download button clicked!');
            downloadResume();
        });
    }
    
    // Preview functionality - REBUILT
    if (previewBtn) {
        previewBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Preview button clicked!');
            openResumeInNewTab();
        });
    }
    
    // Close modal functionality - REBUILT
    if (closeBtn && modal) {
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Close button clicked!');
            closeResumeModal();
        });
        
        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeResumeModal();
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                closeResumeModal();
            }
        });
    }
}

// Simple download function - direct download on click
function downloadResume() {
    const resumeUrl = 'bhargavi.pdf';
    const fileName = 'Bhargavi_Kadambari_Resume.pdf';
    
    console.log('Starting download of:', resumeUrl);
    
    try {
        // Create download link
        const downloadLink = document.createElement('a');
        downloadLink.href = resumeUrl;
        downloadLink.download = fileName;
        downloadLink.style.display = 'none';
        
        // Add to page and click
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        
    } catch (error) {
        console.log('Download failed:', error);
    }
}



// Open resume modal - COMPLETELY REBUILT
function openResumeModal() {
    const modal = document.getElementById('resume-modal');
    if (modal) {
        // Show modal
        modal.style.display = 'block';
        
        // Prevent body scrolling
        document.body.style.overflow = 'hidden';
        
        // Add animation class
        setTimeout(() => {
            modal.classList.add('modal-active');
        }, 10);
        
        console.log('Resume modal opened successfully');
        
        // Focus on modal for accessibility
        modal.focus();
    } else {
        console.error('Modal not found!');
        // Fallback: open in new tab
        const resumeUrl = 'bhargavi.pdf';
        window.open(resumeUrl, '_blank');
    }
}

// Close resume modal - COMPLETELY REBUILT
function closeResumeModal() {
    const modal = document.getElementById('resume-modal');
    if (modal) {
        // Remove animation class
        modal.classList.remove('modal-active');
        
        // Hide modal after animation
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            console.log('Resume modal closed successfully');
        }, 150);
    }
}

// Open resume in new tab - NEW FUNCTION
function openResumeInNewTab() {
    const resumeUrl = 'bhargavi.pdf';
    console.log('Opening resume in new tab:', resumeUrl);
    
    try {
        const newWindow = window.open(resumeUrl, '_blank');
        if (!newWindow) {
            console.log('Popup blocked, please enable popups');
        }
    } catch (error) {
        console.error('Failed to open in new tab:', error);
    }
}



// Navigation functionality
function initializeNavigation() {
    // Mobile menu toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animation functionality
function initializeAnimations() {
    // Simple fade-in animation for sections
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });
}

// Notification system - REBUILT
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add close functionality
    const notificationCloseBtn = notification.querySelector('.notification-close');
    if (notificationCloseBtn) {
        notificationCloseBtn.addEventListener('click', () => {
            notification.remove();
        });
    }
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
}

// Skills Modal Functionality
function openSkillModal(title, skills) {
    console.log('Opening skill modal for:', title);
    
    // Create modal overlay
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 15px;
        max-width: 600px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        transform: translateY(20px);
        transition: transform 0.3s ease;
        border: 3px solid #4f46e5;
    `;
    
    // Create skills list
    const skillsList = skills.map(skill => `<li>${skill}</li>`).join('');
    
    modalContent.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h3 style="margin: 0; color: #4f46e5; font-size: 24px;">${title}</h3>
            <button onclick="closeSkillModal()" style="
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: #666;
                padding: 5px;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
            ">&times;</button>
        </div>
        <div style="margin-bottom: 20px;">
            <p style="color: #666; margin: 0; line-height: 1.6;">
                Here are the key technologies and skills in this category:
            </p>
        </div>
        <ul style="
            list-style: none;
            padding: 0;
            margin: 0;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 15px;
        ">
            ${skillsList}
        </ul>

    `;
    
    // Add modal class for easy removal
    modal.className = 'skill-modal';
    modalContent.className = 'skill-modal';
    
    // Add to page
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
        modalContent.style.transform = 'translateY(0)';
    }, 10);
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
            modalContent.remove();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && document.querySelector('.skill-modal')) {
            closeSkillModal();
        }
    });
}

// Function to properly close skill modal
function closeSkillModal() {
    const modal = document.querySelector('.skill-modal');
    const modalOverlay = document.querySelector('.skill-modal[style*="position: fixed"]');
    
    if (modal) {
        modal.remove();
    }
    if (modalOverlay) {
        modalOverlay.remove();
    }
    
    // Also remove any remaining skill-modal elements
    const remainingModals = document.querySelectorAll('.skill-modal');
    remainingModals.forEach(modal => modal.remove());
}

// Console message for developers
console.log(`
🚀 Portfolio Website
Built with HTML, CSS & JavaScript
Resume functionality REBUILT and ready!
Skills modal functionality ADDED!
`);
