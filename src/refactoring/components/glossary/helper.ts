export const formatCreateGlossary = async (formData: any) => {
  const { tags } = formData;
  const formattedData = {
    ...formData,
    tags: tags?.map((tag: any) => tag.text),
  };
  return formattedData;
};


