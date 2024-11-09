async function convertMarkdown(content) {
    try {
        const response = await fetch("/api/marked", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ content })
        });

        if (!response.ok) {
            throw new Error("Error converting Markdown");
        }

        const data = await response.json();
        return data.html;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}

async function createPost() {
    const postContainer = document.getElementById("post");

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

        // Format the date to yyyy-mm-dd
        const formattedDate = new Date(post.date).toISOString().split("T")[0];

        // Convert Markdown to HTML
        const contentHtml = await convertMarkdown(post.content);

        // Change the page title
        document.title = post.title;

        // Update the post container with the fetched data
        postContainer.innerHTML = `
            <div class="title-date-container">
                <h2 class="title-list">${post.title}</h2>
                <p class="date"><em>${formattedDate}</em></p>
            </div>
            <ul class="tags tags-posts">
              ${post.tags.map(tag => `<li><a href="/posts?tag=${tag}">#${tag}</a></li>`).join('')}
            </ul>
            <hr>
            <br>
            <div class="post-content">${contentHtml}</div> <!-- Insert the converted HTML content -->
        `;

        // Fetch adjacent posts (previous and next)
        const adjacentResponse = await fetch(`/api/posts/${slug}/adjacent`);
        if (adjacentResponse.ok) {
            const { previous, next } = await adjacentResponse.json();

            // Update navigation links
            const navContainer = document.getElementById("bottom");
            navContainer.innerHTML = `
                ${previous ? `<a href="/posts/${previous.slug}"><i class="fa-solid fa-arrow-left"></i></a>` : ''}
                ${next ? `<a href="/posts/${next.slug}"><i class="fa-solid fa-arrow-right"></i></a>` : ''}
            `;
        }
    } catch (error) {
        console.error("Error fetching post:", error);
        postContainer.innerHTML = "<p>Failed to load post.</p>";
    }
}

window.onload = createPost;