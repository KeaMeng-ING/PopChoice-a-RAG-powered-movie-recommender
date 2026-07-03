import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
import { createClient } from "@supabase/supabase-js";

/** GEMINI config */
if (!process.env.GEMINI_API_KEY)
  throw new Error("GEMINI API key is missing or invalid.");
export const gemini = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

/** Supabase config */
const privateKey = process.env.SUPABASE_API_KEY;
if (!privateKey) throw new Error(`Expected env var SUPABASE_API_KEY`);
const url = process.env.SUPABASE_URL;
if (!url) throw new Error(`Expected env var SUPABASE_URL`);
export const supabase = createClient(url, privateKey);
