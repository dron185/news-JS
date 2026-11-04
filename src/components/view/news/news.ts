import './news.css';
import { Article } from '../../../types';

class News {
    public draw(data: Article[]): void {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement | null;

        if (!newsItemTemp) return;

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

            if (idx % 2) newsClone.querySelector('.news__item')?.classList.add('alt');

            const photoDiv = newsClone.querySelector('.news__meta-photo') as HTMLElement | null;
            if (photoDiv) {
                photoDiv.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
            }

            const authorEl = newsClone.querySelector('.news__meta-author');

            if (authorEl) authorEl.textContent = item.author || item.source.name;

            const dateEl = newsClone.querySelector('.news__meta-date');
            if (dateEl) {
                dateEl.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
            }

            const titleEl = newsClone.querySelector('.news__description-title');
            if (titleEl) titleEl.textContent = item.title;

            const sourceEl = newsClone.querySelector('.news__description-source');
            if (sourceEl) sourceEl.textContent = item.source.name;

            const contentEl = newsClone.querySelector('.news__description-content');
            if (contentEl) contentEl.textContent = item.description;

            newsClone.querySelector('.news__read-more a')?.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        const newsContainer = document.querySelector('.news');
        if (newsContainer) {
            newsContainer.innerHTML = '';
            newsContainer.appendChild(fragment);
        }
    }
}

export default News;
