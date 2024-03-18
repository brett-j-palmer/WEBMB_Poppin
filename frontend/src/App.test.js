/* eslint-disable testing-library/no-node-access */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

/* UI Testing */
test('list exists', () => {
  render(<App />);

  const elem1 = screen.getByText('List item 1');
  const elem2 = screen.getByText('List item 2');
  const elem3 = screen.getByText('List item 3');

  expect(elem1).toBeInTheDocument();
  expect(elem2).not.toBeNull();
  expect(elem3).toBeInTheDocument();

  expect(elem3).toHaveStyle('display: list-item');
});


/* Event Testing */
test('add item', () => {
  render(<App />);

  const textfield = screen.getByTestId("new_item_text");
  const submit_btn = screen.getByTestId("item_submit");
  userEvent.type(textfield, "Another item");
  userEvent.click(submit_btn);

  const elem4 = screen.getByText("Another item");

  expect(elem4).toBeInTheDocument();
  expect(elem4).toHaveStyle('display: list-item');
});

test('remove item', () => {
  render(<App />);
  const remove_btn = screen.getByText("List item 1").getElementsByTagName("button")[0];

  userEvent.click(remove_btn)

  const elem1 = screen.queryByText('List item 1');
  expect(elem1).toBeNull();
});


/* Arbitrary Tests */
test('truthy', () => {
  expect(true).toBeTruthy();
});

test('falsy', () => {
  expect(false).toBeFalsy();
});

test('numbers', () => {
  expect(3).toBe(3);
  expect(3).toEqual(3);
  expect(3).toBeGreaterThan(2);
  expect(3).toBeLessThan(4);
});


/* Basic Unit Test */
const greeting = (name) => {
  return "Hello, " + name + "!";
}

test('function_greeting', () => {
  const val = greeting("world");
  expect(val).toBe("Hello, world!");
})


/* Basic Integration Test */
const mult = (x, y) => {
  return x * y;
}

const pow = (x, exp, iters) => {
  for (var i = 0; i < iters; i++) {
    x = mult(x, x);
  }
  return x;
}

test('pow', () => {
  // Compute ((3^2)^2)^2
  const val = pow(3, 2, 3);
  expect(val).toBe(6561);
});


/* Mock Functions */
const call_api = (value, api) => {
  for (var i = 0; i < 10; i++) {
    api(value);
  }
}

test("prep for api", () => {
  const fake_api = jest.fn();
  call_api("Hello", fake_api);
  expect(fake_api).toHaveBeenCalledTimes(10);
});