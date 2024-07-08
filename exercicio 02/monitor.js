const os = require("node:os");
const fs = require("node:fs");
const path = require("node:path");

function getSystemInfo() {
  const system = os.platform();
  const arch = os.arch();
  const cpu = os.cpus()[0].model;

  const uptimeDays = Math.floor(os.uptime() / 60 / 60 / 24);
  const uptimeDaysinSeconds = uptimeDays * 24 * 60 * 60;

  const uptimeHours = Math.floor((os.uptime() - uptimeDaysinSeconds) / 60 / 60);
  const uptimeHoursinSeconds = uptimeHours * 60 * 60;

  const uptimeMins = Math.floor(
    (os.uptime() - uptimeDaysinSeconds - uptimeHoursinSeconds) / 60
  );
  const uptimeMinsinSeconds = uptimeMins * 60;

  const uptimeSecs = Math.floor(
    os.uptime() -
      uptimeDaysinSeconds -
      uptimeHoursinSeconds -
      uptimeMinsinSeconds
  );

  const uptime = `${uptimeDays}:${uptimeHours}:${uptimeMins}:${uptimeSecs}`;

  const ramTotal = os.totalmem() / 1024 / 1024 / 1024;
  const ramusage = (os.totalmem() - os.freemem()) / 1024 / 1024 / 1024;
  const ramUsagePercent = Math.round(ramusage / ramTotal) * 100;

  return { system, arch, cpu, uptime, ramusage, ramTotal, ramUsagePercent };
}

function printLog({
  system,
  arch,
  cpu,
  uptime,
  ramusage,
  ramTotal,
  ramUsagePercent,
}) {
  console.clear();
  console.log("DETALHES DO SISTEMA");
  console.log(`Sistema Operacional: ${system}`);
  console.log(`Arquitetura do Sistema: ${arch}`);
  console.log(`Modelo do Processador: ${cpu}`);
  console.log(`Tempo de Atividade do Sistema: ${uptime}`);
  console.log(
    `Uso de Memória RAM: ${ramusage.toFixed(2)} GB / ${ramTotal.toFixed(
      2
    )} GB (${ramUsagePercent} %)`
  );
}

function saveLog({
  system,
  arch,
  cpu,
  uptime,
  ramusage,
  ramTotal,
  ramUsagePercent,
}) {
  const logContent = `DETALHES DO SISTEMA | Sistema Operacional: ${system} | Arquitetura do Sistema: ${arch} | Modelo do Processador: ${cpu} | Tempo de Atividade do Sistema: ${uptime} | Uso de Memória RAM: ${ramusage.toFixed(
    2
  )} GB / ${ramTotal.toFixed(2)} GB (${ramUsagePercent} %)\n---\n`;

  const logDir = path.join("/", "log");

  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }

  const logFilePath = path.join(logDir, "log.txt");
  fs.appendFileSync(logFilePath, logContent);
}

setInterval(() => {
  const systemINfo = getSystemInfo();
  printLog(systemINfo);
  saveLog(systemINfo);
}, 1000);
