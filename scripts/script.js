        /**
         * @typedef {{
        *    ctx: CanvasRenderingContext2D,
        *    x: number,
        *    y: number,
        *    r: number,
        *    move: (dx: number, dy: number) => void
        * }} Player
        * @typedef {{
        *    circle: Player,
        *    speed: number,
        *    hp: number = 100,
        *    isDead: bool = false
        *    update: () => void,
        *    draw: (dx: number, dy: number) => void,
        *    takeDamage: (damage: number) => number
        * }} AI 
        * @type {AI}
        */
       let ai;
((d, t) => {
    try {
        let x, y, dx, ax, ay; // What? commit Changesぅぅ!?
        /**@type {Array<Circle>} */
        let bullets = [];
        [dx, ax, ay] = [0,0,0];
        
        // ラジアンと度の相互変換関数
        /** @param {number} rad */
        const rad2deg = rad => (rad / Math.PI) * 180;
        /** @param {number} deg */
        const deg2rad = deg => (deg / 180) * Math.PI;

        // 弾を撃つ関数
        /** 
         * @param {HTMLCanvasElement} elm 
         * @param {number} Xx 
         * @param {number} Yy 
         * @param {number} deltaX 
         * @param {number} deltaY 
         */
        const shoot = (elm, Xx, Yy, deltaX, deltaY) => {
            // console.log(`elm: ${elm}, x: ${Xx}, y: ${Yy}, speed: ${Math.abs(deltaY)}.`);
            const bullet = new Circle(elm.getContext("2d"), Xx, Yy, 6);
            bullets.push(bullet);
            function a(){
                elm.getContext("2d").fillStyle = "#ff0";
                bullet.move(deltaX, deltaY);
                if(bullet.y < -10){
                    t.cancelAnimationFrame(a);
                    bullets = bullets.filter(() => !bullets.includes(bullet));
                }
                else{
                    t.requestAnimationFrame(a);
                }
            };
            t.requestAnimationFrame(a);
        };

        /// --- /// --- /// --- /// --- /// --- Class Start
        /// --- /// --- /// --- /// --- /// ---
        /// --- /// --- /// --- /// --- /// ---
        class Circle{
            /** `Circle`オブジェクトを生成
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
          /**
           * @param {number} dx
           * @param {number} dy
           */
          move(dx, dy){
            [this.x, this.y] = [this.x + dx, this.y + dy];
            // p.textContent = `x: ${this.x},y: ${this.y},dx: ${dx}`;
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.r, 0/* rad */, deg2rad(360));
            this.ctx.fill();
            this.ctx.closePath();
          }

          /**
           * @param {Circle?} circleA 
           * @param {Circle?} circleB 
           */
          static isColliding(circleA = new Circle(), circleB = new Circle()){
            if (circleA instanceof Circle && circleB instanceof Circle){
                if (circleA === circleB){
                    throw "比較対象が同じです.";
                }
                else{
                    // `衝突したかの処理`を書く
                    const dx = circleA.x - circleB.x;
                    const dy = circleA.y - circleB.y;
                    const distance = Math.hypot(dx, dy);

                    return distance <= circleA.r + circleB.r;
                }
            }
            else{
                const abc = () => Object.prototype.toString();
                throw `型はどちらも\`Circle\`でないといけませんが,
                (${abc.call(circleA)}, ${abc.call(circleB)})
                です.`;
            }
          }
          
        };

        class Enemy {
            /** `Enemy`オブジェクトを生成
             * @param {number} Xx 
             * @param {number} radius 
             * @param {number} speed 
             */
            constructor(Xx, radius, speed) {
                this.circle = new Circle(ctx, Xx, y/3, radius);
                this.speed = speed; // 移動速度
                this.hp = 100; // 体力
                this.isDead = false; // 生存フラグ
            }
        
            update() {
                // 敵のAIを実装する部分 (例: プレイヤーを追いかける)
                // プレイヤーの位置をplayer.xとすると
                const deltaX = player.x - this.circle.x;

                // 敵がプレイヤーより左にいる場合、右へ移動
                if (deltaX < 0 || this.circle.x < 0) {
                    this.draw(this.speed, 0);
                } else {
                    this.draw(-this.speed, 0);
                };
                bullets.forEach((v, i, a) => {
                if(Circle.isColliding(v, this.circle)){
                    this.takeDamage(30)
                }});
            }
        
            draw(dX, dY) {
                this.circle.move(dX, dY);
            }
        
            takeDamage(damage) {
                this.hp -= damage;
                if (this.hp <= 0) {
                    this.hp = 0;
                    this.isDead = true;
                }
                return this.hp;
            }
        }
        /// --- /// --- /// --- /// --- /// ---
        /// --- /// --- /// --- /// --- /// ---
        /// --- /// --- /// --- /// --- /// --- Class End
      
        // キャンバスとコンテキストを取得
        const cnv = d.querySelector("canvas"),
        ctx = cnv.getContext("2d"),
        width = cnv.width,
        height = cnv.height,
        CIRCLE_RADIUS = 10;

        // 初期位置
        [x, y] = [width / 2, height*3 / 4];
        /* canvas, x, y, radius */
        const player = new Circle(ctx, x, y, CIRCLE_RADIUS);
        /* x, radius, speed */
        /**@type {Enemy} */
        ai = new Enemy(x, CIRCLE_RADIUS, 2);
        // アニメーションループ
        let id;
        function draw(){
            // キャンバスのクリアと描画
            ctx.clearRect(0, 0, width, height);

            // 円の移動
            ctx.fillStyle = "#faaf46";
            if(ai.isDead){
                ai.circle.move();
            }
            else {
                ai.update();
            };
            if (0 < player.x && player.x < width){
                ctx.fillStyle = "#10a0ff";
                player.move(dx, 0);
            }
            else{
                player.x = width / 2;
            };
            id = t.requestAnimationFrame(draw);
        }
        id = t.requestAnimationFrame(draw);

        let bool = 0;
        cnv.addEventListener("touchstart", (e) => {
          bool = true;
        });cnv.addEventListener("touchend", () => {
          bool = false;
        });cnv.addEventListener("touchmove", (e)=>{
            const ev = e.touches[0];
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
                shoot(cnv, player.x, player.y, 0, -3);
            }
         });
         t.addEventListener("keyup", (e) => {
            if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
                dx = 0;
            }
         });

         d.getElementById("bullet").addEventListener("click", () => {
            t.dispatchEvent(new KeyboardEvent("keydown", {key: " "}));
         })
    } catch (e) {
        alert(e);
    }
})(document, window);
