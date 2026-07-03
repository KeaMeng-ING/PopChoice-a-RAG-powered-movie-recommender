import { GoogleGenAI } from "@google/genai";
import { createClient } from "@supabase/supabase-js";

/** GEMINI config */
const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (!geminiApiKey)
  throw new Error("VITE_GEMINI_API_KEY is missing or invalid.");
export const gemini = new GoogleGenAI({ apiKey: geminiApiKey });

/** Supabase config */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
if (!supabaseUrl) throw new Error("Expected env var VITE_SUPABASE_URL");
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
if (!supabaseKey) throw new Error("Expected env var VITE_SUPABASE_API_KEY");
export const supabase = createClient(supabaseUrl, supabaseKey);
