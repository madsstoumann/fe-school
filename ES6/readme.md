# Agenda

We'll be looking into ES6+ syntax, talk about the path from ES5/jQuery to ES6,
and build an AutoSuggest-component from scratch as a JS class.

If time permits, we'll create the exact same component as a Vue.js-component,
to maintain the knowledge we required in the last session.

Prerequisites:

1. Google Chrome
2. Visual Studio Code, with plugin "Live Server" (Ritwick Dey) installed.

# AutoSuggest

1. Merge the internal `config`-object with the external `settings`-object.

2. Create the result list DOM-node: `this.list`, add `cssList`-class from `settings`-object.

3. Add `this.list` to the DOM, just after the `this.input`-node.

4. Add an `input`-eventListener to `this.input`, call the `handleInput`-method using the imported `debounced`-method.

5. Add code to the `hideInput`-method, so the function can be called with `true` or `false` to hide `this.list`.

6. `fetch` some data in `handleInput`