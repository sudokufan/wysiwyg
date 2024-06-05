import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import styles from "../styles/documentManager.module.css";
import Button from "../components/Button";

const DocumentManager = () => {
  // document storage
  const [documents, setDocuments] = useState([]);

  // new doc creation
  const [newTitle, setNewTitle] = useState("");
  const [newDocument, setNewDocument] = useState("");

  // doc editing
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingText, setEditingText] = useState("");

  // show/hide visibility
  const [showDocument, setShowDocument] = useState(null);
  const [showDocumentEditor, setShowDocumentEditor] = useState(true);

  // search
  const [searchQuery, setSearchQuery] = useState("");

  const addDocument = () => {
    if (newTitle !== "" && newDocument.trim() !== "") {
      let updatedDocuments = [
        ...documents,
        { title: newTitle, content: newDocument },
      ];
      setDocuments(updatedDocuments);
      setNewTitle("");
      setNewDocument("");
    } else {
      console.log("incomplete");
    }
  };

  const editDocument = (index) => {
    setEditingIndex(index);
    setEditingTitle(documents[index].title);
    setEditingText(documents[index].content);
  };

  const deleteDocument = (index) => {
    let updatedDocuments = documents.filter((_, i) => i !== index);
    setDocuments(updatedDocuments);
  };

  const saveEdit = () => {
    let updatedDocuments = documents.map((doc, index) =>
      index === editingIndex
        ? { title: editingTitle, content: editingText }
        : doc
    );

    setDocuments(updatedDocuments);
    setEditingIndex(null);
    setEditingTitle("");
    setEditingText("");
  };

  const filteredDocuments = documents.filter((doc) =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          disabled={documents.length === 0}
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
                <Button
                  onClick={() => {
                    setShowDocumentEditor(true);
                    saveEdit();
                  }}
                >
                  Save Changes
                </Button>
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
                <div dangerouslySetInnerHTML={{ __html: doc.content }} />
                <Button
                  onClick={() => {
                    setShowDocumentEditor(false);
                    editDocument(index);
                  }}
                >
                  Edit
                </Button>
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
