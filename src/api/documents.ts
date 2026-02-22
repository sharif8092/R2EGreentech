import axios from "axios";

const API = "https://r2egreentech.in/backend/documents";

export const getDocuments = async () => {
  const res = await axios.get(`${API}/get-documents.php`);
  return res.data;
};

export const createDocument = async (formData: FormData) => {
  const res = await axios.post(`${API}/create.php`, formData);
  return res.data;
};

export const updateDocument = async (id: number, active: number) => {
  const formData = new FormData();
  formData.append("id", id.toString());
  formData.append("active", active.toString());

  const res = await axios.post(`${API}/update.php`, formData);
  return res.data;
};

export const deleteDocument = async (id: number) => {
  const formData = new FormData();
  formData.append("id", id.toString());

  const res = await axios.post(`${API}/delete.php`, formData);
  return res.data;
};