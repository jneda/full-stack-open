import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "../types";

const baseUrl = "http://localhost:3000/api/diaries";

const getAllEntries = async () => {
  try {
    const response = await axios.get<DiaryEntry[]>(baseUrl);
    return response.data;
  } catch (error: unknown) {
    let errorMessage = "An error occurred.";
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data;
    }
    throw new Error(errorMessage);
  }
};

const createEntry = async (newEntry: NewDiaryEntry) => {
  try {
    const response = await axios.post<DiaryEntry>(baseUrl, newEntry);
    return response.data;
  } catch (error: unknown) {
    let errorMessage = "An error occurred.";
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data;
    }
    throw new Error(errorMessage);
  }
};

export default { getAllEntries, createEntry };
