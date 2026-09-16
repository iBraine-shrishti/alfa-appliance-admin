import { useRef, useState } from "react";
import {
  FiImage,
  FiUploadCloud,
  FiPlus,
  FiX,
  FiVideo,
  FiTrash2,
  FiStar,
  FiChevronLeft,
  FiChevronRight,
  FiPlay,
  FiLoader,
} from "react-icons/fi";
import { uploadMediaFile } from "../../../services/api";

const ACCEPTED_MEDIA_TYPES =
  "image/*,video/*,.mp4,.mov,.webm,.mkv,.avi,.wmv,.jpg,.jpeg,.png,.webp,.gif,.svg,.avif";

export const isVideoItem = (item) => {
  if (!item) return false;
  if (typeof item === "object") {
    if (item.type === "video") return true;
    if (item.file?.type?.startsWith("video/")) return true;
    if (typeof item.url === "string" && isVideoUrl(item.url)) return true;
    return false;
  }
  return isVideoUrl(item);
};

const isVideoUrl = (url) => {
  if (typeof url !== "string") return false;
  if (url.startsWith("data:video/")) return true;
  return /\.(mp4|webm|mov|mkv|avi|wmv|flv|m4v|ogv)($|\?)/i.test(url);
};

export const getMediaUrl = (item) => {
  if (!item) return "";
  if (typeof item === "string") return item;
  return item.url || "";
};

const MediaSection = ({ form, onChange }) => {
  const mainInput = useRef(null);
  const galleryInput = useRef(null);
  const [isDraggingMain, setIsDraggingMain] = useState(false);
  const [isDraggingGallery, setIsDraggingGallery] = useState(false);
  const [uploadingMain, setUploadingMain] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);

  const galleryItems = form.gallery || [];
  const mainMediaUrl = getMediaUrl(form.mainImage);
  const mainIsVideo = isVideoItem(form.mainImage || mainMediaUrl);

  const handleMainFile = async (file) => {
    if (!file) return;
    const isVideo = file.type.startsWith("video");
    const previewUrl = URL.createObjectURL(file);
    onChange("mainImage", previewUrl);
    setUploadingMain(true);
    try {
      const cdnUrl = await uploadMediaFile(file);
      onChange("mainImage", cdnUrl);
      if (isVideo && !form.videoUrl) {
        onChange("videoUrl", cdnUrl);
      }
    } catch (err) {
      console.error("Main image upload to Cloudinary failed:", err);
      alert("Failed to upload image to Cloudinary: " + (err.message || "Network error"));
    } finally {
      setUploadingMain(false);
    }
  };

  const handleGalleryFiles = async (filesList) => {
    const files = Array.from(filesList || []);
    if (!files.length) return;

    setUploadingGallery(true);
    const tempItems = files.map((file) => ({
      url: URL.createObjectURL(file),
      type: file.type.startsWith("video") ? "video" : "image",
      name: file.name,
      file,
      uploading: true,
    }));

    const currentBase = [...galleryItems, ...tempItems];
    onChange("gallery", currentBase);

    try {
      const results = await Promise.all(
        files.map(async (file) => {
          try {
            const cdnUrl = await uploadMediaFile(file);
            return { name: file.name, url: cdnUrl, type: file.type.startsWith("video") ? "video" : "image" };
          } catch (err) {
            console.error("Gallery file upload failed:", file.name, err);
            return null;
          }
        })
      );

      const updatedGallery = currentBase
        .map((item) => {
          if (item.uploading && item.name) {
            const match = results.find((r) => r && r.name === item.name);
            if (match && match.url) {
              return {
                url: match.url,
                type: match.type,
                name: item.name,
                uploading: false,
              };
            }
          }
          return item;
        })
        .filter((item) => !item.url?.startsWith("blob:"));

      onChange("gallery", updatedGallery);
    } catch (err) {
      console.error("Gallery upload error:", err);
    } finally {
      setUploadingGallery(false);
    }
  };

  const removeGalleryItem = (index) => {
    onChange(
      "gallery",
      galleryItems.filter((_, idx) => idx !== index)
    );
  };

  const setAsMain = (item) => {
    const url = getMediaUrl(item);
    onChange("mainImage", url);
  };

  const moveItem = (fromIdx, toIdx) => {
    if (toIdx < 0 || toIdx >= galleryItems.length) return;
    const updated = [...galleryItems];
    const [moved] = updated.splice(fromIdx, 1);
    updated.splice(toIdx, 0, moved);
    onChange("gallery", updated);
  };

  return (
    <div className="rounded border border-slate-200 bg-white p-6">
      <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-4">
        <p className="flex items-center gap-2 text-sm font-bold text-navy-950">
          <FiImage size={15} className="text-blue-600" />
          Product Media (Images & Videos)
        </p>
        <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
          {galleryItems.length} gallery files uploaded (25+ supported)
        </span>
      </div>

      <div className="flex flex-col gap-6">
        {/* 1. Main Cover Media (Image or Video) */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="block text-xs font-bold tracking-wider text-slate-500">
              Main Cover Media (Image or Video)
            </label>
            {mainMediaUrl && (
              <button
                type="button"
                onClick={() => onChange("mainImage", "")}
                className="text-xs text-slate-400 hover:text-rose-600"
              >
                Clear Cover
              </button>
            )}
          </div>

          <input
            ref={mainInput}
            type="file"
            accept={ACCEPTED_MEDIA_TYPES}
            onChange={(e) => handleMainFile(e.target.files?.[0])}
            className="hidden"
          />

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDraggingMain(true);
            }}
            onDragLeave={() => setIsDraggingMain(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDraggingMain(false);
              handleMainFile(e.dataTransfer.files?.[0]);
            }}
            className={`relative flex min-h-[160px] w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-4 transition-colors ${
              isDraggingMain
                ? "border-blue-500 bg-blue-50/50"
                : "border-slate-200 bg-slate-50/60 hover:border-blue-300"
            }`}
          >
            {mainMediaUrl ? (
              <div className="relative flex flex-col items-center gap-3">
                {uploadingMain && (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-lg bg-black/60 text-white">
                    <FiLoader className="animate-spin text-blue-400" size={24} />
                    <span className="mt-2 text-xs font-semibold">Uploading to Cloudinary...</span>
                  </div>
                )}
                {mainIsVideo ? (
                  <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-black">
                    <video
                      src={mainMediaUrl}
                      controls
                      className="h-44 max-w-full object-contain"
                    />
                    <span className="absolute left-2 top-2 flex items-center gap-1 rounded bg-black/70 px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                      <FiVideo size={10} /> Main Video
                    </span>
                  </div>
                ) : (
                  <img
                    src={mainMediaUrl}
                    alt="Main product preview"
                    className="h-40 max-w-full rounded-lg object-contain shadow-xs"
                  />
                )}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => mainInput.current?.click()}
                    className="rounded border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-navy-950 shadow-xs hover:bg-slate-100"
                  >
                    Change Cover File
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => mainInput.current?.click()}
                className="flex cursor-pointer flex-col items-center justify-center gap-2 text-slate-400 hover:text-blue-600"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <FiUploadCloud size={24} />
                </div>
                <div className="text-center">
                  <p className="text-xs font-bold text-slate-700">
                    Click to browse or drag & drop Main Image / Video
                  </p>
                  <p className="mt-0.5 text-[11px] text-slate-400">
                    Supports JPG, PNG, WEBP, MP4, MOV, WEBM, MKV, etc.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 2. Gallery (Images & Videos - 25+ Files) */}
        <div>
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
            <div>
              <label className="block text-xs font-bold tracking-wider text-slate-500">
                Product Gallery & Videos ({galleryItems.length} items)
              </label>
              <p className="text-[11px] text-slate-400">
                Upload 25+ images and videos. Use arrows to reorder or set as main cover.
              </p>
            </div>
            <div className="flex items-center gap-2">
              {galleryItems.length > 0 && (
                <button
                  type="button"
                  onClick={() => onChange("gallery", [])}
                  className="text-xs font-semibold text-slate-400 hover:text-rose-600"
                >
                  Clear All ({galleryItems.length})
                </button>
              )}
              <button
                type="button"
                onClick={() => galleryInput.current?.click()}
                className="flex items-center gap-1.5 rounded bg-blue-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-blue-500"
              >
                <FiPlus size={13} /> Add Images & Videos
              </button>
            </div>
          </div>

          <input
            ref={galleryInput}
            type="file"
            accept={ACCEPTED_MEDIA_TYPES}
            multiple
            onChange={(e) => handleGalleryFiles(e.target.files)}
            className="hidden"
          />

          {/* Bulk Drag & Drop Zone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDraggingGallery(true);
            }}
            onDragLeave={() => setIsDraggingGallery(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDraggingGallery(false);
              handleGalleryFiles(e.dataTransfer.files);
            }}
            onClick={() => galleryInput.current?.click()}
            className={`mb-3 flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed p-4 transition-colors ${
              isDraggingGallery
                ? "border-blue-500 bg-blue-50/60"
                : "border-slate-200 bg-slate-50/40 hover:border-blue-300 hover:bg-slate-50"
            }`}
          >
            <FiUploadCloud size={18} className="text-blue-600" />
            <span className="text-xs font-semibold text-slate-600">
              Drag & drop 25+ images and video clips here, or click to upload
            </span>
          </div>

          {/* 25+ Items Responsive Grid */}
          {galleryItems.length > 0 && (
            <div className="max-h-[460px] overflow-y-auto rounded-lg border border-slate-200 bg-slate-50/50 p-3">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {galleryItems.map((item, index) => {
                  const url = getMediaUrl(item);
                  const isVid = isVideoItem(item);
                  const isCurrentMain = mainMediaUrl === url;

                  return (
                    <div
                      key={`${url}-${index}`}
                      className={`group relative flex flex-col overflow-hidden rounded-lg border bg-white shadow-xs transition-all ${
                        isCurrentMain
                          ? "border-blue-500 ring-2 ring-blue-400/50"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      {/* Media Thumbnail */}
                      <div className="relative h-28 w-full bg-slate-900">
                        {item.uploading && (
                          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/75 text-white">
                            <FiLoader className="animate-spin text-blue-400" size={20} />
                            <span className="mt-1 text-[10px] font-bold">Uploading...</span>
                          </div>
                        )}
                        {isVid ? (
                          <div className="relative h-full w-full">
                            <video
                              src={url}
                              className="h-full w-full object-cover"
                              muted
                              playsInline
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white shadow-sm">
                                <FiPlay size={13} className="ml-0.5" />
                              </span>
                            </div>
                            <span className="absolute bottom-1.5 left-1.5 flex items-center gap-1 rounded bg-black/80 px-1.5 py-0.5 text-[9px] font-bold text-amber-300 uppercase tracking-wider">
                              <FiVideo size={9} /> Video
                            </span>
                          </div>
                        ) : (
                          <img
                            src={url}
                            alt={`Gallery ${index + 1}`}
                            className="h-full w-full object-cover"
                          />
                        )}

                        {/* Index Badge */}
                        <span className="absolute left-1.5 top-1.5 rounded bg-black/60 px-1.5 py-0.5 text-[9px] font-mono font-bold text-white">
                          #{index + 1}
                        </span>

                        {/* Top-Right Remove Button */}
                        <button
                          type="button"
                          onClick={() => removeGalleryItem(index)}
                          title="Delete media"
                          className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-navy-950/80 text-white transition-transform hover:scale-110 hover:bg-rose-600"
                        >
                          <FiX size={12} />
                        </button>
                      </div>

                      {/* Card Footer Controls */}
                      <div className="flex items-center justify-between border-t border-slate-100 bg-white px-2 py-1.5 text-slate-500">
                        {/* Set as Main button */}
                        <button
                          type="button"
                          onClick={() => setAsMain(item)}
                          title={isCurrentMain ? "Current main cover" : "Set as main cover"}
                          className={`flex items-center gap-1 text-[10px] font-bold ${
                            isCurrentMain
                              ? "text-blue-600"
                              : "text-slate-400 hover:text-blue-600"
                          }`}
                        >
                          <FiStar size={11} className={isCurrentMain ? "fill-blue-600" : ""} />
                          {isCurrentMain ? "Main" : "Set Main"}
                        </button>

                        {/* Reorder Arrows */}
                        <div className="flex items-center gap-0.5">
                          <button
                            type="button"
                            disabled={index === 0}
                            onClick={() => moveItem(index, index - 1)}
                            title="Move left"
                            className="rounded p-1 hover:bg-slate-100 disabled:opacity-30"
                          >
                            <FiChevronLeft size={12} />
                          </button>
                          <button
                            type="button"
                            disabled={index === galleryItems.length - 1}
                            onClick={() => moveItem(index, index + 1)}
                            title="Move right"
                            className="rounded p-1 hover:bg-slate-100 disabled:opacity-30"
                          >
                            <FiChevronRight size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* 3. External Video Links */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-xs font-bold tracking-wider text-slate-500">
              Video Demo URL (YouTube / MP4)
            </label>
            <input
              type="text"
              value={form.videoUrl || ""}
              onChange={(e) => onChange("videoUrl", e.target.value)}
              placeholder="e.g. https://www.youtube.com/watch?v=..."
              className="w-full rounded border border-slate-200 bg-white px-3.5 py-3 text-sm text-navy-950 outline-none placeholder:text-slate-400 focus:border-blue-600"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold tracking-wider text-slate-500">
              Instagram Reel Link
            </label>
            <input
              type="text"
              value={form.instagramReel || ""}
              onChange={(e) => onChange("instagramReel", e.target.value)}
              placeholder="e.g. https://www.instagram.com/reel/..."
              className="w-full rounded border border-slate-200 bg-white px-3.5 py-3 text-sm text-navy-950 outline-none placeholder:text-slate-400 focus:border-blue-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaSection;

