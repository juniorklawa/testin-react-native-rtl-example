import { useNavigation } from "@react-navigation/native";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";
import { ThemeProvider } from "styled-components/native";
import { mocked } from "ts-jest/utils";
import { Register } from ".";
import theme from "../../global/styles/theme";

jest.mock("@react-navigation/native");

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe("Register screen", () => {
  it("should open category modal when user clicks on the category button", async () => {
    const mockedNavigation = mocked(useNavigation as any);

    mockedNavigation.mockReturnValueOnce({
      type: "success",
    });

    const { getByTestId } = render(<Register />, { wrapper: Providers });
    const categoryModal = getByTestId("modal-category");
    const buttonCategory = getByTestId("button-category");
    fireEvent.press(buttonCategory);
    waitFor(() => {
      expect(categoryModal.props.visible).toBeTruthy();
    });
  });
});
