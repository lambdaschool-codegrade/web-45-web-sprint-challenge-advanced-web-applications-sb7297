import React from 'react';
import MutationObserver from 'mutationobserver-shim';

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Color from './Color';

test("Renders without errors with blank color passed into component", () => {
    render(<Color color={{color: "", code: { hex: ""}, id: null}} />);
});
  
test("Renders the color passed into component", () => {
    const color = {
        color: "aliceblue",
        code: {
          hex: "#f0f8ff",
        },
        id: 1,
    };
    
    render(<Color color={color} />);
    expect(screen.getByText("aliceblue")).toBeInTheDocument();
});

test("Executes handleDelete and toggleEdit property when the 'x' icon is clicked", () => {
    const color = {
        color: "aliceblue",
        code: {
          hex: "#f0f8ff",
        },
        id: 1,
    };
   
    const mockDeleteColor = jest.fn();
    const mockToggleEdit = jest.fn();

    render(<Color deleteColor={mockDeleteColor} toggleEdit={mockToggleEdit} color={color} />);
              
    const x = screen.getByTestId("delete");
    userEvent.click(x);

    expect(mockDeleteColor).toHaveBeenCalledTimes(1);
    expect(mockToggleEdit).toHaveBeenCalledTimes(1);
});

test("Executes setEditColor and toggleEdit property when color div is clicked", () => {
    const color = {
        color: "aliceblue",
        code: {
          hex: "#f0f8ff",
        },
        id: 1,
    };
   
    const mockSetEditColor = jest.fn();
    const mockToggleEdit = jest.fn();

    render(<Color setEditColor={mockSetEditColor} toggleEdit={mockToggleEdit} color={color} />);
              
    const x = screen.getByTestId("color");
    userEvent.click(x);

    expect(mockSetEditColor).toHaveBeenCalledTimes(1);
    expect(mockToggleEdit).toHaveBeenCalledTimes(1);
});