import base from './base';
import { Account, InitSignupResponse, PostStatsType, PostType, SignInResponse } from './types';

export const getPostsByPincode = async ( pincode: string = '203207'): Promise<PostType[]> => {
  
  const { data } = await base.get(`/posts/${pincode}`);
  
  return data as PostType[];
};

export const getPostByAccount = async ( accountId: string = 'cd54916f-9aae-4081-998f-f266b2caaf83'): Promise<PostType[]> => {
  
  const { data } = await base.get(`/accounts/posts/${accountId}`);
  
  return data as PostType[];
};

export const getPostStats = async ( postId: string ): Promise<PostStatsType> => {

    const { data } = await base.get(`/stats/${postId}`);
    return data as PostStatsType;
    
}

export const makeEffect = async ( {postId, up, accountId}: {accountId: string,  postId: string, up: string }): Promise<void> => {
    
    await base.post(`/effect/${postId}/${accountId}/${up}`);
}

export const getPost = async ( postId: string ): Promise<PostType> => {
  const { data } = await base.get(`/post/${postId}`);
  return data as PostType;
};

export const createPost = async ( {sess, content, pincode, accountId }: { sess: string ,content: string, pincode: string, accountId: string }): Promise<PostType> => {
  
  const { data } = await base.post(`/posts/${pincode}/${accountId}`, { content }, {
    headers: {
      "Authorization": `Bearer ${sess}`,
    }
  });

  return data[0];
}

export const getReplies = async ( postId: string ): Promise<PostType[]> => {
  const { data } = await base.get(`/comments/${postId}`);
  return data as PostType[];
}

export const createReply = async ( { sess, content, postId, accountId }: { sess:string, content: string, postId: string, accountId: string }): Promise<PostType> => {
  const { data } = await base.post(`/comments/${postId}/${accountId}`, { content }, {
    headers: {
      "Authorization": `Bearer ${sess}`,
    }
  });
  return data as PostType;
}

export const getAccountByPhone = async (phone: string): Promise<InitSignupResponse> => {
  
  const { data } = await base.get(`/users/init/${phone}`);
  return data as InitSignupResponse;
}

export const requestOTP = async (phone: string): Promise<InitSignupResponse> => {
  
  const { data } = await base.post(`/users/send-code/${phone}`);
  return data as InitSignupResponse;
}

export const signIn = async (phone: string, code: string): Promise<SignInResponse> => {
  
  const { data } = await base.post('/users/login', { phone, code });
  return data as SignInResponse;
}

export const signUp = async ( phone: string, code: string, name: string, username: string): Promise<SignInResponse> =>{
  const { data } = await base.post('/users/signup', { phone, code, name, username })
  return data as SignInResponse;
}

export const checkUsername = async (username: string): Promise<boolean> => {
  const { data } = await base.get(`/users/check/${username}`);
  
  return data.available as boolean;
}


export const getAccountById = async (id: string): Promise<Account> => {
  // console.log("fetching account by id")
  const { data } = await base.get(`/accounts/fetch/${id}`);
  return data as Account;
}
