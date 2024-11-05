'use client';

import sendContactEmail from '@/actions/sendContactUsEmail';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const ContactUsForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true); // Set loading to true when the form is submitted

    try {
      await sendContactEmail(formData);
      // console.log(response);
      toast.success('Your message has been sent successfully!'); // Success message
    } catch (error) {
      // console.error(error);
      toast.error('There was an error sending your message. Please try again.'); // Error message
    } finally {
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      setLoading(false); // Set loading to false after the request completes
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center text-gray-700 dark:text-gray-200 gap-5 p-6"
    >
      <Toaster /> {/* Render the Toaster component */}
      <h1 className="text-xl md:text-2xl font-semibold mb-2">
        Have a question or need assistance?
      </h1>
      <Input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Your Name"
        className="w-full"
      />
      <Input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Your Email"
        className="w-full"
      />
      <Input
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        placeholder="Subject"
        className="w-full"
      />
      <Textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        rows={5}
        placeholder="Message"
        className="w-full"
      />
      <Button
        type="submit"
        variant="default"
        size="lg"
        className="w-full mt-4"
        disabled={loading}
      >
        {loading ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
};

export default ContactUsForm;
