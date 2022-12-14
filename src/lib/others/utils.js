/**
 * 
 * @param {string} str 
 * @returns {string}
 */
export const kebabCase = string => {
  // https://gist.github.com/thevangelist/8ff91bac947018c9f3bfaad6487fa149
  return string?.replace(/\s+/g, '-').toLowerCase();
}

/**
 * 
 * @param {HTMLElement} node 
 * @returns 
 */
export function outclickHandler(node) {
  
  const handleClick = event => {
    if (node && !node.contains(event.target) && !event.defaultPrevented) {
      node.dispatchEvent(
        new CustomEvent('outclick', node)
      )
    }
  }

	document.addEventListener('click', handleClick, true);
  
  return {
    destroy() {
      document.removeEventListener('click', handleClick, true);
    }
	}
}

/**
 * 
 * @param {Object} params 
 * @param {} $page 
 * @returns 
 */
 export const setQuery = (params, $page) => {
  let q = new URLSearchParams($page.url.search)
  for (const name in params) {
    if (params[name]) {
      q.set(name, params[name])
    } else {
      q.delete(name)
    }
  }
  return '?' + q.toString()
}

export function isEmpty(object) {
  for (const property in object) {
    return false;
  }
  return true;
}

export const post = async (url, body) => {
  return await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(body)
  });
}

export const put = async (url, body) => {
  return await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(body)
  });
}

export const del = async url => {
  return await fetch(url, { method: 'DELETE' });
}

// program to convert first letter of a string to uppercase
export function capitalize(str) {

  // converting first letter to uppercase
  const capitalized = str.charAt(0).toUpperCase() + str.slice(1);

  return capitalized;
}

