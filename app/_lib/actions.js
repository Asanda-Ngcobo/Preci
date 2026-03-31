"use server"

import { redirect } from "next/navigation"
import { createClient } from "./supabase/server"







export async function signInWithGoogle() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,

    },
  })

  if (error) {
    console.log(error.message)
  }

  // VERY IMPORTANT
  redirect(data.url)
}

export async function signUpUser(formData) {
  const supabase = await createClient();
  // const supabaseServer = createServerSupabaseClient()

  const name = formData.get('name')?.toString().trim();
  const email = formData.get('email')?.toString().trim();
  const password = formData.get('password')?.toString();

  // ✅ Step 1: Validate required fields
  if (!name || !email || !password) {
    throw new Error('All fields are required.');
  }

  // ✅ Step 2: Validate full name
  const isValidName = (name) => {
    if (!name) return false;

    // Letters, spaces, apostrophes, hyphens — 2–50 chars
    const regex = /^[A-Za-z][A-Za-z\s'-]{1,49}$/;

    // Simple gibberish detection: consonants/vowels ratio
    const vowels = name.match(/[aeiou]/gi)?.length || 0;
    const consonants = name.match(/[bcdfghjklmnpqrstvwxyz]/gi)?.length || 0;
    const gibberish = consonants > vowels * 4;

    return regex.test(name) && !gibberish;
  };

  if (!isValidName(name)) {
    throw new Error(`Invalid name. 
      Please use your real first and last name.`);
  }

  // ✅ Step 3: Create user in Supabase Auth
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name }, // stores it in user_metadata
    },
  });

  if (error) throw new Error(error.message);

  const userId = data.user?.id;
  if (!userId) throw new Error('Signup failed: No user returned');

 
return { success: true, userId };
  
}

export async function loginUser(formData) {
 const supabase = await createClient()

const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();

  if (!email || !password) {
    console.error('Email and password are required');
    return;
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  const {
    data
  } = await supabase.auth.getUser();

 

 const {data: profile} = await supabase
 .from('profiles')
 .select('*')
 .eq('id', data.user.id)
 .single()
 


    // redirect('/users'); // Regular user
  
}

export async function logout() {
const supabase = await createClient()

  await supabase.auth.signOut()

  redirect('/') 
  // or wherever you want to send the user after logout
}



  //Reset Password
export async function ResetPasswordWithEmail(formData) {
  const supabase = await createClient();
  const email = formData.get('email')?.toString();

  if (!email) {
    return { success: false, error: 'Email is required.' };
  }

  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
     redirectTo: `http://localhost:3000/auth/update-password`,
  });

  if (error) {
    console.error('Reset password error:', error.message);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}


 export async function UpdatePassword(formData) {
  const supabase = await createClient();
  const password = formData.get("password")?.toString();

  if (!password) {
    return { success: false, error: "Password is required." };
  }

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    console.error("Error updating password:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true };
}

