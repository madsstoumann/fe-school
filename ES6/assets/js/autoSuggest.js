import { debounced } from './common.js';

class AutoSuggest {
  constructor(input, settings) {
    const config = {
      api: '',
      apiKey: '',
      cssList: 'field__list',
      cssListItem: 'field__list__item',
      noResult: 'No items match your search'
    }

    console.log(`%c Valtech %c FE School %c ES6 `, "background:#333333 ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff", "background:#e60032 ; padding: 1px; color: #fff", "background:#ccc ; padding: 1px; border-radius: 0 3px 3px 0;  color: #222");
    
    this.settings = {};
    this.input = input;
    this.list = { /* Create DOM-node */ };
    this.result = [];

    console.log(this); 
  }

  handleInput() {
    if (this.input.value.length >= this.input.minLength && this.input.value.length <= this.input.maxLength) {
      /*
      TODO: fetch() data, generate markup
      this.result.map(item => `<li class="${this.settings.cssListItem}">${item}</li>`).join('');
      */
    }
  }

  hideList(bool) {
  /* TODO: Some function to hide/show the list with results */
  }

  sendEvent() { 
  /* TODO: Some custom event with data */
  }
}

export default function autoSuggest(selector) {
  const inputs = document.querySelectorAll(selector);
  inputs.forEach(input => {
    new AutoSuggest(input, {
      api: input.dataset.autoApi,
      apiKey: input.dataset.autoKey
    });
 });  
}