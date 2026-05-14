import { supabase } from "@/lib/supabase";

export interface Transaction {
  id?: string;
  user_id: string;
  amount: number;
  note: string;
  category_id?: string;
  wallet_id?: string;
  image_url?: string;
  type: "income" | "expense";
  date: string;
}

export const transactionService = {
  async getAll() {
    const { data, error } = await supabase
      .from("transactions")
      .select("*, categories(*)")
      .order("date", { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async create(transaction: Transaction) {
    const { data, error } = await supabase
      .from("transactions")
      .insert([transaction])
      .select();
    
    if (error) throw error;
    return data;
  },

  async getCategories() {
    const { data, error } = await supabase
      .from("categories")
      .select("*");
    
    if (error) throw error;
    return data;
  },

  async uploadImage(blob: Blob, fileName: string) {
    const { data, error } = await supabase.storage
      .from("receipts")
      .upload(fileName, blob);
    
    if (error) throw error;
    
    const { data: { publicUrl } } = supabase.storage
      .from("receipts")
      .getPublicUrl(data.path);
    
    return publicUrl;
  }
};
