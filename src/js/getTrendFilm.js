import { getLangFromStorage } from './translation/translate';
import Pagination from 'tui-pagination';
import { options, container } from './pagination';

export let instance = new Pagination(container, options);

export async function getMovie(pageNum) {
  let lang = getLangFromStorage();
  const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=579a7483bae7d6a5a25eb4c1ddded2cf&page=${pageNum}&language=${lang}`;
  const resp = await fetch(url);
  localStorage.setItem('lastFetch', url);

  const responseInfo = await resp.json();
  const movies = responseInfo.results;
  activeTrendPagination();
  instance.setTotalItems(responseInfo.total_results);
  return { responseInfo, movies };
}

function activeTrendPagination() {
  if (container.classList.contains('visually-hidden')) {
    containerSearch.classList.add('visually-hidden');
    container.classList.remove('visually-hidden');
  }
  return;
}
