let selectedColor = 'blue';

// Dummy Data for Calendars
let calendars = [
    { id: '1', name: 'Personal', url: 'https://calendar.google.com/ical/123...', color: 'blue', visible: true },
    { id: '2', name: 'Work', url: 'https://calendar.google.com/ical/456...', color: 'red', visible: true }
];

// INITIALIZATION 
document.addEventListener('DOMContentLoaded', () => {
    // Mock initializing mode
    switchTab('calendar', false);

    // Mock initializing config
    document.getElementById('themeSelect').value = 'day';
    document.getElementById('refreshFreq').value = '60';
    document.getElementById('fontSize').value = '20';

    renderCalendars();

    document.getElementById('lastRefreshSpan').innerText = "08:22";
    document.getElementById('nextRefreshSpan').innerText = "08:52";
});

// TAB SWITCHING
function switchTab(mode, notifyServer = true) {
    currentMode = mode;

    // Update Buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        if (btn.getAttribute('onclick').includes(mode)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Update Content
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    document.getElementById(`${mode}-content`).classList.add('active');
}

// COLOR SELECTION
function selectColor(element, color) {
    // Visual selection
    document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('selected'));
    element.classList.add('selected');

    // State update
    selectedColor = color;
}

// CALENDAR LOGIC
function renderCalendars() {
    const list = document.getElementById('calendarList');
    list.innerHTML = '';

    if (calendars.length === 0) {
        list.innerHTML = '<p style="text-align:center; color: #999;">No calendars added.</p>';
    } else {
        calendars.forEach(cal => {
            const item = document.createElement('div');
            item.className = 'calendar-item';

            const colorVar = `var(--ink-${cal.color})`;

            item.innerHTML = `
                    <input type="checkbox" class="cal-toggle" ${cal.visible ? 'checked' : ''} onchange="toggleCalendar('${cal.id}')">
                    <div class="cal-info">
                        <div class="cal-name">
                            <span class="cal-color-dot" style="background-color: ${colorVar}"></span>
                            ${cal.name}
                        </div>
                        <div class="cal-url" title="${cal.url}">${cal.url}</div>
                    </div>
                    <button type="button" class="btn btn-danger" onclick="deleteCalendar('${cal.id}')" style="padding: 5px 10px; margin-left: 20px; font-size: 0.8rem;">Delete</button>
                `;
            list.appendChild(item);
        });
    }

    // Update color availability after rendering list
    updateColorAvailability();
}

function updateColorAvailability() {
    const usedColors = calendars.map(c => c.color);
    const options = document.querySelectorAll('.color-option');
    const addBtn = document.getElementById('addCalBtn');
    const colorMsg = document.getElementById('colorMsg');
    let firstAvailable = null;

    options.forEach(opt => {
        const color = opt.getAttribute('data-color');

        // Mark as disabled if used
        if (usedColors.includes(color)) {
            opt.classList.add('disabled');
            opt.classList.remove('selected');
        } else {
            opt.classList.remove('disabled');
            if (!firstAvailable) firstAvailable = color;
        }

        // Maintain selection logic
        if (selectedColor === color && usedColors.includes(color)) {
            opt.classList.remove('selected'); // Was selected, now taken
        } else if (selectedColor === color) {
            opt.classList.add('selected'); // Is selected and free
        }
    });

    // If current selection became invalid, pick first available
    if (usedColors.includes(selectedColor)) {
        selectedColor = firstAvailable;
        if (selectedColor) {
            document.querySelector(`.color-option[data-color="${selectedColor}"]`).classList.add('selected');
        }
    } else if ((!selectedColor || !document.querySelector(`.color-option[data-color="${selectedColor}"].selected`)) && firstAvailable) {
        // If nothing selected or selection is invalid/hidden, pick first available
        selectedColor = firstAvailable;
        document.querySelector(`.color-option[data-color="${selectedColor}"]`).classList.add('selected');
    }

    // Limit Max Calendars (4 colors)
    if (calendars.length >= 4) {
        addBtn.disabled = true;
        addBtn.style.opacity = '0.5';
        addBtn.style.cursor = 'not-allowed';
        colorMsg.style.display = 'block';
    } else {
        addBtn.disabled = false;
        addBtn.style.opacity = '1';
        addBtn.style.cursor = 'pointer';
        colorMsg.style.display = 'none';
    }
}

function addCalendar() {
    const nameInput = document.getElementById('newCalName');
    const urlInput = document.getElementById('newCalUrl');

    if (!nameInput.value || !urlInput.value) {
        console.warn("Please fill in Name and URL");
        return;
    }

    if (!selectedColor) {
        console.warn("No colors available");
        return;
    }

    const newCal = {
        id: Date.now(),
        name: nameInput.value,
        url: urlInput.value,
        color: selectedColor,
        visible: true
    };

    calendars.push(newCal);

    // Reset Inputs
    nameInput.value = '';
    urlInput.value = '';

    renderCalendars();
}

function deleteCalendar(id) {
    // Explicit string conversion ensures strict matching works
    calendars = calendars.filter(c => String(c.id) !== String(id));

    // Re-render UI immediately
    renderCalendars();
}

function toggleCalendar(id) {
    const cal = calendars.find(c => String(c.id) === String(id));
    if (cal) {
        cal.visible = !cal.visible;
    }
}

// PHOTO UPLOAD LOGIC
function uploadPhoto(input) {
    if (input.files && input.files[0]) {
        showLoader();

        // Mock loading screen
        setTimeout(() => {
            hideLoader();
        }, 2000);
    }
}

// DEVICE CONTROLS
function triggerDeviceAction(action) {
    // Mock loading screen
    showLoader();
    setTimeout(() => {
        hideLoader();
    }, 3000);
}

// PREVIEW / MODAL LOGIC
function openModal() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    const previewSrc = document.getElementById('previewImage').src;

    modal.classList.add('open');
    modalImg.src = previewSrc;
}

function closeModal() {
    document.getElementById('imageModal').classList.remove('open');
}

// --- LOADER CONTROL ---
function showLoader() {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('visible');
}

function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.remove('visible');
}