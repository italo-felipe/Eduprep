const main = document.getElementById('apostilas')
fetch('http://localhost:3000/api/apostilas').then(response=>response.json()).then(data=>{
     data.forEach(apostila => {
        const card = document.createElement('div');
        card.className = 'material-card bg-white rounded-xl shadow-md overflow-hidden border border-gray-100';
        card.innerHTML = `
            <div class="p-6">
                <div class="flex items-center mb-4">
                    <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                        <i class="fas fa-file-pdf text-primary text-xl"></i>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-gray-800">${apostila.materia}</h3>
                       
                    </div>
                </div>
                
            
                
                <div class="flex justify-between items-center">

                    <a href="${apostila.link}" class="bg-primary hover:bg-secondary text-white font-medium py-2 px-4 rounded-lg transition duration-300">
                        Baixar <i class="fas fa-download ml-1"></i>
                    </a>
                </div>
            </div>
        `;
        main.appendChild(card);
    });
});
    