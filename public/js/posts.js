async function createPosts() {
    const postsContainer = document.getElementById('posts');

    if (!postsContainer) {
        console.error('Posts container not found');
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const selectedTag = urlParams.get('tag');

    if (selectedTag) {
        const headerElement = document.createElement('h3');
        headerElement.textContent = `Posts tagged with "${selectedTag}"`;
        postsContainer.prepend(headerElement);
    }

    try {
        const response = await fetch('/api/posts');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        let posts = await response.json();

        // Only show posts where visible is true
        posts = posts.filter(post => post.visible);

        // Sort in date
        posts.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Filter by tag
        const filteredPosts = selectedTag ? posts.filter(post => post.tags.includes(selectedTag)) : posts;

        filteredPosts.forEach(post => {
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

window.onload = createPosts;
