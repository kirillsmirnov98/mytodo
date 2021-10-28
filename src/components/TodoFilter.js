import './TodoFilter.style.css';

const actionButtonsList = [
  {
    title: 'All',
    value: 'all'
  },
  {
    title: 'Active',
    value: 'active'
  },
  {
    title: 'Completed',
    value: 'completed'
  }
];

const TodoFilter = ({ length, deleteCompletedTasks, currentValue, selectFilter }) => {
  return (
    <div className="todo-filter">
      <p>{length} items left</p>
      {actionButtonsList.map((item) => (
        <button
          key={item.value}
          onClick={() => selectFilter(item.value)}
        >
          {item.title}
        </button>
      ))}
      {currentValue > 0 && (
        <button
          onClick={deleteCompletedTasks}
        >
          Clear completed [{currentValue}]
        </button>
      )}
    </div>
  );
}

export default TodoFilter;