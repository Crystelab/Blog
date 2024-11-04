async function createPosts() {
    const postsContainer = document.getElementById('posts');
  
    try {
        const response = await fetch('/api/posts');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const posts = await response.json();

        // Sort posts by date in descending order
        posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  
        posts.forEach(post => {
            const postElement = document.createElement('article');
            postElement.innerHTML = `
                <div class="title-date-container">
                    <h2 class="title-list"><a href="/posts/${post.slug}">${post.title}</a></h2>
                    <p class="date"><em>${post.date}</em></p>
                </div>
                <p>${post.description}</p>
                <ul class="tags tags-posts">
                  ${post.tags.map(tag => `<li><a id="${tag}">#${tag}</a></li>`).join('')}
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

document.addEventListener('DOMContentLoaded', createPosts);
