import './Body.css';

// El clildren se usa para que Body pueda recibir otros componentes dentro de él
function Body({children}) {
    return (
        <div className="body">
            {children}
        </div>
    );
}

export default Body;