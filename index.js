const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const gravity = 2

class Player {
    constructor() {
        
        this.velocity = {
            x: 0,
            y: 0
        }

        this.position = {
            x: 0,
            y: 0
        }

        const image = new Image()
        image.src = './img/car.jpg'
        image.onload = () => {            
            this.image = image
            this.width = image.width,
            this.height = image.height
        
            this.position = {
                x: canvas.width/20,
                y: canvas.height/1.4
            }
        }
    }

    draw() {
        // c.fillStyle = 'red'
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        if (this.image) {
            this.draw()
            this.position.x += this.velocity.x
            this.position.y -= this.velocity.y

            if(this.position.y < canvas.height/1.4) {
                this.position.y += gravity
            }
        }

    }
}

class Platform {
    constructor() {
        this.position = {
            x: canvas.width/2,
            y: canvas.height/2
        }

        const image = new Image()
        image.src = './img/platform.png'
        image.onload = () => {            
            this.image = image,
            this.width = image.width,
            this.height = image.height
        

        }
    }

    draw() {
        // c.fillStyle = 'red'
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        if (this.image) {
            this.draw()
        }
    }
}




const player = new Player()
const platform = new Platform()

const keys = {
    'ArrowRight': {
        pressed: false
    },
    'ArrowUp': {
        pressed: false
    }
}

function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'gray'
    c.fillRect(0, 0, canvas.width, canvas.height)
    platform.update()
    player.update()

    if (keys.ArrowRight.pressed) {
        player.velocity.x = 5
    } else {
        player.velocity.x = 0
    }

    if (keys.ArrowUp.pressed) {
        player.velocity.y = 25
    } else {
        player.velocity.y = 0
    }

    if (keys.ArrowRight.pressed && player.position.x > 700) {
        player.velocity.x = 0
        platform.position.x -=5
    } 
}

animate()

addEventListener('keydown', ({key}) => {
    switch (key) {
        case 'ArrowRight':
            console.log('right')
            keys.ArrowRight.pressed = true
            break
        case 'ArrowUp':
            console.log('up')
            keys.ArrowUp.pressed = true
            break
    }
})

addEventListener('keyup', ({key}) => {
    switch (key) {
        case 'ArrowRight':
            console.log('right')
            keys.ArrowRight.pressed = false
            break
        case 'ArrowUp':
            console.log('up')
            keys.ArrowUp.pressed = false
            break
    }
})