const letters = ['r', 't', 'y', 'u', 'i', 'd', 'f', 'g', 'h', 'j', 'k', 'l']
const notes = ['c♯', 'd♯', 'f♯', 'g♯', 'a♯', 'c', 'd', 'e', 'f', 'g', 'a', 'b']
const letters_ru = ['к', 'е', 'н', 'г', 'ш', 'в', 'а', 'п', 'р', 'о', 'л', 'д']
const arr = document.querySelectorAll('.button');
const fullsrc = document.querySelector('.fullscreen');
const change_1 = document.querySelector('.notes');
const change_2 = document.querySelector('.letters');
change_1.style.background = '#557777'
let down = false;
let downkey = false;

for (let i = 0; i < arr.length; i++) {
    let audios = document.createElement('audio')
    arr[i].classList.add(`Key${letters[i].toUpperCase()}`)
    arr[i].classList.add(`${letters_ru[i]}`)
    arr[i].dataset.note = `${notes[i]}`
    arr[i].dataset.letters = `${letters[i].toUpperCase()}`;
    audios.src = `audio/${notes[i]}.mp3`
    audios.classList.add(`sound_${notes[i]}`)
    audios.classList.add(`audio_Key${letters[i].toUpperCase()}`)
    audios.classList.add(`audio_${letters_ru[i]}`)
    arr[i].append(audios)
    addListn(arr[i], i)
}

change_2.addEventListener('click', () => {
    for (let i = 0; i < arr.length; i++) {
        arr[i].classList.add('change')
    }
    change_1.style.background = ''
    change_2.style.background = '#557777'
})

change_1.addEventListener('click', () => {
    for (let i = 0; i < arr.length; i++) {
        arr[i].classList.remove('change')
    }
    change_2.style.background = ''
    change_1.style.background = '#557777'
})



function addListn(a, i) {
    a.addEventListener('mousedown', function f1() {
        event.target.firstChild.currentTime = 0
        event.target.firstChild.play()
        this.style.background = '#699'
        this.style.transform = 'scale(0.9)'
        setTimeout(() => {
            this.style.transform = 'scale(1)'
            this.style.background = ''
        }
            , 100)
    })
    a.addEventListener('mouseover', function f1() {
        if (down) {
            event.target.firstChild.currentTime = 0
            event.target.firstChild.play()
            this.style.background = '#699'
            this.style.transform = 'scale(0.9)'
            setTimeout(() => {
                this.style.transform = 'scale(1)'
                this.style.background = ''
            }
                , 100)
        } else return

    })
}

document.addEventListener('keydown', function f() {
    if (downkey) {
        return
    } else {
        if (document.querySelector(`.audio_${event.code}`) === null) {
            return
        } else {
            document.querySelector(`.audio_${event.code}`).currentTime = 0
            document.querySelector(`.audio_${event.code}`).play()
            document.querySelector(`.${event.code}`).style.background = '#699'
            document.querySelector(`.${event.code}`).style.transform = 'scale(0.9)'
        }
        downkey = true
    }
})

document.addEventListener('keyup', () => {
    downkey = false
    if (document.querySelector(`.audio_${event.code}`) === null) {
        return
    } else {
        document.querySelector(`.${event.code}`).style.background = ''
        document.querySelector(`.${event.code}`).style.transform = 'scale(1)'
    }

})

fullsrc.addEventListener('click', () => {
    document.body.requestFullscreen();
    if (document.fullscreenElement) {
        document.exitFullscreen()
    }
})

document.body.onfullscreenchange = () => { fullsrc.classList.toggle('used') }
document.body.ondragstart = function () {
    return false;
};

document.addEventListener('mousedown', () => {
    down = true
})

document.addEventListener('mouseup', () => {
    down = false
})