import { debounced, fetchAsync, mark } from './common.js';

class AutoSuggest {
  constructor(input, settings) {
    const config = {
      api: '',
      objKey: '',
      list: 'field__panel',
      listItem: 'field__panel__item',
      noMatches: 'No matches'
    }
    /* Merge default config-object with settings-(object)-param */
    this.settings = {...config, ...settings};

    console.log('%c Welcome to ES6 Demo', 'font-size: 1.5rem; background: green; color: white; padding: 1rem;');
    console.log(`%c api is: ${this.settings.api}`, 'background-color: black; color: white; padding: .25rem;');

    this.clickHandler = this.clickOutside.bind(this);
    this.input = input;
    this.input.addEventListener('input', debounced(200, this.handleInput.bind(this)));
    this.input.addEventListener('search', () => { this.showList(true); });

    this.list = document.createElement('ul');
    this.list.classList.add('field__panel');
    this.list.addEventListener('click', (event) => { 
      this.listClick(event.target);
    });

    this.noMatches = { tekst: 'No matches' }
    this.result = [];
    this.input.parentNode.insertBefore(this.list, input.nextSibling);
    this.showList(true);

    console.log(this); 
  }

  clickOutside(event) { console.log(event)
    if (!this.input.parentNode.contains(event.target)) {
      this.showList(true);
      this.input.value = '';
      this.input.focus();
    }
  }

  async handleInput() {
    if (this.input.value.length > this.input.minLength && this.input.value.length < this.input.maxLength) {
      let data = await (await fetch(this.settings.api + encodeURIComponent(this.input.value))).json();
      this.result = data && data.length ? data : [this.noMatches];
      this.list.innerHTML = this.result.map(item => `<li class="field__panel__item">${mark(item[this.settings.objKey], this.input.value)}</li>`).join('');
      this.showList(false);
    }
  }

  listClick(element) {
    this.input.value = element.textContent;
    this.sendEvent();
    this.showList(true);
  }

  showList(bool) {
    if (bool) {
      this.result = [];
      document.removeEventListener('click', this.clickHandler);
    }
    else {
      /*
      There is no JavaScript function to achieve this.
      However, you could set a boolean value to true when you add the listener, and false when you remove it.
      Then check against this boolean before potentially adding a duplicate event listener.
      */
      document.addEventListener('click', this.clickHandler);
    }
    this.list.hidden = bool;
  }

  sendEvent() { 
    const selected = this.result.find(item => item[this.settings.objKey] == this.input.value);
    if (selected) {
      this.input.dispatchEvent(new CustomEvent('autoSuggestSelect', { detail: selected }));
    }
  }
}

export default function autoSuggest(selector) {
  const suggest = document.querySelectorAll(selector);
  suggest.forEach(input => {
    new AutoSuggest(input, {
      api: input.dataset.autoApi,
      objKey: input.dataset.autoKey
    });
 });  
}