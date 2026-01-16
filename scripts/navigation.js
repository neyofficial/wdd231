// navigation.js - Handles responsive navigation menu

// Get the menu toggle button and navigation list
const menuToggle = document.getElementById('menu-toggle');
const navList = document.querySelector('.nav-list');

// Toggle the navigation menu when hamburger is clicked
menuToggle.addEventListener('click', () => {
    navList.classList.toggle('show');
    
    // Optional: Add animation to hamburger icon
    menuToggle.classList.toggle('active');
});

// Close menu when clicking outside of it
document.addEventListener('click', (event) => {
    const isClickInsideNav = navList.contains(event.target);
    const isClickOnToggle = menuToggle.contains(event.target);
    
    if (!isClickInsideNav && !isClickOnToggle && navList.classList.contains('show')) {
        navList.classList.remove('show');
        menuToggle.classList.remove('active');
    }
});

// Close menu when window is resized to desktop view
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
        navList.classList.remove('show');
        menuToggle.classList.remove('active');
    }
});

// date.js - Handles dynamic date displays

// Get current year and display it in the footer
const currentYear = new Date().getFullYear();
document.getElementById('current-year').textContent = currentYear;

// Get last modified date and display it in the footer
document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;

// course.js - Handles course display and filtering

// Course array - Modify the 'completed' property based on your progress
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
];

// Function to display courses
function displayCourses(filteredCourses) {
    const courseCardsContainer = document.getElementById('course-cards');
    courseCardsContainer.innerHTML = ''; // Clear existing courses

    filteredCourses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.classList.add('course-card');
        
        // Add 'completed' class if the course is completed
        if (course.completed) {
            courseCard.classList.add('completed');
        }

        // Set course content
        courseCard.textContent = `${course.subject} ${course.number}`;
        
        // Optional: Add title as tooltip
        courseCard.title = course.title;

        courseCardsContainer.appendChild(courseCard);
    });

    // Update total credits
    updateTotalCredits(filteredCourses);
}

// Function to calculate and display total credits
function updateTotalCredits(filteredCourses) {
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    document.getElementById('credits-total').textContent = totalCredits;
}

// Function to filter courses
function filterCourses(subject) {
    if (subject === 'all') {
        displayCourses(courses);
    } else {
        const filtered = courses.filter(course => course.subject === subject);
        displayCourses(filtered);
    }
}

// Add event listeners to filter buttons
const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove 'active' class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add 'active' class to clicked button
        button.classList.add('active');
        
        // Get the filter value and filter courses
        const filter = button.getAttribute('data-filter');
        filterCourses(filter);
    });
});

// Display all courses on page load
displayCourses(courses);