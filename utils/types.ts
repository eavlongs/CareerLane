export type JobPost = {
    id: string;
    applicants: number;
    title: string;
    description: string;
    type: number;
    location: number;
    company_location: string;
    company_id: string;
    company_name: string;
    logo_url: string | null;
    salary: number | null;
    salary_start_range: number | null;
    salary_end_range: number | null;
    is_salary_negotiable: boolean;
    is_active: boolean;
    category_id: string;
    category_name: string;
    original_deadline: Date;
    extended_deadline: Date | null;
    created_at: Date;
    updated_at: Date;
};

export type PartialJobPost = {
    id: string;
    title: string;
    type: number;
    location: number;
    company_location: string;
    company_id: string;
    company_name: string;
    logo_url: string | null;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
};

export type Company = {
    id: string;
    name: string;
    logo_url: string | null;
    location: string;
    description: string;
};

export enum ProviderTypeEnum {
    GOOGLE,
    GITHUB,
    FACEBOOK,
    _LENGTH,
}

export enum JobTypeEnum {
    FullTime,
    PartTime,
    Contract,
    Internship,
    Temporary,
    _LENGTH,
}

export const JobTypeEnumToStringMap = {
    [JobTypeEnum.FullTime.toString()]: "Full Time",
    [JobTypeEnum.PartTime.toString()]: "Part Time",
    [JobTypeEnum.Contract.toString()]: "Contract",
    [JobTypeEnum.Internship.toString()]: "Internship",
    [JobTypeEnum.Temporary.toString()]: "Temporary",
};

export enum JobLocationEnum {
    Remote,
    Onsite,
    Hybrid,
    _LENGTH,
}

export const JobLocationEnumToStringMap = {
    [JobLocationEnum.Remote.toString()]: "Remote",
    [JobLocationEnum.Onsite.toString()]: "On Site",
    [JobLocationEnum.Hybrid.toString()]: "Hybrid",
};

export enum UserTypeEnum {
    User,
    Company,
    _LENGTH,
}

export type ApiResponse<T = any> = Prettify<{
    success: boolean;
    message: string;
    error?: {
        [key: string]: string;
    };
    data?: T;
}>;

export type PaginationMetaData = {
    per_page: number;
    total: number;
    current_page: number;
    last_page: number;
};

export type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};

export type Category = {
    id: string;
    name: string;
};

export type Province = Category;

export type ZodValidationError = {
    path: string;
    message: string;
};

export type ApiValidationError = {
    [key: string]: string[];
};

export type JobSearchOptions = {
    page: number;
    limit: number;
    category_id?: string;
    province_id?: string;
    type?: JobTypeEnum;
    location?: JobLocationEnum;
    min_salary?: number;
};

export type FetchState = {
    fetched: boolean;
    fetching: boolean;
    success: boolean;
};
