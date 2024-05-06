import { Company } from "@prisma/client";
import { BaseOptions } from "./user";

export interface CompanySlice {
  company: Company | null;
  isLoading: boolean;
  onError: Error | null;
}

export interface updateCompanyPayload extends BaseOptions, Company {}
