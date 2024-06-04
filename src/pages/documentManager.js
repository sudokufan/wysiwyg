import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  handleAddDocument,
  handleDeleteDocument,
  handleEditDocument,
  handleSaveEdit,
  handleSearch,
} from "../helpers/documentHelpers";

import styles from "../styles/documentManager.module.css";
import Button from "../components/Button";

const DocumentManager = () => {
  const [documents, setDocuments] = useState([]);
  const [newDocument, setNewDocument] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingText, setEditingText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showDocument, setShowDocument] = useState(null);

  const addDocument = () => {
    const updatedDocuments = handleAddDocument(
      documents,
      newTitle,
      newDocument
    );
    setDocuments(updatedDocuments);
    setNewTitle("");
    setNewDocument("");
  };

  const deleteDocument = (index) => {
    const updatedDocuments = handleDeleteDocument(documents, index);
    setDocuments(updatedDocuments);
  };

  const editDocument = (index) => {
    const { editingIndex, editingTitle, editingText } = handleEditDocument(
      documents,
      index
    );
    setEditingIndex(editingIndex);
    setEditingTitle(editingTitle);
    setEditingText(editingText);
  };

  const saveEdit = () => {
    const updatedDocuments = handleSaveEdit(
      documents,
      editingIndex,
      editingTitle,
      editingText
    );
    setDocuments(updatedDocuments);
    setEditingIndex(null);
    setEditingTitle("");
    setEditingText("");
  };

  const filteredDocuments = handleSearch(documents, searchQuery);

  return (
    <div>
      <h1>Document Manager</h1>

      <div>
        <input
          type="text"
          className={styles.title}
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Document Title"
        />
        <ReactQuill
          value={newDocument}
          onChange={setNewDocument}
          placeholder="New Document"
        />
        <Button onClick={addDocument}>Add Document</Button>
      </div>

      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by Title"
        />
      </div>

      <ul className={styles.documents}>
        {filteredDocuments.map((doc, index) => (
          <li key={index}>
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  placeholder="Edit Title"
                />
                <ReactQuill value={editingText} onChange={setEditingText} />
                <button onClick={saveEdit}>Save</button>
              </>
            ) : (
              <>
                <h3
                  onClick={() =>
                    setShowDocument(showDocument === index ? null : index)
                  }
                  className={styles.documentTitle}
                >
                  {doc.title}
                </h3>
                <Button onClick={() => editDocument(index)}>Edit</Button>
                <Button onClick={() => deleteDocument(index)}>Delete</Button>
              </>
            )}
            {showDocument === index && (
              <div>
                <ReactQuill value={doc.content} readOnly />
                <Button
                  onClick={() => editDocument(index)}
                  className={styles.addButton}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => deleteDocument(index)}
                  className={styles.addButton}
                >
                  Delete
                </Button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentManager;
