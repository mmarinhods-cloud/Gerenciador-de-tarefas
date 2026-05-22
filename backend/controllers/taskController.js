const db = require('../config/db');

const getAllTasks = async (req, res) => {
    try {
        let query = 'SELECT * FROM tasks';
        const params = [];
        const conditions = [];

        if (req.query.status && req.query.status !== 'todos') {
            conditions.push('status = ?');
            params.push(req.query.status);
        }
        if (req.query.priority && req.query.priority !== 'todas') {
            conditions.push('priority = ?');
            params.push(req.query.priority);
        }

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }
        query += ' ORDER BY createdAt DESC'; 

        const [tasks] = await db.execute(query, params);
        res.json(tasks);
    } catch (error) {
        console.error('Error ao buscar tarefas:', error);
        res.status(500).json({ message: 'Error ao buscar tarefas', error: error.message });
    }
};

// Create a new task
const createTask = async (req, res) => {
    const { title, description, assignedTo, priority, status, dueDate } = req.body;

    if (!title) {
        return res.status(400).json({ message: 'Titulo é obrigatório' });
    }

    try {
        const query = `
            INSERT INTO tasks (title, description, assignedTo, priority, status, dueDate)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const [result] = await db.execute(query, [
            title,
            description || null,
            assignedTo || null,
            priority || 'media',
            status || 'pendente',
            dueDate || null
        ]);
        const [newTask] = await db.execute('SELECT * FROM tasks WHERE id = ?', [result.insertId]);
        res.status(201).json(newTask[0]);
    } catch (error) {
        console.error('Error ao criar tarefa:', error);
        res.status(500).json({ message: 'Error ao criar tarefa', error: error.message });
    }
};

// Update an existing task
const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, assignedTo, priority, status, dueDate } = req.body;

    if (!title) {
        return res.status(400).json({ message: 'Titulo é obrigatório' });
    }

    try {
        const query = `
            UPDATE tasks SET
                title = ?, description = ?, assignedTo = ?, priority = ?, status = ?, dueDate = ?, updatedAt = CURRENT_TIMESTAMP
            WHERE id = ?
        `;
        const [result] = await db.execute(query, [
            title,
            description || null,
            assignedTo || null,
            priority || 'media',
            status || 'pendente',
            dueDate || null,
            id
        ]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Tarefa não encontrada' });
        }
        const [updatedTask] = await db.execute('SELECT * FROM tasks WHERE id = ?', [id]);
        res.json(updatedTask[0]);
    } catch (error) {
        console.error('Error ao atualizar tarefa:', error);
        res.status(500).json({ message: 'Error ao atualizar tarefa', error: error.message });
    }
};

// Delete a task
const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.execute('DELETE FROM tasks WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Tarefa não encontrada' });
        }
        res.status(200).json({ message: 'Tarefa deletada com sucesso' }); // Or 204 No Content
    } catch (error) {
        console.error('Error ao deletar tarefa:', error);
        res.status(500).json({ message: 'Error ao deletar tarefa', error: error.message });
    }
};

module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask
};