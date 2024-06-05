import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  handleAddDocument,
  handleEditDocument,
  handleSaveEdit,
  handleSearch,
} from "../helpers/documentHelpers";

import styles from "../styles/documentManager.module.css";
import Button from "../components/Button";

const DocumentManager = () => {
  // document storage
  const [documents, setDocuments] = useState([]);
  const [newDocument, setNewDocument] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingText, setEditingText] = useState("");

  // show/hide visibility
  const [showDocument, setShowDocument] = useState(null);
  const [showDocumentEditor, setShowDocumentEditor] = useState(true);

  // search
  const [searchQuery, setSearchQuery] = useState("");

  const addDocument = () => {
    let updatedDocuments = handleAddDocument(documents, newTitle, newDocument);
    setDocuments(updatedDocuments);
    setNewTitle("");
    setNewDocument("");
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

  const deleteDocument = (index) => {
    let updatedDocuments = documents.filter((_, i) => i !== index);
    setDocuments(updatedDocuments);
  };

  const saveEdit = () => {
    let updatedDocuments = handleSaveEdit(
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

      {showDocumentEditor ? (
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
          <Button onClick={addDocument}>Save</Button>
        </div>
      ) : (
        <Button onClick={() => setShowDocumentEditor(showDocument === false)}>
          Add Document
        </Button>
      )}

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
                <div>{doc.title}</div>
                <Button
                  onClick={() => {
                    setShowDocument(showDocument === index ? null : index);
                  }}
                >
                  View
                </Button>
              </>
            )}
            {showDocument === index && (
              <div>
                <ReactQuill value={doc.content} readOnly />
                <Button onClick={() => editDocument(index)}>Edit</Button>
                <Button onClick={() => deleteDocument(index)}>Delete</Button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentManager;
