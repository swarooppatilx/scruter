'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';

import { PostListing } from '@/actions/seller/listing';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import ImageUpload from '@/components/ui/imageUpload';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';


const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  price: z.number().min(0, 'Price must be a positive number'),
  description: z.string().min(1, 'Description is required'),
  category: z.enum(['Fooding', 'Housing', 'For_Sale'], {
    errorMap: () => ({ message: 'Category is required' }),
  }),
  images: z.array(z.string()).min(1, 'At least one image is required'),
});

type CreateListingFormValues = z.infer<typeof formSchema>;

export const CreateListingForm: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const title = 'Create Listing';
  const description = 'Fill in the details to create a new listing.';
  const toastMessage = 'Listing created.';
  const action = 'Create';

  const form = useForm<CreateListingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      price: 0,
      description: '',
      category: 'Fooding', // Set default category to a valid option
      images: [],
    },
  });

  const onSubmit = async (data: CreateListingFormValues) => {
    try {
      if (!params.sellerId) {
        toast.error("sellerId is required!");
        return;
      }

      const sellerId = Array.isArray(params.sellerId) ? params.sellerId[0] : params.sellerId;

      if (!sellerId) {
        toast.error("Valid sellerId is required!");
        return;
      }

      setLoading(true);
      const resp = await PostListing({
        sellerId: sellerId,
        listingData: data,
      });

      router.push(`/seller/${sellerId}/`);
      toast.success(toastMessage);
    } catch (err) {
      toast.error('Something went wrong');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle image change
  const handleImageChange = useCallback((url: string) => {
    form.setValue('images', [...form.getValues('images'), url]);
  }, [form]);

  // Handle image removal
  const handleImageRemove = useCallback((url: string) => {
    const updatedImages = form.getValues('images').filter(image => image !== url);
    form.setValue('images', updatedImages);
  }, [form]);

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value}
                    disabled={loading}
                    onChange={handleImageChange}
                    onRemove={handleImageRemove}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Listing Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="Price"
                      {...field}
                      // Ensure value is a number and valid for form submission
                      onChange={(e) => {
                        const value = parseFloat(e.target.value);
                        field.onChange(isNaN(value) ? 0 : value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <select
                      disabled={loading}
                      {...field}
                      className="border rounded-md p-2"
                    >
                      <option value="" disabled>
                        Select a category
                      </option>
                      <option value="Fooding">Fooding</option>
                      <option value="Housing">Housing</option>
                      <option value="For_Sale">For Sale</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
      <Separator />
    </>
  );
};
