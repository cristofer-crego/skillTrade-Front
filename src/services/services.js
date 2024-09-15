import axios from "axios";

// const URL_GET_USERS = import.meta.env.VITE_API_GET_USERS
const URL_GET_USERS = "http://localhost:3001/user";
const URL_POST_USER = "http://localhost:3001/user";
const URL_LOGIN = "http://localhost:3001/user/login";
const URL_GET_PROFESIONS = "http://localhost:3001/professions";
const URL_GET_USERS_BY_PROFESSION = "http://localhost:3001/user/profession";

export const createUser = async (userData) => {
  try {
    const options = {
      headers: {
        contentType: "application/json",
      },
      withCredentials: true,
    };

    const response = await axios.post(URL_POST_USER, userData, options);

    if (response.status === 200) {
      console.log("User created successfully:", response.data);
      return response;
    } else {
      console.error("Error creating user:", response.status, response.data);
      throw new Error("Failed to create user");
    }
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const login = async ({ email, password }) => {
  try {
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const userData = { email, password };

    const response = await axios.post(URL_LOGIN, userData, options);
    console.log(response);

    if (response.status === 200) {
      console.log("Login successful:", response.data);
      return response;
    } else {
      console.error("Error logging in:", response.status, response.data);
      throw new Error("Failed to login");
    }
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios.get(URL_GET_USERS, options);

    return response;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

export const getProfessions = async () => {
  try {
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios.get(URL_GET_PROFESIONS, options);

    return response;
  } catch (error) {
    console.error("Error fetching professions:", error);
  }
};

export const getUsersByProfesion = async (profession) => {
  try {
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        profession,
      },
    };
    console.log(options.params.profession);
    const response = await axios.post(
      `${URL_GET_USERS_BY_PROFESSION}?profession=${options.params.profession}`
    );

    return response;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
