// Ссылка на ваш Cloudflare Worker
const WORKER_URL = 'https://workers.dev'; 

// Функция поиска
async function searchAnime(title) {
  if (!title.trim()) return alert("Введите название аниме");
  
  const container = document.getElementById('anime-container');
  if (container) container.innerHTML = '<p style="color: white; text-align:center;">Поиск...</p>';

  try {
    const response = await fetch(`${WORKER_URL}?title=${encodeURIComponent(title)}`);
    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      renderAnimeList(data.results); 
    } else {
      if (container) container.innerHTML = '<p style="color: white; text-align:center;">Ничего не найдено</p>';
    }
  } catch (error) {
    console.error("Ошибка воркера:", error);
    if (container) container.innerHTML = '<p style="color: red; text-align:center;">Ошибка сети или неверный токен</p>';
  }
}

// Функция отрисовки карточек
function renderAnimeList(animeArray) {
  const container = document.getElementById('anime-container'); 
  if (!container) return;
  
  container.innerHTML = ''; 
  
  animeArray.forEach(anime => {
    const card = document.createElement('div');
    card.style = 'margin-bottom: 30px; background: #1a1a1a; padding: 15px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.3);';
    
    card.innerHTML = `
      <h3 style="color: #fff; margin-bottom: 12px; font-family: sans-serif;">${anime.title}</h3>
      <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 4px;">
        <iframe 
          src="${anime.player_link}" 
          style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" 
          allowfullscreen>
        </iframe>
      </div>
    `;
    container.appendChild(card);
  });
}
