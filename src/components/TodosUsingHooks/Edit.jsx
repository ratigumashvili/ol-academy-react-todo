const Edit = ({ editTitle, setEditTitle, handleSaveEdited }) => {
  return (
    <div className="edit-menu">
      <input
        type="text"
        value={editTitle}
        onChange={(e) => setEditTitle(e.target.value)}
      />
      <button onClick={handleSaveEdited}>Save</button>
    </div>
  );
};

export default Edit;
