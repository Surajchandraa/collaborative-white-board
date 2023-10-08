var socket = io();


    const canvas = document.getElementById("canvas");
    const paint = document.getElementById("color-type");
    const range=document.getElementById("pencil-size");
    const eraser=document.getElementById("eraser");
    let no_of_user=document.getElementById("number");
    

    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let painting = false;
    let color ="";
    let size=3;

    paint.addEventListener('input',function(){
        color=paint.value;
        eraser.classList.remove("bg")

    })

    range.addEventListener('input',function(){
        size=range.value;
    })

    eraser.addEventListener("click",function(){
        color="white";
        eraser.classList.add("bg")
    })

    function endpoint() {
        painting = false;
        
    }

    function startpoint(e) {
        painting = true;
        ctx.beginPath();
        draw(e);
      

      
    }

    function draw(e) {
        if (!painting) {
            return;
        }

        const rect = canvas.getBoundingClientRect();
        const offsetX = rect.left;
        const offsetY = rect.top;

        ctx.strokeStyle=color;
        ctx.lineWidth = size;
        ctx.lineCap = "round";

        socket.emit('draw', {
            linew: size,
            linecolor:color,
            linec: "round",
            eclx: e.clientX-offsetX,
            ecly: e.clientY-offsetY
        
        });
        
        ctx.lineTo(e.clientX-offsetX, e.clientY-offsetY);
        ctx.stroke();
    
       
    
    }

    canvas.addEventListener("mousedown", startpoint);
    canvas.addEventListener("mouseup", endpoint);
    canvas.addEventListener("mousemove", draw);


socket.on("all_users", function (value) {

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    
    
    ctx.lineWidth = value.linew;
    ctx.lineCap = value.linec;
    ctx.strokeStyle=value.linecolor;
    ctx.lineTo(value.eclx, value.ecly);
    ctx.stroke();
   

    }


)

socket.on("broadcast-user-number",function(value){
    no_of_user.innerHTML=`${value}`
    console.log(value)
    
})

   