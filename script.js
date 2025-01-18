let entries = JSON.parse(localStorage.getItem('entries')) || [];

// Function to toggle visibility
function toggleVisibility(showId) {
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById(showId).classList.remove('hidden');
}

// Save entries to localStorage
function saveEntries() {
    localStorage.setItem('entries', JSON.stringify(entries));
}

// Render all entries
function renderEntries() {
    const entriesList = document.getElementById('entries');
    entriesList.innerHTML = '';
    entries.forEach((entry, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>Subject:</strong> ${entry.subject}<br>
            <strong>Notes:</strong> ${entry.notes}<br>
            <strong>Date:</strong> ${entry.date}<br>
            <button onclick="deleteEntry(${index})">Delete</button>
        `;
        entriesList.appendChild(li);
    });
}

// Add a new entry
document.getElementById('add-entry').addEventListener('click', () => {
    const subject = document.getElementById('subject').value;
    const notes = document.getElementById('notes').value;
    const date = document.getElementById('date').value;

    if (subject && notes && date) {
        entries.push({ subject, notes, date });
        saveEntries();
        renderEntries();
        alert('Entry added successfully!');
        toggleVisibility('entries-section');
    } else {
        alert('Please fill in all fields.');
    }
});

// Delete an entry
function deleteEntry(index) {
    entries.splice(index, 1);
    saveEntries();
    renderEntries();
}

// Search functionality
document.getElementById('search-button').addEventListener('click', () => {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const results = entries.filter(entry => entry.subject.toLowerCase().includes(searchTerm));
    const resultsList = document.getElementById('search-results');
    resultsList.innerHTML = '';
    results.forEach(entry => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>Subject:</strong> ${entry.subject}<br>
            <strong>Notes:</strong> ${entry.notes}<br>
            <strong>Date:</strong> ${entry.date}
        `;
        resultsList.appendChild(li);
    });
});

// Navigation
document.getElementById('view-entries').addEventListener('click', () => {
    renderEntries();
    toggleVisibility('entries-section');
});

document.getElementById('open-add-entry').addEventListener('click', () => {
    toggleVisibility('add-entry-section');
});

document.querySelectorAll('.back-to-menu').forEach(button => {
    button.addEventListener('click', () => toggleVisibility('main-menu'));
});

// Initial setup
toggleVisibility('main-menu');
