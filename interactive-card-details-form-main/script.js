/* eslint-disable no-unused-vars */
'use strict';

const cardHolderValidationRules = {
  regex: [
    /^[a-zA-Z\s]+$/,
    "Card Holder field , can't contain number or special characters ",
  ],
  maxLength: [40, 'Name field is too long'],
  minLength: [10, 'Name field must be at least 10 character'],
};
const cardNumberValidationRules = {
  // regex: [/[a-zA-Z]\s?/, 'Wrong format, numbers only'],
  regex: [/^[0-9\s?]+$/, 'Wrong format, numbers only'],
  minLength: [19, 'Must be 16 digits'],
  maxLength: [19, 'Must be 16 digits'],
};

const cardExpMonthValidationRules = {
  minLength: [2, "Can't be blank ,Must be two digits"],
  maxLength: [2, 'Must be two digits'],
  errorSearchClass: 'card-exp-date',
};

const cardExpYearValidationRules = {
  minLength: [2, "Can't be blank , Must be two digits"],
  maxLength: [2, 'Must be two digits'],
  errorSearchClass: 'card-exp-date',
};

const cardCvcValidationRules = {
  minLength: [3, "Can't be blank , Must be three digits"],
  maxLength: [3, 'Must be three digits'],
};

function validate(element, rules) {
  const currentInput = element.value;
  let isValid = true;

  const errorElement = document.querySelector(
    `.${rules?.errorSearchClass || element.classList[0]} + .error-message`
  );

  const [regex, regexErrMessage] = rules.regex ? rules.regex : [null, null];
  const [minLength, minLengthErrMessage] = rules.minLength
    ? rules.minLength
    : [null, null]; //|| 1;
  const [maxLength, maxLengthErrMessage] = rules.maxLength
    ? rules.maxLength
    : [null, null];

  if (!regex?.test(currentInput)) {
    displayError(element, errorElement, regexErrMessage);

    isValid = false;
  }

  if (minLength && currentInput.length < minLength) {
    displayError(element, errorElement, minLengthErrMessage);
    isValid = false;
  }

  if (maxLength && currentInput.length > maxLength) {
    displayError(element, errorElement, maxLengthErrMessage);
    isValid = false;
  }

  if (isValid) {
    element.classList.contains('invalid')
      ? element.classList.toggle('invalid')
      : null;
    errorElement.innerHTML = '';
    errorElement.classList.toggle('hidden');

    return true;
  }

  return false;
}

function displayError(element, errorElement, errorMessage) {
  element.classList.add('invalid');
  errorElement.classList.toggle('hidden');
  errorElement.innerHTML = errorMessage;
  return;
}

const cardNumberInput = document.querySelector('.card-number');
const cardForm = document.querySelector('.card-details-form');

cardNumberInput.addEventListener('keydown', event => {
  const currentInput = event.target.value;
  const characterList = currentInput.split('');

  //remove unnecessary space on delete
  if (event.key == 'Backspace') {
    if (characterList[characterList.length - 2] == ' ') {
      event.preventDefault();
      characterList.splice(characterList.length - 2, 2);
      event.target.value = characterList.join('');
    }
    return;
  }

  //Add Space every four digits
  if (currentInput.trim().length >= 4 && currentInput.trim().length <= 18) {
    for (let i = 3; i < characterList.length; i += 5) {
      if (characterList[i + 1] !== ' ') {
        characterList[i] = characterList[i] + ' ';
      }
    }

    event.target.value = characterList.join('');
  }
});

cardForm.addEventListener('focusout', event => {
  const inputElement = event.target;
  const inputElementClass = event.target.classList[0];

  switch (inputElementClass) {
    case 'card-holder':
      validate(inputElement, cardHolderValidationRules);
      break;

    case 'card-number':
      validate(inputElement, cardNumberValidationRules);
      break;

    case 'card-exp-month':
      validate(inputElement, cardExpMonthValidationRules);
      break;

    case 'card-exp-year':
      validate(inputElement, cardExpYearValidationRules);
      break;

    case 'card-cvc':
      validate(inputElement, cardCvcValidationRules);
      break;
  }
});

cardForm.addEventListener('submit', event => {
  event.preventDefault();
  const cardHolder = document.querySelector('card-holder');
  const cardNumber = document.querySelector('card-number');
  const cardExpMonth = document.querySelector('card-exp-month');
  const cardExpYear = document.querySelector('card-exp-year');
  const cardCvc = document.querySelector('card-cvc');

  if (
    validate(cardHolder, cardCvcValidationRules) &&
    validate(cardNumber, cardNumberValidationRules) &&
    validate(cardExpMonth, cardExpMonthValidationRules) &&
    validate(cardExpYear, cardExpYearValidationRules) &&
    validate(cardCvc, cardCvcValidationRules)
  ) {
    const mainSection = document.querySelector('main');
    const checkoutCompleteView = ` 
   <div class="container checkout-view">
    <img class="checkout-complete-icon" src="./images/icon-complete.svg" />
    <h3 class="checkout-complete-announcement">Thank You!</h3>
    <span>We've added your card details</span>
    <button class="button button--continue">Continue</button>
  </div>`;
    mainSection.innerHTML = checkoutCompleteView;
  }
});
