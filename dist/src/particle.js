var Particle = /** @class */ (function () {
    function Particle(width, height, screenCanvas, mapImg) {
        this.width = width;
        this.height = height;
        this.ctx = screenCanvas;
        this.x = Math.random() * width;
        this.y = 0;
        this.speed = 0;
        this.velocity = Math.random() * 2.5;
        this.size = Math.random() * 1.5 + 1;
        this._2PI = Math.PI * 2;
        this.position1 = Math.floor(this.y);
        this.position2 = Math.floor(this.x);
        this.mappedImage = mapImg;
    }
    Particle.prototype.update = function () {
        this.position1 = Math.floor(this.y);
        this.position2 = Math.floor(this.x);
        var movement = 0;
        if (this.y < this.height) {
            this.speed = this.mappedImage[0][this.position1][this.position2];
            movement = (2.5 - this.speed) + this.velocity;
        }
        this.y += movement;
        if (this.y >= this.height) {
            this.y = 0;
            this.x = Math.random() * this.width;
        }
    };
    Particle.prototype.draw = function () {
        this.ctx.beginPath();
        //this.ctx.fillStyle = this.mappedImage[1][this.position1][this.position2];
        this.ctx.fillStyle = 'white';
        this.ctx.arc(this.x, this.y, this.size, 0, this._2PI);
        this.ctx.fill();
    };
    Particle.prototype.getSpeed = function () {
        return this.speed;
    };
    return Particle;
}());
export { Particle };
var ParticleText = /** @class */ (function () {
    function ParticleText(x, y, screenCanvas, mapImg) {
        this.ctx = screenCanvas;
        this.x = x; // + 200;
        this.y = y; // - 100,
        this.size = 1;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = ((Math.random() * 30) + 1);
        this._2PI = Math.PI * 2;
        this.mappedImage = mapImg;
    }
    ParticleText.prototype.update = function (mouse) {
        var dx = mouse.x - this.x;
        var dy = mouse.y - this.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        var forceDirectionX = dx / distance;
        var forceDirectionY = dy / distance;
        var maxDistance = mouse.radius;
        var force = (maxDistance - distance) / maxDistance;
        var directionX = (forceDirectionX * force * this.density);
        var directionY = (forceDirectionY * force * this.density);
        if (distance < mouse.radius) {
            this.x -= directionX;
            this.y -= directionY;
        }
        else {
            if (this.x !== this.baseX) {
                var dx_1 = this.x - this.baseX;
                this.x -= dx_1 / 5;
            }
            if (this.y !== this.baseY) {
                var dy_1 = this.y - this.baseY;
                this.y -= dy_1 / 5;
            }
        }
    };
    ParticleText.prototype.draw = function () {
        this.ctx.fillStyle = 'blue';
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, this._2PI);
        this.ctx.closePath();
        this.ctx.fill();
    };
    return ParticleText;
}());
export { ParticleText };
var Football = /** @class */ (function () {
    function Football(x, y, size, ctx, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.ctx = ctx;
        this.velocityX = Math.random() * 2 - 1; // Velocidad horizontal aleatoria
        this.velocityY = Math.random() * 2 - 1; // Velocidad vertical aleatoria
        this.color = color;
        this.panelColors = this.generatePanelColors();
    }
    Football.prototype.generatePanelColors = function () {
        // Colores de los paneles (puedes personalizarlos según tus preferencias)
        return ['#ffffff', '#000000']; // Blanco y negro para simular hexágonos y pentágonos
    };
    Football.prototype.update = function () {
        this.x += this.velocityX;
        this.y += this.velocityY;
        // Rebote en los bordes
        if (this.x + this.size > this.ctx.canvas.width || this.x - this.size < 0) {
            this.velocityX *= -1;
        }
        if (this.y + this.size > this.ctx.canvas.height || this.y - this.size < 0) {
            this.velocityY *= -1;
        }
    };
    Football.prototype.draw = function () {
        // Dibuja el contorno circular
        this.ctx.strokeStyle = 'black'; // Color del contorno
        this.ctx.lineWidth = 2; // Ancho del contorno
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size + this.ctx.lineWidth / 2, 0, Math.PI * 2);
        this.ctx.closePath();
        this.ctx.stroke();
        // Dibuja los paneles hexagonales y pentagonales
        var isHexagon = true;
        for (var angle = 0; angle < Math.PI * 2; angle += (Math.PI * 2) / 6) {
            var panelSize = isHexagon ? this.size : (this.size * Math.sqrt(3)) / 2; // Triángulo equilátero inscrito
            var panelX = this.x + panelSize * Math.cos(angle);
            var panelY = this.y + panelSize * Math.sin(angle);
            this.ctx.fillStyle = this.panelColors[isHexagon ? 0 : 1];
            this.ctx.beginPath();
            this.ctx.arc(panelX, panelY, isHexagon ? this.size / 5 : this.size / 4, 0, Math.PI * 2);
            this.ctx.closePath();
            this.ctx.fill();
            isHexagon = !isHexagon;
        }
    };
    return Football;
}());
export { Football };
var VortexParticle = /** @class */ (function () {
    function VortexParticle(x, y, size, ctx, angle, radius, angularSpeed) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.ctx = ctx;
        this.angle = angle;
        this.radius = radius;
        this.angularSpeed = angularSpeed;
    }
    VortexParticle.prototype.update = function () {
        // Actualiza el ángulo y la posición en función de la espiral
        this.angle += this.angularSpeed;
        this.x = this.radius * Math.cos(this.angle);
        this.y = this.radius * Math.sin(this.angle);
    };
    VortexParticle.prototype.draw = function () {
        // Dibuja una partícula en la posición actual de la espiral
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.closePath();
        this.ctx.fill();
    };
    return VortexParticle;
}());
export { VortexParticle };
