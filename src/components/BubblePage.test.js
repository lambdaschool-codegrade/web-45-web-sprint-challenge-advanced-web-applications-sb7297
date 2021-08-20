import React from 'react';
import MutationObserver from 'mutationobserver-shim';

import { render, screen} from "@testing-library/react";
import fetchColorService from '../services/fetchColorService';
import BubblePage from './BubblePage';

jest.mock('../services/fetchColorService');

test("Renders without errors", ()=> {
    fetchColorService.mockResolvedValueOnce({
        data: [
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
        ]
    });
    render(<BubblePage />);
});

test("Renders appropriate number of colors passed in through mock", async ()=> {
    //Keep in mind that our service is called on mount for this component.
    fetchColorService.mockResolvedValueOnce({
        data: [
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
        ]
    });

    render(<BubblePage />);

    const colors = await screen.findAllByTestId("color");
    expect(colors).toHaveLength(2);
});