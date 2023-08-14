const modals = () => {
    const bindModal = (triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) => {
        const triggers = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector),
              windows = document.querySelectorAll('[data-modal]');

        const closeAllModals = () => {
            windows.forEach(item => {
                item.style.display = 'none'
            })
        }

        triggers.forEach(trigger => {
            trigger.addEventListener('click', e => {
                if (e.target) {
                    e.preventDefault();
                }

                closeAllModals();
    
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        });

        close.addEventListener('click', () => {
            closeAllModals();

            modal.style.display = 'none';
            document.body.style.overflow = '';
        });

        modal.addEventListener('click', e => {
            if (e.target === modal && closeClickOverlay) {
                closeAllModals();

                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    };

    const showModalByTime = (modalSelector, time) => {
        setTimeout(() => {
            document.querySelector(modalSelector).style.display = 'block';
            document.body.style.overflow = 'hidden';
        }, time)
    };
    
    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModal('.phone_link', '.popup', '.popup .popup_close');
    bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
    bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
    bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false)
    showModalByTime('.popup', 60000);
}

export default modals;