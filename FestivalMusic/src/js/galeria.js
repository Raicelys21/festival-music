document.addEventListener('DOMContentLoaded', function(){
    crearGaleria();
});

function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes');
    for(let i = 1; i <= 12; i++){
        const imagen = document.createElement('IMG');
        imagen.src = `src/img/thumb/${i}.jpg`;
        imagen.dataset.imagenId = i;

        //Anadir mostrar imagen
        imagen.onclick = mostrarImagen;

        const lista = document.createElement('LI');
        lista.appendChild(imagen);

        galeria.appendChild(lista);

    }
}

function mostrarImagen(e){
    const id = parseInt(e.target.dataset.imagenId);
    
    const imagen = document.createElement('IMG');
    imagen.src = `src/img/grande/${id}.jpg`;

    imagen.classList.add('img');

    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');

    overlay.onclick = function(){
        overlay.remove();
    }

    const cerrarImagen = document.createElement('P');
    cerrarImagen.textContent = 'X';
    cerrarImagen.classList.add('btn-close');

    cerrarImagen.onclick = function(){
        overlay.remove();
    }

    overlay.appendChild(cerrarImagen);

    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');
}