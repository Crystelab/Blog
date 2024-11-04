document.getElementById('random-post').addEventListener('click', (event) => {
    event.preventDefault();
    fetchRandomPost();
});

async function fetchRandomPost() {
    try {
        const response = await fetch('/api/posts');
        const posts = await response.json();
        const randomIndex = Math.floor(Math.random() * posts.length);
        const randomPost = posts[randomIndex];

        window.location.href = `/posts/${randomPost.slug}`;
    } catch (error) {
        console.error("Error fetching posts for random selection:", error);
    }
}