import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import VacationModel from "../components/models/vacations/VacationModel";

// קריאה מ־localStorage אם יש
const storedVacations = localStorage.getItem("vacations");
const initialVacations: VacationModel[] = storedVacations ? JSON.parse(storedVacations) : [];

interface VacationsState {
  vacations: VacationModel[];
}

const initialState: VacationsState = {
  vacations: initialVacations,
};

const vacationsSlice = createSlice({
  name: "vacations",
  initialState,
  reducers: {
    // ✅ קובע את רשימת החופשות – תומך גם בפונקציה
    setVacations(
      state,
      action: PayloadAction<
        VacationModel[] | ((prev: VacationModel[]) => VacationModel[])
      >
    ) {
      if (typeof action.payload === "function") {
        state.vacations = action.payload(state.vacations);
      } else {
        state.vacations = action.payload;
      }

      localStorage.setItem("vacations", JSON.stringify(state.vacations));
    },

    // ✅ הפיכת isFollowing לחופשה ספציפית
    toggleFollow(state, action: PayloadAction<string>) {
      const vacation = state.vacations.find((v) => v.id === action.payload);
      if (vacation) {
        vacation.isFollowing = !vacation.isFollowing;
        localStorage.setItem("vacations", JSON.stringify(state.vacations));
      }
    },

    // ✅ ניקוי מוחלט של החופשות
    clearVacations(state) {
      state.vacations = [];
      localStorage.removeItem("vacations");
    },
  },
});

export const { setVacations, toggleFollow, clearVacations } = vacationsSlice.actions;
export default vacationsSlice.reducer;
