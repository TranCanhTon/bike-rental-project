import { API } from "../config";
import type { Bike } from "@/types/Bikes";
import { AxiosError } from "axios";

type CreateBikePayload = Omit<
  Bike,
  | "_id"
  | "isAvailable"
  | "averageRating"
  | "numOfReviews"
  | "user"
  | "reviews"
  | "createdAt"
  | "updatedAt"
> & {
  image?: string;
}; // only sends part of the full Bike model from the form

const getAllBikes = async () => {
  return await API.get("/api/v1/bikes")
    .then(({ data }) => data)
    .catch((error) => {
      console.error("Failed to fetch bikes", error);
      throw error;
    });
};

const getSingleBike = async (bikeId: string) => {
  return await API.get(`/api/v1/bikes/${bikeId}`)
    .then(({ data }) => data)
    .catch((error) => {
      console.error("Failed to fetch bikes", error);
      throw error;
    });
};

const createBike = async (data: CreateBikePayload) => {
  const response = await API.post("/api/v1/bikes", data);
  return response.data;
};

const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", file);
  try {
    const response = await API.post("/api/v1/bikes/uploadImage", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.image;
  } catch (error: unknown) {
    const err = error as AxiosError<{ msg: string }>;
    throw new Error(err.response?.data?.msg || "Failed to upload image");
  }
};

const deleteBike = async (bikeId: string) => {
  try {
    const response = await API.delete(`/api/v1/bikes/${bikeId}`);
    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ msg: string }>;
    throw new Error(err.response?.data?.msg || "Failed to delete product");
  }
};

const editBike = async (bikeId: string, data: Partial<Bike>) => {
  try {
    const response = await API.patch(`/api/v1/bikes/${bikeId}`, data);
    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ msg: string }>;
    throw new Error(err.response?.data?.msg || "Failed to edit product");
  }
};

export const bikeAPI = {
  getAllBikes,
  getSingleBike,
  createBike,
  uploadImage,
  deleteBike,
  editBike,
};
