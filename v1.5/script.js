const output = document.getElementById("output");
const commandInput = document.getElementById("command");
const inputForm = document.getElementById("input-form");

let scannedDevices = [];
let scannedNetworks = [];
let virusList = [];
let backdoors = [];

inputForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = commandInput.value.trim();
  if (!input) return;

  appendToOutput(`> ${input}`);
  handleCommand(input.toLowerCase());
  commandInput.value = "";
});

function appendToOutput(text, delay = 0, glow = false) {
  setTimeout(() => {
    const line = document.createElement("div");
    line.textContent = text;
    if (glow) line.classList.add("glow");
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
  }, delay);
}

function animateCountdown(seconds, callback) {
  let count = seconds;
  const interval = setInterval(() => {
    appendToOutput(`⏳ Estimated time: ${count}s...`);
    count--;
    if (count < 0) {
      clearInterval(interval);
      callback();
    }
  }, 1000);
}

function handleCommand(cmd) {
  if (cmd === "/help") {
    appendToOutput(`
🧠 Available Commands:
/help
/clear
/scan_devices
/attack_[device]
/bypass_firewall
/scan_network
/trace -block --ip=[IP]
/scan_website
/launch -ddos --target=[url]
/crack -hash [file] --file=passwords.db
/spoof -mac
/sudo overload-core
/create -virus [name]
/inject -[virus]
/generate -quantum_key
/decrypt -[key] --keyfile=[file]
/scan -ports --target=[IP]
/backdoor -inject --port=[port]
/clone -site [url]
    `);
  }

  else if (cmd === "/clear") {
    output.innerHTML = "";
  }

  else if (cmd === "/scan_devices") {
    scannedDevices = ["Device-01", "Device-02", "Printer", "SmartTV", "Camera", "Router"]
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 6) + 2);
    appendToOutput("[SCAN] Scanning for nearby devices...");
    scannedDevices.forEach((d, i) => {
      appendToOutput(`📡 Found: ${d}`, i * 300);
    });
  }

  else if (cmd.startsWith("/attack_")) {
    const device = cmd.replace("/attack_", "");
    if (!scannedDevices.includes(device)) {
      appendToOutput(`[✗] Device "${device}" not found. Run /scan_devices first.`);
    } else {
      appendToOutput(`[⚔] Launching attack on ${device}...`);
      setTimeout(() => {
        const success = Math.random() > 0.3;
        appendToOutput(success ? `💥 Attack successful on ${device}` : `❌ Attack failed on ${device}. Try /bypass_firewall`);
      }, 2000);
    }
  }

  else if (cmd === "/bypass_firewall") {
    appendToOutput(`[⛓] Bypassing firewall...`);
    animateCountdown(5, () => {
      appendToOutput(`🔓 Firewall bypassed.`);
    });
  }

  else if (cmd === "/scan_network") {
    scannedNetworks = Array.from({ length: Math.floor(Math.random() * 4) + 2 }, (_, i) => ({
      name: `Network_${i + 1}`,
      ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      security: ["WPA2", "WPA2.5", "WPA3"][Math.floor(Math.random() * 3)]
    }));
    appendToOutput("[SCAN] Scanning nearby networks...");
    scannedNetworks.forEach((n, i) => {
      appendToOutput(`📡 ${n.name} | IP: ${n.ip} | Security: ${n.security}`, i * 300);
    });
  }

  else if (cmd.startsWith("/trace -block --ip=")) {
    const ip = cmd.split("=")[1];
    const found = scannedNetworks.some(n => n.ip === ip);
    appendToOutput(`[TRACE] Searching for IP: ${ip}`);
    if (found) {
      setTimeout(() => appendToOutput(`🧠 IP traced and blocked: ${ip}`), 1500);
    } else {
      appendToOutput(`❌ IP not found. Run /scan_network first.`);
    }
  }

  else if (cmd === "/scan_website") {
    const websites = ["https://alpha.com", "https://beta.org", "https://gamma.net", "https://delta.io", "https://echo.ai"];
    appendToOutput(`[WEB] Scanning web targets...`);
    websites.slice(0, Math.floor(Math.random() * 8) + 5).forEach((site, i) => {
      appendToOutput(`🌐 Found: ${site}`, i * 300);
    });
  }

  else if (cmd.startsWith("/launch -ddos --target=")) {
    const target = cmd.split("=")[1];
    appendToOutput(`[DDOS] Attacking ${target}...`);
    animateCountdown(5, () => {
      appendToOutput(`💣 Attack deployed on ${target}. Status: SUCCESS.`);
    });
  }

  else if (cmd.startsWith("/crack -hash")) {
    appendToOutput(`🔐 Cracking password file...`);
    animateCountdown(5 + Math.floor(Math.random() * 20), () => {
      const fail = Math.random() < 0.2;
      if (fail) appendToOutput(`❌ Failed to crack password.`);
      else appendToOutput(`🔓 Password cracked successfully: Wino936@Frozen`);
    });
  }

  else if (cmd === "/spoof -mac") {
    appendToOutput(`Original MAC: 00:1A:2B:3C:4D:5E`);
    const newMac = [...Array(6)].map(() => Math.floor(Math.random() * 256).toString(16).padStart(2, "0")).join(":");
    appendToOutput(`New MAC: ${newMac}`);
    appendToOutput(`MAC address successfully spoofed.`);
  }

  else if (cmd === "/sudo overload-core") {
    appendToOutput(`Warning: CPU core overloaded to 110%!`);
    appendToOutput(`Thermal warning: Cooling system failing.`);
    appendToOutput(`System stability compromised.`);
  }

  else if (cmd.startsWith("/create -virus ")) {
    const name = cmd.split(" ")[1];
    virusList.push(name);
    appendToOutput(`Virus '${name}' creation initiated.`);
    appendToOutput(`Compiling payload... Done.`);
    appendToOutput(`Virus '${name}' ready for deployment.`);
  }

  else if (cmd.startsWith("/inject -")) {
    const name = cmd.split("-")[1];
    if (!virusList.includes(name)) {
      appendToOutput(`❌ Virus '${name}' not found. Create it first.`);
    } else {
      appendToOutput(`Deploying virus '${name}'...`);
      appendToOutput(`Injection successful. Target infected.`);
    }
  }

  else if (cmd === "/generate -quantum_key") {
    appendToOutput(`Generating quantum key...`);
    const key = `Ψ-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    animateCountdown(3, () => {
      appendToOutput(`Quantum Key: ${key} (256-bit encryption)`);
      appendToOutput(`Key generation complete and saved.`);
    });
  }

  else if (cmd.startsWith("/decrypt -")) {
    const parts = cmd.split(" ");
    const key = parts[0].split("-")[1];
    const file = parts[1]?.split("=")[1];
    appendToOutput(`Decrypting '${file}' with key Ψ-${key}...`);
    animateCountdown(4, () => {
      appendToOutput(`Decryption successful. File contents revealed:`);
      appendToOutput(`[REDACTED: Classified Data]`);
    });
  }

  else if (cmd.startsWith("/scan -ports --target=")) {
    const ip = cmd.split("=")[1];
    const ports = [
      { port: 21, name: "FTP" },
      { port: 22, name: "SSH" },
      { port: 80, name: "HTTP" },
      { port: 443, name: "HTTPS" },
      { port: 3306, name: "MySQL" }
    ];
    appendToOutput(`[SCAN] Initiating port scan on ${ip}...`);
    ports.forEach((p, i) => {
      const isOpen = Math.random() > 0.3;
      appendToOutput(`${isOpen ? "[✓]" : "[✗]"} Port ${p.port} (${p.name}): ${isOpen ? "OPEN" : "CLOSED"}`, i * 300);
    });
  }

  else if (cmd.startsWith("/backdoor -inject --port=")) {
    const port = cmd.split("=")[1];
    backdoors.push(port);
    appendToOutput(`[!] Attempting backdoor injection on port ${port}...`);
    setTimeout(() => {
      appendToOutput(` - Exploiting buffer overflow...`);
      appendToOutput(` - Payload deployed.`);
      appendToOutput(`[✓] Backdoor successfully installed on port ${port}.`);
      appendToOutput(`[!] Listening for remote connection...`);
    }, 2000);
  }

  else if (cmd.startsWith("/clone -site ")) {
    const url = cmd.split(" ")[1];
    appendToOutput(`[CLONE] Target URL: ${url}`);
    animateCountdown(3, () => {
      appendToOutput(` - Downloading HTML, CSS, JS assets...`);
      appendToOutput(` - Rewriting form actions...`);
      appendToOutput(`[✓] Website clone completed.`);
      appendToOutput(`[✔] Saved to: /clones/${new URL(url).hostname}_clone.html`);
    });
  }

  else {
    appendToOutput(`❓ Unknown command. Type /help`);
  }
}
