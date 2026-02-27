//globals
/* global API_URL */

//imports
import { showLoader, messageLoader, hideLoader } from "../utils/loader";

try {
  showLoader();

  const response = await fetch(`${API_URL}/forgot-password`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();

  if (response.ok) {
    messageLoader(String(data.message));
  } else {
    messageLoader("Auth fail");
    messageLoader(String("Error: " + data.message));
  }
} catch (error) {
  console.error(error);
} finally {
  hideLoader();
}
