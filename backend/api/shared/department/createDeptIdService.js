const hospInit = (hosp_name) => {
  return hosp_name
    ?.replace(" and ", " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
};

const createDeptId = (hosp_name, dept_name) => {
  // data contains depatment name and hospital name
  const hospInitials = hospInit(hosp_name);
  const dept_id =
    dept_name
      ?.replace(" and ", " ")
      .split(" ")
      .map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1, 3).toLowerCase()
      )
      .join("") +
    "@" +
    hospInitials +
    Math.trunc(Math.random() * 1000).toString();
  return dept_id;
};

const createDeptKey = (hosp_name, dept_name) => {
  const hospInitials = hospInit(hosp_name);
  const dept_key =
    dept_name
      ?.replace(" and ", " ")
      .split(" ")
      .map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1, 2).toLowerCase()
      )
      .join("") +
    Math.trunc(Math.random() * 1000).toString() +
    "-of-" +
    hospInitials;
  return dept_key;
};

module.exports = {
  expcreateDeptId: createDeptId,
  expcreateDeptKey: createDeptKey,
};
