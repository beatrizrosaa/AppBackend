import express from "express";
// 2. Inicializar a aplicação Express
const app = express();
const port = 3000;
// 3. Middleware para o Express entender JSON no corpo das requisições
app.use(express.json());
// 4. "Banco de dados" em memória para armazenar as tarefas
let tasks = [
    {
        id: 1,
        title: "Fazer tarefas fullstack",
        description: "Praticar desenvolvimento web fullstack, realizando as tarefas não avaliativas 1.0 a 1.12 do curso."
    },
    {
        id: 2,
        title: "Estudar testes de API",
        description: "Aprender a usar ferramentas como Postman ou Insomnia para testar os endpoints."
    }
];
// --- ROTAS DA API ---
/**
 * Rota 1: GET no path raiz ("/")
 * Retorna uma mensagem de boas-vindas.
 */
app.get('/', (req, res) => {
    res.status(200).json({ message: "Hello World" });
});
/**
 * Rota 2: GET no path semântico ("/tasks")
 * Retorna a lista completa de tarefas.
 */
app.get('/tasks', (req, res) => {
    res.status(200).json(tasks);
});
/**
 * Rota 3: POST no path semântico ("/tasks")
 * Recebe uma nova tarefa, adiciona à lista e retorna a lista atualizada.
 */
app.post('/tasks', (req, res) => {
    const newTaskData = req.body;
    // Validação simples para garantir que o título foi enviado
    if (!newTaskData.title) {
        return res.status(400).json({ error: "O campo 'title' é obrigatório." });
    }
    // Cria a nova tarefa com um ID único (simples, baseado no tamanho da lista)
    const newTask = {
        id: tasks.length + 1,
        title: newTaskData.title,
        description: newTaskData.description || "" // Descrição opcional
    };
    // Adiciona a nova tarefa à lista
    tasks.push(newTask);
    // Retorna a lista completa com a nova tarefa e o status 201 (Created)
    res.status(201).json(tasks);
});
// Para desenvolvimento local
if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Servidor rodando em http://localhost:${port}`);
    });
}
// Para o Vercel (serverless)
export default app;
//# sourceMappingURL=index.js.map