import React from "react";
import {fireEvent, render, screen} from '@testing-library/react-native'
import { Button } from "./Button";
import { Typography } from "./Typography";

test('버튼 테스트', async() => {
    const mockFn = jest.fn();
    const expectedButtonName='TEST_BUTTON_03';

    render(
        <Button onPress={mockFn}>
            <Typography>{expectedButtonName}</Typography>
        </Button>
    )

    expect(screen.toJSON()).toMatchSnapshot(); 


    fireEvent.press(screen.getByText(expectedButtonName));
    
    expect(mockFn).toHaveBeenCalled();
})