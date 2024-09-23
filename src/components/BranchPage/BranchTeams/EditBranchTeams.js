import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import { useSelectLanguage } from "../../../context/LanguageChoice";
import { useSelector } from "react-redux";

const EditBranchTeams = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { selectLanguage } = useSelectLanguage();
  const baseUrl = useSelector((state) => state.baseUrl).backend;

  // State for form data
  const [formData, setFormData] = useState({
    first_name: { English: "", Nepali: "" },
    last_name: { English: "", Nepali: "" },
    post: "",
    office_post: "",
    rank: "",
    employment_type: "",
    appointed_date: "",
    terminated_date: "",
    pan_no: "",
    bank_name: "",
    bank_account_no: "",
    employees_provident_fund_no: "",
    citizen_investment_no: "",
    address: { English: "", Nepali: "" },
    contact_no: "",
    branch: "",
    sakha: "",
    mahasakha: "",
    photo: null,
  });

  // State for original data
  const [originalData, setOriginalData] = useState({});

  // State for dropdown options
  const [branches, setBranches] = useState([]);
  const [employmentTypes, setEmploymentTypes] = useState([]);
  const [officePosts, setOfficePosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [ranks, setRanks] = useState([]);
  const [sakha, setSakha] = useState([]);
  const [mahasakha, setMahasakha] = useState([]);

  // Fetch user data and dropdown data from APIs
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${baseUrl}api/profiles/${userId}/`);
        const user = response.data;

        setOriginalData(user); // Store original data

        // Populate form fields with default user values
        setFormData({
          first_name: {
            English: user.first_name?.English || "",
            Nepali: user.first_name?.Nepali || "",
          },
          last_name: {
            English: user.last_name?.English || "",
            Nepali: user.last_name?.Nepali || "",
          },
          post: user.post || "",
          office_post: user.office_post || "",
          rank: user.rank || "",
          employment_type: user.employment_type || "",
          appointed_date: user.appointed_date || "",
          terminated_date: user.terminated_date || "",
          pan_no: user.pan_no || "",
          bank_name: user.bank_name || "",
          bank_account_no: user.bank_account_no || "",
          employees_provident_fund_no: user.employees_provident_fund_no || "",
          citizen_investment_no: user.citizen_investment_no || "",
          address: {
            English: user.address?.English || "",
            Nepali: user.address?.Nepali || "",
          },
          contact_no: user.contact_no || "",
          branch: user.branch || "",
          sakha: user.sakha || "",
          mahasakha: user.mahasakha || "",
          photo: user.photo || null,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchDropdownData = async () => {
      try {
        const [
          branchRes,
          empTypesRes,
          officePostsRes,
          postsRes,
          ranksRes,
          sakhaRes,
          mahasakhaRes,
        ] = await Promise.all([
          axios.get(`${baseUrl}api/branches/`),
          axios.get(`${baseUrl}api/employment-types/`),
          axios.get(`${baseUrl}api/office-posts/`),
          axios.get(`${baseUrl}api/posts/`),
          axios.get(`${baseUrl}api/ranks/`),
          axios.get(`${baseUrl}api/sakha/`),
          axios.get(`${baseUrl}api/mahasakha/`),
        ]);
        setBranches(branchRes.data);
        setEmploymentTypes(empTypesRes.data);
        setOfficePosts(officePostsRes.data);
        setPosts(postsRes.data);
        setRanks(ranksRes.data);
        setSakha(sakhaRes.data);
        setMahasakha(mahasakhaRes.data);
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
      }
    };

    fetchUserData();
    fetchDropdownData();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const [field, lang] = name.split(".");
    if (lang) {
      setFormData((prevState) => ({
        ...prevState,
        [field]: {
          ...prevState[field],
          [lang]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleDropdownChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      photo: e.target.files[0],
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const postData = new FormData();

    // Loop through formData to append only changed fields
    for (const key in formData) {
      const value = formData[key];
      const originalValue = originalData[key];

      if (key === "photo") {
        if (value && value !== originalValue) {
          postData.append(key, value);
        }
      } else if (typeof value === "object") {
        const isEmpty = Object.values(value).every((val) => val === "");
        if (
          !isEmpty &&
          JSON.stringify(value) !== JSON.stringify(originalValue)
        ) {
          postData.append(key, JSON.stringify(value));
        }
      } else if (value !== "" && value !== originalValue) {
        postData.append(key, value);
      }
    }

    try {
      await axios.patch(`${baseUrl}api/profiles/${userId}/`, postData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate(-1); // Go back to the previous page
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <Box p={3} sx={{ maxWidth: "800px", mx: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Edit User
      </Typography>
      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={3}>
          {/* First Name (English and Nepali) */}
          <Grid item xs={12} md={6}>
            <TextField
              name="first_name.English"
              label="First Name (English)"
              value={formData.first_name.English}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="first_name.Nepali"
              label="First Name (Nepali)"
              value={formData.first_name.Nepali}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
            />
          </Grid>

          {/* Last Name (English and Nepali) */}
          <Grid item xs={12} md={6}>
            <TextField
              name="last_name.English"
              label="Last Name (English)"
              value={formData.last_name.English}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="last_name.Nepali"
              label="Last Name (Nepali)"
              value={formData.last_name.Nepali}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
            />
          </Grid>

          {/* Post */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Post</InputLabel>
              <Select
                name="post"
                value={formData.post}
                onChange={handleDropdownChange}
                fullWidth
              >
                {posts.map((post) => (
                  <MenuItem key={post.id} value={post.id}>
                    {post.name[selectLanguage]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Office Post */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Office Post</InputLabel>
              <Select
                name="office_post"
                value={formData.office_post}
                onChange={handleDropdownChange}
                fullWidth
              >
                {officePosts.map((officePost) => (
                  <MenuItem key={officePost.id} value={officePost.id}>
                    {officePost.name[selectLanguage]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Rank */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Rank</InputLabel>
              <Select
                name="rank"
                value={formData.rank}
                onChange={handleDropdownChange}
                fullWidth
              >
                {ranks.map((rank) => (
                  <MenuItem key={rank.id} value={rank.id}>
                    {rank.name[selectLanguage]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Employment Type */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Employment Type</InputLabel>
              <Select
                name="employment_type"
                value={formData.employment_type}
                onChange={handleDropdownChange}
                fullWidth
              >
                {employmentTypes.map((type) => (
                  <MenuItem key={type.id} value={type.id}>
                    {type.name[selectLanguage]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Appointed Date */}
          <Grid item xs={12} md={6}>
            <TextField
              name="appointed_date"
              label="Appointed Date"
              type="date"
              value={formData.appointed_date}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          {/* Terminated Date */}
          <Grid item xs={12} md={6}>
            <TextField
              name="terminated_date"
              label="Terminated Date"
              type="date"
              value={formData.terminated_date}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          {/* PAN Number */}
          <Grid item xs={12} md={6}>
            <TextField
              name="pan_no"
              label="PAN Number"
              value={formData.pan_no}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
            />
          </Grid>

          {/* Bank Name */}
          <Grid item xs={12} md={6}>
            <TextField
              name="bank_name"
              label="Bank Name"
              value={formData.bank_name[selectLanguage]}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
            />
          </Grid>

          {/* Bank Account Number */}
          <Grid item xs={12} md={6}>
            <TextField
              name="bank_account_no"
              label="Bank Account Number"
              value={formData.bank_account_no}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
            />
          </Grid>

          {/* Employees Provident Fund Number */}
          <Grid item xs={12} md={6}>
            <TextField
              name="employees_provident_fund_no"
              label="Employees Provident Fund Number"
              value={formData.employees_provident_fund_no}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
            />
          </Grid>

          {/* Citizen Investment Number */}
          <Grid item xs={12} md={6}>
            <TextField
              name="citizen_investment_no"
              label="Citizen Investment Number"
              value={formData.citizen_investment_no}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
            />
          </Grid>

          {/* Address (English and Nepali) */}
          <Grid item xs={12} md={6}>
            <TextField
              name="address.English"
              label="Address (English)"
              value={formData.address.English}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="address.Nepali"
              label="Address (Nepali)"
              value={formData.address.Nepali}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
            />
          </Grid>

          {/* Contact Number */}
          <Grid item xs={12} md={6}>
            <TextField
              name="contact_no"
              label="Contact Number"
              value={formData.contact_no}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
            />
          </Grid>

          {/* Branch */}
          {/* <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Branch</InputLabel>
              <Select
                name="branch"
                value={formData.branch}
                onChange={handleDropdownChange}
                fullWidth
              >
                {branches.map((branch) => (
                  <MenuItem key={branch.id} value={branch.id}>
                    {branch.name[selectLanguage]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid> */}

          {/* Sakha */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Sakha</InputLabel>
              <Select
                name="sakha"
                value={formData.sakha}
                onChange={handleDropdownChange}
                fullWidth
              >
                {sakha.map((sakhaItem) => (
                  <MenuItem key={sakhaItem.id} value={sakhaItem.id}>
                    {sakhaItem.name[selectLanguage]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Mahasakha */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Mahasakha</InputLabel>
              <Select
                name="mahasakha"
                value={formData.mahasakha}
                onChange={handleDropdownChange}
                fullWidth
              >
                {mahasakha.map((mahasakhaItem) => (
                  <MenuItem key={mahasakhaItem.id} value={mahasakhaItem.id}>
                    {mahasakhaItem.name[selectLanguage]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Photo */}
          <Grid item xs={12}>
            <Button variant="contained" component="label">
              Upload Photo
              <input
                type="file"
                hidden
                name="photo"
                accept="image/*"
                onChange={handleFileChange}
              />
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default EditBranchTeams;
