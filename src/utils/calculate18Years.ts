export function calculate18Years() {
  const today = new Date();
  const test = today.getFullYear() - 18;
  console.log(test);
  return new Date(test);
}
