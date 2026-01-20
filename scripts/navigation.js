
const menuToggle = document.getElementById('menu-toggle');
const navList = document.querySelector('.nav-list');


menuToggle.addEventListener('click', () => {
    navList.classList.toggle('show');
    

    menuToggle.classList.toggle('active');
});


document.addEventListener('click', (event) => {
    const isClickInsideNav = navList.contains(event.target);
    const isClickOnToggle = menuToggle.contains(event.target);
    
    if (!isClickInsideNav && !isClickOnToggle && navList.classList.contains('show')) {
        navList.classList.remove('show');
        menuToggle.classList.remove('active');
    }
});


window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
        navList.classList.remove('show');
        menuToggle.classList.remove('active');
    }
});

const currentYear = new Date().getFullYear();
document.getElementById('current-year').textContent = currentYear;

document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;


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

function displayCourses(filteredCourses) {
    const courseCardsContainer = document.getElementById('course-cards');
    courseCardsContainer.innerHTML = ''; 

    filteredCourses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.classList.add('course-card');
        
      
        if (course.completed) {
            courseCard.classList.add('completed');
        }

       
        courseCard.textContent = `${course.subject} ${course.number}`;
        
        
        courseCard.title = course.title;

        courseCardsContainer.appendChild(courseCard);
    });

   
    updateTotalCredits(filteredCourses);
}


function updateTotalCredits(filteredCourses) {
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    document.getElementById('credits-total').textContent = totalCredits;
}


function filterCourses(subject) {
    if (subject === 'all') {
        displayCourses(courses);
    } else {
        const filtered = courses.filter(course => course.subject === subject);
        displayCourses(filtered);
    }
}


const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        
        button.classList.add('active');
        
       
        const filter = button.getAttribute('data-filter');
        filterCourses(filter);
    });
});


displayCourses(courses);