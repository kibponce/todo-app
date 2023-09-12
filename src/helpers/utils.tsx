export const deepClone: any = (data: { data: Object[] | Object | [] }) => {
  return JSON.parse(JSON.stringify(data));
};
