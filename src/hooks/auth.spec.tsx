import { act, renderHook } from "@testing-library/react-hooks";
import { logInAsync } from "expo-google-app-auth";
import { mocked } from "ts-jest/utils";
import { AuthProvider, useAuth } from "./auth";

jest.mock("expo-google-app-auth");

describe("Auth Hook", () => {
  it("user should be able to sign in with Google Account", async () => {
    const googleMocked = mocked(logInAsync as any);

    googleMocked.mockReturnValueOnce({
      type: "success",
      user: {
        id: "123",
        email: "meuemail@email.com",
        name: "Devair",
        photo: "www.myphoto.com",
      },
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user.email).toBe("meuemail@email.com");
  });

  it("user should not be able to sign in with Google Account if cancels auth", async () => {
    const googleMocked = mocked(logInAsync as any);

    googleMocked.mockReturnValueOnce({
      type: "cancel",
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user).not.toHaveProperty("id");
  });

  it("should throw an error if sign-in with google returns an error", async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    try {
      await act(() => result.current.signInWithGoogle());
    } catch {
      expect(result.current.user).toEqual({});
    }
  });
});
