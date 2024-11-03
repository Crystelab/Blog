fetch('html/top.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.text();
            })
            .then(data => {
                document.getElementById('top').innerHTML = data;
            })
            .catch(error => console.error('Error loading the header:', error));