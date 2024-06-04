export const handleAddDocument = (documents, newTitle, newDocument) => {
  if (newTitle.trim() === "" || newDocument.trim() === "") return documents;
  return [...documents, { title: newTitle, content: newDocument }];
};

export const handleDeleteDocument = (documents, index) => {
  return documents.filter((_, i) => i !== index);
};

export const handleEditDocument = (documents, index) => {
  return {
    editingIndex: index,
    editingTitle: documents[index].title,
    editingText: documents[index].content,
  };
};

export const handleSaveEdit = (
  documents,
  editingIndex,
  editingTitle,
  editingText
) => {
  return documents.map((doc, index) =>
    index === editingIndex ? { title: editingTitle, content: editingText } : doc
  );
};

export const handleSearch = (documents, searchQuery) => {
  return documents.filter((doc) =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
};
