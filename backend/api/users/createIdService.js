const createHospitalID = (hospitalName) => {
  const hosp_id =
    hospitalName
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("") + Math.trunc(Math.random() * 1000).toString();
  return hosp_id;
};

const createVendorID = (vendorName) => {
  const vendor_id =
    "Vend-" +
    vendorName
      ?.split?.(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("") +
    "-" +
    Math.trunc(Math.random() * 10000).toString();
  // console.log(vendor_id);
  return vendor_id;
};

const createUserID = (username, role, hospital, department, vendor) => {
  const userInitials = username
    ?.split?.(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
  const hospitalInitials = hospital
    ?.split?.(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
  const departmentInitals = department
    ?.split?.(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
  const vendorInitials = vendor
    ?.split?.(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
  if (role === "Admin") {
    return `Adm_${userInitials}@${hospitalInitials}-${Math.trunc(
      Math.random() * 1000
    ).toString()}`;
  } else if (role === "Engineer") {
    return `Ing_${userInitials}@${hospitalInitials}-${departmentInitals}-${Math.trunc(
      Math.random() * 1000
    ).toString()}`;
  } else if (role === "Clinician") {
    return `Cli_${userInitials}@${hospitalInitials}-${departmentInitals}-${Math.trunc(
      Math.random() * 1000
    ).toString()}`;
  } else if (role === "ESP") {
    return `Esp_${userInitials}@${vendorInitials}-${Math.trunc(
      Math.random() * 1000
    ).toString()}`;
  }
};

const createPassword = (data) => {
  const uName = `${data.first_name} ${data.surname} ${data?.other_name}`;
  const password =
    data.role.slice(0, 3) +
    uName
      ?.split?.(" ")
      .map((word) => word.charAt(0).toLowerCase())
      .join("") +
    Math.trunc(Math.random() * 1000).toString();
  return password;
};

module.exports = {
  expcreateHospitalID: createHospitalID,
  expcreateUserID: createUserID,
  expcreateVendorID: createVendorID,
  expcreatePassword: createPassword,
};
