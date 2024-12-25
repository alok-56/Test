import AppUtils from "../../utils/AppUtils";

export const formatCreateHotlist = async (
  date: string,
  rows: any[],
  users: any[]
) => {
  // Create a map to store user IDs by first name
  const userIDByIdentifier = new Map<string, string[]>();

  // Populate the userID mapping based on first name
  users.forEach((user) => {
    const firstName = user.profile.firstName;
    const userID = user?.profile?._id;

    if (!userIDByIdentifier.has(firstName)) {
      userIDByIdentifier.set(firstName, [userID]);
    } else {
      userIDByIdentifier.get(firstName)?.push(userID);
    }
  });





  const addedUserIDs = new Set<string>(); // Track added userIDs to avoid duplicates

  const updatedUsers = rows.map((row) => {
    const { firstName, priority, salesPerson, rate } = row;


    const userIDs = userIDByIdentifier.get(firstName);

    if (userIDs && userIDs.length > 0) {
      // Find the first available userID that hasn't been used yet
      const userID = userIDs.find((id) => !addedUserIDs.has(id));

      if (userID) {
        addedUserIDs.add(userID); // Mark this userID as added
        return {
          userID,
          priority,
          salesPerson,
          rate: parseInt(rate), // Ensure the rate is an integer
        };
      } else {

        return null; // Skip if no unused userID is available
      }
    } else {

      return {
        userID: firstName, // Use firstName if no userID is found
        priority,
        salesPerson,
        rate: parseInt(rate), // Ensure the rate is an integer
      };
    }
  }).filter(Boolean); // Filter out any null values



  // Return the formatted data
  return {
    date: AppUtils.dateToUnix(date),
    users: updatedUsers,
  };
};



