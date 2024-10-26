let x, y, dx, dy;
((d, t)=>{
  try{
    const rad2deg = rad => (rad / Math.PI) * 180,
    deg2rad = deg => (rad / 180) * Math.PI,
    p = d.getElementById("paragraph"),
    cnv = d.querySelector("canvas"),
    ctx = cnv.getContext("2d"),
    width = cnv.width,
    height = cnv.height;
    ctx.strokeRect(0, 0, width, height);
    ctx.beginPath();
      ctx.arc();
  }
  catch(e){
    alert(e);
  }
})(document, window)
