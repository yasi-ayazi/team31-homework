function getCount(str) {
  return (str.match(/[aeiouAEIOU]/g) || []).length;
}
