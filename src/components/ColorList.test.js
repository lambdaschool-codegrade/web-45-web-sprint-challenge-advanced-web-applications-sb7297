import React from 'react';
import MutationObserver from 'mutationobserver-shim';

import { render, screen} from "@testing-library/react";
import ColorList from './ColorList';

test("Renders an empty list of colors without errors", () => {
    render(<ColorList colors={[]} />);
});

test("Renders a list of colors without errors", () => {
    const colors = 
        [
          {
            color: "aliceblue",
            code: {
              hex: "#f0f8ff",
            },
            id: 1,
          },
          {
            color: "limegreen",
            code: {
              hex: "#99ddbc",
            },
            id: 2,
          },
        ];
    
    render(<ColorList colors={colors} />);
});

test("Renders the EditForm when editing = true and does not render EditForm when editing = false", () => {
    const { getByTestId, queryByTestId, rerender } = render(<ColorList colors={[]} editing={true} />)
    expect(getByTestId("edit_menu")).toBeInTheDocument();
    rerender(<ColorList colors={[]} editing={false} />);
    expect(queryByTestId("edit_menu")).toBeNull();
});
