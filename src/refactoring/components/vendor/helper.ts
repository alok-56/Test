export const formatCreateVendor = async (formData: any) => {
    const unixTimestamp = Math.floor(Date.now() / 1000);
    const createdUserId = localStorage.getItem("user_id");
    const createdUser = localStorage.getItem("user");
  
    const formattedData = {
      ...formData,
      auditInfo: {
        createdDate: unixTimestamp,
        createdUserID: createdUserId,
        createdUserName: createdUser,
        updatedDate: unixTimestamp,
        updatedUserName: createdUser,
        updatedUserid: createdUserId,
      },
    };
    return formattedData;
  };