export type PostType = {
    id: string;
    account_id: string;
    location_id: string;
    parent_id: string | null;
    created_at: string;
    updated_at: string;
    content: string;
    content_type: string;
    addn_data: {} | null;
    deleted: boolean;
    username: string;
    name: string;
}

export type UserType = {
    id: string;
    name: string;
    phone: string;
}

export type PostStatsType = {
    score: number;
    comments: number;
}

export type InitSignupResponse = {
    error: string | null;
    user: UserType | null;

}

export type RequestOTPResponse = {
    error: string | null;
    success: boolean;
}

export type LoginResponse = {
    user: UserType | null;
    sessionID: string | null;
}
export type Account = {
    id: string;
    name: string;
    owner: string;
    is_main: boolean;
    username: string;
}

export type SignInResponse = {
    user: UserType | null;
    sessionID: string | null;
    error: string | null;
    account: Account | null;
}