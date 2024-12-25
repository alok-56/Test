export const formatCreateRecruiter = async (formData: any,) => {

  const technology = formData.technology.split(",");

  const formattedData = {
    ...formData,
    type: formData.type,
    company_id: formData.company_id,
    company_name: formData.company_name,
    name: formData.name,
    email: formData.email,
    contact: formData.contact,
    technology: technology,
  };
  return formattedData;
};

export const getCustomerIdByName = (customers: any[], customerName: string) => {
  return customers?.find((c) => c.name === customerName)?.company_id;
};
