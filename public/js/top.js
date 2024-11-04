/*function createNavbar() {
    const navbar = document.createElement('div');
    navbar.innerHTML = `
        <head>
            <link rel="stylesheet" href="path/to/your/styles.css">
        </head>
        <header>
            <h1>Crystel Abou-Nahed</h1>
            <h2>Software Engineering Student</h2>
        </header>
        <nav>
            <a href="/" class="nav-link active">Home</a>
            <a href="/posts" class="nav-link">Posts</a>
            <a href="/minigame" class="nav-link">Mini Game</a>
            <a href="https://github.com/Crystelab" class="nav-link">GitHub</a>
            <a href="https://www.linkedin.com/in/crystel-abou-nahed-7216272ab/" class="nav-link">LinkedIn</a>
        </nav>
    `;
    document.getElementById('top').prepend(navbar);
}

document.addEventListener('DOMContentLoaded', () => {
    createNavbar();

    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});*/
