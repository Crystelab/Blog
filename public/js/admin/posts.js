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
            const formattedDate = new Date(post.date).toISOString().split('T')[0];

            const postElement = document.createElement('article');
            postElement.innerHTML = `
                <div class="title-date-container">
                    <h2 class="title-list"><a href="/posts/${post.slug}">${post.title}</a></h2>
                    <ul>
                        <a href="/admin/edit-post/${post.slug}">Edit</a>
                        <form action="/admin/delete-post/${post.slug}?_method=DELETE" method="POST" style="display:inline;" class="delete-form">
                            <input type="submit" value="Delete" class="delete">
                        </form>
                    </ul>
                </div>
                <p class="close">${post.description}</p>
                <ul class="tags tags-posts">
                  ${post.tags.map(tag => `<li><a href="/posts?tag=${tag}">#${tag}</a></li>`).join('')}
                </ul>
                <br>
            `;
            postsContainer.appendChild(postElement);
        });

        // Add event listeners for delete confirmation
        const deleteForms = document.querySelectorAll('.delete-form');
        deleteForms.forEach(form => {
            form.addEventListener('submit', function(event) {
                const confirmed = confirm('Are you sure you want to delete this post?');
                if (!confirmed) {
                    event.preventDefault();
                }
            });
        });

    } catch (error) {
        console.error("Error fetching posts:", error);
        postsContainer.innerHTML = "<p>Failed to load posts.</p>";
    }
}

window.onload = createPosts;