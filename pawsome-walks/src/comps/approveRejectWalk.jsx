export default function ApproveRejectWalk({ walk }) {
  const approveWalk = async () => {
    const { data, error } = await supabase
      .from("walks")
      .update({ approved: true })
      .eq("walkid", walk.walkid)
      .select();
  };

  const rejectWalk = async () => {
    const { error } = await supabase
      .from("walks")
      .delete()
      .eq("walkid", walk.walkid);
  };

  return (
    <div className="approveRejectContainer">
      <button className="approveButton" onClick={approveWalk}>
        Approve walk
      </button>

      <button className="rejectButton" onClick={rejectWalk}>
        Delete Walk
      </button>
    </div>
  );
}
