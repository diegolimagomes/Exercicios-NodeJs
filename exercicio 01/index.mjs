import { createFile, updateFile, showFile, deleteFile } from "./function.mjs";

createFile("Conteúdo inicial do arquivo \nCriado com o módulo fs do Node.js");
showFile();
console.log("--------------");
updateFile("Conteúdo modificado...");
showFile();
console.log("--------------");
deleteFile();
