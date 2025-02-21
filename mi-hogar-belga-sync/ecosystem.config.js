module.exports = {
    apps: [
      {
        name: 'mi-hogar-belga',
        script: 'dist/main.js',
        cwd: './mi-hogar-belga-sync',
        env: {
          MONGO_URI:"mongodb+srv://aroncho6:26398322@cluster0.vmqsd6p.mongodb.net/MiHogarDB",
          TOKKO_TOKEN: '0ec754e9e60d69817226012d2d0aaf3f15583490',
          AGENCIA_NOMBRE: 'Belga',
          PORT: 3001,  // 🔹 Puerto específico para Belga
        },
      },
      {
        name: 'mi-hogar-silvia',
        script: 'dist/main.js',
        cwd: './mi-hogar-belga-sync',
        env: {
          MONGO_URI:"mongodb+srv://aroncho6:26398322@cluster0.vmqsd6p.mongodb.net/MiHogarDB",
          TOKKO_TOKEN: '6f24e3e1646e24ca07064a87fd7b3dfb9787e45e',
          AGENCIA_NOMBRE: 'Silvia',
          PORT: 3002,  // 🔹 Puerto específico para Silvia
        },
      },
    ],
  };
  