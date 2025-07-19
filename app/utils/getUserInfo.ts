import { createAsyncThunk } from "@reduxjs/toolkit";

export interface User {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface ResponseData {
  success: boolean;
  user?: User;
  message?: string;
}

export const getUserInfo = createAsyncThunk<
  User,
  void,
  {
    rejectValue: string;
  }
>(
  "user/getUserInfo",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include",
      });

      const data: ResponseData = await res.json();

      if (!res.ok || !data.success || !data.user) {
        return rejectWithValue(data.message || "Failed to fetch user");
      }

      return data.user;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Unknown error");
    }
  }
);
