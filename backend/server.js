import express, { json } from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import { signup, login } from './controllers/authController.js';
import { getTodos, createTodo, updateTodo, deleteTodo } from './controllers/todoController.js';
import { protect } from './middleware/auth.js';
import 'dotenv/config';

const port = process.env.PORT || 3003;
const app = express();

app.use(json());
app.use(cors());

connectDB();


app.post('/api/auth/signup', signup);
app.post('/api/auth/login', login);

app.get('/api/todos', protect, getTodos);
app.post('/api/todos', protect, createTodo);
app.put('/api/todos/:id', protect, updateTodo);
app.delete('/api/todos/:id', protect, deleteTodo);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});