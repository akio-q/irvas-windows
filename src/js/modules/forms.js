import checkNumInputs from './checkNumInputs';
import closeAllModals from './closeAllModals';

const forms = (modalState) => {
    const forms = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input'),
          checkboxes = document.querySelectorAll('.checkbox');

    checkNumInputs('input[name="user_phone"]');
          
    const message = {
        loading: 'Loading...',
        success: 'Thank you! We will contact you soon',
        failure: 'Something went wrong...'
    }

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;
        
        let res = await fetch(url, {
            method: 'POST',
            body: data
        });

        return await res.text();
    }

    const clearInputs = (elem) => {
        elem.forEach(item => {
            if (item.getAttribute('type') === 'checkbox') {
                item.checked = false;
            } else {
                item.value = '';
            }
        })
    }

    const clearModalState = () => {
        for (let key in modalState) {
            delete modalState[key];
        }

        clearInputs(checkboxes);
    }

    forms.forEach(item => {
        item.addEventListener('submit', e => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            const formData = new FormData(item);
            if (item.getAttribute('data-calc') === 'end') {
                for (let key in modalState) {
                    formData.append(key, modalState[key]);
                }
            }

            postData('assets/server.php', formData)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = message.success;
                })
                .catch(() => statusMessage.textContent = message.failure)
                .finally(() => {
                    clearInputs(inputs);
                    setTimeout(() => {
                        statusMessage.remove();
                        closeAllModals();
                        clearModalState();
                    }, 5000);
                })
        })
    }) 
}

export default forms;