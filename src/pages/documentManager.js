import React, { useMemo, useState } from "react";
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

  const filteredDocuments = useMemo(() => {
    return documents
      .map((doc, index) => ({ ...doc, originalIndex: index }))
      .filter((doc) =>
        doc.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [searchQuery, documents]);

  return (
    <div className={styles.container}>
      <div>
        <h1>Document Manager</h1>

        {showDocumentEditor && (
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
        )}
      </div>

      {documents.length !== 0 && (
        <div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Titles"
          />
        </div>
      )}

      {documents.length !== 0 && (
        <div>
          <h2>Saved Documents</h2>

          <ul className={styles.documents}>
            {filteredDocuments.map((doc) => (
              <li key={doc.originalIndex}>
                {showDocumentEditor && (
                  <>
                    <div>{doc.title}</div>
                    <Button
                      onClick={() => {
                        setShowDocument(
                          showDocument === doc.originalIndex
                            ? null
                            : doc.originalIndex
                        );
                      }}
                    >
                      View
                    </Button>
                  </>
                )}
                {showDocument === doc.originalIndex && (
                  <div>
                    {editingIndex === doc.originalIndex ? (
                      <>
                        <input
                          type="text"
                          className={styles.title}
                          value={editingTitle}
                          onChange={(e) => setEditingTitle(e.target.value)}
                          placeholder="Edit Title"
                        />
                        <ReactQuill
                          value={editingText}
                          onChange={setEditingText}
                        />
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
                        <div
                          className={styles.document}
                          dangerouslySetInnerHTML={{ __html: doc.content }}
                        />
                        <Button
                          onClick={() => {
                            setShowDocumentEditor(false);
                            editDocument(doc.originalIndex);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => deleteDocument(doc.originalIndex)}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DocumentManager;
