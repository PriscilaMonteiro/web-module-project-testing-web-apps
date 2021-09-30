import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
  render(<ContactForm/>);
    
});

test('renders the contact form header', ()=> {
  render(<ContactForm/>);

  const header = screen.queryByText(/contact form/i);
  expect(header).toBeInTheDocument();
  expect(header).toHaveTextContent(/contact form/i);
  expect(header).toBeTruthy();
    
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
  render(<ContactForm/>);

  const firstName =screen.getByLabelText(/first name*/i);
  userEvent.type(firstName, "Edd");

  const errorMsg = await screen.findAllByTestId(/error/i);

  expect(errorMsg).toHaveLength(1);

    
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
  render(<ContactForm/>);

  const subButton =screen.getByRole(/button/i);
  userEvent.click(subButton);

  const errorMsg = await screen.findAllByTestId(/error/i);

  expect(errorMsg).toHaveLength(3);
    
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
  render(<ContactForm/>);

  const firstName =screen.getByLabelText(/first name*/i);
  userEvent.type(firstName, "Eddie");

  const lastName =screen.getByLabelText(/last name*/i);
  userEvent.type(lastName, "Burke");

  const subButton =screen.getByRole(/button/i);
  userEvent.click(subButton);

  const errorMsg =await screen.findAllByTestId(/error/i);
  expect(errorMsg).toHaveLength(1);
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  render(<ContactForm/>);
  const email =screen.getByLabelText(/email*/i);
  userEvent.type(email, "invalidemail");
  const errorMsg =await screen.findByText(/email must be a valid email address/i);
  expect(errorMsg).toBeInTheDocument();
});



test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
  render(<ContactForm/>);

  // const firstName =screen.getByLabelText(/first name*/i);
  // userEvent.type(firstName, "Eddie");

  // const lastName =screen.getByLabelText(/last name*/i);
  // userEvent.type(lastName, "");

  // const email =screen.getByLabelText(/email*/i);
  // userEvent.type(email, "mail@test.com");

  const subButton =screen.getByRole(/button/i);
  userEvent.click(subButton);

  const errorMsg =await screen.findByText(/lastName is a required field/i);
  expect(errorMsg).toBeInTheDocument();
    
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
  render(<ContactForm/>);

  const firstName =screen.getByLabelText(/first name*/i);
  userEvent.type(firstName, "Eddie");

  const lastName =screen.getByLabelText(/last name*/i);
  userEvent.type(lastName, "Burke");

  const email =screen.getByLabelText(/email*/i);
  userEvent.type(email, "mail@test.com");

  const subButton =screen.getByRole(/button/i);
  userEvent.click(subButton);

  await waitFor(()=> {
    const firstName = screen.queryByText(/eddie/i);
    expect(firstName).toBeInTheDocument();

    const lastName =screen.queryByText(/Burke/i);
    expect(lastName).toBeInTheDocument();

    const email =screen.queryByText(/mail@test.com/i);
    expect(email).toBeInTheDocument();

    const messageDisplay = screen.queryByTestId("messageDisplay");
    expect(messageDisplay).not.toBeInTheDocument();

  });
    
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>);

  const firstName =screen.getByLabelText(/first name*/i);
  userEvent.type(firstName, "Eddie");

  const lastName =screen.getByLabelText(/last name*/i);
  userEvent.type(lastName, "Burke");

  const email =screen.getByLabelText(/email*/i);
  userEvent.type(email, "mail@test.com");

  const messageDisplay = screen.getByLabelText(/message/i);
  userEvent.type(messageDisplay, "Testing Message");

  const subButton =screen.getByRole(/button/i);
  userEvent.click(subButton);

  await waitFor(()=> {
    const firstName = screen.queryByText(/eddie/i);
    expect(firstName).toBeInTheDocument();

    const lastName =screen.queryByText(/Burke/i);
    expect(lastName).toBeInTheDocument();

    const email =screen.queryByText(/mail@test.com/i);
    expect(email).toBeInTheDocument();

    const messageDisplay = screen.queryByTestId(/message/i);
    expect(messageDisplay).toBeInTheDocument();

  });
    
    
});