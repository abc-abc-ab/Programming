let x, y, dx, ax, ay; // commit Changesぅぅ???
[dx, ax, ay] = [0,0,0];
((d, t) => {
    try {
        // ラジアンと度の相互変換関数
        /** @param {number} rad */
        const rad2deg = rad => (rad / Math.PI) * 180;
        /** @param {number} deg */
        const deg2rad = deg => (deg / 180) * Math.PI,

        // 弾を撃つ関数 (現時点ではコンソールに出力)
        shoot = (elm, Xx, Yy, deltaX, deltaY) => {
            // console.log(`elm: ${elm}, x: ${Xx}, y: ${Yy}, speed: ${Math.abs(deltaY)}.`);
            const bullet = new Circle(ctx, Xx, Yy, 6);
            function a(){
                ctx.fillStyle = "#ff0";
                bullet.move(deltaX, deltaY);
                if(bullet.y < -10){
                    t.cancelAnimationFrame(a);
                }
                else{
                    t.requestAnimationFrame(a);
                }
            };
            t.requestAnimationFrame(a);
        };

        class Circle{
            /**
             * @param {CanvasRenderingContext2D} context 
             * @param {number} horizonal 
             * @param {number} vertical 
             * @param {number} radius 
             */
          constructor(context, horizonal, vertical, radius){
            this.ctx = context;
            this.x = horizonal;
            this.y = vertical;
            this.r = radius;
          };
          move(dx, dy){
            [this.x, this.y] = [this.x + dx, this.y + dy];
            p.textContent = `x: ${this.x},y: ${this.y},dx: ${dx}`;
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.r, 0/* rad */, deg2rad(360));
            this.ctx.fill();
            this.ctx.closePath();
          }
        };
      
        // キャンバスとコンテキストを取得
        const p = d.querySelector("p"),
        cnv = d.querySelector("canvas"),
        ctx = cnv.getContext("2d"),
        width = cnv.width,
        height = cnv.height;

        // 初期位置
        [x, y] = [width / 2, height*3 / 4];
        const player = new Circle(ctx, x, y, 10),
        ai = new Circle(ctx, x, y/3, 10);
        // アニメーションループ
        let id;
        function draw(){
            // キャンバスのクリアと描画
            ctx.clearRect(0, 0, width, height);
            (function moveAI(){
                if (player.x < x){
                    t.dispatchEvent(new KeyboardEvent("keydown", {key: "->"}));
                }
                else if(x < player.x){
                    t.dispatchEvent(new KeyboardEvent("keydown", {key: "<-"}));
                }
                else{
                    t.dispatchEvent(new KeyboardEvent("keydown", {key: ">.<"}));
                }
            })()
            // 円の移動
            ctx.fillStyle = "#faaf46";
            ai.move(ax, ay);
            if (0 < player.x && player.x < width){
                ctx.fillStyle = "#10a0ff";
                player.move(dx, 0);
            }
            else{
                player.x = width / 2;
            }
            id = t.requestAnimationFrame(draw);
        }
        id = t.requestAnimationFrame(draw);
        // t.cancelAnimationFrame(id); # what the f**k!?
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
            if (e.key === "ArrowLeft") {
                dx = -4;
            } else if (e.key === "ArrowRight") {
                dx = 4;
            } else if (e.key === " ") {
                shoot(ctx, player.x, player.y, 0, -3);
            }
             else if(e.key.match(/(<?->?)|(>\.<)/)){
                if (e.key !== ">.<"){
                    ai.x = (-player.x) + 150;
                    ax = 0;
                }
                else{
                    ax = (100 * Math.random() >= 51)?4:-4;
                }
             }
         });
         t.addEventListener("keyup", (e) => {
            if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
                dx = 0;
            }
         });

         d.getElementById("bullet").addEventListener("click", () => {
            t.dispatchEvent(new KeyboardEvent("keydown", {key: " "}))
         })
    } catch (e) {
        alert(e);
    }
})(document, window);
