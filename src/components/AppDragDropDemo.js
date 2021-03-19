// import { createApi } from 'unsplash-js';

// const unsplash = new createApi({
//     accessKey: process.env.REACT_APP_UNSPLASH_ACCESS,
// });
import photos from './photos.json';

const DragAndDropContainer = () => {
    console.log(photos)
    return (
        <div className="flex">
            <div className="w-1/2 grid grid-flow-col grid-cols-3 grid-rows-3 gap-4 m-4">
                {photos.map((photo) =>
                    <img key={photo.id}
                        className="h-20 w-20 mx-auto"
                        src={photo.urls.full}
                        alt={photo.alt_description}
                    />)
                }
            </div>
            <div className="flex-col h-screen">
                <div className="h-1/2">accepted</div>
                <div>neglected</div>
            </div>
        </div>)
};


export default DragAndDropContainer;
