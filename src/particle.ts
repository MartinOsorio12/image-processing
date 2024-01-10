export class Particle {
  protected x: number;
  protected y: number;
  protected width: number;
  protected height: number;
  protected speed: number;
  protected velocity: number;
  protected size: number;
  protected ctx: CanvasRenderingContext2D;
  protected _2PI: number;
  protected position1: number;
  protected position2: number;
  protected mappedImage: any[][][];
  
  constructor(width: number, height: number,
    screenCanvas: CanvasRenderingContext2D,
    mapImg: number[][][]) {
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

  public update() {
    this.position1 = Math.floor(this.y);
    this.position2 = Math.floor(this.x);
    let movement = 0;
    if (this.y < this.height) {
      this.speed = this.mappedImage[0][this.position1][this.position2];
      movement = (2.5 - this.speed) + this.velocity;
    }

    this.y += movement;
    
    if (this.y >= this.height) {
      this.y = 0;
      this.x = Math.random() * this.width;
    }
  }

  public draw() {
    this.ctx.beginPath();
    //this.ctx.fillStyle = this.mappedImage[1][this.position1][this.position2];
    this.ctx.fillStyle = 'white';
    this.ctx.arc(this.x, this.y, this.size, 0, this._2PI);
    this.ctx.fill();
  }

  public getSpeed(): number {
    return this.speed;
  }
}

export class ParticleText {
  protected x: number;
  protected y: number;
  protected size: number;
  protected ctx: CanvasRenderingContext2D;
  protected _2PI: number;
  protected baseX: number;
  protected baseY: number;
  protected density: number;
  protected mappedImage: any[][][];
  
  constructor(x: number, y: number, screenCanvas?: CanvasRenderingContext2D,
    mapImg?: number[][][]) {
    this.ctx = screenCanvas;
    this.x = x;// + 200;
    this.y = y;// - 100,
    this.size = 1;
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = ((Math.random() * 30) + 1);
    this._2PI = Math.PI * 2;
    this.mappedImage = mapImg;
  }

  public update(mouse: any) {
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx*dx + dy*dy);
    let forceDirectionX = dx / distance;
    let forceDirectionY = dy / distance;
    var maxDistance = mouse.radius;
    var force = (maxDistance - distance) / maxDistance;

    let directionX = (forceDirectionX * force * this.density);
    let directionY = (forceDirectionY * force * this.density);
    
    if (distance < mouse.radius) {
      this.x -= directionX ;
      this.y -= directionY ;
    }
    else {
      if (this.x !== this.baseX ) {
          let dx = this.x - this.baseX;
          this.x -= dx/5;
      } if (this.y !== this.baseY) {
          let dy = this.y - this.baseY;
          this.y -= dy/5;
      }
    }
  }

  public draw() {
    this.ctx.fillStyle = 'blue';
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, this._2PI);
    this.ctx.closePath();
    this.ctx.fill();
  }

}

export class Football {
  protected x: number;
  protected y: number;
  protected size: number;
  protected ctx: CanvasRenderingContext2D;
  protected velocityX: number;
  protected velocityY: number;
  protected color: string;
  protected panelColors: string[];

  constructor(x: number, y: number, size: number, ctx: CanvasRenderingContext2D, color: string) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.ctx = ctx;
    this.velocityX = Math.random() * 2 - 1; // Velocidad horizontal aleatoria
    this.velocityY = Math.random() * 2 - 1; // Velocidad vertical aleatoria
    this.color = color;
    this.panelColors = this.generatePanelColors();
  }

  protected generatePanelColors(): string[] {
    // Colores de los paneles (puedes personalizarlos según tus preferencias)
    return ['#ffffff', '#000000']; // Blanco y negro para simular hexágonos y pentágonos
  }

  public update() {
    this.x += this.velocityX;
    this.y += this.velocityY;

    // Rebote en los bordes
    if (this.x + this.size > this.ctx.canvas.width || this.x - this.size < 0) {
      this.velocityX *= -1;
    }

    if (this.y + this.size > this.ctx.canvas.height || this.y - this.size < 0) {
      this.velocityY *= -1;
    }
  }

  public draw() {
    // Dibuja el contorno circular
    this.ctx.strokeStyle = 'black'; // Color del contorno
    this.ctx.lineWidth = 2; // Ancho del contorno
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size + this.ctx.lineWidth / 2, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.stroke();

    // Dibuja los paneles hexagonales y pentagonales
    let isHexagon = true;
    for (let angle = 0; angle < Math.PI * 2; angle += (Math.PI * 2) / 6) {
      const panelSize = isHexagon ? this.size : (this.size * Math.sqrt(3)) / 2; // Triángulo equilátero inscrito
      const panelX = this.x + panelSize * Math.cos(angle);
      const panelY = this.y + panelSize * Math.sin(angle);

      this.ctx.fillStyle = this.panelColors[isHexagon ? 0 : 1];
      this.ctx.beginPath();
      this.ctx.arc(panelX, panelY, isHexagon ? this.size / 5 : this.size / 4, 0, Math.PI * 2);
      this.ctx.closePath();
      this.ctx.fill();

      isHexagon = !isHexagon;
    }
  }
}

export class VortexParticle {
  protected x: number;
  protected y: number;
  protected size: number;
  protected ctx: CanvasRenderingContext2D;
  protected angle: number;
  protected radius: number;
  protected angularSpeed: number;

  constructor(x: number, y: number, size: number, ctx: CanvasRenderingContext2D, angle: number, radius: number, angularSpeed: number) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.ctx = ctx;
    this.angle = angle;
    this.radius = radius;
    this.angularSpeed = angularSpeed;
  }

  public update() {
    // Actualiza el ángulo y la posición en función de la espiral
    this.angle += this.angularSpeed;
    this.x = this.radius * Math.cos(this.angle);
    this.y = this.radius * Math.sin(this.angle);
  }

  public draw() {
    // Dibuja una partícula en la posición actual de la espiral
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.fill();
  }
}