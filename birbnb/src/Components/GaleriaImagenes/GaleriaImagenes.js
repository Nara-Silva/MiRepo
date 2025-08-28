import './GaleriaImagenes.css';
import { useState } from 'react';


const GaleriaImagenes = ({ imagenes }) => {
    const [verTodas, setVerTodas] = useState(false);

    if (!imagenes || imagenes.length === 0) return null;

    const procesadas = imagenes.map(img => {
        if (typeof img === 'string') return img;

        const url = Object.keys(img)
            .filter(k => !isNaN(k))
            .sort((a, b) => a - b)
            .map(k => img[k])
            .join('');

        return url;
    });

    const imagenesAMostrar = verTodas ? procesadas : procesadas.slice(0, 5);

    return (
        <div className={`galeria-grid ${verTodas ? 'extendida' : ''}`}>
           {imagenesAMostrar.map((img, index) => {
        const esUltima = index === imagenesAMostrar.length - 1;
            return (
                <div key={index} className={`img-container ${!verTodas ? `img-${index}` : ''}`}>
                    <img src={img} alt={`Imagen ${index + 1}`} />
                     {esUltima && procesadas.length > 5 && (
                         <button className="ver-todas" onClick={() => setVerTodas(prev => !prev)}>
                            {verTodas ? 'Mostrar menos fotos' : 'Mostrar todas las fotos'}
                        </button>
                        )}
                </div>
            );
    })}
        </div>
    );
};

export default GaleriaImagenes;
