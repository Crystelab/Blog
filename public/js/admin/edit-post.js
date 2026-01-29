async function createPost() {
    const postContainer = document.getElementById("edit-post");

    // Get the slug from the URL path
    const pathSegments = window.location.pathname.split("/");
    const slug = pathSegments[pathSegments.length - 1];

    if (!slug) {
        postContainer.innerHTML = "<p>Post not found.</p>";
        return;
    }

    try {
        // Fetch the post data from the server using the slug
        const response = await fetch(`/api/posts/${slug}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const post = await response.json();

        // Update the post container with the fetched data
        postContainer.innerHTML = `
            <form action="/admin/edit-post/${post.slug}?_method=PUT" method="POST">

                <label for="slug">Slug:</label>
                <input type="text" id="slug" name="slug" value="${post.slug}" required>
            
                <label for="title">Title:</label>
                <input type="text" id="title" name="title" value="${post.title}" required>
            
                <label for="description">Description:</label>
                <textarea id="description" name="description" required>${post.description}</textarea>
            
                <label for="tags">Tags (learning, technical, meta, project, musings):</label>
                <input type="text" id="tags" name="tags" value="${post.tags}" required>
            
                <label for="content">Content:</label>
                <textarea id="content" name="content" required>${post.content}</textarea>
        
                <input type="submit" value="Update Post">
          </form>
        `;
    } catch (error) {
        console.error("Error fetching post:", error);
        postContainer.innerHTML = "<p>Failed to load post.</p>";
    }
}

window.onload = createPost;
