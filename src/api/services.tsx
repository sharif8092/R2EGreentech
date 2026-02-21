import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

/* ===============================
   GET SERVICES
================================= */
export const getServices = async () => {
  const res = await axios.get(
    `${API_BASE}/services/get-services.php`
  );
  return res.data;
};

/* ===============================
   CREATE SERVICE
================================= */
export const createService = async (formData: FormData) => {
  const res = await axios.post(
    `${API_BASE}/services/create.php`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" }
    }
  );
  return res.data;
};

/* ===============================
   UPDATE SERVICE
================================= */
export const updateService = async (formData: FormData) => {
  const res = await axios.post(
    `${API_BASE}/services/update.php`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" }
    }
  );
  return res.data;
};

/* ===============================
   DELETE SERVICE
================================= */
export const deleteService = async (id: number) => {
  const res = await axios.post(
    `${API_BASE}/services/delete.php`,
    { id }
  );
  return res.data;
};