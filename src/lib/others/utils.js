export const kebabCase = string => {
  // https://gist.github.com/thevangelist/8ff91bac947018c9f3bfaad6487fa149
  return string?.replace(/\s+/g, '-').toLowerCase();
}