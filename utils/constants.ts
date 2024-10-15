import type { FetchState } from "./types";

export const COMPANY_LOGO_FALLBACK = "/company-fallback.png";
export const LOGO_MAX_FILE_SIZE = 1024 * 1024 * 20; // 20MB
export const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
];

export const DEFAULT_FETCH_STATE: FetchState = {
    fetched: false,
    fetching: false,
    success: false,
};

export const ACCEPTED_CV_TYPES = [
    "application/msword", // .doc
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
    "application/pdf", // .pdf
];

export enum GuardType {
    NONE,
    NOT_LOGGED_IN,
    NOT_NORMAL_USER,
}
