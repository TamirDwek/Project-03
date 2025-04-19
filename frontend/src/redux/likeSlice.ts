import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LikeState {
  likedVacations: Record<string, boolean>;
}

// likes from localstorge
const savedLikes = localStorage.getItem("likedVacations");
const initialState: LikeState = {
  likedVacations: savedLikes ? JSON.parse(savedLikes) : {},
};

const likeSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    // ✅ הפיכת מצב לייק והזנתו גם ל-localStorage
    toggleLike: (state, action: PayloadAction<string>) => {
      const vacationId = action.payload;
      const current = state.likedVacations[vacationId];
      if (current) {
        delete state.likedVacations[vacationId];
      } else {
        state.likedVacations[vacationId] = true;
      }
      localStorage.setItem("likedVacations", JSON.stringify(state.likedVacations));
    },

    // ✅ הגדרת מצב מלא חדש של כל הלייקים מהשרת
    setLikedVacations: (state, action: PayloadAction<Record<string, boolean>>) => {
      state.likedVacations = action.payload;
      localStorage.setItem("likedVacations", JSON.stringify(state.likedVacations));
    },
  },
});

export const { toggleLike, setLikedVacations } = likeSlice.actions;
export default likeSlice.reducer;
