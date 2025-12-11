// Script che aggiorna automaticamente il file .env con l'IP locale corretto
const fs = require("fs");
const os = require("os");

// Otteniamo l'IP locale nella rete (192.168.x.x)
function getLocalIP() {
  const interfaces = os.networkInterfaces();

  for (const iface of Object.values(interfaces)) {
    for (const config of iface) {
      if (
        config.family === "IPv4" &&
        !config.internal &&
        (config.address.startsWith("192.168.") ||
         config.address.startsWith("10.") ||
         config.address.startsWith("172."))
      ) {
        return config.address;
      }
    }
  }

  return null;
}

const ip = getLocalIP();

if (!ip) {
  console.error("❌ Nessun IP di rete locale trovato.");
  process.exit(1);
}

console.log("✔ IP locale trovato:", ip);

const envContent = `VITE_BACKEND_HOST=${ip}
VITE_BACKEND_PORT=4000
`;

fs.writeFileSync(".env", envContent);

console.log("✔ File .env aggiornato con successo!");
