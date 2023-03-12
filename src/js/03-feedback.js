'use strict';
import throttle from 'lodash.throttle';
const form = document.querySelector('.feedback-form');

const CURRENT_VALUE = 'feedback-form-state';

form.addEventListener(
  'input',
  throttle(event => {
    event.preventDefault();

    const { email, message } = event.currentTarget;
    const formData = {};
    formData.email = email.value.trim();
    formData.message = message.value.trim();

    localStorage.setItem(CURRENT_VALUE, JSON.stringify(formData));
  }, 500)
);

form.addEventListener('submit', event => {
  event.preventDefault();
  event.currentTarget.reset();
  localStorage.removeItem(CURRENT_VALUE);
});

populateForm();

function populateForm() {
  const savedForm = JSON.parse(localStorage.getItem(CURRENT_VALUE));

  if (savedForm) {
    form.email.value = savedForm.email;
    form.message.value = savedForm.message;
  }
}
