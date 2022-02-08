const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = innerWidth
canvas.height = innerHeight
const nextPlatform = canvas.width/1.5
let gravity = 10
var distance = 0

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
        image.src = './img/car.png'
        image.onload = () => {            
            this.image = image
            this.width = 300,
            this.height = 200
            this.position = {
                x: canvas.width/20,
                y: canvas.height/1.6
            }
        }
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        if (this.image) {
            this.draw()
            this.position.x += this.velocity.x
            this.position.y -= this.velocity.y

            if(this.position.y < canvas.height/1.6) {
                this.position.y += gravity
            }
        }
    }
}

class Platform {
    constructor({x, y}) {
        this.position = {
            x: x,
            y: y
        }
        const image = new Image()
        image.src = './img/platform.png'
        image.onload = () => {            
            this.image = image,
            this.width = 600,
            this.height = image.height
        }
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
        
    }

    update() {
        if (this.image) {
            if(this.position.x < -6000){
                distance = this.position.x
            }
            this.draw()
        }
    }
}




const player = new Player()
const platforms = [
    new Platform({x:canvas.width/2, y:canvas.height/2}), 
    new Platform({ x:canvas.width/2 + nextPlatform*1, y:canvas.height/3}),
    new Platform({ x:canvas.width/2 + nextPlatform*2, y:canvas.height/4}),
    new Platform({ x:canvas.width/2 + nextPlatform*3, y:canvas.height/2}),
    new Platform({ x:canvas.width/2 + nextPlatform*4, y:canvas.height/3}),
    new Platform({ x:canvas.width/2 + nextPlatform*5, y:canvas.height/2})
]

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
    const image = new Image(200, 'auto')
    image.src = './img/backgroundImage.jpg'
    c.font = "7rem Arial";
    
    image.addEventListener('load', e => {
        c.drawImage(image, 0, 0, canvas.width, canvas.height/1.38, 0, 0, canvas.width, canvas.height);
    });
    
    if(platforms[5].position.x <= (-canvas.width/2)) {
        c.clearRect(0, 0, canvas.width, canvas.height);
        c.fillText('THE END', 50, 100);
    }

    platforms.forEach(platform => {
        platform.update()
    })
    player.update()

    if (keys.ArrowRight.pressed) {
        player.velocity.x = 10
    } else {
        player.velocity.x = 0
    }

    if (keys.ArrowUp.pressed) {
        player.velocity.y = 25
    } else {
        player.velocity.y = 0
    }

    if (keys.ArrowRight.pressed && player.position.x > 700) {
        player.velocity.x = 1
        platforms.forEach(platform => {
            platform.position.x -= 20
        })
    }

    platforms.forEach(platform => {
        if(player.position.y + player.height <= platforms[0].position.y + 15 
            && player.position.y + player.height >= platforms[0].position.y 
            && player.position.x + player.width >= platforms[0].position.x
            && player.position.x <= platforms[0].position.x + platforms[0].width
            ) {
                gravity = 0
        }
        else if(
            player.position.y + player.height <= platforms[1].position.y + 15 
            && player.position.y + player.height >= platforms[1].position.y
            && player.position.x + player.width >= platforms[1].position.x
            && player.position.x <= platforms[1].position.x + platforms[1].width
            && platforms[1].position.x <= 1000
            ) {
                gravity = 0
        }
        else if(
            player.position.y + player.height <= platforms[2].position.y + 15 
            && player.position.y + player.height >= platforms[2].position.y
            && player.position.x + player.width >= platforms[2].position.x
            && player.position.x <= platforms[2].position.x + platforms[2].width
            && platforms[2].position.x <= 1000
            ) {
                gravity = 0
        }
        else if(
            player.position.y + player.height <= platforms[3].position.y + 15 
            && player.position.y + player.height >= platforms[3].position.y
            && player.position.x + player.width >= platforms[3].position.x
            && player.position.x <= platforms[3].position.x + platforms[3].width
            && platforms[3].position.x <= 1000
            ) {
                gravity = 0
        }
        else if(
            player.position.y + player.height <= platforms[4].position.y + 15 
            && player.position.y + player.height >= platforms[4].position.y
            && player.position.x + player.width >= platforms[4].position.x
            && player.position.x <= platforms[4].position.x + platforms[4].width
            && platforms[4].position.x <= 1000
            ) {
                gravity = 0
        }
        else if(
            player.position.y + player.height <= platforms[5].position.y + 15 
            && player.position.y + player.height >= platforms[5].position.y
            && player.position.x + player.width >= platforms[5].position.x
            && player.position.x <= platforms[5].position.x + platforms[5].width
            && platforms[5].position.x <= 1000
            ) {
                gravity = 0
        }
        else {
            gravity = 5
        }
    })
}

animate()

addEventListener('keydown', ({key}) => {
    switch (key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            distance++
            break
        case 'ArrowUp':
            keys.ArrowUp.pressed = true
            break
    }
})

addEventListener('keyup', ({key}) => {
    switch (key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowUp':
            keys.ArrowUp.pressed = false
            break
    }
})