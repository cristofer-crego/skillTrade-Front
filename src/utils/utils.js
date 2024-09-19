export function truncate(str, maxLength) {
  return str?.length > maxLength ? str?.substring(0, maxLength - 3) + "..." : str;
}
// export function capitalizeFirstLetter(str) {
//   const words = str.split(" ");
//   const capitalizedWords = words.map((word) => {
//     return word.charAt(0).toUpperCase() + word.slice(1);
//   });
//   return capitalizedWords.join(" ");
// }

export const capitalizeEachWord = (text) => {
  return text?.replace(/\b\w/g, (char) => char.toUpperCase());
};

export const capitalizeFirstLetter = (text) => {
  return text?.charAt(0).toUpperCase() + text?.slice(1);
};
export const getUserInitials = (name, lastName) => {
  const firstInitial = name ? name.charAt(0).toUpperCase() : "";
  const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : "";
  return `${firstInitial}${lastInitial}`;
};
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: "numeric", month: "long", year: "numeric" };
  return date.toLocaleDateString("es-ES", options); // Cambia el idioma a español
};