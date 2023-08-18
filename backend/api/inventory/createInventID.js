module.exports = {
  createPartID: (partName) => {
    const part_id =
      "s_part-" +
      partName
        .split(" ")
        .map(
          (word) =>
            word.charAt(0).toUpperCase() + word.slice(1, 3).toLowerCase()
        )
        .join("") +
      Math.trunc(Math.random() * 1000000).toString();
    return part_id;
  },
};
