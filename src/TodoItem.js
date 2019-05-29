import React from "react";

const TodoItem = ({ todo, onToggle, onRemove }) => {
  const { id, text, done } = todo;
  const toggle = React.useCallback(() => onToggle(id), [id, onToggle]);
  const remove = React.useCallback(() => onRemove(id), [id, onRemove]);

  return (
    <li>
      <span
        style={{ textDecoration: done ? "line-through" : "none" }}
        onClick={toggle}
      >
        {text}
      </span>
      <button onClick={remove}>삭제</button>
    </li>
  );
};
// TodoItem이 추가되거나 수정되거나 삭제될 때 애플리케이션에 보여지는 모든 TodoItem
// 컴포넌트들이 리렌더링 되고 있기 때문에 React.memo로 감싸준다
// 그러나 onToggle 함수와 onRemove 함수가 useCallback에 의하여 계속 새로워지고 있음
// 해결법 : todos 배열을 관리하는 로직을 useReducer로 구현
// useState의 setter 함수를 사용할 때 새로운 상태를 파라미터로 넣어주는 대신
// updater 함수를 파라미터로 넣어주면 됨
// setCount(prevCount=> prevCount+1); <- 요런 식으로
// setState(prevState => {
//   return {...prevState, ...updatedValues};
// }); <- 아니면 이런 식
// 더 자세한 건 react doc 공부하면서 서술하겠음

export default React.memo(TodoItem);
