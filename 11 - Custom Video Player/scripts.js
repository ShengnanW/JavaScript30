const video = document.querySelector('.viewer'),
    player = document.querySelector('.player'),
    progress = document.querySelector('.progress'),
    progressFilled = document.querySelector('.progress__filled'),
    toggleBtn = document.querySelector('.toggle'),
    playerSliders = document.querySelectorAll('.player__slider'),
    skipBtns = document.querySelectorAll('.player__button')

let mouseDown = false

function palyControl() {
    // if (video.paused) {
    //     video.play()
    // } else {
    //     video.pause()
    // }
    video.paused ? video.play() : video.pause()
}

function playIconChange() {
    const icon = this.paused ? '►' : '| |'
    toggleBtn.innerHTML = icon
}

function skipControl() {
    if (!this.dataset.skip) return
    video.currentTime += parseFloat(this.dataset.skip)
    // video.currentTime += this.dataset.skip
    // console.log(video.currentTime)
}

function rangeControl() {
    video[this.name] = this.value
}

function progressControl() {
    const percentage = Number((this.currentTime / this.duration) * 100).toFixed(1)
    progressFilled.style.flexBasis = `${percentage}%`
}

function progressHandeler(e) {
    if(e.type === 'mousemove'){
        if (!mouseDown) return
    }  
    const changeTime = (e.offsetX / this.offsetWidth) * video.duration
    video.currentTime = parseFloat(changeTime)
}

toggleBtn.addEventListener('click', palyControl)
video.addEventListener('click', palyControl)
video.addEventListener('play', playIconChange)
video.addEventListener('pause', playIconChange)
video.addEventListener('timeupdate', progressControl)
skipBtns.forEach(item => item.addEventListener('click', skipControl))
playerSliders.forEach(item => item.addEventListener('input', rangeControl))
// playerSliders.forEach(item => item.addEventListener('mousemove', rangeControl))
progress.addEventListener('click', progressHandeler)
progress.addEventListener('mouseup', () => mouseDown = false)
progress.addEventListener('mousedown', () => mouseDown = true)
progress.addEventListener('mousemove', progressHandeler)