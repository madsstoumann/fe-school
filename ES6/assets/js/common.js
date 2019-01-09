export function debounced(delay, fn) {
  let timerId;
  return function(...args) {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      fn(...args);
      timerId = null;
    }, delay);
  };
}

export async function fetchAsync(url) {
  return (await fetch(url)).json();
}

export function mark(item, term) {
  return term.trim() === "" ? item : item.replace(RegExp(regExpEscape(term.trim()), "gi"), "<mark>$&</mark>");

}

export function regExpEscape(s) {
	return s.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
}