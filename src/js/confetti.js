// class ConfettiGenerator {
//   constructor(params) {
//     this.target = params.target;
//     this.maxCount = params.maxCount || 200; // Reduced count
//     this.size = params.size || 12;
//     this.canvas = document.getElementById(this.target);
//     this.ctx = this.canvas.getContext("2d");
//     this.particles = [];
//     this.speedFactor = 18; // Increased speed for rapid fall
//     this.populateParticles();
//   }

//   render() {
//     this.canvas.width = window.innerWidth;
//     this.canvas.height = window.innerHeight;

//     const draw = () => {
//       this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
//       this.particles.forEach((particle, index) => {
//         this.ctx.beginPath();
//         particle.color = `hsla(${
//           (particle.colorAngle += 10) % 360
//         }, 90%, 60%, 0.9)`;
//         this.ctx.fillStyle = particle.color;
//         this.ctx.moveTo(particle.x, particle.y);
//         this.ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2, true);
//         this.ctx.fill();
//       });
//       this.updateParticles();
//     };
//     setInterval(draw, 30); // Faster refresh rate was 20
//   }

//   populateParticles() {
//     for (let i = 0; i < this.maxCount; i++) {
//       this.particles.push({
//         x: Math.random() * window.innerWidth,
//         y: Math.random() * window.innerHeight,
//         r: Math.random() * 12 + 8, // Smaller particles was 8 & 3
//         d: Math.random() * this.maxCount,
//         colorAngle: Math.random() * 360,
//         angle: Math.random() * Math.PI * 2, // Randomized angles
//         speed: Math.random() * 10 + 5, // Varied speed
//       });
//     }
//   }

//   updateParticles() {
//     for (let i = 0; i < this.maxCount; i++) {
//       let particle = this.particles[i];
//       particle.x += Math.cos(particle.angle) * particle.speed;
//       particle.y += Math.sin(particle.angle) * particle.speed;

//       if (
//         particle.x > window.innerWidth + 5 ||
//         particle.x < -5 ||
//         particle.y > window.innerHeight
//       ) {
//         this.particles[i] = {
//           x: Math.random() * window.innerWidth,
//           y: -10,
//           r: particle.r,
//           d: particle.d,
//           colorAngle: particle.colorAngle,
//           angle: Math.random() * Math.PI * 2,
//           speed: Math.random() * 10 + 5,
//         };
//       }
//     }
//   }
// }


class ConfettiGenerator {
  constructor(params) {
    this.target = params.target;
    this.maxCount = params.maxCount || 200;
    this.size = params.size || 12;
    this.canvas = document.getElementById(this.target);
    this.ctx = this.canvas.getContext("2d");
    this.particles = [];
    this.speedFactor = 18;
    this.colors = ['#009AC7', '#CA3393', '#93358D', '#715091', '#005F7F', '#F88D2B']; // Added colors array
    this.populateParticles();
  }

  render() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    const draw = () => {
      this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      this.particles.forEach((particle, index) => {
        this.ctx.beginPath();
        particle.color = this.colors[index % this.colors.length]; // Assign color from colors array
        this.ctx.fillStyle = particle.color;
        this.ctx.moveTo(particle.x, particle.y);
        this.ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2, true);
        this.ctx.fill();
      });
      this.updateParticles();
    };
    setInterval(draw, 30);
  }

  populateParticles() {
    for (let i = 0; i < this.maxCount; i++) {
      this.particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 12 + 8,
        d: Math.random() * this.maxCount,
        color: this.colors[i % this.colors.length], // Assign color from colors array
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 10 + 5,
      });
    }
  }

  updateParticles() {
    for (let i = 0; i < this.maxCount; i++) {
      let particle = this.particles[i];
      particle.x += Math.cos(particle.angle) * particle.speed;
      particle.y += Math.sin(particle.angle) * particle.speed;

      if (
        particle.x > window.innerWidth + 5 ||
        particle.x < -5 ||
        particle.y > window.innerHeight
      ) {
        this.particles[i] = {
          x: Math.random() * window.innerWidth,
          y: -10,
          r: particle.r,
          d: particle.d,
          color: this.colors[i % this.colors.length], // Assign color from colors array
          angle: Math.random() * Math.PI * 2,
          speed: Math.random() * 10 + 5,
        };
      }
    }
  }
}
