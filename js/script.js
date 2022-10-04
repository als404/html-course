'use strict';

document.addEventListener('DOMContentLoaded', () => {

    const smoothLinks = document.querySelectorAll('a[href^="#"]');
    for (let smoothLink of smoothLinks) {
        smoothLink.addEventListener('click', (e) => {
            e.preventDefault();
            const id = smoothLink.getAttribute('href');

            document.querySelector(id).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    const form = document.querySelector('form');

    const addActive = (field) => {
        if (field.nodeName === 'LABEL') {
            field.classList.add('active');
        }
        if ((field.nodeName === 'INPUT' || field.nodeName === 'TEXTAREA') && field.labels.length > 0) {
            field.labels[0].classList.add('active');
        }
    };

    const removeActive = (selector) => {
        selector.querySelectorAll('div').forEach(item => {
            if (item.lastElementChild.nodeName === 'LABEL'){
                if (item.firstElementChild.value === '') {
                    item.lastElementChild.classList.remove('active');
                }
            }
        });
    };

    const validate = (input) => {
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (input.getAttribute('required') === null || input.value === '') {
            input.classList.remove('valid');
            input.classList.remove('invalid');
        } else if ((input.getAttribute('type') === 'email' && re.test(input.value)) || 
        (input.getAttribute('type') === 'text' && input.value.length > 0)) {
            input.classList.add('valid');
            input.classList.remove('invalid');
        } else {
            input.classList.remove('valid');
            input.classList.add('invalid');
        }
    };

    form.addEventListener('focusin', (e) => {
        e.preventDefault();
        const target = e.target;

        if (target.nodeName === 'INPUT' || target.nodeName === 'TEXTAREA' || target.nodeName === 'LABEL') {
            removeActive(form);
            addActive(target);
        }
    });

    form.addEventListener('focusout', (e) => {
        removeActive(form);
        validate(e.target);
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        removeActive(form);
        form.reset();
        const input = form.querySelectorAll('input');
        input.forEach(item => {
            item.classList.remove('valid');
        });
    });
});