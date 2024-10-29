let x, y, dx = 0; // commit Changes!!!
((d, t) => {
    try {
        // ラジアンと度の変換関数
        const rad2deg = rad => (rad / Math.PI) * 180;
        const deg2rad = deg => (deg / 180) * Math.PI;

        // 弾を撃つ関数 (現時点ではコンソールに出力)
        const shoot = (elm, speed) => {
            console.log(`elm: ${elm}, speed: ${speed}.`);
        };

        // キャンバスとコンテキストを取得
        const cnv = d.querySelector("canvas");
        const ctx = cnv.getContext("2d");
        const width = cnv.width;
        const height = cnv.height;

        // 矢印のクラス (再利用性のためにクラス化)
        class Arrow {
            constructor(x, y, width, height, direction) {
                this.x = x;
                this.y = y;
                this.width = width;
                this.height = height;
                this.direction = direction; // 'left' or 'right'
            }

            draw() {
                ctx.beginPath();
                ctx.moveTo(this.x, this.y + this.height / 2);
                if (this.direction === 'left') {
                    ctx.lineTo(this.x + this.width, this.y);
                    ctx.lineTo(this.x + this.width, this.y + this.height);
                } else {
                    ctx.lineTo(this.x - this.width, this.y);
                    ctx.lineTo(this.x - this.width, this.y + this.height);
                }
                ctx.fill();
                ctx.stroke();
            }

            isClicked(mouseX, mouseY) {
                return mouseX >= this.x && mouseX <= (this.x + this.width) &&
                       mouseY >= this.y && mouseY <= (this.y + this.height);
            }
        }

        // 矢印のインスタンスを作成
        const leftArrow = new Arrow(10, 80, 40, 25, 'left');
        const rightArrow = new Arrow(width - 50, 80, 40, 25, 'right');

        // 初期位置
        [x, y] = [width / 2, height / 2];

        // アニメーションループ
        t.setInterval(() => {
            ctx;
            // キャンバスのクリアと描画
            ctx.clearRect(0, 0, width, height);
            leftArrow.draw();
            rightArrow.draw();

            // 円の描画 (省略)
            ctx.beginPath();
            ctx.arc(x, y, 10, 0, deg2rad(360));
            ctx.fillStyle = "#10a0ff";
            ctx.fill();
            ctx.closePath();

            // 円の移動
            x += dx;
        }, 10);

        // クリックイベント
        cnv.addEventListener('click', (event) => {
            const rect = cnv.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            if (leftArrow.isClicked(mouseX, mouseY)) {
                dx = -4;
            } else if (rightArrow.isClicked(mouseX, mouseY)) {
                dx = 4;
            }
        });

        // キーボードイベント
        t.addEventListener("keydown", (e) => {
            if (e.key === "ArrowLeft") {
                dx = -4;
            } else if (e.key === "ArrowRight") {
                dx = 4;
            } else if (e.key === " ") {
                shoot(ctx, -10);
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
