var socket = io();


    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let painting = false;


    function endpoint() {
        painting = false;
        ctx.beginPath();
    }

    function startpoint(e) {
        painting = true;
        draw(e);
    }

    function draw(e) {
        if (!painting) {
            return;
        }
        ctx.lineWidth = 10;
        ctx.lineCap = "round";
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        lastX = e.clientX;
        lastY = e.clientY;
       
        socket.emit('draw', {
            linew: 10,
            linec: "round",
            eclx: e.clientX,
            ecly: e.clientY
        
        });
    }

    canvas.addEventListener("mousedown", startpoint);
    canvas.addEventListener("mouseup", endpoint);
    canvas.addEventListener("mousemove", draw);


socket.on("all_users", function (value) {

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    ctx.lineWidth = value.linew;
    ctx.lineCap = value.linec;
    ctx.lineTo(value.eclx, value.ecly);
    ctx.stroke();
   

    }


)


   