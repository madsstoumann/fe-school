import { debounced, mark } from './common.js';

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
    
    this.settings = { ...config, ...settings };

    this.input = input;
    
    this.bindHandleInput = this.handleInput.bind(this);
    this.bindClickOutside = this.clickOutside.bind(this);

    this.input.addEventListener('input', debounced(200, this.bindHandleInput));
    this.input.addEventListener('search', () => { this.hideList(true); });

    this.list = document.createElement('ul');
    this.list.classList.add(this.settings.cssList);
    this.list.addEventListener('click', (event) => this.listClick(event.target));

    this.result = [];
    this.noMatches = [{ [this.settings.apiKey] : this.settings.noResult }];

    this.input.parentNode.insertBefore(this.list, this.input.nextSibling);
    this.hideList(true);
  }

  clickOutside(event) {
    if (!this.input.parentNode.contains(event.target)) {
      this.hideList(true);
      this.input.value = '';
    }
  }

  async handleInput() {
    if (this.input.value.length >= this.input.minLength && this.input.value.length <= this.input.maxLength) {
      let data = await (await fetch(this.settings.api + encodeURIComponent(this.input.value))).json();
      this.result = data && data.length ? data : this.noMatches;
      
      this.list.innerHTML = this.result.map(item => `<li class="${this.settings.cssListItem}">${mark(item[this.settings.apiKey], this.input.value)}</li>`).join('');
      this.hideList(false);
    }
  }

  hideList(bool) {
    if (bool) {
      this.result = [];
      document.removeEventListener('click', this.bindClickOutside);
    }
    else {
      document.addEventListener('click', this.bindClickOutside);
    }
    this.list.hidden = bool;
  }

  listClick(element) {
    this.input.value = element.textContent;
    this.sendEvent();
    this.hideList(true);
  }

  sendEvent() { 
    const selected = this.result.find(item => item[this.settings.apiKey] == this.input.value);
    if (selected) {
      this.input.dispatchEvent(new CustomEvent('autoSuggestSelect', { detail: selected }));
    }
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