// Sample sneaker data - In a real app, this would come from an API
const sneakerData = [
    {
        id: 1,
        name: "Nike Air Max Pulse",
        brand: "Nike",
        releaseDate: "2024-06-15",
        price: "$150",
        color: "Black/White"
    },
    {
        id: 2,
        name: "Adidas Samba OG",
        brand: "Adidas",
        releaseDate: "2024-06-22",
        price: "$120",
        color: "Cloud White/Gum"
    },
    {
        id: 3,
        name: "New Balance 990v6",
        brand: "New Balance",
        releaseDate: "2024-06-28",
        price: "$185",
        color: "Grey/Black"
    },
    {
        id: 4,
        name: "Jordan 1 Retro High OG",
        brand: "Jordan",
        releaseDate: "2024-07-05",
        price: "$180",
        color: "University Blue"
    },
    {
        id: 5,
        name: "Hoka Clifton 9",
        brand: "Hoka",
        releaseDate: "2024-07-12",
        price: "$145",
        color: "Ocean/Shark"
    },
    {
        id: 6,
        name: "Converse Chuck 70",
        brand: "Converse",
        releaseDate: "2024-07-18",
        price: "$90",
        color: "Sunflower/Yellow"
    }
];

// Calendar functionality
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

// DOM elements
const sneakerContainer = document.getElementById('sneaker-container');
const calendarDays = document.getElementById('calendar-days');
const currentMonthElement = document.getElementById('current-month');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');
const currentYearElement = document.getElementById('current-year');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    currentYearElement.textContent = currentDate.getFullYear();
    
    // Load sneakers
    displaySneakers();
    
    // Setup calendar
    setupCalendar();
    
    // Add event listeners for calendar navigation
    prevMonthBtn.addEventListener('click', showPreviousMonth);
    nextMonthBtn.addEventListener('click', showNextMonth);
});

// Display sneakers function
function displaySneakers() {
    sneakerContainer.innerHTML = '';
    
    sneakerData.forEach(sneaker => {
        const sneakerCard = document.createElement('div');
        sneakerCard.className = 'sneaker-card';
        
        // Calculate days until release
        const releaseDate = new Date(sneaker.releaseDate);
        const today = new Date();
        const timeDiff = releaseDate.getTime() - today.getTime();
        const daysUntilRelease = Math.ceil(timeDiff / (1000 * 3600 * 24));
        
        let countdownText = '';
        if (daysUntilRelease > 0) {
            countdownText = `Drops in ${daysUntilRelease} day${daysUntilRelease !== 1 ? 's' : ''}`;
        } else if (daysUntilRelease === 0) {
            countdownText = 'Drops today!';
        } else {
            countdownText = 'Released';
        }
        
        // Generate a simple icon based on brand
        const brandIcons = {
            'Nike': 'fa-check-circle',
            'Adidas': 'fa-star',
            'New Balance': 'fa-balance-scale',
            'Jordan': 'fa-basketball-ball',
            'Hoka': 'fa-mountain',
            'Converse': 'fa-star-of-life'
        };
        
        const iconClass = brandIcons[sneaker.brand] || 'fa-shoe-prints';
        
        sneakerCard.innerHTML = `
            <div class="sneaker-image">
                <i class="fas ${iconClass}"></i>
            </div>
            <div class="sneaker-info">
                <span class="brand">${sneaker.brand}</span>
                <h3>${sneaker.name}</h3>
                <span class="release-date"><i class="far fa-calendar"></i> ${formatDate(releaseDate)}</span>
                <div class="countdown">${countdownText}</div>
                <div class="price">${sneaker.price}</div>
                <div style="margin-top: 8px; font-size: 0.9rem; color: #666;">Color: ${sneaker.color}</div>
            </div>
        `;
        
        sneakerContainer.appendChild(sneakerCard);
    });
}

// Calendar functions
function setupCalendar() {
    updateCalendar();
}

function updateCalendar() {
    // Update month display
    const monthNames = ["January", "February", "March", "April", "May", "June",
                       "July", "August", "September", "October", "November", "December"];
    currentMonthElement.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    
    // Clear calendar
    calendarDays.innerHTML = '';
    
    // Get first day of month and number of days
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day';
        calendarDays.appendChild(emptyDay);
    }
    
    // Add days of the month
    const today = new Date();
    
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        
        // Check if this is today
        const cellDate = new Date(currentYear, currentMonth, day);
        const isToday = cellDate.getDate() === today.getDate() && 
                       cellDate.getMonth() === today.getMonth() && 
                       cellDate.getFullYear() === today.getFullYear();
        
        // Check if there's a release on this day
        const hasRelease = sneakerData.some(sneaker => {
            const releaseDate = new Date(sneaker.releaseDate);
            return releaseDate.getDate() === day && 
                   releaseDate.getMonth() === currentMonth && 
                   releaseDate.getFullYear() === currentYear;
        });
        
        if (isToday) {
            dayElement.classList.add('today');
        }
        
        if (hasRelease) {
            dayElement.classList.add('release-day');
        }
        
        dayElement.innerHTML = `
            <div class="day-header">${day}</div>
            ${hasRelease ? '<div class="release-indicator">Drop</div>' : ''}
        `;
        
        calendarDays.appendChild(dayElement);
    }
}

function showPreviousMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    updateCalendar();
}

function showNextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    updateCalendar();
}

// Utility function to format dates
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}
