import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ImagePlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import type {
  CreateRestaurantDto,
  Restaurant,
} from "../types/restaurant.types";

const imageValueSchema = z
  .string()
  .min(1, "Please choose an image file.")
  .refine(
    (value) =>
      value.startsWith("data:image/") ||
      z.url().safeParse(value).success,
    "Please choose a valid image file."
  );

const restaurantSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters."),
  previewImage: imageValueSchema,
  location: z
    .string()
    .min(2, "Location is required."),
  cuisine: z
    .string()
    .min(2, "Cuisine is required."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters."),
});

type RestaurantFormValues = z.infer<typeof restaurantSchema>;

interface RestaurantFormProps {
  restaurant?: Restaurant;
  isSubmitting?: boolean;
  submitLabel: string;
  onSubmit: (values: CreateRestaurantDto) => void;
}

export default function RestaurantForm({
  restaurant,
  isSubmitting,
  submitLabel,
  onSubmit,
}: RestaurantFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RestaurantFormValues>({
    resolver: zodResolver(restaurantSchema),
    defaultValues: {
      title: restaurant?.title ?? "",
      previewImage: restaurant?.previewImage ?? "",
      location: restaurant?.location ?? "",
      cuisine: restaurant?.cuisine ?? "",
      description: restaurant?.description ?? "",
    },
  });

  const previewImage = watch("previewImage");
  const [imageError, setImageError] = useState("");

  const compressImage = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const image = new Image();
      const reader = new FileReader();

      reader.onload = () => {
        if (typeof reader.result !== "string") {
          reject(new Error("Invalid image file."));
          return;
        }

        image.onload = () => {
          const maxSize = 900;
          const scale = Math.min(
            1,
            maxSize / Math.max(image.width, image.height)
          );
          const canvas = document.createElement("canvas");
          canvas.width = Math.round(image.width * scale);
          canvas.height = Math.round(image.height * scale);

          const context = canvas.getContext("2d");

          if (!context) {
            reject(new Error("Could not process image."));
            return;
          }

          context.drawImage(
            image,
            0,
            0,
            canvas.width,
            canvas.height
          );

          resolve(canvas.toDataURL("image/jpeg", 0.72));
        };

        image.onerror = () =>
          reject(new Error("Could not load image."));
        image.src = reader.result;
      };

      reader.onerror = () =>
        reject(new Error("Could not read image."));
      reader.readAsDataURL(file);
    });

  const handleImageFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setImageError("Please choose a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setImageError(
        "Please choose an image smaller than 5 MB."
      );
      return;
    }

    try {
      const compressedImage = await compressImage(file);
      setImageError("");
      setValue("previewImage", compressedImage, {
        shouldDirty: true,
        shouldValidate: true,
      });
    } catch {
      setImageError("Could not process this image file.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl shadow-slate-200/60"
    >
      <div className="border-b border-slate-100 bg-slate-50 px-6 py-5">
        <h2 className="text-xl font-bold text-slate-950">
          Restaurant Information
        </h2>
      </div>

      <div className="space-y-6 p-6">
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <Label
              htmlFor="title"
              className="text-sm font-medium text-slate-700"
            >
              Restaurant name
            </Label>
            <Input
              id="title"
              className="mt-1 h-11 border-slate-200 bg-white focus-visible:border-amber-500"
              {...register("title")}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <Label
              htmlFor="cuisine"
              className="text-sm font-medium text-slate-700"
            >
              Cuisine
            </Label>
            <Input
              id="cuisine"
              className="mt-1 h-11 border-slate-200 bg-white focus-visible:border-amber-500"
              {...register("cuisine")}
            />
            {errors.cuisine && (
              <p className="mt-1 text-sm text-red-500">
                {errors.cuisine.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <Label
            htmlFor="location"
            className="text-sm font-medium text-slate-700"
          >
            Location
          </Label>
          <Input
            id="location"
            className="mt-1 h-11 border-slate-200 bg-white focus-visible:border-amber-500"
            {...register("location")}
          />
          {errors.location && (
            <p className="mt-1 text-sm text-red-500">
              {errors.location.message}
            </p>
          )}
        </div>

        <div>
          <Label
            htmlFor="previewImage"
            className="text-sm font-medium text-slate-700"
          >
            Image
          </Label>
          <input
            type="hidden"
            {...register("previewImage")}
          />

          <label className="mt-1 flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-amber-300 bg-amber-50/60 px-4 py-6 text-center transition hover:border-amber-500 hover:bg-amber-50">
            <span className="inline-flex size-11 items-center justify-center rounded-full bg-white text-amber-700 shadow-sm">
              <ImagePlus className="size-5" />
            </span>
            <span className="mt-3 text-sm font-semibold text-slate-900">
              Choose File
            </span>
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={handleImageFileChange}
            />
          </label>

          {previewImage && (
            <div className="mt-4 overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
              <img
                src={previewImage}
                alt="Restaurant preview"
                className="h-56 w-full object-cover"
              />
            </div>
          )}

          {imageError && (
            <p className="mt-1 text-sm text-red-500">
              {imageError}
            </p>
          )}

          {errors.previewImage && (
            <p className="mt-1 text-sm text-red-500">
              {errors.previewImage.message}
            </p>
          )}
        </div>

        <div>
          <Label
            htmlFor="description"
            className="text-sm font-medium text-slate-700"
          >
            Description
          </Label>
          <textarea
            id="description"
            rows={5}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-amber-500 focus:outline-none"
            {...register("description")}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="flex justify-end border-t border-slate-100 pt-5">
          <Button
            type="submit"
            className="h-11 bg-amber-600 px-5 text-white hover:bg-amber-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : submitLabel}
          </Button>
        </div>
      </div>
    </form>
  );
}
