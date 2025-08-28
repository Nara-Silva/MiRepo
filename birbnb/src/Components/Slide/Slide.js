import './Slide.css';

function Slide({alojamiento}){

    return (

        <div className="slide">
            <div className="slide-image">
                <img src="/Images/1.jpg" alt="Esto es un hotel" />
            </div>
            <div className="slide-content">
                <h1>Hotel 1</h1>
                <p>Encuentra tu lugar ideal para hospedarte</p>
            </div>
        </div>
    );

}

export default Slide;