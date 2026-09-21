import app from "./servidor.js";
import router from "./routes.js"; // Mudamos de require para import e add o .js

app.use(router);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000 🚀");
});