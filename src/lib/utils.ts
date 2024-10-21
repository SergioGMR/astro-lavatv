import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

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

const avatarApiUrl =
    "https://api.dicebear.com/9.x/fun-emoji/svg?backgroundType=gradientLinear&radius=0&seed=";

export { slugify, getLocaleDate, avatarApiUrl }