const slugify = (str) => {
    str = str.replace(/^\s+|\s+$/g, ''); // trim leading/trailing white space
    str = str.toLowerCase(); // convert string to lowercase
    str = str.replace(/[^a-z0-9 -]/g, '') // remove any non-alphanumeric characters
        .replace(/\s+/g, '-') // replace spaces with hyphens
        .replace(/-+/g, '-'); // remove consecutive hyphens
    return str;
}

const getLocaleDate = (date) => {
    date = new Date(date);
    const localeDate = date.toLocaleDateString("es-ES", {
        year: "numeric",
    });
    return localeDate;
}

export { slugify, getLocaleDate }