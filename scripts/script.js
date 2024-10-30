let x, y, dx = 0; // commit Changesぅぅ...?
((d, t) => {
    try {
        // ラジアンと度の相互変換関数
        const rad2deg = rad => (rad / Math.PI) * 180;
        const deg2rad = deg => (deg / 180) * Math.PI,

        // 弾を撃つ関数 (現時点ではコンソールに出力)
        shoot = (elm, Xx, Yy, deltaX, deltaY) => {
        console.log(`elm: ${elm}, x: ${Xx}, y: ${Yy}, speed: ${Math.abs(deltaY)}.`);
            const bullet = new Circle(ctx, Xx, Yy, 6),
            a = () =>{
                ctx.fillStyle = "#0ff";
                bullet.move(deltaX, deltaY);
                if(bullet.y < -10){
                    // t.cancelAnimationFrame(a);
                }
                else{
                    t.requestAnimationFrame(a);
                }
            t.requestAnimationFrame(a);
             };
        };
      
        class Circle{
          constructor(context, horizonal, vertical, radius){
            this.ctx = context;
            this.x = horizonal;
            this.y = vertical;
            this.r = radius;
          };
          move(dx, dy){
            [this.x, this.y] = [this.x + dx, this.y + dy];
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.r, 0/* rad */, deg2rad(360));
            this.ctx.fill();
            this.ctx.closePath();
          }
        };
      
        // キャンバスとコンテキストを取得
        const cnv = d.querySelector("canvas"),
        ctx = cnv.getContext("2d"),
        width = cnv.width,
        height = cnv.height;

        // 初期位置
        [x, y] = [width / 2, height / 2];
        const player = new Circle(ctx, x, y, 10);
        // アニメーションループ
        let id;
        function draw(){
            // キャンバスのクリアと描画
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = "#10a0ff";
            // 円の移動
            if (10 < player.x && player.x < 200){
                player.move(dx, 0);
                x += dx;
            }
            else{
                player.move(0,0);
            }
            id = t.requestAnimationFrame(draw);
        }
        id = t.requestAnimationFrame(draw);
        // t.cancelAnimationFrame(id);
        let bool = 0;
        /*cnv.addEventListener("click", (e) => {
          bool = true;
        });*/cnv.addEventListener("touchstart", (e) => {
          bool = true;
        });cnv.addEventListener("touchend", () => {
          bool = false;
        });cnv.addEventListener("touchmove", (e)=>{
            const ev = e.touches[0]
            if (bool)  
              player.x = ev.clientX * 0.75;
        });
      
      
        cnv.addEventListener("mousedown", (e) => {
          bool = true;
        });cnv.addEventListener("mouseup", () => {
          bool = false;
        });cnv.addEventListener("mousemove", (e)=>{
            if (bool)  
              player.x = e.clientX * 0.75;
        });
         // キーボードイベント
         t.addEventListener("keydown", (e) => {
            if (e.key === "ArrowLeft" && (x > 10)) {
                dx = -4;
            } else if (e.key === "ArrowRight" && (x < 200)) {
                dx = 4;
            } else if (e.key === " ") {
                shoot(ctx, player.x, player.y, 0, -1);
            }
            else{
                console.log(e.key);
            }
         });
         t.addEventListener("keyup", (e) => {
            if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
                dx = 0;
            }
         });
    } catch (e) {
        alert(e);
    }
})(document, window);