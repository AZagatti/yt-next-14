import { Todo } from '@/components/todo'
import { revalidatePath } from 'next/cache'

interface Todo {
  id: number
  name: string
}

export default async function Home() {
  const todos: Todo[] = await fetch('http://127.0.0.1:3001/todos').then((res) =>
    res.json()
  )

  const createTodo = async (formData: FormData) => {
    'use server'
    const { todo } = Object.fromEntries(formData)
    await fetch('http://127.0.0.1:3001/todos', {
      method: 'POST',
      body: JSON.stringify({ name: todo }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    revalidatePath('/')
  }

  const deleteTodo = async (id: number) => {
    'use server'
    await fetch(`http://127.0.0.1:3001/todos/${id}`, {
      method: 'DELETE',
    })
    revalidatePath('/')
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <form action={createTodo}>
        <input
          type="text"
          placeholder="Nova tarefa"
          name="todo"
          className="text-black rounded-sm p-2"
        />
        <button
          type="submit"
          className="ml-2 bg-slate-200 rounded-sm text-black p-2 px-4"
        >
          Criar
        </button>
      </form>
      <ul className="mt-4">
        {todos.map((todo) => (
          <Todo key={todo.id} todo={todo} onRemove={deleteTodo} />
        ))}
      </ul>
    </main>
  )
}
