import base from './base';
import { InitSignupResponse, PostStatsType, PostType, SignInResponse } from './types';

export const getPostsByPincode = async ( pincode: string = '203207'): Promise<PostType[]> => {
  console.log(pincode);
  const { data } = await base.get(`/posts/${pincode}`);
  console.log("What is this?", data);
  return data as PostType[];
};

export const getPostByAccount = async ( accountId: string = 'cd54916f-9aae-4081-998f-f266b2caaf83'): Promise<PostType[]> => {
  console.log(accountId);
  const { data } = await base.get(`/accounts/posts/${accountId}`);
  console.log("What is this?", data);
  return data as PostType[];
};

export const getPostStats = async ( postId: string ): Promise<PostStatsType> => {

    const { data } = await base.get(`/stats/${postId}`);
    return data as PostStatsType;
    
}

export const makeEffect = async ( {postId, up}: { postId: string, up: string }): Promise<void> => {
    console.log(postId, up);
    await base.post(`/effect/${postId}/cd54916f-9aae-4081-998f-f266b2caaf83/${up}`);
}

export const getPost = async ( postId: string ): Promise<PostType> => {
  const { data } = await base.get(`/post/${postId}`);
  return data as PostType;
};

export const createPost = async ( { content, pincode, accountId }: { content: string, pincode: string, accountId: string }): Promise<PostType> => {
  const { data } = await base.post(`/posts/${pincode}/${accountId}`, { content }, {
    headers: {
      "Authorization": 'Bearer fake_session_001',
    }
  });
}

export const getReplies = async ( postId: string ): Promise<PostType[]> => {
  const { data } = await base.get(`/comments/${postId}`);
  return data as PostType[];
}

export const createReply = async ( { content, postId, accountId }: { content: string, postId: string, accountId: string }): Promise<PostType> => {
  const { data } = await base.post(`/comments/${postId}/${accountId}`, { content }, {
    headers: {
      "Authorization": 'Bearer fake_session_001',
    }
  });
  return data as PostType;
}

export const getAccountByPhone = async (phone: string): Promise<InitSignupResponse> => {
  console.log("Getting phone data", phone);
  const { data } = await base.get(`/users/init/${phone}`);
  return data as InitSignupResponse;
}

export const requestOTP = async (phone: string): Promise<InitSignupResponse> => {
  console.log("Getting phone data", phone);
  const { data } = await base.post(`/users/send-code/${phone}`);
  return data as InitSignupResponse;
}

export const signIn = async (phone: string, code: string): Promise<SignInResponse> => {
  console.log("Signing in", phone, code);
  const { data } = await base.post('/users/login', { phone, code });
  return data as SignInResponse;
}

