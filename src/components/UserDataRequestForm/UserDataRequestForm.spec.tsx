import {MemoryRouter} from "react-router-dom";
import React from "react";
import {render, screen} from "@testing-library/react";
import UserDataRequestForm from "./UserDataRequestForm";
import userEvent from "@testing-library/user-event";

describe('<UserDataRequestForm />', () => {

  const renderComponent = () => render(
    <MemoryRouter>
      <UserDataRequestForm/>
    </MemoryRouter>
  );

  it('will set the input and to invalid when input is non-numeric', () => {
    renderComponent();

    userEvent.type(screen.getByRole('textbox'),'2Tad');
    expect(screen.getByRole('textbox')).toHaveClass('invalid');
    expect(screen.getByRole('link')).toHaveClass('invalid');
  });

  it('will not set the input or link to invalid when input is numeric', () => {
    renderComponent();

    userEvent.type(screen.getByRole('textbox'),'58');
    expect(screen.getByRole('textbox')).not.toHaveClass('invalid');
    expect(screen.getByRole('link')).not.toHaveClass('invalid');
  });

  it('will not set the input to invalid but will set link to invalid when input is empty', () => {
    renderComponent();

    expect(screen.getByRole('textbox')).not.toHaveClass('invalid');
    expect(screen.getByRole('link')).toHaveClass('invalid');
  });
});