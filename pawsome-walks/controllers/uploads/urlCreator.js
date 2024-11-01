export default function urlCreator(filename) {
  console.log(filename);
  const url =
    `https://gwinwlodpvympyoitnza.supabase.co/storage/v1/object/public/uploads/${filename}`.replace(
      /\s/g,
      ""
    );
  return url;
}
