class Personaje {
  constructor(nombre, vida, ataque, defensa, velocidad) {
    this.nombre = nombre;
    this.vida = vida;
    this.ataque = ataque;
    this.defensa = defensa;
    this.velocidad = velocidad;
  }

  atacar(objetivo) {
    let ataqueReal = Math.floor(Math.random() * this.ataque);
    let defensaReal = Math.floor(Math.random() * objetivo.defensa);
    let dano = ataqueReal - defensaReal;
    if (dano < 0) dano = 0;

    objetivo.vida -= dano;
    logBatalla(
      `${this.nombre} ataca a ${objetivo.nombre} y causa ${dano} de daño.`
    );

    if (objetivo.vida <= 0) {
      logBatalla(`${objetivo.nombre} ha muerto.`);
    }
  }
}

class Mago extends Personaje {
  constructor(nombre, vida, ataque, defensa, velocidad, hechizos) {
    super(nombre, vida, ataque, defensa, velocidad);
    this.hechizos = hechizos;
  }

  lanzarHechizo(objetivo) {
    let hechizo =
      this.hechizos[Math.floor(Math.random() * this.hechizos.length)];
    let dano = hechizo.daño;
    objetivo.vida -= dano;

    logBatalla(
      `${this.nombre} lanza el hechizo ${hechizo.nombre} a ${objetivo.nombre} y causa ${dano} de daño.`
    );

    if (objetivo.vida <= 0) {
      logBatalla(`${objetivo.nombre} ha muerto.`);
    }
  }
}

class Guerrero extends Personaje {
  constructor(nombre, vida, ataque, defensa, velocidad, armas) {
    super(nombre, vida, ataque, defensa, velocidad);
    this.armas = armas;
  }

  atacarConArma(objetivo) {
    let arma = this.armas[Math.floor(Math.random() * this.armas.length)];
    let dano = arma.daño;
    objetivo.vida -= dano;

    logBatalla(
      `${this.nombre} ataca con ${arma.nombre} a ${objetivo.nombre} y causa ${dano} de daño.`
    );

    if (objetivo.vida <= 0) {
      logBatalla(`${objetivo.nombre} ha muerto.`);
    }
  }
}

class Arquero extends Personaje {
  constructor(nombre, vida, ataque, defensa, velocidad, flechas) {
    super(nombre, vida, ataque, defensa, velocidad);
    this.flechas = flechas;
  }

  dispararFlecha(objetivo) {
    let dano = Math.floor(Math.random() * 10) + 10;
    objetivo.vida -= dano;

    logBatalla(
      `${this.nombre} dispara una flecha a ${objetivo.nombre} y causa ${dano} de daño.`
    );

    if (objetivo.vida <= 0) {
      logBatalla(`${objetivo.nombre} ha muerto.`);
    }
  }
}

function logBatalla(texto) {
  const log = document.getElementById("log");
  log.textContent += texto + "\n";
}

let personajes = [
  new Mago("Mago 1", 100, 50, 30, 20, [
    { nombre: "Fuego", daño: 50 },
    { nombre: "Hielo", daño: 40 },
  ]),
  new Mago("Mago 2", 100, 50, 30, 20, [
    { nombre: "Fuego", daño: 50 },
    { nombre: "Hielo", daño: 40 },
  ]),
  new Guerrero("Guerrero 1", 120, 60, 40, 15, [
    { nombre: "Espada", daño: 30 },
    { nombre: "Hacha", daño: 40 },
  ]),
  new Guerrero("Guerrero 2", 120, 60, 40, 15, [
    { nombre: "Espada", daño: 30 },
    { nombre: "Hacha", daño: 40 },
  ]),
  new Arquero("Arquero", 80, 40, 25, 30, ["Flecha común", "Flecha explosiva"]),
];

function renderPersonajes() {
  const contenedor = document.getElementById("personajes");
  contenedor.innerHTML = "";

  personajes.forEach((p) => {
    contenedor.innerHTML += `
      <div class="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700">
        <h3 class="text-2xl font-bold mb-2">${p.nombre}</h3>
        <ul class="text-sm space-y-1">
          <li>❤️ Vida: ${p.vida}</li>
          <li>🗡️ Ataque: ${p.ataque}</li>
          <li>🛡️ Defensa: ${p.defensa}</li>
          <li>⚡ Velocidad: ${p.velocidad}</li>
        </ul>
      </div>
    `;
  });
}

function iniciarCombate() {
  document.getElementById("log").textContent = "";

  while (personajes.length > 1) {
    personajes.sort(
      (a, b) =>
        Math.floor(Math.random() * a.velocidad) -
        Math.floor(Math.random() * b.velocidad)
    );

    personajes.forEach((atacante) => {
      if (atacante.vida <= 0) return;

      let objetivo;
      do {
        objetivo = personajes[Math.floor(Math.random() * personajes.length)];
      } while (objetivo === atacante || objetivo.vida <= 0);

      let accion = Math.random();

      if (atacante instanceof Mago) {
        accion < 0.5
          ? atacante.atacar(objetivo)
          : atacante.lanzarHechizo(objetivo);
      } else if (atacante instanceof Guerrero) {
        accion < 0.5
          ? atacante.atacar(objetivo)
          : atacante.atacarConArma(objetivo);
      } else if (atacante instanceof Arquero) {
        accion < 0.5
          ? atacante.atacar(objetivo)
          : atacante.dispararFlecha(objetivo);
      }

      personajes = personajes.filter((p) => p.vida > 0);
    });
  }

  logBatalla(
    `🏆 ¡${personajes[0].nombre} es el último en pie y ha ganado la batalla!`
  );
  renderPersonajes();
}

document.addEventListener("DOMContentLoaded", () => {
  renderPersonajes();
  document
    .getElementById("btnCombate")
    .addEventListener("click", iniciarCombate);
});
