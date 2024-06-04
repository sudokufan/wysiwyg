// src/DocumentManager.js
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const DocumentManager = () => {
  const [documents, setDocuments] = useState([]);
  const [newDocument, setNewDocument] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");

  const handleAddDocument = () => {
    if (newDocument.trim() === "") return;
    setDocuments([...documents, newDocument]);
    setNewDocument("");
  };

  const handleDeleteDocument = (index) => {
    setDocuments(documents.filter((_, i) => i !== index));
  };

  const handleEditDocument = (index) => {
    setEditingIndex(index);
    setEditingText(documents[index]);
  };

  const handleSaveEdit = () => {
    const updatedDocuments = documents.map((doc, index) =>
      index === editingIndex ? editingText : doc
    );
    setDocuments(updatedDocuments);
    setEditingIndex(null);
    setEditingText("");
  };

  return (
    <div>
      <h1>Document Manager</h1>

      <div>
        <ReactQuill
          value={newDocument}
          onChange={setNewDocument}
          placeholder="New Document"
        />
        <button onClick={handleAddDocument}>Add Document</button>
      </div>

      <ul>
        {documents.map((doc, index) => (
          <li key={index}>
            {editingIndex === index ? (
              <>
                <ReactQuill value={editingText} onChange={setEditingText} />
                <button onClick={handleSaveEdit}>Save</button>
              </>
            ) : (
              <>
                <div dangerouslySetInnerHTML={{ __html: doc }} />
                <button onClick={() => handleEditDocument(index)}>Edit</button>
                <button onClick={() => handleDeleteDocument(index)}>
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentManager;
