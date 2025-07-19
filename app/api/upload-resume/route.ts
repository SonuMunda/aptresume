import prisma from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file || typeof file === "string") {
      return new Response(JSON.stringify({ error: "No valid file provided" }), {
        status: 400,
      });
    }

    const acceptedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!acceptedTypes.includes(file.type)) {
      return new Response(
        JSON.stringify({ error: "Only PDF and Docx allowed" }),
        {
          status: 400,
        }
      );
    }

    const uniqueId = crypto.randomUUID();
    const fileExtension = file.name.split(".").pop();
    const fileSize = parseFloat((file.size / 1024).toFixed(2));
    const filePath = `uploads/${uniqueId}.${fileExtension}`;

    // Upload to Supabase
    const { error } = await supabase.storage
      .from("aptresume")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    // Get the public URL
    const { data: publicUrlData } = supabase.storage
      .from("aptresume")
      .getPublicUrl(filePath);

    const publicUrl = publicUrlData.publicUrl;

    // Save to Prisma DB
    const upload = await prisma.upload.create({
      data: {
        filename: file.name,
        url: publicUrl,
        file_size: fileSize,
        file_type: fileExtension || "unknown",
      },
    });

    return new Response(
      JSON.stringify({
        message: "File uploaded and saved",
        upload: upload,
      }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
