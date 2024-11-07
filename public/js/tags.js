const tags = [
    { name: 'learning', label: '#learning' },
    { name: 'technical', label: '#technical' },
    { name: 'meta', label: '#meta' },
    { name: 'personal', label: '#personal' },
    { name: 'musings', label: '#musings' }
];

function createTags() {
    const tagsSection = document.createElement('div');
    tagsSection.innerHTML = `
        <br>
        <h3>Explore by tag</h3>
        <ul class="tags">
            ${tags.map(tag => `<li><a href="/posts?tag=${tag.name}">${tag.label}</a></li>`).join('')}
        </ul>
        <br>
    `;
    document.getElementById('tags').prepend(tagsSection);
}

document.addEventListener('DOMContentLoaded', createTags);
