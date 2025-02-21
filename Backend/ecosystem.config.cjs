module.exports = {
  apps: [
    {
      name: "mi-hogar",
      script: "npm",
      args: "start",
      exec_mode: "cluster", // Modo clúster
      env: {
        NODE_ENV: "production",
        PORT: 5000
      }
    }
  ]
};

