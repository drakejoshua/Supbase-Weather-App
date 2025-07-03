/**
 * Factory function to create a file upload function using a Supabase client.
 *
 * @param {object} supabase - The Supabase client instance.
 * @returns {function} - uploadFile(bucket, path, file): Promise<{ success, error, publicUrl }>
 *
 * Example usage in a React hook:
 *
 * import { useSupabaseClient } from '@supabase/auth-helpers-react';
 * import createSupabaseUploader from './useSupabaseUpload';
 *
 * function MyComponent() {
 *   const supabase = useSupabaseClient();
 *   const uploadFile = createSupabaseUploader(supabase);
 *
 *   const handleUpload = async (file) => {
 *     const result = await uploadFile('my-bucket', `uploads/${file.name}`, file);
 *     if (result.success) {
 *       console.log('File uploaded:', result.publicUrl);
 *     } else {
 *       console.error('Upload error:', result.error);
 *     }
 *   };
 *
 *   // ...
 * }
 */
function useSupabaseUpload(supabase) {
    return async function(bucket, path, file) {
        try {
            const { error: uploadError } = await supabase
                .storage
                .from(bucket)
                .upload(path, file, { upsert: true });

            if (uploadError) {
                return { success: false, error: uploadError, publicUrl: null };
            }

            const { data: urlData, error: urlError } = supabase
                .storage
                .from(bucket)
                .getPublicUrl(path);

            if (urlError) {
                return { success: false, error: urlError, publicUrl: null };
            }

            return { success: true, error: null, publicUrl: urlData?.publicUrl || null };
        } catch (err) {
            return { success: false, error: err, publicUrl: null };
        }
    };
}

export default useSupabaseUpload;
