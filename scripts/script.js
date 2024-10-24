((d, t)=>{
  try{
    const p = d.getElementById("paragraph"),
    cnv = d.querySelector("canvas"),
    ctx = cnv.getContext("2d");
  }
  catch(e){
    alert(e);
  }
})(document, window)
