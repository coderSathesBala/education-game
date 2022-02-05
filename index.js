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

            if(this.position.y < 10) {this.position.y = 10}
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
            this.width = image.width,
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
    let scoreboard = 0
    c.font = "7rem Arial";
    c.fillText(scoreboard, 50, 150);
    
    
    image.addEventListener('load', e => {
        c.drawImage(image, 0, 0, canvas.width, canvas.height/1.38, 0, 0, canvas.width, canvas.height);
    });
    
    if(distance < -6000) {
        c.clearRect(0, 0, canvas.width, canvas.height);
        c.fillText('YOUR SCORE IS:', 50, 150);
        c.fillText(scoreboard, 500, 500)
        console.log('ok')
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
        player.velocity.x = 0
        platforms.forEach(platform => {
            platform.position.x -= 20
        })
    }

    //collision detection
    platforms.forEach(platform => {
        if(player.position.y + player.height <= platform.position.y 
            && player.position.y + player.height + player.velocity.y >= platform.position.y
            && player.position.x + player.width >= platform.position.x
            && player.position.x <= platform.position.x + platform.width
            ) {
            player.velocity.y = 0
            gravity = 0
        } 
    })
}

animate()

addEventListener('keydown', ({key}) => {
    switch (key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
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