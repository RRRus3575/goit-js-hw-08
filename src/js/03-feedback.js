'use strict';
// import throttle from 'lodash.throttle';
import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');

const CURRENT_VALUE = 'feedback-form-state';
let formData = {};

form.addEventListener(
  'input',
  throttle(event => {
    event.preventDefault();

    formData[event.target.name] = event.target.value.trim();

    localStorage.setItem(CURRENT_VALUE, JSON.stringify(formData));
  }, 500)
);

form.addEventListener('submit', event => {
  event.preventDefault();

  event.currentTarget.reset();
  localStorage.removeItem(CURRENT_VALUE);

  formData = {};
});

populateForm();

function populateForm() {
  try {
    const savedForm = localStorage.getItem(CURRENT_VALUE);

    if (savedForm === null) {
      return;
    } else {
      formData = JSON.parse(savedForm);
      for (const key in formData) {
        form.elements[key].value = formData[key];
      }
    }
  } catch (error) {
    console.log(error);
  }
}
