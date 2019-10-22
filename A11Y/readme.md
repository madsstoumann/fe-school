# Agenda

1. Mads will demo a _faux select_, a _datepicker_ and a _table_ - all using the **keyHandler**-class.
2. We'll take a look at `<details><summary>`and how we can use these in building an accessible menu. Screen-reader-test of `<details>`: https://www.scottohara.me/blog/2018/09/03/details-and-summary.html
3. You'll decide whether to use `<details>` or the new `<menu>`-tag:

```html
<menu type="toolbar">
  <li>
   Item ...
  </li>
</menu>
```

## Tasks: Styling

1. Enable/uncomment the external stylesheet.
2. Style the menu so it looks great! Add animations, transitions, slide it in from left or right.
3. Consider adding a checkbox to toggle menu visibility (from an icon) on mobile devices, like on apple.com. Style this _above-the-fold_, so it also looks great without loading external styles.
4. If using the _mega menu_-layout, enable it in the stylesheet, update/add styles.

## Tasks: JavaScript

1. Change the `data-mega-menu`-attribute to `:true`.
2. Read the documentation on how to apply keyboard-navigation to this kind of navigation here: https://www.w3.org/TR/wai-aria-practices/examples/menubar/menubar-1/menubar-1.html
3. The _keyHandler_ returns an object with `col`, `row`, `active` etc. Check out the object by using some keys while focusing on one of the main menu items. Create a plan on how to implement the ogic from step #2, maybe use your own _keyHandler_.
4. Consider implementing the polyfill for Internet Explorer from `ie_details.html` - re-writing it to ES6. Modify the styles so they're not tag-based, and import these as well.
5. Using _webPack_ or _Parcel_ (or whatever tool you prefer), create a compatible bundle for browsers such as _Internet Explorer_ and _Edge_ (neither supports `<details>` by default).

## Share your work
I'd really like us to create something we can all use in our work, so please share whatever you do, and we'll combine the best of the best.