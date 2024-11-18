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
      <div className="approveContainer">
        <button onClick={approveWalk}></button>
      </div>
      <div className="rejectContainer">
        <button onClick={rejectWalk}></button>
      </div>
    </div>
  );
}
