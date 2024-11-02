const radioStations = [
    {
        id: 'oxigeno',
        name: 'Radio Oxígeno',
        image: 'https://cdn.instant.audio/images/logos/radios-com-pe/oxigeno.png',
        url: 'https://us-b4-p-e-pb13-audio.cdn.mdstrm.com/live-audio-aw/5fab0687bcd6c2389ee9480c?aid=5faaeb72f92d7b07dfe10181&pid=2QTyPjC1taxnoAQ85MJ41NIbGEgkFhnv&sid=mudE6gkPPWc7RlKF8bBY3S7bhKADmIYf&uid=Z6AlCPbezbzOe7qJJcq9DJfAbj3vdX6L&es=us-b4-p-e-pb13-audio.cdn.mdstrm.com&ote=1729977383275&ot=btK1iUbPPwm1woULPgqgLw&proto=https&pz=us&cP=128000&awCollectionId=5faaeb72f92d7b07dfe10181&liveId=5fab0687bcd6c2389ee9480c&referer=https%3A%2F%2Fradios.com.pe%2F&listenerId=Z6AlCPbezbzOe7qJJcq9DJfAbj3vdX6L'
    },
    {
        id: 'ritmo-romantica',
        name: 'Radio Ritmo Romántica',
        image: 'https://cdn.instant.audio/images/logos/radios-com-pe/romantica.png',
        url: 'https://24933.live.streamtheworld.com/CRP_RIT_SC?csegid=20001&dist=20001&ttag=20001'
    },
    {
        id: 'rock-pop',
        name: 'Radio Rock & Pop',
        image: 'https://cdn.instant.audio/images/logos/radios-com-pe/z-lima.png',
        url: 'https://radioz.egostreaming.pe/radio/3e4f6a1b2c3d4e567890abcd/'
    },
    {
        id: 'la-inolvidable',
        name: 'Radio La Inolvidable',
        image: 'https://cdn.instant.audio/images/logos/radios-com-pe/inolvidable.png',
        url: 'https://26653.live.streamtheworld.com/CRP_LI_SC?csegid=20001&dist=20001&ttag=20001'
    },
    {
        id: 'la-kalle',
        name: 'Radio La Kalle',
        image: 'https://cdn.instant.audio/images/logos/radios-com-pe/kalle.png',
        url: 'https://lakalle.egostreaming.pe/radio/a7b9c3e4567f8d0123456789/'
    },
    {
        id: 'onda-cero',
        name: 'Radio Onda Cero',
        image: 'https://cdn.instant.audio/images/logos/radios-com-pe/onda.png',
        url: 'https://us-b4-p-e-pb13-audio.cdn.mdstrm.com/live-audio-aw/6598b65ab398c90871aff8cc?aid=658ddcc0b2c7835d48fee06d&pid=Vf0VewteX3lFXI1Df45Ga1de8K33LnNc&sid=mudE6gkPPWc7RlKF8bBY3S7bhKADmIYf&uid=Z6AlCPbezbzOe7qJJcq9DJfAbj3vdX6L&es=us-b4-p-e-pb13-audio.cdn.mdstrm.com'
    }
];

const audioPlayers = {};

function createRadioStation(station) {
    const radioContainer = document.querySelector('.radio-container');

    const radioDiv = document.createElement('div');
    radioDiv.classList.add('radio');
    radioDiv.id = station.id;

    const img = document.createElement('img');
    img.src = station.image;
    img.alt = `Logo de ${station.name}`;

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    const button = document.createElement('button');
    button.onclick = () => togglePlay(station.id, station.url);

    const icon = document.createElement('i');
    icon.classList.add('fas', 'fa-play');
    icon.id = `icon-${station.id}`;

    button.appendChild(icon);
    buttonContainer.appendChild(button);
    radioDiv.appendChild(img);
    radioDiv.appendChild(buttonContainer);
    radioContainer.appendChild(radioDiv);
}

function initializeRadios() {
    radioStations.forEach(createRadioStation);
}

function togglePlay(radioId, url) {
    const button = document.querySelector(`#${radioId} button i`);

    function updateButtonIcon(isPlaying) {
        if (isPlaying) {
            button.classList.remove('fa-play');
            button.classList.add('fa-stop');
        } else {
            button.classList.remove('fa-stop');
            button.classList.add('fa-play');
        }
    }

    if (audioPlayers[radioId]) {
        // Si ya está reproduciendo, detén el audio
        audioPlayers[radioId].pause();
        delete audioPlayers[radioId];
        updateButtonIcon(false);
    } else {
        // Si no está reproduciendo, crea un nuevo audio
        const audio = new Audio(url);
        audioPlayers[radioId] = audio;

        audio.play().catch(error => {
            console.error('Error al intentar reproducir el audio:', error);
            alert('No se pudo reproducir la radio.'); // Muestra un mensaje al usuario
        });

        updateButtonIcon(true);

        // Detener el audio si se abre otro
        Object.keys(audioPlayers).forEach((key) => {
            if (key !== radioId) {
                audioPlayers[key].pause();
                const otherButton = document.querySelector(`#${key} button i`);
                delete audioPlayers[key];
                // Cambiar el icono del otro botón a play
                otherButton.classList.remove('fa-stop');
                otherButton.classList.add('fa-play');
            }
        });

        // Cuando el audio termine, eliminarlo de la lista y cambiar el icono
        audio.addEventListener('ended', () => {
            delete audioPlayers[radioId];
            updateButtonIcon(false);
        });
    }
}

// Inicializa el reproductor de radios al cargar la página
document.addEventListener('DOMContentLoaded', initializeRadios);
