import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Typography,
  Avatar,
  Button,
  TextField,
  Grid,
  IconButton,
} from "@mui/material";
import { Edit, Save, Cancel } from "@mui/icons-material";
import axios from "axios";

const UserProfile = () => {
  const [user, setUser] = useState({
    fullname: "",
    username: "",
    email: "",
    gender: "",
    age: "",
    phoneNumber: "",
    address: "",
    height: "",
    weight: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem("user");
      try {
        const response = await axios.get(
          `http://localhost:8080/user/getuserdata/${userId}`
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put("http://localhost:8080/user/updateprofile", user);
      if (response.status === 200) {
        alert("Profile updated successfully!");
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8f9fa, #e9ecef)",
        padding: 2,
        "@keyframes fadeIn": {
          from: { opacity: 0, transform: "translateY(20px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
      }}
    >
      <Card
        sx={{
          width: "90%",
          maxWidth: 700,
          padding: 4,
          borderRadius: 4,
          boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
          background: "#ffffff",
          animation: "fadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            boxShadow: "0px 6px 20px rgba(0,0,0,0.15)",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            src="https://www.example.com/avatar.jpg"
            alt={user.fullname}
            sx={{
              width: 120,
              height: 120,
              marginBottom: 2,
              boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                transform: "scale(1.1)",
                boxShadow: "0px 6px 15px rgba(0,0,0,0.3)",
              },
            }}
          />
          <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 1 }}>
            {user.fullname || "User Name"}
          </Typography>
          <Typography variant="body1" sx={{ color: "#6c757d" }}>
            {user.username}
          </Typography>
        </Box>
        

        <Box sx={{ mt: 4 }}>
          <Grid container spacing={3}>
            {[
              { label: "Full Name", value: user.fullname, field: "fullname" },
              { label: "Email", value: user.email, field: "email" },
              { label: "Gender", value: user.gender, field: "gender" },
              { label: "Age", value: user.age, field: "age", type: "number" },
              { label: "Phone Number", value: user.phoneNumber, field: "phoneNumber" },
              { label: "Address", value: user.address, field: "address" },
              { label: "Height (cm)", value: user.height, field: "height", type: "number" },
              { label: "Weight (kg)", value: user.weight, field: "weight", type: "number" },
            ].map(({ label, value, field, type = "text" }) => (
              <Grid item xs={12} sm={6} key={field}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  {label}
                </Typography>
                {isEditing ? (
                  <TextField
                    fullWidth
                    variant="outlined"
                    name={field}
                    value={value}
                    onChange={handleChange}
                    type={type}
                    InputProps={{
                      style: { 
                        borderRadius: 8, 
                        padding: 8,
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      },
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        '&:hover fieldset': {
                          borderColor: '#6c757d',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#495057',
                        },
                      },
                    }}
                  />
                ) : (
                  <Typography
                    variant="body1"
                    sx={{
                      padding: 1,
                      border: "1px solid #e9ecef",
                      borderRadius: 8,
                      backgroundColor: "#f8f9fa",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&:hover": {
                        backgroundColor: "#e9ecef",
                        boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
                      },
                    }}
                  >
                    {value || "N/A"}
                  </Typography>
                )}
              </Grid>
            ))}
          </Grid>
        </Box>
        

        {/* Action Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: 4,
            gap: 2,
          }}
        >
          {isEditing ? (
            <>
              <Button
                variant="contained"
                startIcon={<Save />}
                sx={{
                  textTransform: "none",
                  background: "#495057",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  ":hover": { 
                    background: "#343a40",
                    transform: "translateY(-3px)",
                    boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
                  },
                }}
                onClick={handleSave}
              >
                Save Changes
              </Button>
              <Button
                variant="outlined"
                startIcon={<Cancel />}
                sx={{
                  textTransform: "none",
                  borderColor: "#adb5bd",
                  color: "#495057",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  ":hover": {
                    borderColor: "#868e96",
                    background: "#f8f9fa",
                    transform: "translateY(-3px)",
                    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                  },
                }}
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              startIcon={<Edit />}
              sx={{
                textTransform: "none",
                background: "#6c757d",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                ":hover": { 
                  background: "#495057",
                  transform: "translateY(-3px)",
                  boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
                },
              }}
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </Button>
          )}
        </Box>
      </Card>
    </Box>
  );
};

export default UserProfile;