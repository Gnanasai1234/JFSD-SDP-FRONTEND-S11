import axios from "axios";
import React, { useState } from "react";

const AddArticle = () => {
  const [formData, setFormData] = useState({
    relatedto: "",
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    try {
      const response = await axios.post(
        "http://localhost:8080/article/addarticle",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      alert("Article added successfully!");
      setFormData({
        relatedto: "",
        title: "",
        description: "",
      });
    } catch (err) {
      console.error("Error submitting the form:", err);
      alert(
        `Failed to submit form: ${err.response?.data?.message || err.message}`
      );
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Add Article</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="relatedto" style={styles.label}>
            Related To
          </label>
          <input
            type="text"
            id="relatedto"
            name="relatedto"
            value={formData.relatedto}
            onChange={handleChange}
            placeholder="Enter related to"
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="title" style={styles.label}>
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter title"
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="description" style={styles.label}>
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
            style={styles.textarea}
            required
          />
        </div>
        <button type="submit" style={styles.button}>
          Add Article
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "500px",
    margin: "auto",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "5px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "24px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    minHeight: "100px",
    resize: "vertical",
  },
  button: {
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    fontSize: "18px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
  },
};

export default AddArticle;
