function createTags() {
    const tagsSection = document.createElement('div'); // Create a container div for the tags
    tagsSection.innerHTML = `
        <br>
        <h3>Explore by tags</h3>
        <ul class="tags">
            <li><a id="learning">#learning</a></li>
            <li><a id="technical">#technical</a></li>
            <li><a id="meta">#meta</a></li>
            <li><a id="personal">#personal</a></li>
        </ul>
        <br>
    `;
    document.getElementById('tags').prepend(tagsSection); // Prepend the tags section to the element with id 'tags'
}

document.addEventListener('DOMContentLoaded', createTags);
