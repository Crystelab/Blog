async function createPosts() {
  const postsContainer = document.getElementById('posts');

  try {
      // Fetch the posts data from the server
      const response = await fetch('/api/posts');
      const posts = await response.json();

      posts.forEach(post => {
          const postElement = document.createElement('article');
          postElement.innerHTML = `
              <div class="title-date-container">
                  <h2 class="title-list"><a href="/posts/${post.slug}">${post.title}</a></h2>
                  <p class="date"><em>${post.date}</em></p>
              </div>
              <p>${post.description}</p>
              <ul class="tags  tags-posts">
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
