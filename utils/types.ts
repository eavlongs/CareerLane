export type JobPost = {
    id: string;
    title: string;
    description: string;
    type: number;
    location: number;
    company_location: string;
    company_id: string;
    company_name: string;
    logo: string | null;
    salary: [number, number] | number | null;
    is_salary_negotiable: boolean;
    created_at: Date;
};

export type Company = {
    id: string;
    name: string;
    logo: string | null;
    location: string;
    description: string;
};

export enum ProviderTypeEnum {
    GOOGLE,
    GITHUB,
    LINKEDIN,
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

export type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};

export type Category = {
    id: string;
    name: string;
};

export type ZodValidationError = {
    path: string;
    message: string;
};
