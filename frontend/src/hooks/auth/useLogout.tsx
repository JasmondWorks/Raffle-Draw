import { useAuthContext } from "@/hooks/auth/useAuthContext";
import { useWorkoutsContext } from "@/hooks/useWorkoutsContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: workoutsDispatch } = useWorkoutsContext();
  const logout = () => {
    // remove user from storage
    localStorage.removeItem("user");

    // dispatch logout action
    dispatch({ type: "LOGOUT" });

    // clear global workouts state
    workoutsDispatch({ type: SET_WORKOUTS, payload: null });
  };

  return { logout };
};
