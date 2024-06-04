// src/DocumentManager.js
import React, { useState } from "react";

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
        <input
          type="text"
          value={newDocument}
          onChange={(e) => setNewDocument(e.target.value)}
          placeholder="New Document"
        />
        <button onClick={handleAddDocument}>Add Document</button>
      </div>

      <ul>
        {documents.map((doc, index) => (
          <li key={index}>
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <button onClick={handleSaveEdit}>Save</button>
              </>
            ) : (
              <>
                {doc}
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
