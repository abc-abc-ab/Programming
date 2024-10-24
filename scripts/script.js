((d, t)=>{
  try{
    const p = d.getElementById("paragraph"),
    cnv = d.querySelector("canvas"),
    ctx = cnv.getContext("2d");
    ctx.strokeRect(0, 0, 100, 50);
  }
  catch(e){
    alert(e);
  }
})(document, window)
