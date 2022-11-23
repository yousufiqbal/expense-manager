import { writable } from "svelte/store";

export const toasts = writable([])

/**
 * 
 * @param {number} id 
 */
export const removeToast = id => {
  toasts.update(all => all.filter(t => t.id !== id))
}

/** @param {{ id?: number, type?: string, dismissible?: boolean, timeout?: number, message: string }} toast */
export const addToast = toast => {
  const id = Math.floor(Math.random() * 10000)
  const defaults = { id, type: 'success', dismissible: true, timeout: 5000 }
  let t = { ...defaults, ...toast }
  toasts.update(all => [t, ...all])
  if (t.timeout) setTimeout(() => removeToast(id), t.timeout)
}