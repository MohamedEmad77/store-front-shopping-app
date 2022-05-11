export const check_if_id_is_valid = (id: string) => {
  if (!Number.parseInt(id)) return false;
  return true;
};
