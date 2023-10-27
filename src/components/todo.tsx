'use client'

interface TodoProps {
  todo: { id: number; name: string }
  onRemove: (id: number) => Promise<void>
}

export const Todo = ({ todo, onRemove }: TodoProps) => {
  return (
    <li className="mt-4 bg-white w-72 flex justify-between border-2 rounded-md py-2 px-4">
      <span className="text-black">{todo.name}</span>
      <button onClick={() => onRemove(todo.id)} className="text-black">
        Deletar
      </button>
    </li>
  )
}
