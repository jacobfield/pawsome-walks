import { useContext, useState } from "react";
import { ThemeContext } from "./ThemeProvider";
// import { supabase } from "../supabaseClient";

export default function ApproveRejectWalk({ walk }) {
  const { darkTheme } = useContext(ThemeContext);
  const [confirmDeletion, setConfirmDeletion] = useState(false);

  const approveWalk = async () => {
    try {
      const { data, error } = await supabase
        .from("walks")
        .update({ approved: true })
        .eq("walkid", walk.walkid)
        .select();
      if (error) throw error;
      window.location.reload();
    } catch (error) {
      console.error("Error approving walk", error);
    }
  };

  const rejectWalk = async () => {
    try {
      const { error } = await supabase
        .from("walks")
        .delete()
        .eq("walkid", walk.walkid);
      if (error) throw error;
      window.location.reload();
    } catch (error) {
      console.error("Error deleting walk", error);
    }
  };

  const toggleConfirmDeletion = () => {
    setConfirmDeletion(!confirmDeletion);
  };

  return (
    <div className="approveRejectContainer">
      <button
        className={`approveButton ${darkTheme ? "dark" : "light"}`}
        onClick={approveWalk}
      >
        Approve walk
      </button>

      <button
        className={`rejectButton ${darkTheme ? "dark" : "light"} ${
          confirmDeletion ? "confirm" : ""
        }`}
        onClick={confirmDeletion ? rejectWalk : toggleConfirmDeletion}
      >
        {confirmDeletion ? "Are you sure?" : "Delete Walk"}
      </button>
    </div>
  );
}