import React from "react";
import { render, fireEvent } from "react-testing-library";
import TodoItem from "./TodoItem";

describe("<TodoItem/>", () => {
  const sampleTodo = {
    id: 1,
    text: "TDD 배우기",
    done: false
  };

  const setup = (props = {}) => {
    const initialProps = { todo: sampleTodo };
    const utils = render(<TodoItem {...initialProps} {...props} />);
    const { getByText } = utils;
    const todo = props.todo || initialProps.todo;
    const span = getByText(todo.text);
    const button = getByText("삭제");
    return { ...utils, span, button };
  };

  it("has span and button", () => {
    const { span, button } = setup();

    // 생략해도 됨
    // 어차피 없으면 에러 발생
    expect(span).toBeTruthy();
    expect(button).toBeTruthy();
  });

  it("shows line-through on span when done is true", () => {
    const { span } = setup({ todo: { ...sampleTodo, done: true } });
    expect(span).toHaveStyle("text-decoration: line-through;");
  });

  it("does not show line-through on span when done is false", () => {
    const { span } = setup({ todo: { ...sampleTodo, done: false } });
    expect(span).not.toHaveStyle("text-decoration: line-through;");
  });

  it("calls onToggle", () => {
    const onToggle = jest.fn();
    const { span } = setup({ onToggle });
    fireEvent.click(span);
    expect(onToggle).toHaveBeenCalledWith(sampleTodo.id);
  });

  it("calls onRemove", () => {
    const onRemove = jest.fn();
    const { button } = setup({ onRemove });
    fireEvent.click(button);
    expect(onRemove).toHaveBeenCalledWith(sampleTodo.id);
  });
});
