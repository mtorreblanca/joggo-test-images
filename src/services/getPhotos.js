const getPhotos = async () => {
    const randomNum = Math.floor(Math.random() * 300) + 1;
    const photos = await fetch(`https://api.unsplash.com/photos/?client_id=${process.env.REACT_APP_UNSPLASH_ACCESS}&page=${randomNum}`)
    return await photos.json();
}

export default getPhotos;