
export function pagination<T>(items: T[], page: number, pageSize: number) {
  const end = page * pageSize;
  return {
        data: items.slice(0, end)
    };
}