async function createPosts() {
    const postsContainer = document.getElementById('posts');
    console.log('Posts container:', postsContainer);

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
        const posts = await response.json();

        posts.sort((a, b) => new Date(b.date) - new Date(a.date));

        const filteredPosts = selectedTag ? posts.filter(post => post.tags.includes(selectedTag)) : posts;

        filteredPosts.forEach(post => {
            const postElement = document.createElement('article');
            postElement.innerHTML = `
                <div class="title-date-container">
                    <h2 class="title-list"><a href="/posts/${post.slug}">${post.title}</a></h2>
                    <p class="date"><em>${post.date}</em></p>
                </div>
                <p>${post.description}</p>
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
