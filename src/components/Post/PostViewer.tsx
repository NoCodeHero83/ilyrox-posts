"use client";
import { useEffect, useState } from "react";
import { getPostById } from "../../services/postService";
import type { Post } from "../types";
import { DownloadAppModal } from "../Shared/DownloadAppModal";
import { GeneratedByIlyrox } from "../Shared/GeneratedByIlyrox";
import { SpecialPostCard } from "./SpecialPostCard";

export const PostViewer = ({ id }: { id?: string }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      try {
        setLoading(true);
        const data = await getPostById(id);

        if (data) {
          setPost(data);
        } else {
          setError("Post no encontrado");
        }
      } catch (err) {
        console.error(err);
        setError("Error al cargar el post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[30vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[30vh] bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
        <h3 className="text-lg font-bold text-gray-600 mb-2">Error</h3>
        <p className="text-sm text-gray-400">{error || "Post no encontrado"}</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center w-full mt-12">
      <div className="flex justify-center w-full">
        <SpecialPostCard
          post={post}
          mode="detail"
          onUserClick={() => setIsModalOpen(true)}
          onOfferClick={() => setIsModalOpen(true)}
        />
      </div>

      <GeneratedByIlyrox className="mt-4 mb-8" />

      <DownloadAppModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
