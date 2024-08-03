const URL_PATTERN =
  /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g;

const isValidURL = (url) => {
  return URL_PATTERN.test(url);
};

export { isValidURL };