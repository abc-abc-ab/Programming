let x, y, dx = 0;
((d, t)=>{
  try{
    const rad2deg = rad => (rad / Math.PI) * 180,
    deg2rad = deg => (deg / 180) * Math.PI,
    p = d.getElementById("paragraph"),
    cnv = d.querySelector("canvas"),
    ctx = cnv.getContext("2d"),
    width = cnv.width,
    height = cnv.height;
    [x, y] = [width/2, height/2];
    ctx.strokeRect(0, 0, width, height);
    ctx.beginPath();
      ctx.arc(x, y, 10, 0, deg2rad(360));
      ctx.fillStyle = "#10a0ff";
      ctx.fill();
    ctx.closePath();
    t.setInterval(()=>{
      ctx.clearRect(0, 0, 3*x, 3*y)
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, deg2rad(360));
      ctx.fillStyle = "#10a0ff";
      ctx.fill();
      ctx.closePath();
      x += dx;
    }, 10)
    t.addEventListener("keydown", (e)=>{
      if (e.key === "ArrowLeft"){
        dx = -10;
      }
      else if(e.key === "ArrowRight"){
        dx = 10;
      }
      else{
        dx = 0;
      }
    })
  }
  catch(e){
    alert(e);
  }
})(document, window)
