const slugify = (str) => {
    str = str.replace(/^\s+|\s+$/g, ''); // trim leading/trailing white space
    str = str.toLowerCase(); // convert string to lowercase
    str = str.replace(/[^a-z0-9 -]/g, '') // remove any non-alphanumeric characters
             .replace(/\s+/g, '-') // replace spaces with hyphens
             .replace(/-+/g, '-'); // remove consecutive hyphens
    return str;
}

const getLocaleDate = (date) => {
    const localeDate = date.toLocaleDateString("es-ES", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
    });
    return localeDate;
}

export { slugify, getLocaleDate }