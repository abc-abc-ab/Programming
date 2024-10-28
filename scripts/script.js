let x, y, dx = 0;
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
                return mouseX >= this.x && mouseX <= this.x + this.width &&
                       mouseY >= this.y && mouseY <= this.y + this.height;
            }
        }
