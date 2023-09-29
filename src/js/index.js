import { fetchBreeds, fetchCatByBreed } from './cat-api'
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select'
import "/src/css/slimselect.css"


const breedSelect = document.querySelector('.breed-select')
const catsConteiner = document.querySelector('#cat-info')
const loader = document.querySelector('.loader')
const error = document.querySelector('.error')

breedSelect.addEventListener('change', changeBreed)

function showElement(element, show) {
    if (show) {
        element.style.display = 'none';
    } else {
        element.style.display = 'block';
    }
}

function changeBreed(evt) {
    const id = evt.currentTarget.value;
    showElement(loader, false);
    showElement(catsConteiner, true);
    showElement(error, true);
    fetchCatByBreed(id)
        .then(data => {
            const cat = data[0]; 
            const catInfo = `
                <img src="${cat.url}" alt="${cat.breeds[0].name}" width='500' height ='300'" />
                <h2 id="cat-name">${cat.breeds[0].name}</h2>
                <p id="cat-description">${cat.breeds[0].description}</p>
                <h3 id="cat-temperament">Temperament: ${cat.breeds[0].temperament}</h3>
            `;
            
            catsConteiner.innerHTML = catInfo;
            showElement(loader, true);
            showElement(catsConteiner, false);
        })
        .catch(() => {
            Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
            showElement(loader, true)})
}


fetchBreeds()
    .then(data => {
        showElement(loader, true)
        showElement(breedSelect, false)
        const options = data.map(({ name, id }) => {
            return `<option value="${id}">${name}</option>`;
        });

        breedSelect.insertAdjacentHTML('beforeend', options.join(''));
        new SlimSelect({
            select: '#breed-select',
            settings: {
            placeholderText: 'Choose a breed',
            },
        })
})
.catch(() => {
        Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
        showElement(loader, true)})


