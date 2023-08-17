import closeAllModals from "./closeAllModals";

const images = () => {
    const imgPopup = document.createElement('div'),
          workSection = document.querySelector('.works'),
          bigImage = document.createElement('img');
    
    imgPopup.classList.add('popup');
    workSection.appendChild(imgPopup);

    bigImage.style.width = '600px';
    bigImage.style.height = '600px';
    imgPopup.style.justifyContent = 'center';
    imgPopup.style.alignItems = 'center';
    imgPopup.style.display = 'none';
    

    imgPopup.appendChild(bigImage);

    workSection.addEventListener('click', e => {
        e.preventDefault();

        let target = e.target;

        if (target && target.classList.contains('preview')) {
            imgPopup.style.display = 'flex';
            document.body.style.overflow = 'hidden';

            const path = target.parentNode.getAttribute('href');
            bigImage.setAttribute('src', path);
        }

        if (target && target.matches('div.popup')) {
            closeAllModals();
            imgPopup.style.display = 'none';
            document.body.style.overflow = '';
        }
    })
}

export default images;