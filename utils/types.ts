export type JobPost = {
    id: string;
    title: string;
    description: string;
    type: number;
    location: number;
    company_location: string;
    company_id: string;
    company_name: string;
    logo: string;
    salary: [number, number] | number | null;
    is_salary_negotiable: boolean;
    created_at: Date;
};

export type Company = {
    id: string;
    name: string;
    logo: string;
    location: string;
    description: string;
};

export enum JobTypeEnum {
    FullTime,
    PartTime,
    Contract,
    Internship,
    Temporary,
}

export const JobTypeEnumToStringMap = {
    [JobTypeEnum.FullTime]: "Full Time",
    [JobTypeEnum.PartTime]: "Part Time",
    [JobTypeEnum.Contract]: "Contract",
    [JobTypeEnum.Internship]: "Internship",
    [JobTypeEnum.Temporary]: "Temporary",
};

export enum JobLocationEnum {
    Remote,
    Onsite,
    Hybrid,
}

export const JobLocationEnumToStringMap = {
    [JobLocationEnum.Remote]: "Remote",
    [JobLocationEnum.Onsite]: "On Site",
    [JobLocationEnum.Hybrid]: "Hybrid",
};
