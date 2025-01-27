import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { accommodationsSearchFormSchema } from "@/lib/zod/schema/accommodations";
import { usePlacesWidget } from "react-google-autocomplete";
import { Input } from "@/components/shadcn/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/shadcn/form";
import { Button } from "@/components/shadcn/button";
import { Search } from "lucide-react";

export const AccommodationsSearchForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof accommodationsSearchFormSchema>>({
    resolver: zodResolver(accommodationsSearchFormSchema),
    defaultValues: {
      place: {
        lat: undefined,
        lng: undefined,
      },
    },
  });

  const { ref } = usePlacesWidget({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    onPlaceSelected: (place) => {
      form.setValue("place", {
        lat: place.geometry?.location?.lat(),
        lng: place.geometry?.location?.lng(),
      });
    },
  });

  const onSubmit = () => {
    const { place } = form.getValues();
    if (place.lat && place.lng) {
      router.push(`/accommodations/search?lat=${place.lat}&lng=${place.lng}`);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mb-8">
        <div className="flex items-center gap-4">
          <div className="flex-grow">
            <FormField
              control={form.control}
              name="place"
              render={({ field: { value, ...rest } }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...rest}
                      ref={ref as unknown as React.LegacyRef<HTMLInputElement>}
                      id="place"
                      type="text"
                      placeholder="地域名で検索"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit">
            <Search className="h-4 w-4" />
            検索
          </Button>
        </div>
      </form>
    </Form>
  );
};
