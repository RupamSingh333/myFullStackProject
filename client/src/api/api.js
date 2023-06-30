import axios from "axios";
// Set the base URL for your API requests
const API_BASE_URL = "http://localhost:5000/api";
// Example API functions

const userDataArr = [
  { email: "admin@doomshell.com", password: "12345", username: "Rupam Singh" },
];

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      email,
      password,
    });

    await new Promise((resolve) => setTimeout(resolve, 2000));
    return response.data;

  } catch (error) {
    if (error.response) {
      return error.response.data;
      // console.log("No response received:", error.response.data);
    } else if (error) {
      return error.response.data;
      // console.log("No response received:", error.response.data);
    } else {
      return error.message;

      // Something happened in setting up the request that triggered an error
      // console.log("Error:", error.message);
    }
  }
};

export const registerUser = async (username, email, password) => {
  try {
    // const response = await axios.post(`${API_BASE_URL}/register`, {
    //   username,
    //   email,
    //   password,
    // });

    const existingUser = userDataArr.find((user) => user.email === email);

    if (existingUser) {
      // User already exists with the provided email
      return {
        success: false,
        message: "Email already exist !",
      };
    }

    const newUser = {
      email,
      password,
      username,
    };

    userDataArr.push(newUser);
    // Simulate an API response delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return {
      success: true,
      message: "User registered successfully",
    };
  } catch (error) {
    throw error;
  }
};

export const addProduct = async (productData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/products`, productData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
