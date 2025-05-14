document.addEventListener('DOMContentLoaded', function() {
    const dropdown = document.querySelector('.dropdown');
    const menuIcon = document.querySelector('.menu-icon');
    const menuIconBtn = menuIcon.querySelector('i');

    // Toggle dropdown when clicking menu icon
    menuIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('active');
        menuIconBtn.classList.toggle('fa-bars');
        menuIconBtn.classList.toggle('fa-times');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
            menuIconBtn.classList.add('fa-bars');
            menuIconBtn.classList.remove('fa-times');
        }
    });

    // Close dropdown when clicking a link
    const dropdownLinks = dropdown.querySelectorAll('.dropdown-content a');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', () => {
            dropdown.classList.remove('active');
            menuIconBtn.classList.add('fa-bars');
            menuIconBtn.classList.remove('fa-times');
        });
    });

    // Prevent dropdown from closing when clicking theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});