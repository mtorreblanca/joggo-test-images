import { useState, useEffect } from 'react';
import getPhotos from '../services/getPhotos';
import photos from './photos.json';
import neglectedIcon from '../assets/icons/neglected.svg';
import acceptedIcon from '../assets/icons/accept.svg';

const DragAndDropContainer = () => {
    const [initial, setInitial] = useState(photos);
    const [accepted, setAccepted] = useState([]);
    const [neglected, setNeglected] = useState([]);

    useEffect(() => {
        const fetchPhotos = async () => {
            const photos = await getPhotos();
            setInitial(photos);
        }
        fetchPhotos();
    }, []);

    const onDragStart = (ev, index, origin) => {
        ev.dataTransfer.setData("index", index);
        ev.dataTransfer.setData("origin", origin);
    }

    const onDragOver = (ev) => {
        ev.preventDefault();
    }

    const onDrop = (ev, cat) => {
        let reciverContainer;
        switch (cat) {
            case 'initial':
                reciverContainer = { array: initial, setter: (state) => setInitial(state) };
                break;
            case 'accepted':
                reciverContainer = { array: accepted, setter: (state) => setAccepted(state) };
                break;
            case 'neglected':
                reciverContainer = { array: neglected, setter: (state) => setNeglected(state) };
                break;
            default:
                break;
        }

        let index = ev.dataTransfer.getData("index");
        let origin = ev.dataTransfer.getData('origin');



        switch (origin) {
            case 'initial':
                reciverContainer.array.push(initial[index]);
                reciverContainer.setter(reciverContainer.array)
                let initialAux = [...initial]
                initialAux.splice(index, 1)
                setInitial(initialAux);
                break;
            case 'accepted':
                reciverContainer.array.push(accepted[index]);
                reciverContainer.setter(reciverContainer.array)
                let acceptedAux = [...accepted]
                acceptedAux.splice(index, 1)
                setAccepted(acceptedAux);
                break;
            case 'neglected':
                reciverContainer.array.push(neglected[index]);
                reciverContainer.setter(reciverContainer.array)
                let neglectedAux = [...neglected]
                neglectedAux.splice(index, 1)
                setNeglected(neglectedAux);
                break;
            default:
                break;
        }

    }

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50">
            <div className="w-1/2 h-100 overflow-hidden grid grid-flow-col grid-cols-3 grid-rows-3 gap-2 m-1 "
                onDragOver={(e) => onDragOver(e)}
                onDrop={(e) => { onDrop(e, "initial") }}
            >
                {/* <button type="button" onClick={() => handler()}>hola</button> */}
                {initial.map((image, index) =>
                    <img key={image.id}
                        onDragStart={(e) => onDragStart(e, index, 'initial')}
                        draggable
                        className="h-20 w-20 m-auto"
                        src={image.urls.full}
                        alt={image.alt_description}
                    />)
                }
            </div>
            <div className="flex-col w-1/2 h-100">
                <div className="h-1/2 w-full grid grid-flow-col grid-cols-3 grid-rows-3 gap-1 bg-green-50 relative"
                    onDragOver={(e) => onDragOver(e)}
                    onDrop={(e) => { onDrop(e, "accepted") }}>
                    <div className="absolute right-2 top-2">
                        <img src={acceptedIcon}
                            alt="neglected icon" />
                    </div>
                    {accepted.map((image, index) =>
                        <img key={image.id}
                            onDragStart={(e) => onDragStart(e, index, 'accepted')}
                            draggable
                            className="h-20 w-20 m-auto mt-2"
                            src={image.urls.full}
                            alt={image.alt_description}
                        />)
                    }
                </div>
                <div className="w-full h-1/2 grid grid-flow-col grid-cols-3 grid-rows-3 gap-1 border-t-2
                    bg-red-50 relative"
                    onDragOver={(e) => onDragOver(e)}
                    onDrop={(e) => { onDrop(e, "neglected") }}>
                    <div className="absolute right-2 top-2">
                        <img src={neglectedIcon}
                            alt="neglected icon" />
                    </div>
                    {neglected.map((image, index) =>
                        <img key={image.id}
                            onDragStart={(e) => onDragStart(e, index, 'neglected')}
                            draggable
                            className="h-20 w-20 mx-auto mt-2"
                            src={image.urls.full}
                            alt={image.alt_description}
                        />)
                    }
                </div>
            </div>
        </div>)
};


export default DragAndDropContainer;
