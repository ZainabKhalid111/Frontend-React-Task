
export const baseUrl = 'http://localhost:5000'; // to use in axios requests to the backend server

// to convert relative path to absolute path for images
export const convertToAbsoluteURL = (relativePath) => {
    const path = relativePath.replace('./', '');
    return `${baseUrl}/${path}`;
};