const { sub } = require("date-fns");

const metadata = {
  key1: "value1",
  key2: "value2",
};

const urls = [
  "https://www.webmd.com/drugs/2/drug-7748/ciprofloxacin-oral/details",
  "https://www.webmd.com/drugs/2/drug-7748/ciprofloxacin-oral/details",
  "https://medlineplus.gov/druginfo/meds/a688016.html",
  "https://www.drugs.com/ciprofloxacin.html",
];

const sources = Array(10)
  .fill(0)
  .map((item, index) => {
    return { url: urls[index % 4], metadata };
  });

const response = `These studies suggest that ciprofloxacin is a fluorinated quinolone with various molecular forms, including a molecular salt with salicylic acid and complexes with  These studies suggest that ciprofloxacin is a fluorinated quinolone with various molecular forms, including a molecular salt with salicylic acid and other substances like polyethylene glycol and norflo xacin, which affect its antimicrobial activity and therapeutic properties. 1\nThese studies suggest that ciprofloxacin is a fluorinated quinolone with various molecular forms, including a molecular salt with salicylic acid and complexes with other substances like polyethylene glycol and norfloxacin, which affect its antimicrobial activity and therapeutic properties.\nThese studies suggest that ciprofloxacin is a fluorinated quinolone with various molecular forms. These studies suggest that ciprofloxacin is a fluorinated quinolone with various molecular forms.`;

const query = "so, what is the molecular type of Cyprofloxacin";

const searchResult = {
  search_history_id: "1e07e80c-f596-11ee-85a9-c30d0dd94485",
  user_id: "12b48e74-f596-11ee-85a9-f3d0e85b3083",
  session_id: "c4641ed5-8e8d-4e4a-bccb-b11f309cb5db",
  result: `${response}\n${response}\n${response}`,
  sources,
  reaction: null,
  created_at: "2024-05-03T15:56:34.880213Z",
  updated_at: "2024-05-03T15:56:34.880213Z",
};

const searchResults = Array(15)
  .fill(0)
  .map((item, index) => {
    return {
      ...searchResult,
      // query,
      query: `${index + 1}. ${query}`,
      search_history_id: `${index}`,
      created_at: String(sub(new Date(), { days: 8 })),
    };
  });

const user = {
  user_id: "5345b65c-012b-11ef-84c9-23b145a771ba",
  email: "saifullah.abc@gmail.com",
  username: "basilisk1995",
  name: "Saifullah Talukder",
  profile_image: "",
  title: "Software Engineer",
  company: "Intelligent Machines Limited",
};

module.exports = { searchResults, user };
