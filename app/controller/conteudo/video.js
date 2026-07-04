const main = document.getElementById('videos')
fetch('http://localhost:3000/api/videos').then(response=>response.json()).then(data=>{
     data.forEach(video => {
        const card = document.createElement('div');
        card.className = 'video-card bg-white rounded-xl shadow-md overflow-hidden border border-gray-100';
        card.innerHTML = `
            <div class="p-6">
                <div class="video-player bg-gray-200 rounded-lg overflow-hidden mb-4">
                    <iframe src="${video.link}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                
                <div class="flex justify-between items-start mb-2">
                    <h3 class="text-xl font-bold text-gray-800">${video.materia}</h3>
                  
                </div>
                
                
                <button class="w-full bg-primary hover:bg-secondary text-white font-medium py-2 px-4 rounded-lg transition duration-300">
                    Assistir <i class="fas fa-play ml-1"></i>
                </button>
            </div>
        `;
        main.appendChild(card);
    });
});
    
