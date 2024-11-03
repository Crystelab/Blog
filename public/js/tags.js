fetch('html/tags.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.text();
            })
            .then(data => {
                document.getElementById('tags').innerHTML = data;
            })
            .catch(error => console.error('Error loading the header:', error));