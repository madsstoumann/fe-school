/**
* autoSuggest module.
* @module /assets/js/autoSuggest
* @requires /assets/js/common
* @description ES6 Demo-project
*/

import { debounced, fetchAsync, mark } from './common.js';

class AutoSuggest {
  constructor(input, settings) {
    const config = {
      api: '',
      objKey: ''
    }
    /* Merge default config-object with settings-(object)-param */
    this.settings = Object.assign({}, config, settings);

    /* Create and insert list */
    const list = document.createElement('ul');
    list.classList.add('field__panel');
    input.parentNode.insertBefore(list, input.nextSibling);

    this.input = input;
    this.list = list;
    this.hideList(true);
    
    /* Add eventListeners */
    this.input.addEventListener('input', debounced(200, this.handleInput.bind(this)));

    this.input.addEventListener('search', () => {
      /* Click on X in <input type="search">-field */
      this.hideList(true);
    });
    
    this.list.addEventListener('click', () => {
      this.setInput(document.activeElement.textContent, true, true, true);
    });

    document.addEventListener('click', this.clickOutside.bind(this));
  }

  clickOutside(event) {
    if (!this.input.parentNode.contains(event.target)) this.hideList(true);
  }

  handleInput() {
    if (this.input.value.length > this.input.minLength && this.input.value.length < this.input.maxLength) {
      fetchAsync(
        this.settings.api + encodeURIComponent(this.input.value)
      ).then(data => {
        if (data && data.length) {
          /* Save result in this.result */
          this.result = data;

          /* Output list-items */
          this.list.innerHTML = data.map(item => `<li tabindex="-1" class="field__panel__item">${mark(item[this.settings.objKey], this.input.value)}</li>`).join('');
          
          /* Save NodeList as .rows-property, for keyboard-navigation */
          this.list.rows = [...this.list.children];

          /* Make first list-item focusable */
          this.list.firstChild.tabIndex = 0;
        }
        this.hideList(false);
      }
      ).catch(err => {
        console.info(err);
      })
    }
  }

  hideList(bool) {
    this.list.hidden = bool;
    this.list.setAttribute('aria-live', bool ? 'off' : 'polite');
  }
  
  /** Dispatch event upon selection */
  sendEvent() { 
    const selected = this.result.find(item => item[this.settings.objKey] == this.input.value);
    if (selected) {
      this.input.dispatchEvent(new CustomEvent('autoSuggestSelect', { detail: selected }));
    }
  }

  setInput(value, focus = false, event = false, hide = false) {
    if (value) this.input.value = value;
    if (value === null) this.input.value = '';
    if (focus) this.input.focus();
    if (event) this.sendEvent();
    if (hide) this.hideList(true);
  }
}

/**
* @function autoSuggest
* @param {String} selector
* @description Create autoSuggest from [selector]
*/
export default function autoSuggest(selector) {
  const suggest = document.querySelectorAll(selector);
  suggest.forEach(input => {
    new AutoSuggest(input, {
      api: input.dataset.autoApi,
      objKey: input.dataset.autoKey
    });
 });  
}