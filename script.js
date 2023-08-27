//_________________________________________________________Setup________________________________________
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 800
canvas.height = 500

let score = 0
let gameFrame = 0
ctx.font = '50px Georgia'



//___________________________________________________________End Of Setup____________________________________________


//___________________________________________--Mouse Interactivity________________________________________________
let canvasPosition = canvas.getBoundingClientRect()
const mouse = {
    x: canvas.width/2,
    y: canvas.height/2,
    click: false
}

canvas.addEventListener('mousedown', function(event){
    mouse.click = true
    mouse.x = event.x - canvasPosition.left
    mouse.y = event.y - canvasPosition.top

})

canvas.addEventListener('mouseup', function(){
    mouse.click = false
})
//_______________________________________________________End of Mouse Interactivity________________________________


//_______________________________________________________Player_________________________________________________-

class Player{
    constructor(){
        this.x = canvas.width/2
        this.y = canvas.height/2
        this.radius = 50
        this.angle = 0
    }

    update(){
        const dx = this.x - mouse.x
        const dy = this.y - mouse.y
        if (mouse.x != this.x){
            this.x -= dx/30
        }

        if (mouse.y != this.y){
            this.y -= dy/30
        }
    }

    draw(){
        if (mouse.click){

            //Making a line
            ctx.lineWidth = 0.2
            ctx.beginPath()
            ctx.moveTo(this.x, this.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.stroke()
        }
//Circle
        ctx.fillStyle = "red"
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill()
        ctx.closePath()


    }
}

const player = new Player()
//_________________________________________________________________End of Player___________________________________________


//________________________________________________________________________Bubbles_____________________________________________

const bubblesArray = []

class Bubble {
    constructor(){
        this.x = Math.random() * canvas.width
        this.y = canvas.height + Math.random() * canvas.height
        this.radius = 50
        this.speed = Math.random() * 5 + 1
        this.distance;
        this.count = false
    }

    update(){
        this.y -= this.speed
        const dx = this.x - player.x
        const dy = this.y - player.y
        this.distance = Math.sqrt(dx * dx + dy * dy)
    }

    draw(){
        ctx.fillStyle = 'blue'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
        ctx.fill()
        ctx.closePath()
        ctx.stroke()
        
} 
}

function handleBubbles(){
    if (gameFrame % 50 == 0){
        bubblesArray.push(new Bubble())
    }

    for (let i = 0; i < bubblesArray.length; i++){
        bubblesArray[i].update()
        bubblesArray[i].draw()
        
        if(bubblesArray[i].y < 0){
            bubblesArray.splice(i, 1)

        }

        if (bubblesArray[i].distance < bubblesArray[i].radius + player.radius && bubblesArray[i].count == false){
            score++
            bubblesArray[i].count = true
            bubblesArray.splice(i, 1)
            
        }

    }
}

//__________________________________________________________-End of Bubbles______________________________________________________________


//________________________________________________________Enemies___________________________________________________________________________

const enemyArray = [] 

class Enemies{
    constructor(){
        this.x = 0
        this.y = Math.random() * canvas.height
        this.radius = 50
        this.speed = Math.random() * 5 + 1
        this.distance;
    }
    
    update(){
        this.x += this.speed
        const dxEnemies = this.x - player.x
        const dyEnemies = this.y - player.y
        this.distance = Math.sqrt(dxEnemies * dxEnemies + dyEnemies * dyEnemies)
    }

    draw(){
        ctx.fillStyle = 'black'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
        ctx.fill()
        ctx.closePath()
        ctx.stroke()
    }
}


function handleEnemies(){
    if (gameFrame % 300 == 0){
        console.log("enemy")
        enemyArray.push(new Enemies())
    }

    for (let i = 0; i < enemyArray.length; i++){
        enemyArray[i].update()
        enemyArray[i].draw()
        
        if(enemyArray[i].x > 800){
            enemyArray.splice(i, 1)

        }
        else if (enemyArray[i].distance < enemyArray[i].radius + player.radius){
            score = 0
            enemyArray.splice(i, 1)
            
        }
    }
}

//___________________________________________________________End of Enemies_____________________________________________________________________________________


//__________________________________________________Animation loop______________________________________________________
function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    handleEnemies();
    handleBubbles();
    player.update();
    player.draw();


    ctx.fillText("Score: " + score, 10, 50)

    gameFrame++

    requestAnimationFrame(animate)
}

animate()
//________________________________________________________________End of Animation Loop___________________________________________-
