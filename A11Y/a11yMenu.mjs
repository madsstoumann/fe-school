/* eslint no-empty: ["error", { "allowEmptyCatch": true }] */

/**
 * A11y Menu.
 * @module a11yMenu.mjs
 * @version 0.0.01
 * @summary 23-10-2019
 * @author ValtechDK
 * @description a11y Menu. 
 */
import KeyHandler from './keyHandler.mjs';
export class a11yMenu {
	constructor(wrapper, settings) {
		this.settings = Object.assign(
			{
				clsMenuItem: 'c-mn__item',
				clsMenuItemLink: 'c-mn__item-link',
				clsMenuItemName: 'c-mn__item-name',
				clsMenuPanel: 'c-mn__panel',
				megaMenu: false,
				megaMenuBreakpoint: 700
			},
			this.stringToType(settings)
		);
		this.init(wrapper);
	}

	/**
	 * @function init
	 * @description Create menu from data, add eventListeners etc.
	 */
	async init(wrapper) {
		if (this.settings.menuData) {
			try {
				const data = await (await fetch(this.settings.menuData)).json();
				wrapper.innerHTML = this.renderMenu(data, 1);
			}
			catch(err) {}
		}

		if (this.settings.megaMenu) {
			this.showMegaMenu = true;
			this.panels = wrapper.querySelectorAll(`.${this.settings.clsMenuItem}--1`);
			this.panels.forEach(panel => { panel.keyHandler = new KeyHandler(panel, { callBack: this.handleKeys, callBackScope: this, preventDefaultKeys: true }); });

			/* Add outside-click listener, if panels exists */
			if (this.panels) {
				document.addEventListener('click', event => {
					if (!wrapper.contains(event.target)) {
						this.panels.forEach(panel => { panel.open = false; })
					}
				});
			}

			/* Use ResizeObserver to collapse/expand all sub-groups based on screen-resolution */
			const RO = new ResizeObserver(entries => {
				return entries.forEach(entry => {
					const showMegaMenu = entry.contentRect.width > this.settings.megaMenuBreakpoint;
					if (this.showMegaMenu !== showMegaMenu) {
						this.showMegaMenu = showMegaMenu;
						const panels = entry.target.querySelectorAll(`.${this.settings.clsMenuItem}--2`);
						panels.forEach(panel => {
							panel.open = showMegaMenu;
						});
						/* For First Level, add or remove keyHandler-eventListener if desktop/mobile */
						this.panels.forEach(panel => {
							panel.keyHandler.toggleKeyEvent(showMegaMenu);
						})
					}
				})
			});
			RO.observe(wrapper);
		}

		/* Use MutationObserver to detect <details [open]> changes */
		const MO = new MutationObserver(mutations => {return mutations.forEach(mutation => {
			const elm = mutation.target;
			if (elm.tagName.toLowerCase() === 'details') {
				elm.firstElementChild.setAttribute('aria-expanded', elm.open);
			}
		})});
		MO.observe(wrapper, {
			attributes: true,
			subtree: true
		});
	}

	/**
	 * @function handleKeys
	 * @param {Object} obj
	 * @description Handle key-navigation from keyhandler-obj
	 * TODO!!!
	 */
	handleKeys(obj) {
		// const handler = obj.element.keyHandler;
		// const isPanel = obj.active.tagName === 'SUMMARY';
		
		// eslint-disable-next-line
		console.log(obj);
	}

	/**
	 * @function renderMenu
	 * @param {Object} data
	 * @description Render menu from (json) object
	 */
	renderMenu(data, level) {
		return data.map(item => {return item.children ? 
			`<details class="${this.settings.clsMenuItem}--${level}"${level > 1 ? ` open`: ''}>
				<summary class="${this.settings.clsMenuItemName}--${level}" role="button" aria-expanded="${level > 1 ? `true`: `false`}">${item.name}</summary>
				<div class="${this.settings.clsMenuPanel}--${level}" role="menu">${this.renderMenu(item.children, level + 1)}</div>
			</details>`
			:
			`<a class="${this.settings.clsMenuItemLink}--${level}"${level > 1 ? ` role="menuitem"`: ''} href="${item.url}">${item.name}</a>`}
		).join('');
	}

	/**
	 * @function stringToType
	 * @param {Object} obj
	 * @description Convert data-attribute value to type-specific value. Prefix non-strings with ":", example = :true	*/
	stringToType(obj) {
		const object = Object.assign({}, obj);
		Object.keys(object).forEach(key => {
			if (object[key].charAt(0) === ':') {
				object[key] = JSON.parse(object[key].slice(1));
			}
		});
		return object;
	}
}