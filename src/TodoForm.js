import React from "react";

//Enzyme form 에서 button 을 클릭할 때 자동으로 submit 이벤트 발생 X
// react-testing-library 는 button 을 클릭하면 자동으로 submit 이벤트 발생

const TodoForm = ({ onInsert }) => {
  const [value, setValue] = React.useState("");
  const onChange = React.useCallback(e => {
    setValue(e.target.value);
  }, []);
  const onSubmit = React.useCallback(
    e => {
      onInsert(value);
      setValue("");
      e.preventDefault();
    },
    [onInsert, value]
  );

  return (
    <form onSubmit={onSubmit}>
      <input
        placeholder="할 일을 입력하세요"
        onChange={onChange}
        value={value}
      />
      <button type="submit">등록</button>
    </form>
  );
};

export default TodoForm;
