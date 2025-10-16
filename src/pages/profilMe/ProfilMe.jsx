import React, { useEffect, useState } from "react";
import "./ProfilMe.css";
import { getProfilMe } from "../services/app";
import axios from "axios";
import { baseUrl } from "../services/config";

function ProfilMe({ profil, setProfil }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // Ma'lumotni yuklash
  useEffect(() => {
    getProfilMe()?.then(setProfil);
  }, [setProfil]);

  // Fayl tanlanganda preview chiqarish
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Rasmni backendga yuborish
  const handleUpload = async () => {
    if (!selectedFile) return alert("Iltimos, fayl tanlang!");

    const formData = new FormData();
    formData.append("avatar", selectedFile);

    try {
      // ⚠️ Backend API manzilingni shu yerda yoz
      const res = await axios.post(`${baseUrl}/api/upload-avatar`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Rasm yuklandi ✅");

      // Yangi avatarni holatga joylash
      setProfil((prev) => ({ ...prev, avatar: res.data.url }));
      setSelectedFile(null);
      setPreview(null);
    } catch (error) {
      console.error(error);
      alert("Yuklashda xatolik yuz berdi!");
    }
  };

  return (
    <div className="profil-me">
      <div className="container">
        <div className="avatar-box">
          <img
            src={
              preview ||
              profil?.avatar ||
              "/imgs/icons.png"
            }
            alt="Avatar"
            className="avatar-img"
          />
        </div>

        <input type="file" accept="image/*" onChange={handleFileChange} />
        {selectedFile && (
          <button onClick={handleUpload}>Rasmni yuklash</button>
        )}

        <div className="info">
          <p><b>Username:</b> {profil?.username}</p>
          <p><b>Email:</b> {profil?.email}</p>
          <p><b>Bio:</b> {profil?.bio}</p>
          <p><b>Score:</b> {profil?.score}</p>
          <p><b>Country:</b> {profil?.country}</p>
        </div>
      </div>
    </div>
  );
}

export default ProfilMe;
