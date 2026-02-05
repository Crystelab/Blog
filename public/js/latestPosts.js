async function fetchRecentPosts() {
    const postsContainer = document.getElementById('latest-posts');

    if (!postsContainer) {
        console.error('Posts container not found');
        return;
    }

    try {
        const response = await fetch('/api/posts');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const posts = await response.json();

        posts.sort((a, b) => new Date(b.date) - new Date(a.date));
        const recentPosts = posts.slice(0, 3);

        recentPosts.forEach(post => {
            const formattedDate = new Date(post.date).toISOString().split('T')[0];
            const postElement = document.createElement('article');
            postElement.innerHTML = `
                <div class="title-date-container">
                    <h2 class="title-list"><a href="/posts/${post.slug}">${post.title}</a></h2>
                    <p class="date"><em>${formattedDate}</em></p>
                </div>
                <p class="close">${post.description}</p>
                <ul class="tags tags-posts">
                  ${post.tags.map(tag => `<li><a href="/posts?tag=${tag}">#${tag}</a></li>`).join('')}
                </ul>
                <br>
            `;
            postsContainer.appendChild(postElement);
        });
    } catch (error) {
        console.error("Error fetching posts:", error);
        postsContainer.innerHTML = "<p>Failed to load posts.</p>";
    }
}

window.onload = fetchRecentPosts;
