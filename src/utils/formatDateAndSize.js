export function formatDateAndSize(updatedAtISO, fileSizeBytes) {
  const formattedDate = new Date(updatedAtISO);
  const formattedTime = formattedDate.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  const formattedSize = formatBytes(fileSizeBytes);

  return {
    updated_at: formattedTime,
    size: formattedSize,
  };
}
