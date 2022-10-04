'use strict';

document.addEventListener('DOMContentLoaded', () => {

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
                item.lastElementChild.classList.remove('active');
            }
        });
    };

    form.addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.target;

        if (target.nodeName === 'INPUT' || target.nodeName === 'TEXTAREA' || target.nodeName === 'LABEL') {
            removeActive(form);
            addActive(target);
        }

    });

});