const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const packageJsonPath = path.resolve("package.json");


if (!fs.existsSync(packageJsonPath)) {
  console.error("[ERROR package.json não encontrado. Rode 'npm init -y' primeiro.");
  process.exit(1);
}


const packageJson = require(packageJsonPath);
packageJson.scripts = packageJson.scripts || {};
packageJson.scripts.prepare = "chmod +x .husky/* || true";
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
console.log("[INFO] Adicionado script 'prepare' no package.json");


console.log("[INSTALL] Instalando dependências (husky, lint-staged, eslint)...");
execSync("npm install --save-dev husky lint-staged eslint", { stdio: "inherit" });


if (!fs.existsSync(".husky")) {
  fs.mkdirSync(".husky");
  console.log("[MKDIR] Criado diretório .husky/");
}


const huskyShPath = ".husky/_/husky.sh";
if (!fs.existsSync(".husky/_")) fs.mkdirSync(".husky/_", { recursive: true });
fs.writeFileSync(huskyShPath, `#!/bin/sh
exit 0
`);
fs.chmodSync(huskyShPath, 0o755);
console.log("[MKDIR] Criado .husky/_/husky.sh");


const hook = `#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
`;
fs.writeFileSync(".husky/pre-commit", hook);
fs.chmodSync(".husky/pre-commit", 0o755);
console.log("[DONE] Hook .husky/pre-commit criado e marcado como executável");

// 7. Cria arquivo .lintstagedrc.json
const lintConfig = {
  "*.ts": ["eslint --fix"]
};
fs.writeFileSync(".lintstagedrc.json", JSON.stringify(lintConfig, null, 2));
console.log("[DONE] Criado arquivo .lintstagedrc.json com configuração padrão");

console.log("\n[FINAL] Configuração completa! Teste com: git add arquivo.ts && git commit -m 'test'");
