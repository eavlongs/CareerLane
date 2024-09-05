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
}

export const JobLocationEnumToStringMap = {
    [JobLocationEnum.Remote.toString()]: "Remote",
    [JobLocationEnum.Onsite.toString()]: "On Site",
    [JobLocationEnum.Hybrid.toString()]: "Hybrid",
};

export enum UserTypeEnum {
    User,
    Company,
}
