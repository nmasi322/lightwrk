import { USERS_TABLE } from "@/constants/db";
import { SignupUserPayload } from "@/types/auth";
import { User } from "@supabase/supabase-js";
import { supabase } from "./init";

async function _createUser(user: User & { name: string }) {
  const payload = {
    id: user.id,
    email: user.email,
    name: user.name,
    created_at: user.created_at,
  };

  const res = await supabase.from(USERS_TABLE).insert(payload);

  if (res.error) {
    throw res.error;
  }

  return res.data;
}

export async function signupUser({ name, email, password }: SignupUserPayload) {
  try {
    // payload validation
    if (!name || !email || !password)
      throw "Payload is missing required fields";

    const res = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: process.env.NEXT_PUBLIC_APP_LINK,
        data: {
          name,
        },
      },
    });

    if (res.error) {
      throw res.error.message;
    }

    if (!res.data.user) {
      throw "Couldn't get user auth object";
    }

    // then create the user in the DB
    await _createUser({ ...res.data.user, name });

    return res.data.user;
  } catch (error) {
    throw error;
  }
}

export async function loginUser({
  email,
  password,
}: Omit<SignupUserPayload, "name">) {
  try {
    const res = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (res.error) {
      throw res.error.message;
    }

    // check if user is returned
    if (!res.data.user) {
      throw "Couldn't get user auth object";
    }

    return res.data.user;
  } catch (error) {
    throw error;
  }
}
