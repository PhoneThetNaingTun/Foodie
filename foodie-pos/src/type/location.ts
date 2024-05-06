import { Location } from "@prisma/client";
import Error from "next/error";
import { BaseOptions } from "./user";

export interface NewLocationPayload extends BaseOptions {
  name: string;
  street: string;
  township: string;
  city: string;
  companyId?: number;
}

export interface LocationSlice {
  locations: Location[];
  isLoading: boolean;
  onError: Error | null;
}

export interface UpdatedLocationPayload extends BaseOptions, Location {}
export interface DeleteLocaionPayload extends BaseOptions {
  id: number;
}
