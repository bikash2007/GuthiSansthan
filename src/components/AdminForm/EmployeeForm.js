import React, { useState, useEffect } from "react";
import axios from "axios";
import bankNames from "./bankNames.json"; // Import local JSON file for banks
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

const EmployeeForm = () => {
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

  // State for dropdown options
  const [branches, setBranches] = useState([]);
  const [employmentTypes, setEmploymentTypes] = useState([]);
  const [officePosts, setOfficePosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [ranks, setRanks] = useState([]);
  const [sakha, setSakha] = useState([]);
  const [mahasakha, setMahasakha] = useState([]);
  const [banks] = useState(bankNames.banks); // Access the banks list from the JSON

  // Fetch dropdown data from APIs
  useEffect(() => {
    const fetchData = async () => {
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
          axios.get("https://ingnepal.org.np/api/branches/"),
          axios.get("https://ingnepal.org.np/api/employment-types/"),
          axios.get("https://ingnepal.org.np/api/office-posts/"),
          axios.get("https://ingnepal.org.np/api/posts/"),
          axios.get("https://ingnepal.org.np/api/ranks/"),
          axios.get("https://ingnepal.org.np/api/sakha/"),
          axios.get("https://ingnepal.org.np/api/mahasakha/"),
        ]);
        setBranches(branchRes.data);
        setEmploymentTypes(empTypesRes.data);
        setOfficePosts(officePostsRes.data);
        setPosts(postsRes.data);
        setRanks(ranksRes.data);
        setSakha(sakhaRes.data);
        setMahasakha(mahasakhaRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Handle form input change
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

  // Handle dropdown change
  const handleDropdownChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      photo: e.target.files[0],
    });
  };

  // Handle form submission
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new FormData object
    const postData = new FormData();

    // Loop through formData to append only non-empty fields
    for (const key in formData) {
      const value = formData[key];

      if (key === "photo") {
        if (value) postData.append(key, value); // Add photo if it exists
      } else if (typeof value === "object") {
        // If the field is an object (for names or address in multiple languages)
        const isEmpty = Object.values(value).every((val) => val === "");
        if (!isEmpty) {
          postData.append(key, JSON.stringify(value)); // Add the field if it's not empty
        }
      } else if (value !== "") {
        postData.append(key, value); // Add non-empty field
      }
    }

    try {
      await axios.post("https://ingnepal.org.np/api/profiles/", postData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Employee data submitted successfully");
      window.location.url();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Box p={3} sx={{ maxWidth: "800px", mx: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Employee Form
      </Typography>
      <form onSubmit={handleSubmit}>
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
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {posts.map((post) => (
                  <MenuItem key={post.id} value={post.id}>
                    {post.name.English}
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
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {officePosts.map((officePost) => (
                  <MenuItem key={officePost.id} value={officePost.id}>
                    {officePost.name.English}
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
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {ranks.map((rank) => (
                  <MenuItem key={rank.id} value={rank.id}>
                    {rank.name.English}
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
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {employmentTypes.map((type) => (
                  <MenuItem key={type.id} value={type.id}>
                    {type.name.English}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Appointed Date */}
          <Grid item xs={12} md={6}>
            <TextField
              type="date"
              name="appointed_date"
              label="Appointed Date"
              value={formData.appointed_date}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              required
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          {/* Terminated Date */}
          <Grid item xs={12} md={6}>
            <TextField
              type="date"
              name="terminated_date"
              label="Terminated Date"
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
              required
            />
          </Grid>

          {/* Bank Name */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Bank Name</InputLabel>
              <Select
                name="bank_name"
                value={formData.bank_name}
                onChange={handleDropdownChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {banks.map((bank, index) => (
                  <MenuItem key={index} value={bank.name}>
                    {bank.name.English}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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

          {/* Provident Fund Number */}
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
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Branch</InputLabel>
              <Select
                name="branch"
                value={formData.branch}
                onChange={handleDropdownChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {branches.map((branch) => (
                  <MenuItem key={branch.id} value={branch.id}>
                    {branch.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Sakha */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Sakha</InputLabel>
              <Select
                name="sakha"
                value={formData.sakha}
                onChange={handleDropdownChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {sakha.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name.English}
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
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {mahasakha.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name.English}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Photo */}
          <Grid item xs={12} md={6}>
            <TextField
              type="file"
              name="photo"
              onChange={handleFileChange}
              fullWidth
              variant="outlined"
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default EmployeeForm;
